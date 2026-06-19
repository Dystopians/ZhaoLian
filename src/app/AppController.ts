import { AudioController } from '../audio/AudioController';
import {
  assetRecords,
  claimRecords,
  creditsContent,
  evidenceRecords,
  getEnding,
  getScene,
  glossaryEntries,
  sourceClassLabels,
  sourceRecords,
  storyContent,
  timelineEntries,
} from '../content/content';
import { ClaimGraph } from '../evidence/ClaimGraph';
import { EvidenceStore } from '../evidence/EvidenceStore';
import { StoryEngine } from '../engine/StoryEngine';
import {
  contextVisualAssetIds,
  endingMusicTrack,
  getVisualAsset,
  musicTrackForScene,
  resolveSceneVisualId,
  visualAssetForEnding,
  type MusicTrackDefinition,
  type VisualAssetDefinition,
} from '../content/mediaAssets';
import { buildReportResult } from '../report/ReportBuilder';
import { SaveRepository } from '../save/SaveRepository';
import { decodeSave } from '../save/SaveCodec';
import { SettingsStore } from '../state/SettingsStore';
import { createInitialGameState, defaultReportDraft } from '../state/initialState';
import type {
  AssetRecord,
  ClaimRecord,
  GameState,
  EndingId,
  ReportDraft,
  SettingsState,
  SourceClass,
  StoryChoice,
  TextBlock,
} from '../types/content';
import { button, clearAndAppend, el, fieldLabel } from './dom';

type ViewName = 'title' | 'game' | 'dossier' | 'settings' | 'methodology' | 'credits';
type DossierTab = 'evidence' | 'claims' | 'timeline' | 'sources' | 'glossary';

interface EndingCodaContent {
  heading: string;
  riverLine: string;
  note: string;
  echoes: string[];
  yuExcerpt: string;
  yuSource: string;
  yuNote: string;
}

const endingCodaContent: Record<EndingId, EndingCodaContent> = {
  monument: {
    heading: '碑面与水面',
    riverLine: '一句话立起来，另一条时间从碑后流过。',
    note: '这个结局让名字更容易被共同记住，也让争议字段更容易被压低。',
    echoes: [
      '碑面需要清晰，水面仍在动。',
      '门外的夜被读成一句完整的话。',
      '你把责任举高，也把空白折进阴影。',
      '被刻下的句子仍要允许脚注站在旁边。',
      '纪念不该要求空白沉默。',
    ],
    yuExcerpt: '“清，静，悲凉。”',
    yuSource: '郁达夫《故都的秋》短引。',
    yuNote: '这句秋意给碑面以冷光：清晰不是圆满，静也不是终止。',
  },
  case_file: {
    heading: '案卷与河床',
    riverLine: '纸页压住水声，但压不住水向前走。',
    note: '这个结局把可确认、可怀疑和不能补写的部分并置起来。',
    echoes: [
      '报告桌、夜门、黎明窗同时在一页纸上。',
      '案卷不是终点；案卷是边界。',
      '编号让材料可复核，不让材料变成谜底。',
      '每一次编号都提醒你：可查不等于可替代。',
      '河床露出来时，水仍带着夜色。',
    ],
    yuExcerpt: '“孤冷得可怜。”',
    yuSource: '郁达夫《沉沦》短引。',
    yuNote: '这句孤冷落在案卷边缘：编号可以相互参照，人的缺席仍然单独。',
  },
  home: {
    heading: '门槛仍在屋里',
    riverLine: '同一夜分成两条时间：一条出去，一条留下。',
    note: '这个结局把家庭时间放到正面，但不把家庭写成牺牲的装饰。',
    echoes: [
      '木屐没有走进报告，它留在门边。',
      '出生记录和搜索记录不是象征，它们是生活继续发生。',
      '对屋里等待的人，失踪不是文学史条目。',
      '屋里的人不是等待的名词，而是继续做事的动词。',
      '新生儿不解释失踪；她只是同时来到这一天。',
    ],
    yuExcerpt: '“天还未暗。”',
    yuSource: '郁达夫《春风沉醉的晚上》短引。',
    yuNote: '这句未暗的光留给屋内时间：等待没有被写成结尾，它仍在安排生活。',
  },
  untranslated: {
    heading: '空白的语法',
    riverLine: '没有译出的词仍在发声，只是不替任何人说完。',
    note: '这个结局保留多个未决处，让责任明确而细节不被伪造。',
    echoes: [
      '称呼停在括号里。',
      '日期和方式靠近，却不合并。',
      '空白不是答案；空白也不是逃避。',
      '没有译出的地方，也需要被准确登记。',
      '克制不是撤退，是把手从空白上拿开。',
    ],
    yuExcerpt: '“若留得住的话……”',
    yuSource: '郁达夫《故都的秋》短引。',
    yuNote: '这句挽留不替空白发言：想留住的愿望和不能补写的事实并排存在。',
  },
  testimony_weave: {
    heading: '三处反光',
    riverLine: '证词像水面上的光，靠近时互相照亮，重合时反而失真。',
    note: '这个结局把访谈方法放到正面，让多处证词互校而不互相吞并。',
    echoes: [
      '咖啡店、道路、家门各自保留边界。',
      '一条线连起纸页，不把纸页缝死。',
      '提问越轻，留下的犹疑越能被听见。',
      '互校不是消除差异，是让差异可复核。',
      '水面上的三处光不必合成一个太阳。',
    ],
    yuExcerpt: '“有话说不出来。”',
    yuSource: '郁达夫《春风沉醉的晚上》短引。',
    yuNote: '这句说不出的话落在证词之间：沉默和迟疑同样需要被登记。',
  },
  delay_shadow: {
    heading: '延宕的阴影',
    riverLine: '被推迟的词没有离开案卷；它们在灯下把时间拉长。',
    note: '这个结局前置翻译延宕和身份风险，同时拒绝把疑点改写成完整答案。',
    echoes: [
      '名单上的时间起皱。',
      '灯照见权力，也照见证据的缺口。',
      '疑云不能替代责任。',
      '未明身份者不承担集体罪名。',
      '延宕是线索，不是谜底。',
    ],
    yuExcerpt: '“愈筑愈高了。”',
    yuSource: '郁达夫《沉沦》短引。',
    yuNote: '这句屏障感落在翻译和权力之间：阻隔越高，越要分清线索和推断。',
  },
};

