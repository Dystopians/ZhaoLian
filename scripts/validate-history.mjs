import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const filesToScan = [
  'content/story.zh-CN.json',
  'content/evidence.zh-CN.json',
  'content/claims.zh-CN.json',
  ...fs
    .readdirSync(path.join(root, 'narrative/chapters'))
    .filter((file) => file.endsWith('.ink'))
    .map((file) => `narrative/chapters/${file}`),
  'narrative/endings.ink',
];

const prohibited = [
  '真结局',
  '成功营救',
  '你救下',
  '救下郁达夫',
  '游戏结束：失败',
  '尸体被发现',
  '墓址为',
  '遗言',
  '最后的想法',
  '跟上汽车',
  '阻止他出门',
  '重开时间线',
  '隐藏存活',
  '死亡真相百分比',
  'lorem ipsum',
  'coming soon',
];

const allowedExecutionContext =
  /死亡方式|枪杀|绞杀|扼杀|禁止|不展示|不能视觉化|早期流传簇|后来调查簇/;
const executionWords = ['处决现场', '行刑现场', '勒颈声', '枪声响起', '尸体'];

for (const file of filesToScan) {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  for (const phrase of prohibited) {
    if (text.toLowerCase().includes(phrase.toLowerCase())) {
      throw new Error(`Prohibited phrase "${phrase}" found in ${file}`);
    }
  }
  for (const word of executionWords) {
    if (text.includes(word) && !allowedExecutionContext.test(text)) {
      throw new Error(`Execution/death staging phrase "${word}" found in ${file}`);
    }
  }
}

const story = JSON.parse(fs.readFileSync(path.join(root, 'content/story.zh-CN.json'), 'utf8'));
const ch06Texts = story.scenes
  .filter((scene) => scene.chapter === 'CH06')
  .flatMap((scene) => [
    ...(scene.choices ?? []).map((choice) => choice.label),
    ...(scene.entry ?? []).map((block) => block.text),
  ])
  .join('\n');
for (const forbiddenChoice of ['阻止', '尾随', '跟随', '战斗', '逃生', '救']) {
  const badChoice = story.scenes
    .filter((scene) => scene.chapter === 'CH06')
    .flatMap((scene) => scene.choices ?? [])
    .find((choice) => choice.label.includes(forbiddenChoice));
  if (badChoice) {
    throw new Error(`Forbidden CH06 choice ${badChoice.id}: ${badChoice.label}`);
  }
}
if (!ch06Texts.includes('没有阻止、警告、尾随、战斗或重开时间的选择')) {
  throw new Error('CH06 must explicitly state the no-rescue control boundary.');
}

console.log('Historical content lint passed.');
