const { spawn } = require('child_process');
const fs = require('fs');
const out = fs.openSync('./out.log', 'a');
const err = fs.openSync('./out.log', 'a');
const child = spawn('node', ['./node_modules/next/dist/bin/next', 'dev'], {
  detached: true,
  stdio: ['ignore', out, err],
  env: { ...process.env, CI: '1', NEXT_TELEMETRY_DISABLED: '1', NODE_OPTIONS: '' }
});
child.unref();
console.log('Started process', child.pid);
