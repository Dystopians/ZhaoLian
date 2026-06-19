import type { SourceClass } from '../types/content';

export type RoutedTag =
  | { type: 'scene'; value: string }
  | { type: 'chapter'; value: string }
  | { type: 'class'; value: SourceClass[] }
  | { type: 'evidence'; value: string }
  | { type: 'claim'; value: string }
  | { type: 'ui'; value: string }
  | { type: 'locked'; value: string };

const allowed = new Set(['scene', 'chapter', 'class', 'evidence', 'claim', 'ui', 'locked']);

export function routeTag(rawTag: string): RoutedTag {
  const [name, rawValue] = rawTag.split(':', 2);
  if (!name || !rawValue || !allowed.has(name)) {
    throw new Error(`Unknown or malformed ink tag: ${rawTag}`);
  }

  if (name === 'class') {
    const classes = rawValue.split(',') as SourceClass[];
    for (const sourceClass of classes) {
      if (!['D', 'T', 'L', 'C', 'R', 'U'].includes(sourceClass)) {
        throw new Error(`Unknown source class in tag: ${rawTag}`);
      }
    }
    return { type: 'class', value: classes };
  }

  return { type: name as Exclude<RoutedTag['type'], 'class'>, value: rawValue };
}
