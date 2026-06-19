import { storyContent } from '../content/content';
import { evaluateEnding } from './EndingEvaluator';
import type { EndingId, GameState, ReportDraft, ReportField, ReportOption } from '../types/content';

export interface ReportResult {
  draft: ReportDraft;
  warnings: string[];
  text: string;
  endingId: EndingId;
}

export function findReportOption(field: ReportField, optionId: string): ReportOption {
  const option = field.options.find((candidate) => candidate.id === optionId);
  if (!option) {
    throw new Error(`Unknown report option "${optionId}" for field "${field.id}"`);
  }
  return option;
}

export function collectReportWarnings(draft: ReportDraft): string[] {
  const warnings: string[] = [];
  for (const field of storyContent.reportFields) {
    const option = findReportOption(field, draft[field.id]);
    warnings.push(`${field.legend}：${option.warning}`);
  }

  if (draft.deathDate !== 'unknown' && draft.method !== 'unknown') {
    warnings.push('日期和方式都选择了精确说法；导出文本必须保留冲突提示。');
  }

  if (draft.status === 'missing' && (draft.deathDate !== 'unknown' || draft.method !== 'unknown')) {
    warnings.push('状态写作失踪时，不应同时把死亡细节写成无条件事实。');
  }

  return warnings;
}

export function optionLabel(fieldId: keyof ReportDraft, optionId: string): string {
  const field = storyContent.reportFields.find((candidate) => candidate.id === fieldId);
  if (!field) {
    throw new Error(`Unknown report field: ${fieldId}`);
  }
  return findReportOption(field, optionId).label;
}

export function buildReportText(draft: ReportDraft): string {
  const name = optionLabel('name', draft.name);
  const status = optionLabel('status', draft.status);
  const deathDate = optionLabel('deathDate', draft.deathDate);
  const method = optionLabel('method', draft.method);
  const remains = optionLabel('remains', draft.remains);

  return [
    `${name}，最后可确认出现为1945年8月29日晚离家。`,
    `状态：${status}。`,
    `死亡日期：${deathDate}；死亡方式：${method}；遗骸：${remains}。`,
    '现有材料强烈指向日本宪兵责任；具体操作细节仍按材料簇和未决项呈现。',
  ].join('\n');
}

export function buildReportResult(state: GameState, draft: ReportDraft): ReportResult {
  const warnings = collectReportWarnings(draft);
  const endingId = evaluateEnding({
    editorial: state.editorial,
    evidenceIds: state.evidenceIds,
    flags: state.flags,
    questionQuality: state.questionQuality,
    reportDraft: draft,
  });

  return {
    draft,
    warnings,
    text: buildReportText(draft),
    endingId,
  };
}
