export interface MountOptions {
  cdnBase?: string;
  version?: string;
  onEditorStateChange?: (isOpen: boolean) => void;
}
export function mountUnwriteImages(
  root: HTMLElement,
  options?: MountOptions,
): () => void;
export default mountUnwriteImages;