export class AppController {
  private readonly root: HTMLElement;
  private readonly saveRepository = new SaveRepository();
  private readonly settingsStore = new SettingsStore();
  private readonly evidenceStore = new EvidenceStore();
  private readonly claimGraph = new ClaimGraph();
  private settings: SettingsState;
  private audio: AudioController;
  private engine: StoryEngine;
  private state: GameState;
  private view: ViewName = 'title';
  private dossierTab: DossierTab = 'evidence';
  private dossierOpen = false;
  private lastDossierOpener: HTMLElement | null = null;
  private draft: ReportDraft = { ...defaultReportDraft };
  private liveRegion: HTMLDivElement;
  private musicPausedByUser = false;
  private musicSyncSerial = 0;
  private lastRenderedEnding: EndingId | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.settings = this.settingsStore.load();
    this.audio = new AudioController(this.settings);
    this.engine = new StoryEngine(createInitialGameState());
    this.state = this.engine.snapshot();
    this.liveRegion = el('div', {
      className: 'sr-only',
      attrs: { 'aria-live': 'polite', 'aria-atomic': 'true' },
    });
  }

  async init(): Promise<void> {
    const saved = await this.saveRepository.loadAutosave();
    if (saved) {
      this.engine = new StoryEngine(saved);
      this.state = this.engine.snapshot();
      this.draft = { ...this.state.reportDraft };
    }
    this.applySettings();
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.dossierOpen) {
        this.closeDossier();
      }
    });
    this.render();
  }

  private render(): void {
    const shouldScrollToEnding =
      this.view === 'game' &&
      Boolean(this.state.completedEnding) &&
      this.lastRenderedEnding !== this.state.completedEnding;
    const shell = el('div', { className: 'app-shell' });
    shell.append(this.renderHeader(), this.renderMain(), this.renderFooter(), this.liveRegion);
    if (this.dossierOpen) shell.append(this.renderDossierDialog());
    clearAndAppend(this.root, shell);
    this.lastRenderedEnding = this.view === 'game' ? (this.state.completedEnding ?? null) : null;
    if (this.dossierOpen) {
      const close = this.root.querySelector<HTMLButtonElement>('[data-dialog-close]');
      close?.focus();
    } else if (shouldScrollToEnding) {
      window.requestAnimationFrame(() => {
        this.root.querySelector('.context-rail')?.scrollIntoView({ block: 'start' });
      });
    }
    void this.syncMusicForCurrentView();
  }

  private renderHeader(): HTMLElement {
    const header = el('header', { className: 'site-header' });
    const brand = el('div', { className: 'brand' }, [
      el('span', { className: 'brand-title', text: '出去一趟：赵廉案卷' }),
      el('span', { className: 'brand-subtitle', text: '一部关于材料、等待和编目的互动叙事' }),
    ]);
    const nav = el('nav', { attrs: { 'aria-label': '主导航' } });
    const items: [ViewName, string][] = [
      ['title', this.state.transcript.length > 0 ? '开始／继续' : '开始'],
      ['game', '阅读'],
      ['dossier', '案卷'],
      ['settings', '设置'],
      ['methodology', '方法与史料'],
      ['credits', '制作人员与授权'],
    ];
    for (const [view, label] of items) {
      const navButton = button(
        label,
        () => {
          this.view = view;
          this.render();
        },
        'nav-button',
      );
      navButton.setAttribute('aria-current', this.view === view ? 'page' : 'false');
      nav.append(navButton);
    }
    header.append(brand, nav);
    return header;
  }

  private renderMain(): HTMLElement {
    const main = el('main', { className: 'main-view', attrs: { id: 'main' } });
    if (this.view === 'title') main.append(this.renderTitle());
    if (this.view === 'game') main.append(this.renderGame());
    if (this.view === 'dossier') main.append(this.renderDossierContents(false));
    if (this.view === 'settings') main.append(this.renderSettings());
    if (this.view === 'methodology') main.append(this.renderMethodology());
    if (this.view === 'credits') main.append(this.renderCredits());
    return main;
  }

  private renderTitle(): HTMLElement {
    const section = el('section', { className: 'title-screen scene-art archive-desk' });
    const titleVisual = this.renderVisualFigure(getVisualAsset('VIS_ARCHIVE_DESK'), 'title-visual');
    section.append(
      el('p', { className: 'eyebrow', text: '历史互动叙事' }),
      el('h1', { text: '出去一趟：赵廉案卷' }),
      el('p', {
        className: 'lede',
        text: '你不能改变这件事。你将改变它留下来的文字。',
      }),
      this.renderContentNotice(),
    );
    if (titleVisual) section.append(titleVisual);
    const actions = el('div', { className: 'actions' });
    actions.append(
      button(
        '开始新案卷',
        () => {
          this.engine = new StoryEngine(createInitialGameState());
          this.state = this.engine.snapshot();
          this.draft = { ...this.state.reportDraft };
          this.view = 'game';
          void this.persistAndRender('新案卷已开始。');
        },
        'button primary',
      ),
      button('继续当前案卷', () => {
        this.view = 'game';
        this.render();
      }),
      button('打开方法与史料', () => {
        this.view = 'methodology';
        this.render();
      }),
    );
    section.append(actions);
    return section;
  }

  private renderContentNotice(): HTMLElement {
    const notice = el('section', {
      className: 'notice',
      attrs: { 'aria-labelledby': 'content-notice-title' },
    });
    notice.append(
      el('h2', { text: '内容提示', attrs: { id: 'content-notice-title' } }),
      el('p', {
        text: '本作涉及战时占领、政治暴力、失踪与被害推定、胁迫性问话和与失踪同时发生的分娩记录；不含图像化死亡、处决现场、尸体、跳吓或可玩的救援路线。',
      }),
      el('p', {
        text: '配乐会在你开始互动后自动淡入；所有关键声音都有文字字幕。存档留在本机，除非你主动导出。',
      }),
    );
    return notice;
  }

  private renderGame(): HTMLElement {
    const state = this.state;
    const wrapper = el('div', { className: 'game-layout' });
    const context = el('aside', {
      className: 'context-rail',
      attrs: { 'aria-label': '当前章节语境' },
    });
    if (state.completedEnding) {
      const ending = getEnding(state.completedEnding);
      const endingVisual = this.renderVisualFigure(
        visualAssetForEnding(state.completedEnding),
        'context-visual ending-visual',
      );
      context.append(
        el('h2', { text: '案卷已完成' }),
        el('p', { className: 'chapter-code', text: ending.code }),
        el('p', { text: `结局：${ending.numberLabel}｜${ending.title}` }),
        el('p', { className: 'meta', text: ending.conditionLabel }),
        ...(endingVisual ? [endingVisual] : []),
        this.renderMusicControl(endingMusicTrack),
        button('重新开始', () => {
          this.audio.stopAll();
          this.musicPausedByUser = false;
          this.engine = new StoryEngine(createInitialGameState());
          this.state = this.engine.snapshot();
          this.draft = { ...defaultReportDraft };
          void this.persistAndRender('已开始新的案卷。');
        }),
      );
    } else {
      const scene = getScene(state.currentSceneId);
      const visual = this.renderVisualFigure(
        getVisualAsset(resolveSceneVisualId(scene, state.flags.lastFocus)),
        'context-visual',
      );
      context.append(
        el('p', { className: 'chapter-code', text: scene.chapter }),
        el('h2', { text: scene.title }),
        el('p', { text: scene.dateLabel }),
        el('p', { text: scene.locationLabel }),
        ...(visual ? [visual] : []),
        this.renderSourceClassList(scene.historicalClasses),
        this.renderMusicControl(musicTrackForScene(scene)),
        button('打开案卷抽屉', () => {
          this.lastDossierOpener =
            document.activeElement instanceof HTMLElement ? document.activeElement : null;
          this.dossierOpen = true;
          this.render();
        }),
      );
      const caption = this.audio.captionFor(scene.sfx ?? scene.ambience);
      if (caption) context.append(el('p', { className: 'sound-caption', text: caption }));
    }

    const reading = el('section', {
      className: 'reading-column',
      attrs: { 'aria-labelledby': 'reading-title' },
    });
    reading.append(
      el('h2', { text: '阅读记录', attrs: { id: 'reading-title' } }),
      this.renderTranscript(),
    );
    if (state.completedEnding) {
      reading.append(this.renderEndingCoda(state.completedEnding));
    } else {
      reading.append(this.renderInteraction());
    }

    const dossier = el('aside', { className: 'dossier-rail', attrs: { 'aria-label': '案卷摘要' } });
    const acquired = this.evidenceStore.acquired(state);
    dossier.append(
      el('h2', { text: '案卷摘要' }),
      el('p', {
        text: `当前轮证据：${acquired.length} 张。来源模式：${this.settings.sourceMode ? '开' : '关'}。`,
      }),
      button('查看完整案卷', () => {
        this.view = 'dossier';
        this.render();
      }),
    );
    wrapper.append(context, reading, dossier);
    return wrapper;
  }

  private renderVisualFigure(
    asset: VisualAssetDefinition | undefined,
    variant = 'scene-visual',
  ): HTMLElement | null {
    if (!asset) return null;

    const figure = el('figure', { className: `visual-frame ${variant}` });
    const image = document.createElement('img');
    image.src = asset.url;
    image.alt = asset.alt;
    image.width = asset.width;
    image.height = asset.height;
    image.loading =
      variant.includes('gallery') || variant.includes('ending-visual') ? 'eager' : 'lazy';
    image.decoding = 'async';
    figure.append(image);
    return figure;
  }

  private renderMusicControl(track: MusicTrackDefinition): HTMLElement {
    const playing = this.audio.isPlaying(track.id);
    const status = playing
      ? '自动播放中；切换阶段时会淡出淡入。'
      : this.musicPausedByUser
        ? '已暂停；点击恢复后继续自动播放。'
        : '将在你开始互动后自动淡入。';
    const section = el('section', {
      className: 'music-control',
      attrs: { 'aria-label': '阶段配乐' },
    });
    section.append(
      el('p', { className: 'music-title', text: track.title }),
      el('p', { className: 'music-status', text: status }),
      button(
        playing ? '暂停配乐' : '播放配乐',
        () => {
          void this.toggleMusic(track);
        },
        'button music-button',
      ),
    );
    return section;
  }

  private async toggleMusic(track: MusicTrackDefinition): Promise<void> {
    try {
      this.musicPausedByUser = this.audio.isPlaying(track.id);
      const status = await this.audio.toggleLoop(track);
      if (status === 'muted') {
        this.musicPausedByUser = false;
        this.announce('当前音量为零；请在设置中调高主音量和环境声。');
      } else if (status === 'playing') {
        this.musicPausedByUser = false;
        this.announce(`正在播放：${track.title}`);
      } else {
        this.musicPausedByUser = true;
        this.announce('配乐已暂停。');
      }
    } catch {
      this.musicPausedByUser = false;
      this.announce('浏览器需要一次互动才能播放音频；下一次点击后会自动重试。');
    }
    this.render();
  }

  private currentMusicTrack(): MusicTrackDefinition | null {
    if (this.view !== 'game') return null;
    if (this.state.completedEnding) return endingMusicTrack;
    return musicTrackForScene(getScene(this.state.currentSceneId));
  }

  private async syncMusicForCurrentView(): Promise<void> {
    const serial = ++this.musicSyncSerial;
    const track = this.currentMusicTrack();
    if (!track || this.musicPausedByUser) return;

    try {
      await this.audio.syncLoop(track);
    } catch {
      if (serial === this.musicSyncSerial) {
        this.announce('浏览器需要一次互动才能播放音频；下一次点击后会自动重试。');
      }
    }
  }

  private renderEndingCoda(endingId: EndingId): HTMLElement {
    const coda = endingCodaContent[endingId];
    const section = el('section', {
      className: `ending-coda ending-coda-${endingId}`,
      attrs: { 'aria-labelledby': 'ending-coda-title' },
    });
    const portrait = this.renderVisualFigure(
      getVisualAsset('VIS_PORTRAIT_YU_DAFU'),
      'coda-portrait',
    );
    const alias = this.renderVisualFigure(
      getVisualAsset('VIS_PORTRAIT_ZHAO_LIAN'),
      'coda-portrait',
    );
    const portraits = el('div', { className: 'coda-portraits' });
    if (portrait) portraits.append(portrait);
    if (alias) portraits.append(alias);
    section.append(
      el('h2', { text: coda.heading, attrs: { id: 'ending-coda-title' } }),
      portraits,
      el('blockquote', { className: 'literary-excerpt' }, [
        el('p', { text: coda.riverLine }),
        el('footer', { text: '结算余韵。' }),
      ]),
      this.renderEndingEchoes(coda.echoes),
      el('blockquote', { className: 'literary-excerpt yu-excerpt' }, [
        el('p', { text: coda.yuExcerpt }),
        el('footer', { text: coda.yuSource }),
      ]),
      el('p', {
        className: 'meta',
        text: `${coda.note} ${coda.yuNote} 郁达夫文字不被写成遗言；它只在结算页保留一种气氛上的回声。`,
      }),
    );
    return section;
  }

  private renderEndingEchoes(echoes: string[]): HTMLElement {
    const list = el('ul', { className: 'ending-echoes' });
    for (const echo of echoes) list.append(el('li', { text: echo }));
    return list;
  }

  private renderTranscript(): HTMLElement {
    const transcript = el('article', {
      className: 'transcript',
      attrs: { 'aria-label': '叙事文本' },
    });
    for (const block of this.state.transcript) {
      const paragraph = el('p', { className: `text-block source-${block.classes[0] ?? 'R'}` });
      paragraph.textContent = block.text;
      if (this.settings.sourceMode) {
        paragraph.append(this.renderInlineSourceChips(block));
      }
      transcript.append(paragraph);
    }
    return transcript;
  }

  private renderInlineSourceChips(block: TextBlock): HTMLElement {
    const span = el('span', { className: 'source-chip-list' });
    for (const sourceClass of block.classes) {
      const label = sourceClassLabels[sourceClass] ?? sourceClass;
      const chip = el('button', {
        className: `source-chip pattern-${sourceClass}`,
        text: label,
        attrs: {
          type: 'button',
          'aria-label': `${label}：查看材料层级说明`,
        },
      });
      chip.addEventListener('click', () => {
        this.view = 'methodology';
        this.render();
      });
      span.append(chip);
    }
    return span;
  }

  private renderInteraction(): HTMLElement {
    const scene = getScene(this.state.currentSceneId);
    const interaction = el('section', {
      className: 'interaction',
      attrs: { 'aria-label': '可选行动' },
    });
    if (scene.mode === 'wait') {
      interaction.append(
        el('p', { className: 'wait-status', text: '故事仍在继续；当前动作是等待。' }),
        button(
          scene.waitSteps?.[this.state.waitIndex]?.label ?? '等待。',
          () => {
            this.state = this.engine.advanceWait();
            void this.persistAndRender('等待推进了一步。');
          },
          'button primary wait-button',
        ),
      );
      return interaction;
    }

    if (scene.mode === 'report') {
      interaction.append(this.renderReportEditor());
      return interaction;
    }

    const choices = this.engine.availableChoices();
    if (choices.length === 0) {
      interaction.append(
        el('p', { text: '当前节点没有可选行动；如果你看到这句话，请使用恢复按钮返回最近检查点。' }),
      );
      return interaction;
    }
    const group = el('div', {
      className: 'choice-list',
      attrs: { role: 'group', 'aria-label': '选择下一步' },
    });
    for (const choice of choices) group.append(this.renderChoiceButton(choice));
    interaction.append(group);
    return interaction;
  }

  private renderChoiceButton(choice: StoryChoice): HTMLElement {
    return button(
      choice.label,
      () => {
        this.state = this.engine.selectChoice(choice.id);
        const acquired = choice.effects.evidenceIds?.length
          ? `解锁证据：${choice.effects.evidenceIds.join('、')}`
          : '选择已记录。';
        void this.persistAndRender(acquired);
      },
      'choice-button',
    );
  }

  private renderReportEditor(): HTMLElement {
    const form = el('form', { className: 'report-form' });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.state = this.engine.confirmReport(this.draft);
      void this.persistAndRender('最终报告已确认，结局文本已生成。');
    });

    form.append(
      el('h3', { text: '最终报告' }),
      el('p', { text: '未知、空白和不详都是合法值。每个选项都会留下警告和材料边界。' }),
    );

    for (const field of storyContent.reportFields) {
      const fieldset = el('fieldset');
      fieldset.append(el('legend', { text: field.legend }));
      for (const option of field.options) {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = field.id;
        input.value = option.id;
        input.checked = this.draft[field.id] === option.id;
        input.addEventListener('change', () => {
          this.draft = { ...this.draft, [field.id]: option.id };
          this.render();
        });
        const label = el('label', { className: 'radio-option' }, [
          input,
          el('span', { text: option.label }),
          el('small', { text: option.warning }),
        ]);
        fieldset.append(label);
      }
      form.append(fieldset);
    }

    const preview = buildReportResult(this.state, this.draft);
    const review = el('section', {
      className: 'report-review',
      attrs: { 'aria-label': '报告预览与警告' },
    });
    review.append(el('h4', { text: '预览' }), el('pre', { text: preview.text }));
    const warningList = el('ul');
    for (const warning of preview.warnings) warningList.append(el('li', { text: warning }));
    review.append(el('h4', { text: '警告' }), warningList);
    form.append(review);

    const submit = el('button', { className: 'button primary', text: '确认并生成案卷结局' });
    submit.type = 'submit';
    form.append(submit);
    return form;
  }

  private renderDossierDialog(): HTMLElement {
    const dialog = el('div', {
      className: 'dialog-backdrop',
      attrs: { role: 'presentation' },
    });
    const panel = el('section', {
      className: 'dossier-dialog',
      attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'dossier-dialog-title' },
    });
    panel.append(
      el('div', { className: 'dialog-header' }, [
        el('h2', { text: '案卷抽屉', attrs: { id: 'dossier-dialog-title' } }),
        button('关闭案卷', () => this.closeDossier(), 'button'),
      ]),
      this.renderDossierContents(true),
    );
    panel.querySelector('button:last-child')?.setAttribute('data-dialog-close', 'true');
    dialog.append(panel);
    return dialog;
  }

  private closeDossier(): void {
    this.dossierOpen = false;
    this.render();
    this.lastDossierOpener?.focus();
  }

  private renderDossierContents(compact: boolean): HTMLElement {
    const section = el('section', { className: compact ? 'dossier compact' : 'dossier' });
    section.append(el('h1', { text: '案卷' }));
    const tabs = el('div', {
      className: 'tabs',
      attrs: { role: 'tablist', 'aria-label': '案卷分类' },
    });
    const tabDefs: [DossierTab, string][] = [
      ['evidence', '证据'],
      ['claims', '主张'],
      ['timeline', '时间线'],
      ['sources', '来源'],
      ['glossary', '词汇'],
    ];
    for (const [tab, label] of tabDefs) {
      const tabButton = button(
        label,
        () => {
          this.dossierTab = tab;
          this.render();
        },
        'tab-button',
      );
      tabButton.setAttribute('role', 'tab');
      tabButton.setAttribute('aria-selected', this.dossierTab === tab ? 'true' : 'false');
      tabs.append(tabButton);
    }
    section.append(tabs);
    const panel = el('div', { className: 'tab-panel', attrs: { role: 'tabpanel' } });
    if (this.dossierTab === 'evidence') panel.append(this.renderEvidenceList());
    if (this.dossierTab === 'claims') panel.append(this.renderClaimList());
    if (this.dossierTab === 'timeline') panel.append(this.renderTimelineList());
    if (this.dossierTab === 'sources') panel.append(this.renderSourceList());
    if (this.dossierTab === 'glossary') panel.append(this.renderGlossaryList());
    section.append(panel);
    return section;
  }

  private renderEvidenceList(): HTMLElement {
    const list = el('div', { className: 'card-list' });
    const acquired = new Set(this.state.evidenceIds);
    const records =
      this.view === 'dossier' ? evidenceRecords : this.evidenceStore.acquired(this.state);
    for (const record of records) {
      const card = el('article', { className: `card pattern-${record.sourceClass}` });
      card.append(
        el('h3', { text: `${record.title}${acquired.has(record.id) ? '' : '（未取得）'}` }),
        this.renderSourceClassList([record.sourceClass]),
        el('p', { text: record.summary }),
        el('p', {
          className: 'meta',
          text: `场景：${record.acquiredAtScene}；置信度：${record.confidence}`,
        }),
      );
      list.append(card);
    }
    return list;
  }

  private renderClaimList(): HTMLElement {
    const list = el('div', { className: 'card-list' });
    for (const claim of claimRecords) {
      list.append(this.renderClaimCard(claim));
    }
    return list;
  }

  private renderClaimCard(claim: ClaimRecord): HTMLElement {
    const card = el('article', {
      className: `card pattern-${claim.sourceClass}`,
      attrs: { id: `claim-${claim.id}` },
    });
    card.append(
      el('h3', { text: `${claim.id}：${claim.shortLabel}` }),
      this.renderSourceClassList([claim.sourceClass]),
      el('p', { text: claim.statement }),
      el('p', {
        className: 'meta',
        text: `来源：${claim.sourceIds.join('、')}；公开附录：${claim.publicAppendixAllowed ? '可用' : '不可作为事实'}`,
      }),
      el('p', { text: claim.editorialNote }),
    );
    const conflicts = this.claimGraph.conflictsFor(claim.id);
    if (conflicts.length > 0) {
      const conflictList = el('ul', { className: 'conflict-list' });
      for (const conflict of conflicts) {
        const link = el('a', {
          text: `${conflict.id} ${conflict.shortLabel}`,
          attrs: { href: `#claim-${conflict.id}` },
        });
        conflictList.append(el('li', {}, [link]));
      }
      card.append(el('h4', { text: '冲突主张' }), conflictList);
    }
    return card;
  }

  private renderTimelineList(): HTMLElement {
    const list = el('ol', { className: 'timeline-list' });
    for (const entry of timelineEntries) {
      list.append(
        el('li', {}, [
          el('strong', { text: entry.date }),
          document.createTextNode(`：${entry.label}`),
        ]),
      );
    }
    return list;
  }

  private renderSourceList(): HTMLElement {
    const list = el('div', { className: 'card-list' });
    for (const source of sourceRecords) {
      const card = el('article', { className: 'card' });
      card.append(
        el('h3', { text: source.title }),
        el('p', { text: `${source.authorOrInstitution}｜${source.publication}` }),
        el('p', { text: `状态：${source.accessStatus}；类型：${source.sourceType}` }),
        el('p', { text: source.notes }),
      );
      if (source.url) {
        const link = el('a', {
          text: '打开外部来源（离开应用）',
          attrs: { href: source.url, target: '_blank', rel: 'noopener noreferrer' },
        });
        card.append(link);
      }
      list.append(card);
    }
    return list;
  }

  private renderGlossaryList(): HTMLElement {
    const dl = el('dl', { className: 'glossary-list' });
    for (const entry of glossaryEntries) {
      dl.append(
        el('dt', { text: `${entry.term} / ${entry.latin}` }),
        el('dd', { text: entry.definition }),
      );
    }
    return dl;
  }

  private renderSettings(): HTMLElement {
    const section = el('section', { className: 'settings-view' });
    section.append(el('h1', { text: '设置' }));

    const textScale = document.createElement('input');
    textScale.type = 'range';
    textScale.min = '0.9';
    textScale.max = '1.4';
    textScale.step = '0.05';
    textScale.value = String(this.settings.textScale);
    textScale.addEventListener('input', () =>
      this.updateSettings({ textScale: Number(textScale.value) }),
    );

    const lineHeight = document.createElement('input');
    lineHeight.type = 'range';
    lineHeight.min = '1.4';
    lineHeight.max = '2.1';
    lineHeight.step = '0.05';
    lineHeight.value = String(this.settings.lineHeight);
    lineHeight.addEventListener('input', () =>
      this.updateSettings({ lineHeight: Number(lineHeight.value) }),
    );

    section.append(fieldLabel('文字缩放', textScale), fieldLabel('行高', lineHeight));
    const toggles: [keyof SettingsState, string][] = [
      ['instantText', '立即显示文字'],
      ['reducedMotion', '减少动态'],
      ['highContrast', '高对比'],
      ['textureFree', '无纹理'],
      ['captionsForSound', '声音字幕'],
      ['sourceMode', '来源模式'],
    ];
    for (const [key, label] of toggles) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = Boolean(this.settings[key]);
      checkbox.addEventListener('change', () => this.updateSettings({ [key]: checkbox.checked }));
      section.append(fieldLabel(label, checkbox));
    }

    const volumeGroup = el('fieldset');
    volumeGroup.append(el('legend', { text: '音量' }));
    for (const [key, label] of [
      ['masterVolume', '主音量'],
      ['ambienceVolume', '环境声'],
      ['effectsVolume', '效果声'],
    ] as [keyof SettingsState, string][]) {
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = '0';
      slider.max = '1';
      slider.step = '0.05';
      slider.value = String(this.settings[key]);
      slider.addEventListener('input', () => this.updateSettings({ [key]: Number(slider.value) }));
      volumeGroup.append(fieldLabel(label, slider));
    }
    section.append(volumeGroup);

    const saveTools = el('section', {
      className: 'settings-tools',
      attrs: { 'aria-label': '存档工具' },
    });
    saveTools.append(
      el('h2', { text: '存档与数据' }),
      button('导出当前存档 JSON', () => this.exportSave()),
      this.renderImportControl(),
      button('删除当前自动存档', () => {
        if (window.confirm('删除当前自动存档？设置会保留。')) {
          void this.saveRepository.deleteAutosave().then(() => this.announce('自动存档已删除。'));
        }
      }),
      button('重置设置', () => {
        if (window.confirm('重置所有显示、来源和音频设置？故事存档会保留。')) {
          this.settings = this.settingsStore.reset();
          this.applySettings();
          this.render();
        }
      }),
    );
    section.append(saveTools);
    return section;
  }

  private renderImportControl(): HTMLElement {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (!file) return;
      void file.text().then((text) => {
        try {
          const envelope = decodeSave(text);
          this.engine = new StoryEngine(envelope.payload);
          this.state = this.engine.snapshot();
          this.draft = { ...this.state.reportDraft };
          this.view = 'game';
          void this.persistAndRender('存档已导入。');
        } catch (error) {
          const message = error instanceof Error ? error.message : '存档导入失败。';
          this.announce(message);
        }
      });
    });
    return fieldLabel('导入存档 JSON', input);
  }

  private renderMethodology(): HTMLElement {
    const section = el('section', { className: 'methodology-view' });
    section.append(el('h1', { text: '方法与史料' }));
    for (const item of storyContent.methodology) section.append(el('p', { text: item }));
    section.append(
      el('h2', { text: '材料层级' }),
      this.renderSourceClassList(['D', 'T', 'L', 'C', 'R', 'U']),
    );
    section.append(this.renderContextVisualGallery());
    section.append(el('h2', { text: '公开附录主张' }), this.renderClaimList());
    return section;
  }

  private renderContextVisualGallery(): HTMLElement {
    const section = el('section', {
      className: 'visual-gallery-section',
      attrs: { 'aria-labelledby': 'visual-gallery-title' },
    });
    section.append(
      el('h2', { text: '视觉资料', attrs: { id: 'visual-gallery-title' } }),
      el('p', {
        className: 'meta',
        text: '以下均为原创艺术示意图或 AI 辅助生成图，不作为历史照片或精确地图使用。',
      }),
    );
    const gallery = el('div', { className: 'visual-gallery' });
    for (const id of contextVisualAssetIds) {
      const asset = getVisualAsset(id);
      if (!asset) continue;
      const card = el('article', { className: `visual-card visual-card-${asset.role}` });
      const figure = this.renderVisualFigure(asset, 'gallery-visual');
      if (figure) card.append(figure);
      card.append(el('h3', { text: asset.title }), el('p', { text: asset.alt }));
      gallery.append(card);
    }
    section.append(gallery);
    return section;
  }

  private renderCredits(): HTMLElement {
    const section = el('section', { className: 'credits-view' });
    section.append(el('h1', { text: creditsContent.title }));
    section.append(
      el('h2', { text: '项目创建内容' }),
      this.renderSimpleList(creditsContent.projectCreated),
    );
    section.append(
      el('h2', { text: '真实人工审核门槛' }),
      this.renderSimpleList(creditsContent.humanReviewGates),
    );
    section.append(el('h2', { text: '隐私' }), el('p', { text: creditsContent.privacy }));
    section.append(el('h2', { text: '资产清单' }), this.renderAssetList(assetRecords));
    section.append(el('p', { text: creditsContent.licenseNote }));
    return section;
  }

  private renderAssetList(records: AssetRecord[]): HTMLElement {
    const list = el('ul', { className: 'asset-list' });
    for (const record of records) {
      list.append(
        el('li', {
          text: `${record.id}：${record.attributionText}｜${record.license}｜${record.reviewStatus}`,
        }),
      );
    }
    return list;
  }

  private renderSimpleList(items: string[]): HTMLElement {
    const list = el('ul');
    for (const item of items) list.append(el('li', { text: item }));
    return list;
  }

  private renderSourceClassList(classes: SourceClass[]): HTMLElement {
    const list = el('ul', { className: 'source-class-list' });
    for (const sourceClass of classes) {
      list.append(
        el('li', {
          className: `source-class pattern-${sourceClass}`,
          text: sourceClassLabels[sourceClass] ?? sourceClass,
        }),
      );
    }
    return list;
  }

  private renderFooter(): HTMLElement {
    return el('footer', { className: 'site-footer' }, [
      el('p', { text: '无遥测。无广告。无远程字体。生产素材均为本地原创或已登记来源。' }),
    ]);
  }

  private updateSettings(patch: Partial<SettingsState>): void {
    this.settings = { ...this.settings, ...patch };
    this.settingsStore.save(this.settings);
    this.audio.update(this.settings);
    this.applySettings();
    this.render();
  }

  private applySettings(): void {
    document.documentElement.style.setProperty('--text-scale', String(this.settings.textScale));
    document.documentElement.style.setProperty('--line-height', String(this.settings.lineHeight));
    document.documentElement.classList.toggle('high-contrast', this.settings.highContrast);
    document.documentElement.classList.toggle('texture-free', this.settings.textureFree);
    document.documentElement.classList.toggle('reduced-motion', this.settings.reducedMotion);
  }

  private exportSave(): void {
    const blob = this.saveRepository.exportAutosave(this.state);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zhao-lian-save-${this.state.runId}.json`;
    link.click();
    URL.revokeObjectURL(url);
    this.announce('当前存档已导出。');
  }

  private async persistAndRender(message: string): Promise<void> {
    this.announce(message);
    this.render();
    await this.saveRepository.saveAutosave(this.state);
  }

  private announce(message: string): void {
    this.liveRegion.textContent = message;
  }
}
