import type { SettingsState } from '../types/content';

export class AudioController {
  private settings: SettingsState;

  constructor(settings: SettingsState) {
    this.settings = settings;
  }

  update(settings: SettingsState): void {
    this.settings = settings;
  }

  captionFor(cueId: string | undefined): string | null {
    if (!cueId || !this.settings.captionsForSound) return null;
    const captions: Record<string, string> = {
      SFX_SILENCE_FADE: '[环境声自然淡到近静]',
      SFX_RADIO_STATIC: '[收音机里传来断续的投降消息]',
      SFX_THREE_KNOCKS: '[门响了三次]',
      AMB_RAIN_DAY: '[雨落在屋檐和酒厂门边]',
      AMB_NIGHT_INSECTS: '[夜虫声和室内低声]',
      AMB_DAWN: '[清晨声响慢慢出现]',
      AMB_ROOM_FAN: '[风扇低低转动]',
    };
    return captions[cueId] ?? null;
  }

  isAudible(): boolean {
    return this.settings.masterVolume > 0;
  }
}
