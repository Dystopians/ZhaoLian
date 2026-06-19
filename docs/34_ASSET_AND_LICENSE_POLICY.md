# 34 — Asset and License Policy

## General rule

No asset ships without provenance, usage right, creator credit where required, and an accessible description decision.

## Acceptable origins

- Original work created for the project.
- Commissioned work with written redistribution rights.
- Public-domain material with provenance.
- Open-license material compatible with project distribution and attribution.
- Purchased stock only when the license permits distribution in an interactive work and archival release bundle.

## Prohibited origins

- Search-result images copied without license review.
- Hotlinked remote images/audio/fonts.
- “Free” assets with no license text.
- Photos of real people whose rights/provenance are unknown.
- Assets that imitate a named living artist or fabricate a historical photograph without disclosure.
- Font files redistributed without explicit embedding/redistribution rights.

## Asset manifest fields

```text
id
file_path
type
creator
source_url_or_contract
license
attribution_text
modifications
historical_subject
alt_text_or_decorative
review_status
reviewer
date
```

## Real photographs

- Restrict to post-game contextual material unless a separate design review approves in-story use.
- Caption date, location, photographer/institution if known, and whether the image is illustrative rather than the exact site/person/time.
- A modern Payakumbuh photo must not be presented as 1945.
- A Padang colonial street must not be labeled as Payakumbuh.

## AI-assisted assets

If AI-generated or AI-assisted visual/audio assets are used:

- disclose the process in credits;
- do not generate a fake documentary photo and present it as archival;
- avoid identifiable imitation;
- retain prompts/workflow records if required by project policy;
- conduct historical/cultural artifact review;
- ensure distribution rights under the tool's terms.

Original human-created or licensed archival materials are preferred for final release.

## Fonts

Prefer system font stacks or open-source fonts with clear web embedding licenses. Do not include proprietary font files in the repository or release bundle without permission.

## Third-party code

Generate a license report. Runtime and development dependencies must have compatible licenses and attribution where required.

## Release gate

The build may include placeholders in development, but production build fails or emits a release-blocking report if any manifest item remains `UNKNOWN` or `UNREVIEWED`.
