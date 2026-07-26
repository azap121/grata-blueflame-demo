# Grata, powered by Blueflame AI — prototype

The two-layer IA for the Grata × Blueflame merge, made clickable: an overall layer
(intelligence composer + attention layer) and a focused Project space per deal
(chat-first, right evidence canvas, governed runs). Everything is a scripted,
fixture-driven state machine — no live agents, no backend, fictional companies.

**Live:** https://grata-blueflame-demo.vercel.app
**Demo script:** `BRIEF.md` · **Build plan:** `docs/superpowers/plans/2026-07-26-grata-blueflame-prototype.md` · **Brand tokens:** `docs/brand/grata-brand-research.md`

## Run

```
npm ci
npm start        # rsbuild dev server on :9000
npm run build    # outputs dist/
npm run type-check
```

Node >= 20. Public npm only — FA Pro icon packs are vendored at `vendor/@fortawesome/` as `file:` deps.

## Deploy

Vercel project `grata-blueflame-demo` (scope `pazas-projects`), static `dist/` with SPA rewrites and `X-Robots-Tag: noindex`. `vercel deploy --prod` from the repo root.

## Where things live

```
src/
├── app/                    the whole product
│   ├── components/         GrataApp (shell + view switch), TwoZoneHome, RunsView,
│   │                       PlaybooksView, CreateDialogs, SlashPlaybookMenu,
│   │                       ChatComposer / MerlinComposerFrame, the deal canvas views
│   └── state/              reducer + fixtures: playbookCatalog, runsFixtures,
│                           homeFixtures, dealsFixtures, cimRunScenario, merlinFixtures
├── shared/                 GrataShell (left rail + top bar), SearchSpotlight, ProfileMenu
└── theme/grata/            the token system — #2464E3 signal blue, Grata neutral ramp,
                            Work Sans + Roboto Mono (see theme.ts exports)
```

Forked from `azap121/one-enterprise-demo`; lineage and what was stripped are in `BRIEF.md`.
