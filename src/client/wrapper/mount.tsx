import { h, render } from 'preact';
import App from 'client/initial-app/App';

export type MountTheme = 'inherit' | 'unwrite-light' | 'unwrite-dark';

export interface MountOptions {
  theme?: MountTheme;
  cdnBase?: string; // Optional CDN base URL override
  version?: string; // Optional version override for CDN
  onEditorStateChange?: (isOpen: boolean) => void;
}

// Mount the Unwrite Images app into a provided root element and return an unmount disposer.
export function mountUnwriteImages(
  root: HTMLElement,
  options: MountOptions = {},
): () => void {
  // Apply optional theme override
  const { theme = 'inherit', cdnBase, version, onEditorStateChange } = options;
  if (theme && theme !== 'inherit') {
    root.setAttribute('data-unwrite-images-theme', theme);
  }

  // Set CDN configuration if provided
  if (typeof window !== 'undefined') {
    if (cdnBase) window.UNWRITE_IMAGES_CDN = cdnBase;
    if (version) window.UNWRITE_IMAGES_VERSION = version;
  }

  render(<App onEditorStateChange={onEditorStateChange} />, root);
  // Return disposer to unmount
  return () => {
    // Preact unmount via rendering null into the same root
    // Cast is to satisfy TS older preact types
    render(null as any, root);
    if (theme && theme !== 'inherit') {
      root.removeAttribute('data-unwrite-images-theme');
    }
  };
}

export default mountUnwriteImages;
