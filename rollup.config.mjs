/**
 * Copy of rollup.config.js adapted for Node ESM import from scripts.
 */
import * as path from 'path';
import { promises as fsp } from 'fs';
import del from 'del';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import OMT from '@surma/rollup-plugin-off-main-thread';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';

import simpleTS from './lib/simple-ts.js';
import clientBundlePlugin from './lib/client-bundle-plugin.js';
import nodeExternalPlugin from './lib/node-external-plugin.js';
import cssPlugin from './lib/css-plugin.js';
import urlPlugin from './lib/url-plugin.js';
import resolveDirsPlugin from './lib/resolve-dirs-plugin.js';
import runScript from './lib/run-script.js';
import emitFiles from './lib/emit-files-plugin.js';
import featurePlugin from './lib/feature-plugin.js';
import initialCssPlugin from './lib/initial-css-plugin.js';
import serviceWorkerPlugin from './lib/sw-plugin.js';
import dataURLPlugin from './lib/data-url-plugin.js';
import entryDataPlugin, { fileNameToURL } from './lib/entry-data-plugin.js';
import dedent from 'dedent';

function resolveFileUrl({ fileName }) {
  return JSON.stringify(fileNameToURL(fileName));
}

function resolveImportMetaUrlInStaticBuild(property, { moduleId }) {
  if (property !== 'url') return;
  throw new Error(dedent`
    Attempted to use a \`new URL(..., import.meta.url)\` pattern in ${path.relative(
      process.cwd(),
      moduleId,
    )} for URL that needs to end up in static HTML.
    This is currently unsupported.
  `);
}

const dir = '.tmp/build';
const staticPath = 'static/c/[name]-[hash][extname]';
const jsPath = staticPath.replace('[extname]', '.js');

function jsFileName(chunkInfo) {
  if (!chunkInfo.facadeModuleId) return jsPath;
  const parsedPath = path.parse(chunkInfo.facadeModuleId);
  if (parsedPath.name !== 'index') return jsPath;
  // Come up with a better name than 'index'
  const name = parsedPath.dir.split(/[\\/]/).pop();
  return jsPath.replace('[name]', name);
}

export default async function ({ watch }) {
  const omtLoaderPromise = fsp.readFile(
    path.join(process.cwd(), 'lib', 'omt.ejs'),
    'utf-8',
  );

  await del('.tmp/build');

  const isProduction = !watch;

  const tsPluginInstance = simpleTS('.', {
    watch,
  });
  const commonPlugins = () => [
    tsPluginInstance,
    resolveDirsPlugin([
      'src/static-build',
      'src/client',
      'src/shared',
      'src/features',
      'src/features-worker',
      'src/features-worker-worker-bridge',
      'src/sw',
      'src/worker-shared',
      'codecs',
    ]),
    urlPlugin(),
    dataURLPlugin(),
    cssPlugin(),
  ];

  const staticConfig = {
    input: 'src/static-build/index.tsx',
    output: {
      dir,
      format: 'cjs',
      assetFileNames: staticPath,
      exports: 'named',
      entryFileNames: 'static-build/index.cjs',
      chunkFileNames: 'static-build/[name]-[hash].cjs',
    },
    preserveEntrySignatures: false,
    watch: {
      clearScreen: false,
      exclude: ['**/*.ts', '**/*.tsx'],
      buildDelay: 250,
    },
    preserveModules: false,
    plugins: [
      { resolveFileUrl, resolveImportMeta: resolveImportMetaUrlInStaticBuild },
      clientBundlePlugin(
        {
          external: ['worker_threads'],
          plugins: [
            { resolveFileUrl },
            OMT({ loader: await omtLoaderPromise }),
            importMetaAssets(),
            serviceWorkerPlugin({
              output: 'static/serviceworker.js',
            }),
            ...commonPlugins(),
            commonjs(),
            resolve(),
            // Ensure client bundle defines __EMBEDDED__ for static build
            // so tokens in lazy client chunks (e.g., Compress) are replaced.
            replace({ __PRERENDER__: false, __PRODUCTION__: isProduction, __EMBEDDED__: false }),
            entryDataPlugin(),
            isProduction ? terser({ module: true }) : {},
          ],
          preserveEntrySignatures: false,
        },
        {
          dir,
          format: 'amd',
          chunkFileNames: jsFileName,
          entryFileNames: jsFileName,
          interop: false,
        },
        resolveFileUrl,
      ),
      ...commonPlugins(),
      emitFiles({ include: '**/*', root: path.join(process.cwd(), 'src', 'copy') }),
      nodeExternalPlugin(),
      featurePlugin(),
      replace({ __PRERENDER__: true, __PRODUCTION__: isProduction, __EMBEDDED__: false }),
      initialCssPlugin(),
      runScript(dir + '/static-build/index.cjs'),
    ],
  };

  const wrapperConfig = {
    input: 'src/client/wrapper/mount.tsx',
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: 'mount.js',
      chunkFileNames: 'chunks/[name]-[hash].js',
      assetFileNames: 'assets/[name]-[hash][extname]',
      sourcemap: isProduction,
    },
    // Preserve entry exports (e.g., default) for library consumers
    preserveEntrySignatures: 'strict',
    plugins: [
      alias({
        entries: [
          {
            find: 'client/lazy-app/sw-bridge',
            replacement: 'client/wrapper/stubs/sw-bridge',
          },
          {
            // Match relative imports ending in sw-bridge and replace the whole id
            find: /^(?:.*\/)?sw-bridge$/,
            replacement: 'client/wrapper/stubs/sw-bridge',
          },
        ],
      }),
      OMT({ loader: await omtLoaderPromise, silenceESMWorkerWarning: true }),
      importMetaAssets(),
      tsPluginInstance,
      resolveDirsPlugin([
        'src/static-build',
        'src/client',
        'src/shared',
        'src/features',
        'src/features-worker',
        'src/features-worker-worker-bridge',
        'src/sw',
        'src/worker-shared',
        'codecs',
      ]),
      urlPlugin(),
      dataURLPlugin(),
      cssPlugin(),
      commonjs(),
      resolve(),
      replace({ __PRERENDER__: false, __PRODUCTION__: isProduction, __EMBEDDED__: true }),
    ],
  };

  return [staticConfig, wrapperConfig];
}
