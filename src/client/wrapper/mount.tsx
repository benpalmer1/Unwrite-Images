import { h, render } from 'preact';
import App from 'client/initial-app/App';

export interface MountOptions {
  cdnBase?: string;
  version?: string;
  onEditorStateChange?: (isOpen: boolean) => void;
}

// Mount the Unwrite Images app into a provided root element and return an unmount disposer.
export function mountUnwriteImages(
  root: HTMLElement,
  options: MountOptions = {},
): () => void {
  const { cdnBase, version, onEditorStateChange } = options;

  // Set CDN configuration if provided
  if (typeof window !== 'undefined') {
    if (cdnBase) window.UNWRITE_IMAGES_CDN = cdnBase;
    if (version) window.UNWRITE_IMAGES_VERSION = version;
  }

  render(<App onEditorStateChange={onEditorStateChange} />, root);

  // Return disposer to unmount
  return () => {
    render(null as any, root);
  };
}

export default mountUnwriteImages;
