/**
 * CDN configuration for loading assets from jsDelivr
 * When published to npm as @unwrite/images, files are automatically available at:
 * https://cdn.jsdelivr.net/npm/@unwrite/images@VERSION/dist/
 */

declare global {
  interface Window {
    UNWRITE_IMAGES_CDN?: string;
    UNWRITE_IMAGES_VERSION?: string;
  }
}

// Allow override via window globals for testing/development
const CDN_BASE = typeof window !== 'undefined' && window.UNWRITE_IMAGES_CDN 
  ? window.UNWRITE_IMAGES_CDN 
  : 'https://cdn.jsdelivr.net/npm/@unwrite/images';

const VERSION = typeof window !== 'undefined' && window.UNWRITE_IMAGES_VERSION 
  ? window.UNWRITE_IMAGES_VERSION 
  : '0.1.0'; // This should match package.json version

export function getCDNUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In development or if CDN is disabled, use relative paths
  if (CDN_BASE === 'local') {
    return `/${cleanPath}`;
  }
  
  // Construct jsDelivr URL
  return `${CDN_BASE}@${VERSION}/dist/${cleanPath}`;
}

export function getWASMUrl(codec: string, file: string): string {
  // WASM files are in dist/chunks/codecs/[codec]/[file]
  return getCDNUrl(`chunks/codecs/${codec}/${file}`);
}

// Helper to load WASM with fallback
export async function loadWASM(url: string, fallbackUrl?: string): Promise<ArrayBuffer> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load: ${response.status}`);
    return await response.arrayBuffer();
  } catch (error) {
    if (fallbackUrl) {
      console.warn(`Failed to load from CDN, trying local fallback: ${error}`);
      const response = await fetch(fallbackUrl);
      if (!response.ok) throw new Error(`Fallback also failed: ${response.status}`);
      return await response.arrayBuffer();
    }
    throw error;
  }
}

// Configuration object for external use
export const cdnConfig = {
  enabled: CDN_BASE !== 'local',
  base: CDN_BASE,
  version: VERSION,
  getUrl: getCDNUrl,
  getWASMUrl,
  loadWASM,
};

export default cdnConfig;