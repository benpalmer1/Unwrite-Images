import { spawn } from 'child_process';
import path from 'path';

const port = process.env.DEV_PORT || '5000';

const bin = path.join(
  process.cwd(),
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'serve.cmd' : 'serve',
);

const args = ['--listen', String(port), '--config', 'serve.json', '.tmp/build/static'];

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
