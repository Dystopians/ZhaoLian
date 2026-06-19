# 36 - Free Audio Library Research

This document collects open and no-cost audio sources for future scene-specific
music expansion. It is a sourcing guide, not approval to ship any individual
track. Every selected file still needs per-track license review, local storage,
manifest metadata, attribution text, loop testing, and verification.

## Fit for this project

The soundtrack should create ordinary rooms, paper, rain, waiting, and archival
pressure. It must not turn the disappearance into spectacle, a puzzle reward, or
a solved death scene. Preferred music is sparse, low-dynamic, slow to medium
tempo, and easy to fade under reading.

Prefer these licenses and origins:

- Original or commissioned audio with written redistribution rights.
- Public-domain or CC0 recordings with source proof.
- CC-BY tracks where attribution can be shown in credits and
  `content/assets.json`.
- OGA-BY tracks only after checking the exact version and attribution wording.

Avoid these unless there is a written product decision:

- NC, ND, SA, GPL, or unclear multi-license audio for runtime shipping.
- "Royalty free" pages that do not publish redistribution terms.
- Hotlinked audio, streaming-only terms, or platform-only music libraries.
- Prominent stingers, horror risers, battle drums, gunshots, screams, or
  triumphant cues.

## Library shortlist

| Source                                                                                                                | Best use in this game                                         | License posture                                                                                                                                                     | Recommendation                                                                                   |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [OpenGameArt](https://opengameart.org/content/faq)                                                                    | Seamless game loops, ambient beds, restrained investigation   | OGA hosts assets under several free licenses; exact track terms must be checked. Prefer CC0, CC-BY, and simple OGA-BY.                                              | Primary source for game-ready loops. Avoid GPL and share-alike ambiguity unless reviewed.        |
| [Freesound](https://freesound.org/help/faq/#licenses)                                                                 | Ambience and SFX: rain, insects, fans, paper, doors, clogs    | Per-sound Creative Commons licenses. CC0 and CC-BY are viable; NC sounds are not runtime candidates for this project.                                               | Primary source for environmental loops and small sound objects, not full BGM.                    |
| [Free Music Archive](https://freemusicarchive.org/License_Guide)                                                      | Experimental, ambient, documentary, and low-key instrumental  | FMA artists choose individual CC licenses; free access does not mean every track is usable in a redistributed game.                                                 | Strong discovery source. Filter to CC0/CC-BY and preserve track pages as evidence.               |
| [ccMixter / dig.ccMixter](https://ccmixter.org/how-to-attribute-ccmixter-tracks)                                      | Instrumental beds, montage-like memory layers, ending codas   | Tracks are Creative Commons with clear attribution conventions; CC-BY can be commercially reused with credit, while NC is personal/noncommercial only.              | Good for carefully chosen instrumental tracks; avoid lyric-forward or pop-coded pieces.          |
| [Musopen](https://musopen.org/music/)                                                                                 | Sparse classical piano/strings, menu, appendix, credits       | Musopen focuses on royalty-free and public-domain classical recordings, but individual icons/restrictions still need checking.                                      | Useful for restrained historical texture if it does not over-romanticize the case.               |
| [Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia)                     | Archival recordings and public-domain/CC media with metadata  | Almost all Commons media is reusable subject to its file-page license terms; attribution and share-alike requirements vary.                                         | Good for source-rich public-domain finds; inspect each file page and avoid unsupported claims.   |
| [Open Music Archive](https://www.openmusicarchive.org/)                                                               | Historical out-of-copyright recordings for appendix material  | The archive is UK-focused and warns that public-domain status can differ outside the UK.                                                                            | Research-only unless US and release-territory rights are verified for the exact recording.       |
| [Library of Congress Citizen DJ](https://citizen-dj.labs.loc.gov/)                                                    | Public-domain samples, distant period texture, optional study | Citizen DJ presents free-to-use Library of Congress audio/video materials; each collection still needs cultural and contextual review before narrative use.         | Useful for samples or appendix texture, especially if processed into non-diegetic sound.         |
| [Internet Archive recorded sound](https://blog.archive.org/2022/01/01/welcoming-recorded-music-to-the-public-domain/) | Pre-1923 public-domain research and historical audio context  | Internet Archive includes public-domain and CC materials, but item-level rights vary. Pre-1923 US recordings gained clearer public-domain status under current law. | Useful research source; never assume every IA audio item is reusable.                            |
| [Pixabay Music](https://pixabay.com/service/terms/)                                                                   | Placeholder beds during internal testing                      | Pixabay uses its own content license and notes possible Content ID claims for music.                                                                                | Secondary only; keep exact certificate/terms if used and prefer clearer CC/public-domain assets. |
| [Incompetech](https://incompetech.com/music/royalty-free/licenses/)                                                   | Recognizable CC-BY music, fallback credits/menu candidates    | Creative Commons use is free with credit; tracks are copyrighted and not public domain.                                                                             | Use sparingly because the catalogue is widely recognized and can shift tone too strongly.        |
| [Openverse](https://openverse.org/)                                                                                   | Discovery across CC/open audio sources                        | Openverse is a search tool, not the rights source. The original host page still controls the usable license evidence.                                               | Useful for discovery only; always record the original file page and license URL.                 |

Deprecated or not primary:

- [FreePD](https://freepd.com/) is not a dependable active source for this
  project in 2026; do not plan new runtime assets around it unless the owner
  provides a stable archived source and license evidence.
- YouTube Audio Library is not a primary source for this static web release
  because platform-library terms and download evidence are harder to preserve in
  the repository than CC/public-domain file pages.

## Scene sourcing matrix

| Scene group                         | Audio goal                                                       | Candidate sources                     | Search terms and filters                                                                       |
| ----------------------------------- | ---------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Title, archive desk, methodology    | Still paper, low room, quiet unresolved inquiry                  | OpenGameArt, FMA, Incompetech         | `ambient`, `mysterious`, `minimal`, `drone`, CC0/CC-BY, loopable, no strong melody             |
| Wine factory and rainy civic space  | Wet roof, crates, ordinary labor, not danger scoring             | Freesound, OpenGameArt                | `soft rain loop`, `wood crate`, `bottle`, `room tone`, CC0/CC-BY, seamless                     |
| Translation and police office       | Institutional pressure, lamps, list handling, low pulse          | OpenGameArt, FMA, ccMixter            | `dark ambient`, `archive`, `paper`, `low drone`, instrumental, no horror riser                 |
| Night room and identity exposure    | Air thins; silence and fan matter more than melody               | Freesound, OpenGameArt                | `room fan`, `night insects`, `distant room`, `minimal loop`, no sting                          |
| Departure threshold                 | Wooden clogs recede, door, then quiet                            | Freesound                             | `wooden footsteps`, `clogs`, `door close`, `night ambience`, CC0/CC-BY; no vehicle certainty   |
| Waiting and dawn                    | Repetition without alarm; time stretches but does not count down | Freesound, Musopen, OpenGameArt       | `dawn ambience`, `morning birds distant`, `soft room`, sparse piano optional                   |
| Interviews and testimony comparison | Different witness zones without assigning guilt to a group       | FMA, ccMixter, OpenGameArt, Freesound | `field recording`, `rain street`, `quiet guitar`, `documentary ambient`, instrumental          |
| Date comparison and final report    | Cross-checking, evidence tension, no solved-answer fanfare       | OpenGameArt, FMA, Musopen             | `typewriter`, `paper`, `minimal piano`, `subtle drone`, avoid climax/crescendo                 |
| Ending settlement screens           | Six non-ranked codas with distinct texture but equal dignity     | Musopen, FMA, ccMixter, OpenGameArt   | one coda family per ending, public-domain/CC-BY preferred, no last-words implication           |
| Credits and attribution             | Gentle release of attention                                      | Musopen, Incompetech, FMA             | `calm piano`, `plain strings`, `documentary`, stable attribution, no sentimental overstatement |

## Per-track review checklist

Before adding any track to `assets/audio/`, record:

- scene group and intended cue ID;
- source URL, creator, track title, download date, and license URL;
- exact attribution text;
- whether commercial redistribution, modification, and local bundling are
  allowed;
- whether attribution is required and where it will appear;
- whether the track has Content ID or platform-claim risk;
- loopability, loudness normalization status, and file size;
- caption text for meaningful non-speech cues;
- tone review against the prohibited-effect list in `docs/15_AUDIO_SPEC.md`.

Then add:

- local file under `assets/audio/`;
- asset record in `content/assets.json`;
- runtime mapping in `src/content/mediaAssets.ts`;
- credit text through the attribution generator path;
- focused tests or smoke checks for post-interaction playback and mute behavior.

## Suggested expansion batches

1. Ambience batch: rain day, night insects, room fan, dawn, doorway, paper.
2. Investigation batch: archive, police office, testimony, date comparison.
3. Ending batch: six soft coda textures, one per ending, all non-ranked.
4. Credits batch: one licensed track or silence-forward ending credit bed.

The safest first pass is to collect two to three candidates per scene group in a
review sheet, reject any track with unclear redistribution terms, and only then
download final choices into the repository.
