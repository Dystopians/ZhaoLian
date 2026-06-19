# Attributions And Licenses

Generated attribution data is written by `scripts/generate-attributions.mjs` to `dist/reports/attributions.json`.

## Project-Created Content

- Narrative, UI copy, content data, validators, tests, and source code: project-created for this repository.
- Original visual assets: project-owned AI-assisted WebP scene art listed in `content/assets.json`.
- Audio: local, lazy-loaded OpenGameArt music files listed in `content/assets.json`; meaningful sound cues still have text captions and audio is not required.
- Fonts: system font stack only; no remote fonts.

## Historical Sources

Historical source citation metadata is maintained in `content/sources.json` and `docs/29_SOURCE_REGISTER.md`. Source citation does not grant redistribution rights to article text or images, and no external historical images are bundled.

## Software Dependencies

Runtime dependencies:

| Package  | Version | Use                                            |
| -------- | ------: | ---------------------------------------------- |
| `inkjs`  |   2.4.0 | Narrative runtime compatibility and Story API. |
| `lucide` |  1.21.0 | Local UI icons.                                |

Development and verification dependencies:

| Package                | Version |
| ---------------------- | ------: |
| `@axe-core/playwright` |  4.11.3 |
| `@eslint/js`           |  10.0.1 |
| `@playwright/test`     |  1.61.0 |
| `@types/node`          | 24.10.1 |
| `@vitest/coverage-v8`  |   4.1.9 |
| `axe-core`             |  4.12.1 |
| `eslint`               |  10.5.0 |
| `jsdom`                |  29.1.1 |
| `markdownlint-cli`     |  0.49.0 |
| `prettier`             |   3.8.4 |
| `typescript`           |   6.0.3 |
| `typescript-eslint`    |  8.61.1 |
| `vite`                 |  8.0.16 |
| `vitest`               |   4.1.9 |

License metadata should be reviewed from package distributions during final legal review.

## Visual Assets

All shipped visual assets are project-owned AI-assisted, non-photographic WebP illustrations with provenance entries in `content/assets.json`:

- `VIS_MAP_WESTERN_PACIFIC`
- `VIS_ARCHIVE_DESK`
- `VIS_WINE_FACTORY`
- `VIS_POLICE_OFFICE`
- `VIS_NIGHT_ROOM`
- `VIS_YU_SENSEI_TABLE`
- `VIS_RADIO_OBJECTS`
- `VIS_DOORWAY`
- `VIS_DAWN_ROOM`
- `VIS_COFFEE_SHOP`
- `VIS_ROAD_VEHICLE`
- `VIS_DATE_COMPARISON`
- `VIS_REPORT_DESK`
- `VIS_PORTRAIT_YU_DAFU`
- `VIS_PORTRAIT_ZHAO_LIAN`
- `VIS_CONTEXT_SUMATRA_INVASION`
- `VIS_CONTEXT_PAYAKUMBUH_ADMIN`

The user-provided historical-looking portrait and map/reference images in the local workspace were treated as reference material only and are not imported into the runtime bundle unless provenance and redistribution rights are added later. No hotlinked, unlicensed, or real-person image assets are included in the shipped runtime.

## Audio Assets

- `AUD_MYSTERIOUS_AMBIENCE_SONG21`: "Mysterious Ambience Song21" by OpenGameArt user `yd`, available from <https://opengameart.org/content/mysterious-ambience-song21> under CC0 1.0 / OGA-BY 3.0 / CC-BY 3.0 multi-license.
- `AUD_SOFT_MYSTERIOUS_HARP`: "Soft Mysterious Harp Loop" by OpenGameArt user `cynicmusic`, available from <https://opengameart.org/content/soft-mysterious-harp-loop> under CC-BY 3.0.

The locally supplied `相対性理論 - スマトラ警備隊.mp3` file is not bundled because no redistribution license is present in the repository.
