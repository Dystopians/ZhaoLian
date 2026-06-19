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
let initialGzip = 0;
let lazyMediaGzip = 0;
let jsGzip = 0;
let cssGzip = 0;
const lazyMediaExtensions = new Set(['.mp3', '.ogg', '.webp']);
const criticalMediaPattern = /(map-western-pacific|scene-archive-desk)/;
for (const file of files) {
  const buffer = fs.readFileSync(file);
  const gzipSize = zlib.gzipSync(buffer).byteLength;
  const basename = path.basename(file);
  const extension = path.extname(file);
  const isMedia = lazyMediaExtensions.has(extension);
  const isCriticalMedia = criticalMediaPattern.test(basename);
  if (!isMedia || isCriticalMedia) {
    initialGzip += gzipSize;
  } else {
    lazyMediaGzip += gzipSize;
  }
  if (file.endsWith('.js')) jsGzip += gzipSize;
  if (file.endsWith('.css')) cssGzip += gzipSize;
}

const limits = {
  initialGzip: 1_500_000,
  lazyMediaGzip: 12_000_000,
  jsGzip: 400_000,
  cssGzip: 80_000,
};

if (initialGzip > limits.initialGzip)
  throw new Error(`Initial compressed transfer too large: ${initialGzip}`);
if (lazyMediaGzip > limits.lazyMediaGzip)
  throw new Error(`Lazy media compressed transfer too large: ${lazyMediaGzip}`);
if (jsGzip > limits.jsGzip) throw new Error(`Compressed JS too large: ${jsGzip}`);
if (cssGzip > limits.cssGzip) throw new Error(`Compressed CSS too large: ${cssGzip}`);

fs.mkdirSync(path.join(root, 'dist/reports'), { recursive: true });
fs.writeFileSync(
  path.join(root, 'dist/reports/performance-budget.json'),
  JSON.stringify({ initialGzip, lazyMediaGzip, jsGzip, cssGzip, limits }, null, 2),
);
console.log(
  `Performance budget passed: initial=${initialGzip}, lazyMedia=${lazyMediaGzip}, js=${jsGzip}, css=${cssGzip}`,
);
