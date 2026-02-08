# CDN Integration Guide for Unwrite Images

## Overview

Unwrite Images can be hosted and served via jsDelivr CDN to minimize bundle size in your main application. The total package is ~21MB, but when served via CDN, your application only needs to load the mount script (~40KB), with WASM codecs loaded on-demand as needed.

## How jsDelivr Works

jsDelivr automatically serves any npm package as a CDN. Once published to npm, your package is immediately available at:

```
https://cdn.jsdelivr.net/npm/unwrite-images@VERSION/dist/
```

## Publishing to NPM

### 1. First-time Setup

```bash
# Login to npm (if not already logged in)
npm login

# Verify you're logged in
npm whoami
```

### 2. Publish the Package

```bash
# The build:cdn script runs automatically before publishing
npm publish

# Or with a specific tag
npm publish --tag beta
```

### 3. Verify CDN Availability

After publishing, the package is immediately available via:

- jsDelivr: `https://cdn.jsdelivr.net/npm/unwrite-images@0.2.0/dist/mount.js`
- unpkg: `https://unpkg.com/unwrite-images@0.2.0/dist/mount.js`

## Integration in Unwrite Main App

### Option 1: Direct CDN Import (Smallest Bundle)

```typescript
// app/images/page.tsx
'use client';

import { useEffect, useRef } from 'react';

// Dynamically import from CDN
async function loadUnwriteImages() {
  const module = await import(
    'https://cdn.jsdelivr.net/npm/unwrite-images@0.2.0/dist/mount.js'
  );
  return module.default;
}

export default function ImagesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const disposeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let mounted = true;

    loadUnwriteImages().then((mountUnwriteImages) => {
      if (mounted && containerRef.current) {
        disposeRef.current = mountUnwriteImages(containerRef.current);
      }
    });

    return () => {
      mounted = false;
      disposeRef.current?.();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
}
```

### Option 2: NPM Install with CDN Assets

```bash
npm install unwrite-images
```

```typescript
// app/images/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import mountUnwriteImages from 'unwrite-images';

export default function ImagesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const disposeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // The package automatically loads WASM from CDN
      disposeRef.current = mountUnwriteImages(containerRef.current, {
        // Optional: specify CDN version
        version: '0.2.0',
      });
    }

    return () => {
      disposeRef.current?.();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
}
```

## Bundle Size Impact

| Method            | Initial Load | Total Size        | Notes                   |
| ----------------- | ------------ | ----------------- | ----------------------- |
| Direct CDN Import | ~40KB        | ~21MB (on-demand) | Smallest initial bundle |
| NPM Install       | ~40KB        | ~21MB (on-demand) | Type safety included    |
| Self-hosted       | ~21MB        | ~21MB             | Everything bundled      |

## Versioning Strategy

### Using Specific Versions

```javascript
// Locked to specific version (recommended for production)
import mountUnwriteImages from 'https://cdn.jsdelivr.net/npm/unwrite-images@0.2.0/dist/mount.js';
```

### Using Version Ranges

```javascript
// Latest 0.x version (auto-updates)
import mountUnwriteImages from 'https://cdn.jsdelivr.net/npm/unwrite-images@^0/dist/mount.js';
```

## Custom CDN Configuration

If you need to use a different CDN or self-host:

```javascript
const dispose = mountUnwriteImages(container, {
  cdnBase: 'https://your-cdn.com/unwrite-images',
  version: '0.2.0',
});
```

## Preloading for Better Performance

To improve initial load time, preload the main script:

```html
<link
  rel="modulepreload"
  href="https://cdn.jsdelivr.net/npm/unwrite-images@0.2.0/dist/mount.js"
/>
```

## CORS and Security

jsDelivr serves files with appropriate CORS headers, allowing cross-origin usage. The CDN also provides:

- HTTPS by default
- Global edge caching
- Automatic minification
- Brotli/gzip compression

## Troubleshooting

### Issue: Module not found on jsDelivr

**Solution**: Wait 1-2 minutes after npm publish for CDN propagation.

### Issue: WASM files not loading

**Solution**: Check browser console for CORS errors. Ensure the CDN URL is accessible.

### Issue: Version mismatch

**Solution**: Clear browser cache and verify the version in package.json matches CDN URL.

## Development Testing

To test CDN integration locally:

```bash
# Build for CDN
npm run build:cdn

# Serve locally (simulating CDN)
npx serve dist -p 8080 --cors

# In your app, point to local "CDN"
window.UNWRITE_IMAGES_CDN = 'http://localhost:8080';
```

## Next Steps

1. Push code to GitHub repository
2. Publish to npm: `npm publish`
3. Test CDN URL: `https://cdn.jsdelivr.net/npm/unwrite-images@0.2.0/dist/mount.js`
4. Integrate into Unwrite main app using Option 1 or 2 above
