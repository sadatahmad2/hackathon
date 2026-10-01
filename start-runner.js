process.env.NODE_OPTIONS = '';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.CI = '1';
if (process.stdin) {
  process.stdin.isTTY = false;
  process.stdin.setRawMode = () => {};
}
process.argv = ['node', 'next', 'start', '--port', '3000', '--hostname', '0.0.0.0'];
require('./node_modules/next/dist/bin/next');
