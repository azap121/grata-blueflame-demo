# CLAUDE.md

## What this repo is

A self-contained, fixture-driven prototype of "Grata, powered by Blueflame AI" — the
two-layer IA for the Grata × Blueflame merge. Single-bundle rsbuild React 19 SPA; no
backend, no live agents. Read `BRIEF.md` for the demo script and the IA argument, and
`docs/superpowers/plans/2026-07-26-grata-blueflame-prototype.md` for how it was built.

## Commands

```bash
npm ci             # public registry + vendored FA Pro (file: deps) — no private registry auth
npm start          # rsbuild dev server, http://localhost:9000
npm run build      # production build → dist/
npm run type-check # tsc --noEmit — the main gate; there is no lint or test setup
```

Prototypes here are test-free by design: gates are `type-check`, `build`, and a visual
pass in the browser. Push to `main`, no PRs.

## Architecture

- `src/app/components/GrataApp.tsx` — the root: global rail (Home · Projects · Runs ·
  Playbooks · Search · + Create), top-level view switch, and the deal workspace host.
  The deal workspace is reducer-driven (`src/app/state/reducer.ts`) with timed, scripted
  flows (`state/timing.ts` pattern): sourcing → promote, the CIM run (plan gate →
  glass-box → cited table → commit gate), Merlin mode + autonomy dial.
- `src/app/state/playbookCatalog.ts` — the ~18-playbook catalog (facets: Stage primary,
  Seat/Output/Cadence/Scope). Feeds the `/` composer menu (`SlashPlaybookMenu`), the
  Playbooks library, and the Merlin credit estimates. The hero run's id is
  `pe-cim-screen` — the reducer keys the scripted CIM scenario off that exact id.
- `src/theme/grata/theme.ts` — the token system. `moondust` is remapped to Grata's
  neutral ramp (every legacy consumer picks it up); brand tokens are `grataBlue`
  (#2464E3, one blue element per view), `neutral`, `monoFontFamily`. Fonts load via
  @fontsource imports in `src/bootstrap/`.
- `src/shared/GrataShell.tsx` — left rail + top bar chrome (wordmark + "POWERED BY
  BLUEFLAME AI" eyebrow, `primaryAction` slot for + Create).

## Copy rules (enforced)

Product = "Grata"; the agentic assistant = "Merlin" (never "an agent"); platform
attribution = "powered by Blueflame AI". Retired names must not appear in UI copy:
Amp, Ana, Sidecar, Datasite, One Enterprise, Halo. `@Grata` as a tool mention stays.
Provenance tags render as `[SOURCE] [DERIVED] [ASSUMPTION] [UNVERIFIED]` in mono.

## Known intentional leftovers

Some unreachable Aldgate-era reducer branches and canvas views (Q&A triage, filing,
brief) remain compiled-but-unwired — removed from every entry point, kept to avoid
deep surgery on the 1000-line state machine. Don't re-wire them; delete opportunistically.
