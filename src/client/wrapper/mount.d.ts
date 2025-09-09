export type MountTheme = 'inherit' | 'light' | 'dark';
export interface MountOptions {
  theme?: MountTheme;
}
export function mountUnwriteImages(root: HTMLElement, options?: MountOptions): () => void;
export default mountUnwriteImages;

