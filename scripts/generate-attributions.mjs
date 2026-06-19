import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const assets = JSON.parse(fs.readFileSync(path.join(root, 'content/assets.json'), 'utf8'));
const deps = { ...pkg.dependencies, ...pkg.devDependencies };
const report = {
  generatedBy: 'scripts/generate-attributions.mjs',
  generatedAt: new Date().toISOString(),
  software: Object.entries(deps).map(([name, version]) => ({
    name,
    version,
    license: 'See package distribution metadata in node_modules or registry.',
  })),
  assets: assets.map((asset) => ({
    id: asset.id,
    filePath: asset.filePath,
    creator: asset.creator,
    license: asset.license,
    attributionText: asset.attributionText,
    reviewStatus: asset.reviewStatus,
  })),
};

const outDir = path.join(root, 'dist/reports');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'attributions.json'), JSON.stringify(report, null, 2));
console.log('Generated attribution report at dist/reports/attributions.json');
