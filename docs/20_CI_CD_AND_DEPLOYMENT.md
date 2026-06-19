# 20 — CI/CD and Deployment

## Continuous integration

A pull request and default-branch workflow must run from a clean checkout:

1. install locked dependencies;
2. compile ink and validate content;
3. format check and Markdown lint;
4. TypeScript type check;
5. ESLint;
6. unit/integration tests with coverage;
7. narrative traversal and historical-content lint;
8. production build;
9. Playwright E2E in at least Chromium on every PR;
10. expanded cross-browser and accessibility suite on default branch/release.

## Recommended scripts

```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "preview": "...",
    "typecheck": "...",
    "lint": "...",
    "format": "...",
    "format:check": "...",
    "test": "...",
    "test:coverage": "...",
    "test:narrative": "...",
    "test:history": "...",
    "test:e2e": "...",
    "test:a11y": "...",
    "validate:content": "...",
    "verify": "..."
  }
}
```

`verify` must run every release-blocking non-browser check and either run E2E itself or clearly invoke a documented `verify:full` used by CI. Prefer one command that gives the strongest practical confidence.

## GitHub Pages

Provide a workflow that:

- builds with the correct base path;
- uploads only production `dist/`;
- deploys from protected default branch or release tag;
- uses official maintained actions pinned to appropriate major or immutable commit policy;
- does not expose secrets in static output.

## Other static hosts

Document deployment to a generic static host. Include fallback/404 behavior if client-side history routing is used; hash or simple view routing is preferred to avoid server rewrite dependence.

## Preview deployments

Optional. If configured, they must not include analytics or private source drafts. Historical-review branches may need access control outside the app; do not build authentication into v1 solely for previews.

## Release artifacts

For each tagged release produce:

- production static bundle;
- source archive;
- checksum file;
- generated source/claim report;
- test report summary;
- license/attribution bundle;
- release notes.

## Versioning

Use semantic versioning for the application. Track separately:

- app version;
- content version;
- save schema version;
- source-register revision.

A prose-only historical correction may still require a content version increment and release note.

## Rollback

Keep prior static release artifacts. A rollback must not destroy local saves; compatibility or migration should be tested where possible.
