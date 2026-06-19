import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const story = JSON.parse(fs.readFileSync(path.join(root, 'content/story.zh-CN.json'), 'utf8'));
const narrativeDir = path.join(root, 'narrative');
const expected = [
  'main.ink',
  'globals.ink',
  'functions.ink',
  'endings.ink',
  'chapters/ch00_archive.ink',
  'chapters/ch01_zhao_boss.ink',
  'chapters/ch02_translator.ink',
  'chapters/ch03_dream.ink',
  'chapters/ch04_yu_sensei.ink',
  'chapters/ch05_surrender.ink',
  'chapters/ch06_departure.ink',
  'chapters/ch07_morning.ink',
  'chapters/ch08_interviews.ink',
  'chapters/ch09_two_dates.ink',
  'chapters/ch10_report.ink',
];

const missing = expected.filter((file) => !fs.existsSync(path.join(narrativeDir, file)));
if (missing.length) {
  throw new Error(`Missing ink source files: ${missing.join(', ')}`);
}

const allInk = expected
  .map((file) => `\n===== ${file} =====\n${fs.readFileSync(path.join(narrativeDir, file), 'utf8')}`)
  .join('\n');

for (const locked of story.lockedLines) {
  if (!allInk.includes(`# locked:${locked.id}`) || !allInk.includes(locked.text)) {
    throw new Error(`Locked line not represented in ink source: ${locked.id}`);
  }
}

for (const scene of story.scenes) {
  if (!allInk.includes(`# scene:${scene.id}`)) {
    throw new Error(`Scene tag missing from ink source: ${scene.id}`);
  }
}

for (const evidence of new Set(
  story.scenes.flatMap((scene) => [
    ...(scene.entry ?? []).flatMap((block) => block.evidenceIds ?? []),
    ...(scene.choices ?? []).flatMap((choice) => [
      ...(choice.effects?.evidenceIds ?? []),
      ...(choice.response ?? []).flatMap((block) => block.evidenceIds ?? []),
    ]),
    ...(scene.completion ?? []).flatMap((block) => block.evidenceIds ?? []),
  ]),
)) {
  if (!allInk.includes(`# evidence:${evidence}`) && !allInk.includes(evidence)) {
    throw new Error(`Evidence ${evidence} appears in story data but not ink source notes.`);
  }
}

const outDir = path.join(root, 'generated');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'narrative-manifest.json'),
  JSON.stringify(
    {
      generatedBy: 'scripts/compile-ink.mjs',
      generatedAt: new Date().toISOString(),
      contentVersion: story.contentVersion,
      scenes: story.scenes.map((scene) => ({
        id: scene.id,
        chapter: scene.chapter,
        mode: scene.mode,
        classes: scene.historicalClasses,
      })),
      lockedLines: story.lockedLines.map((line) => line.id),
    },
    null,
    2,
  ),
);

console.log(`Validated ${expected.length} ink source files and generated narrative manifest.`);
