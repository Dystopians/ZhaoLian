# 18 — Save, Privacy, and Telemetry

## Privacy stance

Core play requires no account, server, tracking cookie, fingerprinting, advertising ID, or third-party analytics. The privacy page should plainly state that saves remain on the device unless exported by the player.

## Save slots

- One autosave per active run.
- At least three manual save slots or named checkpoints.
- Completed-run archive stores ending and report text separately from active saves.
- Show last updated time, chapter, and content version.

## Autosave points

- chapter entry;
- after choice resolution;
- before report confirmation;
- after ending generation.

Avoid autosaving during a half-applied transaction.

## Export format

Suggested envelope:

```json
{
  "format": "zhao-lian-save",
  "saveVersion": 1,
  "contentVersion": "1.0.0",
  "exportedAt": "ISO-8601",
  "payload": {},
  "checksum": "optional-integrity-check-not-security-signature"
}
```

- Use JSON, UTF-8.
- Never include executable code or HTML.
- Validate size, structure, versions, enum values, and string lengths on import.
- Do not trust checksum as authentication.

## Migration

- Save schema has explicit integer version.
- Each version upgrade has a pure migration with tests.
- Unsupported future version fails with a helpful message.
- If narrative knot paths change, map stable checkpoints or provide a safe chapter-start recovery.

## Data deletion

Settings provide:

- delete current run;
- delete all story saves;
- reset settings;
- delete all local game data.

Destructive actions require confirmation and state exactly what remains.

## Telemetry

v1 ships with no remote telemetry. If later introduced:

- must be opt-in;
- cannot include full transcript, report wording, imported file contents, IP-derived profiles, or accessibility settings;
- needs a new privacy review and specification update;
- core function cannot depend on consent.

## Crash reporting

No remote crash SDK by default. A local diagnostics export may include app version, browser family, scene ID, and sanitized error stack, only when the user actively downloads it.
