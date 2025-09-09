import { spawn } from 'child_process';
import path from 'path';
import net from 'net';

// Default the port if not provided
async function findFreePort(startPort) {
  let port = Number(startPort) || 5000;
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
  return String(startPort || 5000);
}

if (!process.env.DEV_PORT) {
  // Pick a free port starting at 5000
  const p = await findFreePort(5000);
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

// Run local static server with configured/default port
const serveScript = path.join('scripts', 'serve.mjs');
const nodeCmd = process.platform === 'win32' ? 'node' : process.execPath;
spawnProc(nodeCmd, [serveScript]);
