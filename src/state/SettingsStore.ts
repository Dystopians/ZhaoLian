import { defaultSettings } from './initialState';
import type { SettingsState } from '../types/content';

const SETTINGS_KEY = 'zhao-lian-settings';

export class SettingsStore {
  load(): SettingsState {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...defaultSettings };
    try {
      const parsed = JSON.parse(raw) as Partial<SettingsState>;
      return { ...defaultSettings, ...parsed, version: defaultSettings.version };
    } catch {
      return { ...defaultSettings };
    }
  }

  save(settings: SettingsState): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  reset(): SettingsState {
    const settings = { ...defaultSettings };
    this.save(settings);
    return settings;
  }
}
