import type { SettingsState } from '../types/content';
import type { MusicTrackDefinition } from '../content/mediaAssets';

const MUSIC_FADE_MS = 1200;
const MUSIC_FADE_STEP_MS = 50;

interface FadeState {
  timer: number;
  resolve: () => void;
}

export class AudioController {
  private settings: SettingsState;
  private readonly elements = new Map<string, HTMLAudioElement>();
  private readonly fades = new Map<string, FadeState>();
  private activeTrackId: string | null = null;

  constructor(settings: SettingsState) {
    this.settings = settings;
  }

  update(settings: SettingsState): void {
    this.settings = settings;
    for (const [trackId, element] of this.elements) {
      if (this.activeTrackId === trackId && !element.paused) {
        void this.fadeTo(trackId, element, this.effectiveVolume(trackId), MUSIC_FADE_MS / 2);
      } else {
        element.volume = this.effectiveVolume(trackId);
      }
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

  async syncLoop(track: MusicTrackDefinition): Promise<'playing' | 'unchanged' | 'muted'> {
    if (!this.isAudible() || this.settings.ambienceVolume <= 0) {
      await this.pauseActiveTrack();
      return 'muted';
    }

    if (this.activeTrackId === track.id && this.isPlaying(track.id)) {
      return 'unchanged';
    }

    await this.playLoop(track);
    return 'playing';
  }

  async toggleLoop(track: MusicTrackDefinition): Promise<'playing' | 'paused' | 'muted'> {
    if (!this.isAudible() || this.settings.ambienceVolume <= 0) {
      return 'muted';
    }

    if (this.isPlaying(track.id)) {
      await this.pauseTrack(track.id);
      return 'paused';
    }

    await this.playLoop(track);
    return 'playing';
  }

  stopAll(): void {
    const trackIds = Array.from(this.elements.keys());
    this.activeTrackId = null;
    for (const trackId of trackIds) {
      void this.pauseTrack(trackId);
    }
  }

  private async playLoop(track: MusicTrackDefinition): Promise<void> {
    const element = this.elementFor(track);
    const previousTrackId =
      this.activeTrackId && this.activeTrackId !== track.id ? this.activeTrackId : null;
    const previousElement = previousTrackId ? this.elements.get(previousTrackId) : undefined;

    this.clearFade(track.id);
    if (element.paused) {
      element.volume = 0;
    }

    await element.play();
    this.activeTrackId = track.id;

    const fades: Promise<void>[] = [
      this.fadeTo(track.id, element, this.effectiveVolume(track.id), MUSIC_FADE_MS),
    ];
    if (previousTrackId && previousElement && !previousElement.paused) {
      fades.push(this.fadeOutAndPause(previousTrackId, previousElement));
    }
    await Promise.all(fades);
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

  private async pauseActiveTrack(): Promise<void> {
    if (!this.activeTrackId) return;
    await this.pauseTrack(this.activeTrackId);
  }

  private async pauseTrack(trackId: string): Promise<void> {
    const element = this.elements.get(trackId);
    if (!element) return;
    if (this.activeTrackId === trackId) {
      this.activeTrackId = null;
    }
    if (element.paused) {
      this.clearFade(trackId);
      element.volume = 0;
      return;
    }
    await this.fadeOutAndPause(trackId, element);
  }

  private async fadeOutAndPause(trackId: string, element: HTMLAudioElement): Promise<void> {
    await this.fadeTo(trackId, element, 0, MUSIC_FADE_MS);
    element.pause();
  }

  private fadeTo(
    trackId: string,
    element: HTMLAudioElement,
    targetVolume: number,
    durationMs: number,
  ): Promise<void> {
    this.clearFade(trackId);

    const target = Math.max(0, Math.min(1, targetVolume));
    const start = element.volume;
    if (durationMs <= 0 || Math.abs(start - target) < 0.001) {
      element.volume = target;
      return Promise.resolve();
    }

    const startedAt = Date.now();
    return new Promise((resolve) => {
      const finish = () => {
        window.clearInterval(timer);
        this.fades.delete(trackId);
        element.volume = target;
        resolve();
      };
      const tick = () => {
        const elapsed = Date.now() - startedAt;
        const progress = Math.min(1, elapsed / durationMs);
        element.volume = start + (target - start) * progress;
        if (progress >= 1) finish();
      };
      const timer = window.setInterval(tick, MUSIC_FADE_STEP_MS);
      this.fades.set(trackId, { timer, resolve });
      tick();
    });
  }

  private clearFade(trackId: string): void {
    const fade = this.fades.get(trackId);
    if (!fade) return;
    window.clearInterval(fade.timer);
    this.fades.delete(trackId);
    fade.resolve();
  }

  private effectiveVolume(trackId: string): number {
    const channelVolume = trackId.startsWith('MUSIC_')
      ? this.settings.ambienceVolume
      : this.settings.effectsVolume;
    return Math.max(0, Math.min(1, this.settings.masterVolume * channelVolume));
  }
}
