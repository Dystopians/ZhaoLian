import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const story = readJson('content/story.zh-CN.json');
const evidence = readJson('content/evidence.zh-CN.json');
const claims = readJson('content/claims.zh-CN.json');
const sources = readJson('content/sources.json');
const glossary = readJson('content/glossary.zh-CN.json');
const timeline = readJson('content/timeline.zh-CN.json');
const assets = readJson('content/assets.json');

const allowedClasses = new Set(['D', 'T', 'L', 'C', 'R', 'U']);
const sourceIds = new Set(sources.map((source) => source.id));
const evidenceIds = new Set(evidence.map((record) => record.id));
const claimIds = new Set(claims.map((record) => record.id));
const sceneIds = new Set(story.scenes.map((scene) => scene.id));
const assetIds = new Set(assets.map((asset) => asset.id));

function fail(message) {
  throw new Error(message);
}

function assertUnique(records, label) {
  const ids = records.map((record) => record.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) fail(`Duplicate ${label} IDs: ${[...new Set(duplicates)].join(', ')}`);
}

assertUnique(evidence, 'evidence');
assertUnique(claims, 'claim');
assertUnique(sources, 'source');
assertUnique(glossary, 'glossary');
assertUnique(timeline, 'timeline');
assertUnique(assets, 'asset');

for (const sourceClass of ['D', 'T', 'L', 'C', 'R', 'U']) {
  if (!evidence.some((record) => record.sourceClass === sourceClass)) {
    fail(`Missing evidence source class ${sourceClass}`);
  }
}

for (const record of evidence) {
  if (!allowedClasses.has(record.sourceClass)) fail(`Invalid evidence class: ${record.id}`);
  if (!sceneIds.has(record.acquiredAtScene) && record.acquiredAtScene !== 'methodology') {
    fail(`Evidence ${record.id} references unknown scene ${record.acquiredAtScene}`);
  }
  for (const sourceId of record.sourceIds) {
    if (!sourceIds.has(sourceId))
      fail(`Evidence ${record.id} references missing source ${sourceId}`);
  }
  for (const claimId of record.claimIds) {
    if (!claimIds.has(claimId)) fail(`Evidence ${record.id} references missing claim ${claimId}`);
  }
  if (['C', 'R'].includes(record.sourceClass) && record.appendixEligible) {
    fail(`Evidence ${record.id} cannot be appendix eligible with class ${record.sourceClass}`);
  }
}

for (const claim of claims) {
  if (!allowedClasses.has(claim.sourceClass)) fail(`Invalid claim class: ${claim.id}`);
  for (const sourceId of claim.sourceIds) {
    if (!sourceIds.has(sourceId)) fail(`Claim ${claim.id} references missing source ${sourceId}`);
  }
  for (const evidenceId of claim.supportingEvidenceIds) {
    if (!evidenceIds.has(evidenceId))
      fail(`Claim ${claim.id} references missing evidence ${evidenceId}`);
  }
  for (const conflictId of claim.conflictingClaimIds) {
    if (!claimIds.has(conflictId))
      fail(`Claim ${claim.id} references missing conflict ${conflictId}`);
  }
  if (['C', 'R'].includes(claim.sourceClass) && claim.publicAppendixAllowed) {
    fail(`Claim ${claim.id} cannot enter public appendix as fact with class ${claim.sourceClass}`);
  }
}

for (const scene of story.scenes) {
  if (!scene.historicalClasses?.length) fail(`Scene ${scene.id} has no historical classes`);
  for (const sourceClass of scene.historicalClasses) {
    if (!allowedClasses.has(sourceClass))
      fail(`Scene ${scene.id} has invalid class ${sourceClass}`);
  }
  if (scene.visual && !assetIds.has(scene.visual))
    fail(`Scene ${scene.id} references missing asset ${scene.visual}`);
  for (const choice of scene.choices ?? []) {
    if (!choice.id || !choice.label) fail(`Scene ${scene.id} has malformed choice`);
    const referencedEvidence = [
      ...(choice.effects?.evidenceIds ?? []),
      ...(choice.response ?? []).flatMap((block) => block.evidenceIds ?? []),
    ];
    for (const evidenceId of referencedEvidence) {
      if (!evidenceIds.has(evidenceId))
        fail(`Choice ${choice.id} references missing evidence ${evidenceId}`);
    }
  }
}

const chapters = new Set(story.scenes.map((scene) => scene.chapter));
for (const chapter of [
  'CH00',
  'CH01',
  'CH02',
  'CH03',
  'CH04',
  'CH05',
  'CH06',
  'CH07',
  'CH08',
  'CH09',
  'CH10',
]) {
  if (!chapters.has(chapter)) fail(`Missing chapter ${chapter}`);
}

if (story.endings.length !== 4) fail('Exactly four endings are required.');
if (evidence.length < 35)
  fail('At least 35 evidence cards are required for this release candidate.');
if (claims.length < 25) fail('At least 25 claims are required for this release candidate.');
if (timeline.length < 20) fail('At least 20 timeline entries are required.');
if (glossary.length < 20) fail('At least 20 glossary entries are required.');

console.log('Content validation passed.');
