# Unwrite Host Integration Notes for unwrite-images 0.2.0

## Breaking changes from 0.1.x

- The `theme` option has been removed from `mountUnwriteImages()`. Remove any `theme: 'inherit'`, `theme: 'unwrite-light'`, or `theme: 'unwrite-dark'` from your mount call. Theming is now handled entirely via CSS variable inheritance (see README).
- The `MountTheme` type no longer exists. Remove any imports of it.
- The app renders an internal container with the `unwrite-images` CSS class. All styles are scoped under this class. Host apps can target it for overrides (e.g. `.unwrite-images { ... }`).

## Upgrade steps

1. **Bump package version**

   - Update `package.json` and `package-lock.json` so `unwrite-images` points to `0.2.0`.
   - Run `npm install` (or `npm update unwrite-images`) in the Unwrite repo to refresh the dependency.

2. **Refresh embedded CSS**

   - Re-run `node scripts/generate-unwrite-images-css.js` from the Unwrite repo root to regenerate `public/unwrite-images.css` against the 0.2.0 bundle.

3. **Runtime wiring** (`app/images/page.tsx`)

   - Change the hard-coded `version` constant to `'0.2.0'` so the CDN script tag loads the matching build.
   - Remove the `theme` property from the `mountUnwriteImages` options object.
   - Handle the `onEditorStateChange` callback to hide marketing sections while the editor is active. Note: `body.style.overflow` is already managed automatically (set to `hidden` while editing, restored on close) — the callback is for any additional host-side changes.

4. **Manual regression check**

   - After the dependency refresh, run the app locally and open `/images`.
   - Verify that the intro page renders correctly, file uploads reach the editor, and codecs load (check the console for WASM fetches from jsDelivr).

5. **Local development setup**
   - Create or update `.env.local` with:
     ```
     NEXT_PUBLIC_UNWRITE_IMAGES_DEV_MOUNT=http://localhost:5847/mount.js
     NEXT_PUBLIC_UNWRITE_IMAGES_CDN_BASE=http://localhost:5847
     NEXT_PUBLIC_UNWRITE_IMAGES_VERSION=0.2.0
     ```
   - Restart `npm run dev` so Next.js picks up the new environment before reloading `/images`.
