import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const root = process.cwd();
const dist = path.join(root, 'dist');
if (!fs.existsSync(dist)) {
  throw new Error('dist/ does not exist; run build first.');
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const files = walk(dist);
let totalGzip = 0;
let jsGzip = 0;
let cssGzip = 0;
for (const file of files) {
  const buffer = fs.readFileSync(file);
  const gzipSize = zlib.gzipSync(buffer).byteLength;
  totalGzip += gzipSize;
  if (file.endsWith('.js')) jsGzip += gzipSize;
  if (file.endsWith('.css')) cssGzip += gzipSize;
}

const limits = {
  totalGzip: 1_500_000,
  jsGzip: 400_000,
  cssGzip: 80_000,
};

if (totalGzip > limits.totalGzip) throw new Error(`Compressed transfer too large: ${totalGzip}`);
if (jsGzip > limits.jsGzip) throw new Error(`Compressed JS too large: ${jsGzip}`);
if (cssGzip > limits.cssGzip) throw new Error(`Compressed CSS too large: ${cssGzip}`);

fs.mkdirSync(path.join(root, 'dist/reports'), { recursive: true });
fs.writeFileSync(
  path.join(root, 'dist/reports/performance-budget.json'),
  JSON.stringify({ totalGzip, jsGzip, cssGzip, limits }, null, 2),
);
console.log(`Performance budget passed: total=${totalGzip}, js=${jsGzip}, css=${cssGzip}`);
