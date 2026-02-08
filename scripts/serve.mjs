import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

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

const port = process.env.DEV_PORT || '5847';

const bin = path.join(
  process.cwd(),
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'serve.cmd' : 'serve',
);

const distRoot = path.join(process.cwd(), 'dist');
const staticRoot = path.join(process.cwd(), '.tmp', 'build', 'static');
const serveRoot = fs.existsSync(distRoot) ? distRoot : staticRoot;

if (!fs.existsSync(serveRoot)) {
  console.error('Dev server: no build output found. Run "npm run build" or "npm run dev" to generate dist.');
  process.exit(1);
}

const args = ['--listen', String(port), '--config', 'serve.json', '--cors', serveRoot];

const child = spawn(bin, args, { stdio: 'inherit', shell: process.platform === 'win32' });

const shutdown = () => {
  try {
    child.kill('SIGTERM');
  } catch {}
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

child.on('exit', (code, signal) => {
  if (signal) {
    process.exit(0);
  }
  process.exit(code ?? 0);
});
