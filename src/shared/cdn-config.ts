/**
 * CDN configuration for loading assets from jsDelivr
 * When published to npm as unwrite-images, files are automatically available at:
 * https://cdn.jsdelivr.net/npm/unwrite-images@VERSION/dist/
 */

declare global {
  interface Window {
    UNWRITE_IMAGES_CDN?: string;
    UNWRITE_IMAGES_VERSION?: string;
  }
  interface WorkerGlobalScope {
    UNWRITE_IMAGES_CDN?: string;
    UNWRITE_IMAGES_VERSION?: string;
  }
}

type UnwriteGlobalScope = typeof globalThis & {
  UNWRITE_IMAGES_CDN?: string;
  UNWRITE_IMAGES_VERSION?: string;
};

const globalScope = globalThis as UnwriteGlobalScope;

// Allow override via globals for testing/development
const CDN_BASE =
  typeof globalScope.UNWRITE_IMAGES_CDN === 'string'
    ? globalScope.UNWRITE_IMAGES_CDN
    : 'https://cdn.jsdelivr.net/npm/unwrite-images';

const VERSION =
  typeof globalScope.UNWRITE_IMAGES_VERSION === 'string'
    ? globalScope.UNWRITE_IMAGES_VERSION
    : '0.1.4'; // This should match package.json version

export function getCDNUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  if (CDN_BASE === 'local') {
    return `/${cleanPath}`;
  }

  const normalizedBase = CDN_BASE.replace(/\/+$/, '');
  const isKnownVersionedCdn = /cdn\.jsdelivr\.net|unpkg\.com/.test(
    normalizedBase,
  );

  if (isKnownVersionedCdn) {
    if (normalizedBase.includes('@')) {
      const baseWithDist = normalizedBase.endsWith('/dist')
        ? normalizedBase
        : `${normalizedBase}/dist`;
      return `${baseWithDist}/${cleanPath}`.replace(/([^:])\/{2,}/g, '$1/');
    }
    return `${normalizedBase}@${VERSION}/dist/${cleanPath}`;
  }

  if (
    normalizedBase.startsWith('http://') ||
    normalizedBase.startsWith('https://')
  ) {
    return `${normalizedBase}/${cleanPath}`.replace(/([^:])\/{2,}/g, '$1/');
  }

  return `${normalizedBase}@${VERSION}/dist/${cleanPath}`;
}

export function getWASMUrl(codec: string, file: string): string {
  // WASM files are in dist/chunks/codecs/[codec]/[file]
  return getCDNUrl(`chunks/codecs/${codec}/${file}`);
}

// Helper to load WASM with fallback
export async function loadWASM(
  url: string,
  fallbackUrl?: string,
): Promise<ArrayBuffer> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load: ${response.status}`);
    return await response.arrayBuffer();
  } catch (error) {
    if (fallbackUrl) {
      console.warn(`Failed to load from CDN, trying local fallback: ${error}`);
      const response = await fetch(fallbackUrl);
      if (!response.ok)
        throw new Error(`Fallback also failed: ${response.status}`);
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
