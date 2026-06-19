# 15 — Audio Specification

## Audio thesis

Sound establishes ordinary space and the persistence of waiting. The most important sound event is not violence, but the disappearance of wooden-clog footsteps into sustained quiet.

## Mixer

Separate channels:

- master;
- ambience;
- effects.

Settings persist. Default volume is moderate and no audio begins before user interaction. After the player starts or resumes the casefile, the current stage BGM auto-starts, fades in, crossfades on track changes, and fades out when paused.

## Required ambience loops

- `AMB_RAIN_DAY`: soft rain, factory/roof context.
- `AMB_NIGHT_INSECTS`: night exterior/interior bleed.
- `AMB_ROOM_FAN`: low mechanical fan with room tone.
- `AMB_DAWN`: restrained morning environment.

Loops must be seamless, normalized, and under performance budgets.

## Required effects

- bottle and crate movement;
- wine poured into a glass;
- paper/list handled;
- pencil/typewriter field entry;
- radio tuning/static and distant announcement texture;
- three knocks;
- door movement;
- wooden clogs receding;
- distant vehicle without implying a verified make/model;
- lamp adjustment;
- page/card drawer;
- brief newborn cry, used once and not layered as melodrama.

## Prohibited effects

- gunshot associated with Yu Dafu's death;
- strangulation, choking, body fall, torture, scream;
- jump-scare impact on “郁先生”;
- triumphant victory anthem unless historically sourced and licensed, and even then not recommended.

## Key cue behavior

### “郁先生”

Fade current ambience quickly but naturally to near silence. Do not add a sting. Restore room tone after the player's recording choice.

### Departure

Clogs begin near center, move spatially away only if stereo remains accessible and non-essential. A text sound caption must communicate `[木屐声渐远]` when captions are enabled.

### Waiting

Do not loop the same prominent cue. Let the soundscape thin. The player should not hear a car as proof unless their observation route and testimony content justify that cue; even then it is non-diegetic reconstruction and labeled in source mode.

## Audio captions

Provide optional concise captions for meaningful non-speech cues. Captions must not reveal more certainty than the audio itself.

Examples:

- `[收音机里传来断续的投降消息]`
- `[门响了三次]`
- `[木屐声渐远]`
- `[远处似有车辆驶过]`

## Licensing

All audio must be original, commissioned, public-domain, or licensed for redistribution. Store source/license metadata in the asset manifest.

## Sourcing Expansion

Future music and ambience expansion should use the candidate-source matrix in
`36_AUDIO_LIBRARY_RESEARCH.md`. The matrix does not approve any individual
track for release. Before runtime use, each audio file must be reviewed at the
track page level, downloaded into `assets/audio/`, registered in
`content/assets.json`, credited through the attribution path, checked for
looping/loudness, and verified against the prohibited-effects list above.
