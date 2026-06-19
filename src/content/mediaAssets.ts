import contextPayakumbuhAdministrationUrl from '../../assets/generated/visuals/context-payakumbuh-administration.webp';
import contextSumatraInvasionUrl from '../../assets/generated/visuals/context-sumatra-invasion.webp';
import mapWesternPacificUrl from '../../assets/generated/visuals/map-western-pacific.webp';
import portraitYuDafuUrl from '../../assets/generated/visuals/portrait-yu-dafu.webp';
import portraitZhaoLianUrl from '../../assets/generated/visuals/portrait-zhao-lian.webp';
import sceneArchiveDeskUrl from '../../assets/generated/visuals/scene-archive-desk.webp';
import sceneCoffeeShopUrl from '../../assets/generated/visuals/scene-coffee-shop.webp';
import sceneDateComparisonUrl from '../../assets/generated/visuals/scene-date-comparison.webp';
import sceneDawnRoomUrl from '../../assets/generated/visuals/scene-dawn-room.webp';
import sceneDoorwayUrl from '../../assets/generated/visuals/scene-doorway.webp';
import sceneFinalReportUrl from '../../assets/generated/visuals/scene-final-report.webp';
import sceneNightRoomUrl from '../../assets/generated/visuals/scene-night-room.webp';
import scenePoliceOfficeUrl from '../../assets/generated/visuals/scene-police-office.webp';
import sceneRadioObjectsUrl from '../../assets/generated/visuals/scene-radio-objects.webp';
import sceneRoadVehicleUrl from '../../assets/generated/visuals/scene-road-vehicle.webp';
import sceneWineFactoryUrl from '../../assets/generated/visuals/scene-wine-factory.webp';
import sceneYuSenseiTableUrl from '../../assets/generated/visuals/scene-yu-sensei-table.webp';
import musicMysteriousAmbienceUrl from '../../assets/audio/mysterious-ambience-song21.mp3';
import musicSoftHarpUrl from '../../assets/audio/soft-mysterious-harp.ogg';
import type { StoryScene } from '../types/content';

export interface VisualAssetDefinition {
  id: string;
  url: string;
  title: string;
  alt: string;
  width: number;
  height: number;
  role: 'background' | 'scene' | 'portrait' | 'context';
}

export interface MusicTrackDefinition {
  id: string;
  url: string;
  title: string;
  credit: string;
  channel: 'ambience' | 'effects';
}

export const globalMapAsset: VisualAssetDefinition = {
  id: 'VIS_MAP_WESTERN_PACIFIC',
  url: mapWesternPacificUrl,
  title: '西部太平洋战争示意图',
  alt: '原创剪影风格的西部太平洋战争示意地图，显示东南亚海域、苏门答腊和周边航线的分块关系。',
  width: 1920,
  height: 1080,
  role: 'background',
};

