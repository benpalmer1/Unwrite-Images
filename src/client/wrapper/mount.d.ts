export type MountTheme = 'inherit' | 'light' | 'dark';
export interface MountOptions {
  theme?: MountTheme;
  cdnBase?: string;
  version?: string;
}
export function mountUnwriteImages(
  root: HTMLElement,
  options?: MountOptions,
): () => void;
export default mountUnwriteImages;
