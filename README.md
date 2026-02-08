# Unwrite Images - Image optimisation for Unwrite.co

Use it live: https://Unwrite.co/images

Unwrite Images is a fork of Squoosh that keeps everything client‑side and provides a simple mount API for embedding inside Unwrite (or any web app).

It helps you optimise images for the web: reduce file size while keeping quality, preview results side‑by‑side, and save the version that looks best.

## Original repo

https://github.com/GoogleChromeLabs/squoosh

Please contribute here instead of via this repo - unless your contribution is specific to Unwrite Images!

For transparency, Unwrite Images is not associated with, or endorsed by, the Squoosh authors.

## Privacy

All processing happens locally in your browser using Web Workers and WebAssembly. Images are not uploaded to a server.

## Installation

### Via NPM

```bash
npm install unwrite-images
```

### Via CDN (jsDelivr)

```html
<script type="module">
  import mountUnwriteImages from 'https://cdn.jsdelivr.net/npm/unwrite-images@0.2.0/dist/mount.js';

  const container = document.getElementById('image-editor');
  const dispose = mountUnwriteImages(container);
</script>
```

## Usage

### Mount API

```ts
import mountUnwriteImages from 'unwrite-images';

const el = document.getElementById('container')!;
const dispose = mountUnwriteImages(el, {
  // Optional: Override CDN configuration
  cdnBase: 'https://cdn.jsdelivr.net/npm/unwrite-images',
  version: '0.2.0',
});

// Clean up when done
dispose();
```

The app renders an internal container with the `unwrite-images` CSS class. All styles are scoped under this class, and host apps can use it as a CSS targeting hook (e.g. `.unwrite-images { ... }`).

### Options

- `cdnBase`: Optional CDN base URL override
- `version`: Optional version for CDN URLs
- `onEditorStateChange`: Callback fired with `true` when the editor opens and `false` when it closes. The component automatically manages `body.style.overflow` (hidden while editing); use this callback for any additional host-side changes such as hiding surrounding UI

### Theming via CSS Variables

The app inherits colours from the host via CSS custom properties. Set these on or above the container element to customise the palette:

```css
#container {
  --colour-background: #fff;
  --colour-text-primary: #111;
  --colour-text-secondary: #343a3e;
  --colour-accent: #0ea5e9;
  --colour-accent-hover: #0284c7;
  --colour-highlight: #f0f9ff;
  --colour-border: #e5e7eb;
  --colour-background-alt: #f8fafc;
  --colour-text-on-accent: #fff;
}
```

### Breaking changes in 0.2.0

- Removed the `theme` option (`'inherit' | 'unwrite-light' | 'unwrite-dark'`). Theming is handled entirely by CSS variable inheritance.
- Removed the `MountTheme` type export.

### Supported Formats

Encoders: AVIF, JPEG XL, MozJPEG, OxiPNG, QOI, WebP, WebP2, Browser GIF, Browser JPEG, Browser PNG

Processors: Resize, Colour quantisation, Rotation

All codecs run client-side via WebAssembly.

## CDN Hosting

When installed via npm and published, Unwrite Images is automatically available via jsDelivr CDN:

- Main bundle: `https://cdn.jsdelivr.net/npm/unwrite-images@VERSION/dist/mount.js`
- WASM codecs & assets: `https://cdn.jsdelivr.net/npm/unwrite-images@VERSION/dist/assets/`

The initial mount script is ~40KB. WASM codecs (~21MB total) are loaded on-demand as needed, so your application only pays for what the user actually uses.

## Developing

1. Install dependencies
   ```sh
   npm install
   ```
2. Build the project (generates static site build and the mount wrapper in `dist/`)
   ```sh
   npm run build
   ```
3. Start the dev server for the static app
   ```sh
   npm run dev
   ```

## Branches

- `main` - Stable production releases
- `dev` - Active development

## License

Licensed under Apache-2.0. See `LICENSE` and `NOTICE` for attributions and third‑party licences.
