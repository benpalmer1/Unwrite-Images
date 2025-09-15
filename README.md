# Unwrite Images - Image optimisation for Unwrite.co

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
  import mountUnwriteImages from 'https://cdn.jsdelivr.net/npm/unwrite-images@0.1.1/dist/mount.js';

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
  theme: 'inherit',
  // Optional: Override CDN configuration
  cdnBase: 'https://cdn.jsdelivr.net/npm/unwrite-images',
  version: '0.1.1',
});

// Clean up when done
dispose();
```

### Options

- `theme`: 'inherit' | 'light' | 'dark' (default: 'inherit')
- `cdnBase`: Optional CDN base URL override
- `version`: Optional version for CDN URLs

## CDN Hosting

When installed via npm and published, Unwrite Images is automatically available via jsDelivr CDN:

- Main bundle: `https://cdn.jsdelivr.net/npm/unwrite-images@VERSION/dist/mount.js`
- WASM codecs: `https://cdn.jsdelivr.net/npm/unwrite-images@VERSION/dist/chunks/codecs/`

This significantly reduces the bundle size of your main application by loading image processing codecs on-demand from the CDN.

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
