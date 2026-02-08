import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';
import net from 'net';

function loadEnvFiles() {
  const root = process.cwd();
  for (const filename of ['.env', '.env.local']) {
    const filePath = path.join(root, filename);
    if (!fs.existsSync(filePath)) continue;
    const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIndex = line.indexOf('=');
      if (eqIndex === -1) continue;
      const key = line.slice(0, eqIndex).trim();
      if (!key || Object.prototype.hasOwnProperty.call(process.env, key)) continue;
      let value = line.slice(eqIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

loadEnvFiles();

// Default the port if not provided
async function findFreePort(startPort) {
  let port = Number(startPort) || 5847;
  for (let i = 0; i < 50; i++) {
    // eslint-disable-next-line no-await-in-loop
    const free = await new Promise((resolve) => {
      const srv = net.createServer();
      srv.once('error', () => {
        resolve(false);
      });
      srv.listen(port, () => {
        srv.close(() => resolve(true));
      });
    });
    if (free) return String(port);
    port += 1;
  }
  return String(startPort || 5847);
}

if (!process.env.DEV_PORT) {
  // Pick a free port starting at 5847 (random port to avoid conflicts with other common dev servers)
  const p = await findFreePort(5847);
  process.env.DEV_PORT = p;
}

const procs = [];

function spawnProc(command, args, options = {}) {
  const child = spawn(command, args, { stdio: 'inherit', shell: process.platform === 'win32', ...options });
  procs.push(child);
  child.on('exit', (code) => {
    // If one child exits with non-zero, shut down others and exit
    if (code && code !== 0) {
      shutdown(code);
    }
  });
  return child;
}

function shutdown(code = 0) {
  for (const p of procs) {
    try { p.kill('SIGTERM'); } catch {}
  }
  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

// Run rollup watcher via our wrapper to avoid CLI exit bug
const rollupWatchScript = path.join('scripts', 'rollup-watch.mjs');
const nodeCmdWatch = process.platform === 'win32' ? 'node' : process.execPath;
spawnProc(nodeCmdWatch, [rollupWatchScript]);

// Run local static server for the build folder (full app)
const buildRoot = path.join(process.cwd(), 'build');
if (!fs.existsSync(buildRoot)) {
  console.error('Dev server: no build output found. Run "npm run build" first.');
  shutdown(1);
}

const bin = path.join(
  process.cwd(),
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'serve.cmd' : 'serve',
);

const port = process.env.DEV_PORT || '5847';
const args = ['--listen', String(port), '--config', 'serve.json', '--cors', buildRoot];

spawnProc(bin, args);
