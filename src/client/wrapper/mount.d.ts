export type MountTheme = 'inherit' | 'unwrite-light' | 'unwrite-dark';
export interface MountOptions {
  theme?: MountTheme;
  cdnBase?: string;
  version?: string;
  onEditorStateChange?: (isOpen: boolean) => void;
}
export function mountUnwriteImages(
  root: HTMLElement,
  options?: MountOptions,
): () => void;
export default mountUnwriteImages;
