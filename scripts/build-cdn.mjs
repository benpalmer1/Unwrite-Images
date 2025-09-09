#!/usr/bin/env node

/**
 * Build script for CDN distribution
 * This creates an optimized build for serving via jsDelivr
 */

import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

async function exec(cmd, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { 
      stdio: 'inherit', 
      shell: process.platform === 'win32',
      cwd: rootDir 
    });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed with code ${code}`));
    });
  });
}

async function buildForCDN() {
  console.log('🚀 Building Unwrite Images for CDN distribution...\n');
  
  // Step 1: Clean previous builds
  console.log('📦 Cleaning previous builds...');
  try {
    await fs.rm(path.join(rootDir, 'dist'), { recursive: true, force: true });
    await fs.rm(path.join(rootDir, '.tmp'), { recursive: true, force: true });
  } catch (e) {
    // Ignore if directories don't exist
  }
  
  // Step 2: Run production build
  console.log('🔨 Running production build...');
  await exec('npm', ['run', 'build']);
  
  // Step 3: Create CDN manifest
  console.log('📝 Creating CDN manifest...');
  const pkg = JSON.parse(await fs.readFile(path.join(rootDir, 'package.json'), 'utf8'));
  
  const manifest = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    cdn: {
      jsdelivr: `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/dist/`,
      unpkg: `https://unpkg.com/${pkg.name}@${pkg.version}/dist/`
    },
    files: {
      main: 'mount.js',
      wasm: 'chunks/codecs/',
      assets: 'assets/'
    }
  };
  
  await fs.writeFile(
    path.join(rootDir, 'dist', 'cdn-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  // Step 4: Calculate sizes
  console.log('\n📊 Build Statistics:');
  const distPath = path.join(rootDir, 'dist');
  const stats = await getDirectorySize(distPath);
  
  console.log(`  Total Size: ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  File Count: ${stats.fileCount}`);
  console.log(`  WASM Files: ${stats.wasmCount}`);
  
  // Step 5: Generate usage example
  console.log('\n✅ Build complete! CDN URLs will be available at:');
  console.log(`  jsDelivr: https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/dist/`);
  console.log(`  unpkg:    https://unpkg.com/${pkg.name}@${pkg.version}/dist/`);
  
  console.log('\n📚 Usage example:');
  console.log(`
import mountUnwriteImages from 'https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/dist/mount.js';

// Or if using npm:
// import mountUnwriteImages from '${pkg.name}';

const container = document.getElementById('image-editor');
const dispose = mountUnwriteImages(container, {
  theme: 'inherit',
  // CDN is automatically configured when loading from jsDelivr
});
`);
}

async function getDirectorySize(dir) {
  let totalSize = 0;
  let fileCount = 0;
  let wasmCount = 0;
  
  async function walkDir(currentPath) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      
      if (entry.isDirectory()) {
        await walkDir(fullPath);
      } else {
        const stats = await fs.stat(fullPath);
        totalSize += stats.size;
        fileCount++;
        
        if (entry.name.endsWith('.wasm')) {
          wasmCount++;
        }
      }
    }
  }
  
  await walkDir(dir);
  return { totalSize, fileCount, wasmCount };
}

// Run the build
buildForCDN().catch(console.error);