export const visualAssetMap: Record<string, VisualAssetDefinition> = {
  VIS_ARCHIVE_DESK: {
    id: 'VIS_ARCHIVE_DESK',
    url: sceneArchiveDeskUrl,
    title: '档案桌',
    alt: '空档案桌、铅笔、纸页和地图边缘构成的原创剪影场景。',
    width: 1280,
    height: 720,
    role: 'scene',
  },
  VIS_WINE_FACTORY: {
    id: 'VIS_WINE_FACTORY',
    url: sceneWineFactoryUrl,
    title: '雨中酒厂',
    alt: '雨中的酒厂室内、酒瓶、木箱、账本和搬运身影。',
    width: 1280,
    height: 720,
    role: 'scene',
  },
  VIS_POLICE_OFFICE: {
    id: 'VIS_POLICE_OFFICE',
    url: scenePoliceOfficeUrl,
    title: '宪兵办公室',
    alt: '灯下办公桌、名单、文件夹和制服边缘阴影，表现占领机构的压力。',
    width: 1280,
    height: 720,
    role: 'scene',
  },
  VIS_NIGHT_ROOM: {
    id: 'VIS_NIGHT_ROOM',
    url: sceneNightRoomUrl,
    title: '夜间房间',
    alt: '夜间房间里的台灯、风扇阴影、百叶窗和桌面纸页。',
    width: 1280,
    height: 720,
    role: 'scene',
  },
  VIS_YU_SENSEI_TABLE: {
    id: 'VIS_YU_SENSEI_TABLE',
    url: sceneYuSenseiTableUrl,
    title: '酒桌称呼',
    alt: '酒桌上的杯子、瓶子和两侧被裁切的人影，表现身份暴露后的沉默。',
    width: 1280,
    height: 720,
    role: 'scene',
  },
  VIS_RADIO_OBJECTS: {
    id: 'VIS_RADIO_OBJECTS',
    url: sceneRadioObjectsUrl,
    title: '收音机与路线',
    alt: '收音机、折叠路线图、账本和窗外远处车辆影子构成的投降期物件场景。',
    width: 1280,
    height: 720,
    role: 'scene',
  },
  VIS_DOORWAY: {
    id: 'VIS_DOORWAY',
    url: sceneDoorwayUrl,
    title: '夜门槛',
    alt: '夜间半开的门、灯光和门槛附近的木屐，画面不跟随门外去向。',
    width: 1280,
    height: 720,
    role: 'scene',
  },
  VIS_DAWN_ROOM: {
    id: 'VIS_DAWN_ROOM',
    url: sceneDawnRoomUrl,
    title: '等待后的黎明',
    alt: '黎明室内，女性的手整理纸页，窗外有清晨光，旁边有生活物件。',
    width: 1280,
    height: 720,
    role: 'scene',
  },
  VIS_COFFEE_SHOP: {
    id: 'VIS_COFFEE_SHOP',
    url: sceneCoffeeShopUrl,
    title: '咖啡店附近',
    alt: '雨后的西苏门答腊街角、咖啡店桌椅和路口，远处有山影。',
    width: 1280,
    height: 720,
    role: 'scene',
  },
  VIS_ROAD_VEHICLE: {
    id: 'VIS_ROAD_VEHICLE',
    url: sceneRoadVehicleUrl,
    title: '远处车辆印象',
    alt: '湿路通向黑暗，远处只有模糊车灯和车辆轮廓，乘客身份不可辨认。',
    width: 1280,
    height: 720,
    role: 'scene',
  },
  VIS_DATE_COMPARISON: {
    id: 'VIS_DATE_COMPARISON',
    url: sceneDateComparisonUrl,
    title: '日期对照',
    alt: '左右两组空白档案纸、日历卡、图钉和线索并列，中间保留空白。',
    width: 1280,
    height: 720,
    role: 'scene',
  },
  VIS_REPORT_DESK: {
    id: 'VIS_REPORT_DESK',
    url: sceneFinalReportUrl,
    title: '最终报告桌',
    alt: '最终报告桌面、铅笔、地图和被部分遮住的非照片肖像卡。',
    width: 1280,
    height: 720,
    role: 'scene',
  },
  VIS_PORTRAIT_YU_DAFU: {
    id: 'VIS_PORTRAIT_YU_DAFU',
    url: portraitYuDafuUrl,
    title: '郁达夫艺术肖像',
    alt: '原创非照片剪影肖像，表现短发中文作家的侧向凝视。',
    width: 768,
    height: 1152,
    role: 'portrait',
  },
  VIS_PORTRAIT_ZHAO_LIAN: {
    id: 'VIS_PORTRAIT_ZHAO_LIAN',
    url: portraitZhaoLianUrl,
    title: '赵廉身份层',
    alt: '原创非照片剪影肖像，人物转向暗处，手持文件，表现化名和纸面身份。',
    width: 768,
    height: 1152,
    role: 'portrait',
  },
  VIS_CONTEXT_SUMATRA_INVASION: {
    id: 'VIS_CONTEXT_SUMATRA_INVASION',
    url: contextSumatraInvasionUrl,
    title: '苏门答腊入侵背景',
    alt: '原创剪影图，远处登陆艇和小型士兵身影位于苏门答腊海岸，未描绘近身战斗。',
    width: 1280,
    height: 720,
    role: 'context',
  },
  VIS_CONTEXT_PAYAKUMBUH_ADMIN: {
    id: 'VIS_CONTEXT_PAYAKUMBUH_ADMIN',
    url: contextPayakumbuhAdministrationUrl,
    title: '巴爷公务与市镇秩序',
    alt: '原创剪影图，西苏门答腊市镇行政室内有账本、文件、居民和门口的占领压力。',
    width: 1280,
    height: 720,
    role: 'context',
  },
};

export const contextVisualAssetIds = [
  'VIS_MAP_WESTERN_PACIFIC',
  'VIS_PORTRAIT_YU_DAFU',
  'VIS_PORTRAIT_ZHAO_LIAN',
  'VIS_CONTEXT_SUMATRA_INVASION',
  'VIS_CONTEXT_PAYAKUMBUH_ADMIN',
] as const;

export const musicTracks = {
  MUSIC_ARCHIVE_HARP: {
    id: 'MUSIC_ARCHIVE_HARP',
    url: musicSoftHarpUrl,
    title: '档案阶段：Soft Mysterious Harp Loop',
    credit: 'Soft Mysterious Harp Loop by OpenGameArt user cynicmusic, CC-BY 3.0.',
    channel: 'ambience',
  },
  MUSIC_INVESTIGATION_AMBIENCE: {
    id: 'MUSIC_INVESTIGATION_AMBIENCE',
    url: musicMysteriousAmbienceUrl,
    title: '探案阶段：Mysterious Ambience Song21',
    credit: 'Mysterious Ambience Song21 by OpenGameArt user yd, CC0/OGA-BY/CC-BY multi-license.',
    channel: 'ambience',
  },
  MUSIC_ENDING_CODA: {
    id: 'MUSIC_ENDING_CODA',
    url: musicSoftHarpUrl,
    title: '案卷完成：Soft Mysterious Harp Loop',
    credit: 'Soft Mysterious Harp Loop by OpenGameArt user cynicmusic, CC-BY 3.0.',
    channel: 'ambience',
  },
} satisfies Record<string, MusicTrackDefinition>;

export function getVisualAsset(id: string | undefined): VisualAssetDefinition | undefined {
  if (!id) return undefined;
  if (id === globalMapAsset.id) return globalMapAsset;
  return visualAssetMap[id];
}

export function resolveSceneVisualId(scene: StoryScene, lastFocus: string): string | undefined {
  if (scene.id === 'ch08_interviews') {
    if (lastFocus === 'road') return 'VIS_ROAD_VEHICLE';
    if (lastFocus === 'doorway') return 'VIS_DOORWAY';
    return 'VIS_COFFEE_SHOP';
  }
  return scene.visual;
}

export function musicTrackForScene(scene: StoryScene): MusicTrackDefinition {
  if (['CH00', 'CH09', 'CH10'].includes(scene.chapter)) {
    return musicTracks.MUSIC_ARCHIVE_HARP;
  }
  return musicTracks.MUSIC_INVESTIGATION_AMBIENCE;
}

export const endingMusicTrack = musicTracks.MUSIC_ENDING_CODA;
