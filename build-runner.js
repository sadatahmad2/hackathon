process.env.NODE_OPTIONS = '';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.CI = '1';
if (process.stdin) {
  process.stdin.isTTY = false;
  process.stdin.setRawMode = () => {};
}
process.argv = ['node', 'next', 'build'];
require('./node_modules/next/dist/bin/next');
