# 22 — Security

## Threat model

The app is static, but it processes bundled narrative/content and user-imported save files. Main risks:

- script/HTML injection through imported strings or compromised content;
- malicious or oversized save files causing denial of service;
- dependency/supply-chain compromise;
- accidental secrets or unpublished source notes in the bundle;
- unsafe external links;
- service-worker cache trapping old vulnerable assets if PWA features are added.

## Requirements

- Never render imported or narrative strings through unsanitized `innerHTML`.
- Prefer `textContent` and DOM creation APIs.
- Apply strict schema and size limits to imports before parsing deeply.
- Reject prototype-pollution keys and unexpected object shapes.
- Keep no secrets in client code, build variables, source maps, or CI logs.
- External links use safe attributes and clearly identify leaving the app.
- Use same-origin local assets; no third-party runtime scripts.
- Lock dependencies and use automated dependency review/audit.
- Generate source maps according to release policy; public maps must not expose private research notes.

## Content Security Policy

Provide recommended static-host headers approximating:

```text
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self';
  img-src 'self' data:;
  media-src 'self';
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none';
  form-action 'self';
```

Avoid inline scripts/styles that force unsafe CSP exceptions. Adjust only with documented need.

## File import

- Accept only expected JSON extension/MIME as a hint, then validate actual content.
- Maximum file size defined and tested.
- Parse in a guarded path; consider worker parsing only if necessary.
- Display errors as controlled text, never reflect raw payload as markup.

## Dependency licensing and provenance

Security review includes license and maintainer health. No package added merely for a trivial helper.

## Vulnerability response

Document:

- how to report a vulnerability;
- supported versions;
- severity triage;
- emergency static rollback;
- save-schema compatibility during security updates.
