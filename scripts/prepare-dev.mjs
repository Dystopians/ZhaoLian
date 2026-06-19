import { spawnSync } from 'node:child_process';

for (const script of ['scripts/compile-ink.mjs', 'scripts/validate-content.mjs']) {
  const result = spawnSync(process.execPath, [script], { stdio: 'inherit' });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
