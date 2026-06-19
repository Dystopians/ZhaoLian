import type { SettingsState } from '../types/content';
import type { MusicTrackDefinition } from '../content/mediaAssets';

export class AudioController {
  private settings: SettingsState;
  private readonly elements = new Map<string, HTMLAudioElement>();
  private activeTrackId: string | null = null;

  constructor(settings: SettingsState) {
    this.settings = settings;
  }

  update(settings: SettingsState): void {
    this.settings = settings;
    for (const [trackId, element] of this.elements) {
      element.volume = this.effectiveVolume(trackId);
    }
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

  isPlaying(trackId: string): boolean {
    const element = this.elements.get(trackId);
    return Boolean(element && !element.paused);
  }

  async toggleLoop(track: MusicTrackDefinition): Promise<'playing' | 'paused' | 'muted'> {
    if (!this.isAudible() || this.settings.ambienceVolume <= 0) {
      return 'muted';
    }

    const element = this.elementFor(track);
    if (this.isPlaying(track.id)) {
      element.pause();
      this.activeTrackId = null;
      return 'paused';
    }

    this.pauseActiveTrack();
    element.volume = this.effectiveVolume(track.id);
    await element.play();
    this.activeTrackId = track.id;
    return 'playing';
  }

  stopAll(): void {
    for (const element of this.elements.values()) {
      element.pause();
    }
    this.activeTrackId = null;
  }

  private elementFor(track: MusicTrackDefinition): HTMLAudioElement {
    const existing = this.elements.get(track.id);
    if (existing) return existing;

    const element = new Audio(track.url);
    element.loop = true;
    element.preload = 'none';
    element.volume = this.effectiveVolume(track.id);
    element.addEventListener('ended', () => {
      if (this.activeTrackId === track.id) this.activeTrackId = null;
    });
    this.elements.set(track.id, element);
    return element;
  }

  private pauseActiveTrack(): void {
    if (!this.activeTrackId) return;
    this.elements.get(this.activeTrackId)?.pause();
    this.activeTrackId = null;
  }

  private effectiveVolume(trackId: string): number {
    const channelVolume = trackId.startsWith('MUSIC_')
      ? this.settings.ambienceVolume
      : this.settings.effectsVolume;
    return Math.max(0, Math.min(1, this.settings.masterVolume * channelVolume));
  }
}
