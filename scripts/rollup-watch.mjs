import { watch as rollupWatch } from 'rollup';
import configFactory from '../rollup.config.mjs';

const configs = await configFactory({ watch: true });

const watcher = rollupWatch(configs);

watcher.on('event', (event) => {
  switch (event.code) {
    case 'BUNDLE_START':
      console.log('Rollup: bundle start', event.input);
      break;
    case 'BUNDLE_END':
      console.log('Rollup: bundle finished in', event.duration, 'ms');
      break;
    case 'ERROR':
      console.error('Rollup error:', event.error?.stack || event.error);
      // Do not set a non-numeric exit code; keep watching.
      break;
    case 'END':
      // Finished an iteration; continue watching
      break;
  }
});
