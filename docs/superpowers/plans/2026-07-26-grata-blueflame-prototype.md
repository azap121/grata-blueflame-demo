# Grata × Blueflame Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the "Grata, powered by Blueflame AI" two-layer IA prototype by forking `one-enterprise-demo`, stripping Datasite/gallery material, rebranding to neutralized Grata tokens, and adding the two-zone home, composer contract (`/` menu, Chat⇄Merlin), Runs surface, Playbooks library, and Create flows; deploy to Vercel.

**Architecture:** Single-bundle rsbuild React 19 SPA (no Module Federation), one top-level app component with a reducer-driven scripted state machine (the manda-aOS fixture pattern — no live agents, no backend). The existing `OneEnterpriseDealOS` project becomes `src/app`; the gallery shell is deleted; a new global rail switches top-level views (Home · Projects · Runs · Playbooks + deal workspace).

**Tech Stack:** React 19, MUI 7 + custom theme (`src/theme/grata`), rsbuild, FontAwesome Pro (vendored), react-router (minimal — single route + basename), @fontsource/work-sans + @fontsource/roboto-mono, Vercel static deploy.

**Spec:** Notion page `3a9d14d0-fac3-81e4-9650-eac5a4ad1a0f` ("9 · Grata × Blueflame — Two-Layer IA & Prototype Plan"). Brand tokens: `docs/brand/grata-brand-research.md` (copied from scratchpad in Task 2).

## Global Constraints

- Node >= 20, public npm only; vendored FA Pro packages stay as `file:` deps — never add registry pointers to `.npmrc`.
- **Prototype code is test-free by repo convention.** Task gates are `npm run type-check` and `npm run build` (both must pass before every commit) plus visual verification in the dev server. The shell's jest tests are deleted along with the shell.
- Only two new runtime deps allowed: `@fontsource/work-sans`, `@fontsource/roboto-mono`.
- Copy rules (verbatim from spec): product wordmark **"Grata"**, attribution **"powered by Blueflame AI"**; the agentic assistant is **"Merlin"** — never "an agent". Retired names must not appear in user-facing copy: **Amp, Ana, Sidecar, Datasite, One Enterprise, Halo**. `@Grata` as a tool mention stays.
- Color discipline: primary `#2464E3` (`blue500`), hover `#1D53BF`, selected fill `#D4E6FA`, info surface `#EDF6FF`; neutral ramp `#FCFCFD → #0D121C` (Grata's own tokens); red `#F4364C` destructive only. One blue element per view region; no blue surfaces/gradients in product UI.
- Type: Work Sans (400 default, 500 emphasis, 600 max), Roboto Mono for eyebrows/citation chips/timestamps/model names/table numerics.
- Autonomy dial vocabulary (keys 1–5): Guide me · Plan first · Draft ahead · Run it · Sandbox. Model roster (Chat mode): GPT-5.5 · Claude Opus 4.8 · Claude Sonnet 4.6 · Gemini 3.1 Pro · Perplexity Sonar.
- Provenance tags rendered platform-wide: `[SOURCE]` `[ASSUMPTION]` `[DERIVED]` `[UNVERIFIED]`.
- Commit at the end of every task; push to `main` (no PRs — repo convention).
- All timed flows use the `src/app/state/timing.ts` constants pattern (scripted `setTimeout` sequences dispatching reducer actions).

---

### Task 0: Fork scaffold — repo hygiene, name, CI strip

**Files:**
- Modify: `package.json` (name → `grata-blueflame-demo`), `vercel.json` (drop the `/projects/...` redirect), `.gitignore` (ensure `dist`, `node_modules`)
- Delete: `Jenkinsfile`, `Dockerfile.halo-app`, `nginx.conf`, `PodTemplate.yml`, `metrics/`, `HALO-OS-INTRO.md`, `PORT-TO-YOUR-BU.md`, `playwright/`, `playwright.config.ts`, `jest.config.js`, `__mocks__/`, `.claude/` (Halo skills — not applicable), `CLAUDE.md` (rewritten in Task 11)
- Create: initial git history

**Interfaces:**
- Produces: a building repo at `~/azap/grata-blueflame-demo` with `npm ci && npm run build` green, pushed to `github.com/azap121/grata-blueflame-demo`.

- [ ] **Step 1:** Delete the Datasite CI/deploy files and gallery test infra listed above. Remove `test`/`prepare` scripts from `package.json`; keep `start`, `build`, `preview`, `type-check`.
- [ ] **Step 2:** `package.json` name → `grata-blueflame-demo`. `vercel.json`: keep `installCommand`/`buildCommand`/`outputDirectory`/rewrites/`X-Robots-Tag: noindex`; delete the `redirects` block (root IS the app after Task 1).
- [ ] **Step 3:** `npm ci` (regenerates clean), `npm run build` → must pass (gallery still intact at this point).
- [ ] **Step 4:** `git add -A && git commit -m "chore: fork one-enterprise-demo as grata-blueflame-demo scaffold"`; `gh repo create azap121/grata-blueflame-demo --public --source . --push`.

### Task 1: Collapse to a single app — delete gallery, shell, sibling prototypes

**Files:**
- Delete: `src/shell/`, `src/projects/registry.ts`, `src/projects/types.ts`, `src/projects/Graham/`, `src/projects/Paza/{EnhancedIndexV2,FolderIntelligencePosc,FolderRecommendationsChatAssistant,StifelDealAssistant,StifelDealAssistantChatFirst,WilliamBlairQaSearch}/`
- Move: `src/projects/Paza/OneEnterpriseDealOS/` → `src/app/` (then delete empty `src/projects/`)
- Modify: `src/routes.tsx`, `src/bootstrap/app.tsx`, `src/bootstrap/local.tsx`

**Interfaces:**
- Consumes: `GalleryWrapper` currently provides `ThemeProvider` + `CssBaseline`; that responsibility moves to the bootstrap.
- Produces: `src/app/index.tsx` default-exports `GrataApp` (still the old component internally until Task 4); route table is exactly `{ path: '/', element: <GrataApp /> }` + `{ path: '*', element: <Navigate to="/" replace /> }`.

- [ ] **Step 1:** Move the app folder (`git mv src/projects/Paza/OneEnterpriseDealOS src/app`), delete siblings/shell/registry. Fix the `~/shared` imports (that dir stays — it is rebranded in Task 3, not deleted; `SearchSpotlight` is reused by Task 4).
- [ ] **Step 2:** Rewrite `src/routes.tsx`:

```tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import GrataApp from './app';

export const router = createBrowserRouter(
  [
    { path: '/', element: <GrataApp /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ],
  { basename: process.env.BASE_PATH || '/' },
);
```

- [ ] **Step 3:** In the bootstrap (whichever of `app.tsx`/`local.tsx` mounted `RouterProvider`), wrap with the theme exactly as `GalleryWrapper` did (`ThemeProvider theme={haloTheme}` + `CssBaseline` — copy the import/usage before deleting the shell).
- [ ] **Step 4:** `npm run type-check && npm run build` → green. Fix any orphan imports (grep `from '~/shell`, `from '../projects`).
- [ ] **Step 5:** Commit `refactor: collapse gallery to single Grata app at src/app`.

### Task 2: Grata token system — theme, fonts, brand doc

**Files:**
- Move: `src/theme/halo/` → `src/theme/grata/` (sed all `~/theme/halo` imports → `~/theme/grata`)
- Modify: `src/theme/grata/theme.ts` (palette + typography swap), `package.json` (+2 fontsource deps), bootstrap entry (font imports)
- Create: `docs/brand/grata-brand-research.md` (copy of the scratchpad brand doc)

**Interfaces:**
- Produces (exported from `theme.ts`, used by every later task): `grataBlue = '#2464E3'`, `grataBlueHover = '#1D53BF'`, `grataBlueSelected = '#D4E6FA'`, `grataBlueInfo = '#EDF6FF'`, `neutral` object with keys `n0 n25 n50 n100 n200 n300 n400 n500 n600 n700 n800 n900 n950` mapping to the ramp in Global Constraints, `monoFontFamily = '"Roboto Mono", monospace'`. Existing exports consumed across the app (e.g. `amber`, `moondust`) must keep compiling: re-point them at ramp/accent values rather than deleting (`moondust` → `n100`, `amber` → `#B45309`-class warning accent used by fresh-deal highlight).

- [ ] **Step 1:** `npm install @fontsource/work-sans @fontsource/roboto-mono`; in the bootstrap entry import weights 300/400/500/600 of Work Sans and 400/500 of Roboto Mono.
- [ ] **Step 2:** `git mv src/theme/halo src/theme/grata` + global sed of imports; rename `haloTheme` export → keep the symbol name if churn is large, but set `typography.fontFamily = '"Work Sans", Arial, sans-serif'`, weights 400/500/600, and swap the palette: `primary.main = grataBlue`, `background.default = n25`, `background.paper = n0`, `divider = n200`, `text.primary = n950`, `text.secondary = n500`. Keep MUI component overrides; adjust border-radius to 8 (controls) / 12 (cards) where the theme sets shape.
- [ ] **Step 3:** Add the new token exports (interface block above) at the top of `theme.ts`.
- [ ] **Step 4:** `npm start` → visual pass: app renders in Work Sans, blue only on primary actions. `npm run type-check && npm run build`.
- [ ] **Step 5:** Commit `feat: Grata token system — #2464E3 signal blue, neutral ramp, Work Sans + Roboto Mono`.

### Task 3: Rebrand chrome + strip Aldgate flows and retired names

**Files:**
- Rename: `src/shared/DatasitePrototypeShell.tsx` → `src/shared/GrataShell.tsx` (and `DatasitePageHeader` → `PageHeader`, `DatasiteProfileMenu` → `ProfileMenu`; update `src/shared/index.ts`)
- Modify: `src/app/state/copy.ts`, `src/app/state/persona.ts`, `src/app/state/types.ts`, `src/app/state/reducer.ts`, `src/app/components/GrataApp.tsx` (still named `FolderRecommendationsChatAssistant.tsx` until Task 4)
- Delete: `src/app/components/{LegalReviewWorkspace,QaTriageReadoutCard,FilingProposalCard,BriefReadoutCard,ValidationPlanWorkspace,ValidationPlanProposalCard,qaTriageData}.tsx/ts`, `src/app/state/{filingScenario,briefScenario,validationPlan}.ts`

**Interfaces:**
- Produces: `WorkspaceFlow = 'sourcing'` (single-member union); `SeatId = 'alex' | 'morgan'`; `DEFAULT_SEAT = 'alex'`; shell top bar shows wordmark `Grata` + mono eyebrow `POWERED BY BLUEFLAME AI`; assistant display name everywhere = `Merlin` (Chat mode header = `Chat`).
- Consumes: reducer branches for `qa`/`filing`/`brief` flows and their `ChatMessageKind`s (`filing-proposal`, `brief-readout`) — all removed with their components.

- [ ] **Step 1:** Remove `tom`/`jaime` from `PERSONAS`; collapse `WorkspaceFlow` to `'sourcing'`; delete the Aldgate components/fixtures and every reducer/action branch that references them (`SELECT_FILING_PROMPT`, `SELECT_BRIEF_PROMPT`, validation-plan actions, `filing-proposal`/`brief-readout` message kinds). Type errors are the worklist — chase them until `type-check` is green.
- [ ] **Step 2:** Rename the shared shell components; replace the Datasite wordmark/logo block with `Grata` (Work Sans 600) + `POWERED BY BLUEFLAME AI` (Roboto Mono 11px, `n400`, letter-spacing 0.08em). Purge profile-menu subscriptions copy referencing Datasite products.
- [ ] **Step 3:** Copy sweep: `grep -rn "Datasite\|One Enterprise\|Amp\b\|Ask Ana\|Sidecar\|Halo" src/ --include="*.ts*"` → every user-facing hit replaced (`Datasite AI` → `Merlin`; `One Enterprise` → `Grata`); code-comment hits may stay only where historically accurate (lineage notes).
- [ ] **Step 4:** `npm run type-check && npm run build`; `npm start` visual pass (home + deal + CIM run still work end-to-end with Alex/Morgan toggle).
- [ ] **Step 5:** Commit `feat: Grata chrome, Merlin naming, Aldgate sell-side flows removed`.

### Task 4: Global rail + top-level view switch

**Files:**
- Rename: `src/app/components/FolderRecommendationsChatAssistant.tsx` → `src/app/components/GrataApp.tsx` (component `GrataApp`)
- Create: `src/app/components/GlobalRail.tsx`
- Modify: `src/app/index.tsx`, `src/app/components/GrataApp.tsx`

**Interfaces:**
- Produces: `type GlobalView = 'home' | 'projects' | 'runs' | 'playbooks'` (exported from `GrataApp.tsx`); `<GlobalRail active={GlobalView | 'deal'} onNavigate={(v: GlobalView) => void} onCreate={(kind: 'project' | 'playbook' | 'agent') => void} onSearch={() => void} />`. `GrataApp` holds `const [globalView, setGlobalView] = useState<GlobalView>('home')` alongside the existing `homeView`/deal state; opening a deal renders the deal workspace regardless of `globalView` (deal is `/projects/{id}` conceptually).
- Consumes: `SearchSpotlight` from `~/shared` for `onSearch` (adds scope chips in Task 6).

- [ ] **Step 1:** Rename the file/component; extract nothing else yet (the 2.5k-line body stays — this task only adds the rail and view switch around the existing render tree).
- [ ] **Step 2:** Build `GlobalRail`: 56px icon rail (collapsible to icons is the default state — labels on hover tooltip), FA Light icons: `faHouse` Home, `faFolderOpen` Projects, `faWavePulse` Runs, `faBookSparkles` Playbooks, `faMagnifyingGlass` Search; `+ Create` as a `grataBlue` filled circular button above Home; footer avatar → `ProfileMenu`. Active item: `grataBlueSelected` pill + `grataBlue` icon (the view's one blue element).
- [ ] **Step 3:** Wire the switch in `GrataApp`: `home` → Task 5's `TwoZoneHome`; `projects` → the existing deal-cards grid (filterable list reusing `DealCardTile`); `runs`/`playbooks` → placeholder `<Box>` until Tasks 7/8. `onCreate` → stub no-op until Task 9.
- [ ] **Step 4:** Gates + visual pass; commit `feat: global rail and top-level view switch`.

### Task 5: Two-zone home

**Files:**
- Rename: `src/app/components/MyDealsHome.tsx` → `src/app/components/TwoZoneHome.tsx`
- Create: `src/app/state/homeFixtures.ts`
- Modify: `src/app/state/dealsFixtures.ts` (headline copy), `src/app/components/GrataApp.tsx`

**Interfaces:**
- Produces from `homeFixtures.ts`:

```ts
export interface NeedsYouItem { id: string; icon: 'gate' | 'qa' | 'review'; title: string; project: string; cta: string; }
export interface OvernightItem { id: string; kind: 'run-finished' | 'signal' | 'doc-landed'; title: string; project: string; timestamp: string; }
export const NEEDS_YOU: NeedsYouItem[] = [
  { id: 'ny-1', icon: 'gate', title: 'CIM screen plan awaiting your approval', project: 'Project Caldera', cta: 'Review plan' },
  { id: 'ny-2', icon: 'review', title: 'Cited review table ready — 1 row flagged', project: 'Project Caldera', cta: 'Open review' },
  { id: 'ny-3', icon: 'qa', title: 'Two diligence questions waiting on you', project: 'Project Meridian', cta: 'Answer' },
];
export const OVERNIGHT: OvernightItem[] = [
  { id: 'on-1', kind: 'run-finished', title: 'Buyer list build finished — 34 candidates', project: 'Project Meridian', timestamp: '02:14' },
  { id: 'on-2', kind: 'signal', title: 'Seller-intent signal fired · GulfAir Mechanical', project: 'HVAC Texas watchlist', timestamp: '05:40' },
  { id: 'on-3', kind: 'run-finished', title: 'Morning Meeting Prep delivered', project: 'Scheduled · 07:55', timestamp: '07:55' },
];
```

- Produces `TwoZoneHome` props: `{ deals, freshDealId, onOpenDeal, onStartSourcing, onAsk }` (unchanged signature from `MyDealsHome`) + `onOpenRuns: () => void`.
- Zone order is the IA statement: composer FIRST (headline `Ask Grata anything`, scope chip `Universe ▾` on the composer, suggestion chips beneath), attention layer SECOND (`Needs you` row of 3 cards, `Overnight` compact list, `Projects` grid of `DealCardTile`s with gradient-stage chips `Watchlist · Target · Live Deal`).

- [ ] **Step 1:** Write `homeFixtures.ts` exactly as above; restyle/reorder `TwoZoneHome` per the zone order; `Needs you` card CTA and `Overnight` rows are mono-labeled (`monoFontFamily`, 12px). `onOpenRuns` on the Overnight section header ("View all runs →").
- [ ] **Step 2:** Home headline → `Ask Grata anything`; the composer keeps routing submits to `onStartSourcing` (the existing Grata-parse flow). Needs-you card #1 CTA calls `onOpenDeal` for Caldera.
- [ ] **Step 3:** Gates + visual pass (zones both visible without scroll at 1440×900); commit `feat: two-zone home — intelligence composer over attention layer`.

### Task 6: Composer contract — slash menu, @ mentions, scope chip

**Files:**
- Create: `src/app/state/playbookCatalog.ts`, `src/app/components/SlashPlaybookMenu.tsx`
- Modify: `src/app/components/ChatComposer.tsx`, `src/app/components/MerlinComposerFrame.tsx`, `src/app/state/merlinFixtures.ts` (roster labels), `src/shared/SearchSpotlight.tsx` (scope chips)

**Interfaces:**
- Produces from `playbookCatalog.ts`:

```ts
export type PlaybookStage = 'Source' | 'Evaluate' | 'Diligence' | 'Valuation & IC' | 'Monitor';
export interface Playbook {
  id: string; name: string; outcome: string; stage: PlaybookStage;
  seats: Array<'PE' | 'IB' | 'Credit' | 'IR' | 'CorpDev'>;
  output: 'Table' | 'Memo' | 'Deck' | 'Model' | 'List' | 'Email' | 'Extraction';
  cadence: 'On demand' | 'Scheduled' | 'Event-triggered';
  scope: 'Personal' | 'Firm' | 'Blueflame';
  credits: number; prompt: string; why?: string;
}
export const PLAYBOOK_CATALOG: Playbook[] = [/* the 18 from the spec §8, e.g.: */
  { id: 'cim-screen', name: 'cim-screen', outcome: 'Screen a CIM against your thesis', stage: 'Evaluate', seats: ['PE'], output: 'Table', cadence: 'On demand', scope: 'Blueflame', credits: 14, prompt: 'Run the buy-side CIM screen on the GulfAir Mechanical CIM against the Caldera thesis.', why: 'because a CIM landed in Documents' },
  /* …sourcing, theme-pursuit, grata-sourcing-similar, addons-platform, lookalike-sourcing,
     cim-merits-risks, public-comps-analysis, cohort-analysis,
     diligence-qa-tracker, gap-analysis, workbook-audit, vdr-diligence-question-sheet,
     lbo-citations, dcf-builder, ic-memo, board-slide,
     morning-meeting-prep (Scheduled), portco-news (Scheduled) */
];
export function playbooksForContext(ctx: { inDeal: boolean; stage?: PlaybookStage }): Playbook[] // recommended-first ordering
```

- Produces `<SlashPlaybookMenu open anchorEl query={string} context={{ inDeal: boolean }} onSelect={(p: Playbook) => void} onBrowseAll={() => void} onClose={() => void} />` — opens when the composer value starts with `/`; `query` is the text after the slash; type-ahead filters `name`+`outcome`; groups: `Recommended` (max 4, each with mono "why" chip when `why` set) then by `stage`; arrow keys + Enter select; footer row `Browse all playbooks →`.
- `onSelect` dispatches the existing `QUEUE_PLAYBOOK { playbookId, prompt }` action (flips composer to Merlin mode exactly as the current rail cards do) and clears the slash text.
- Scope chip: a small mono chip on the composer's left — `Universe` on home, `Project · Caldera` in a deal (display + menu of the four scopes; selecting only changes the chip in this prototype). Same four scopes appear as filter chips in `SearchSpotlight`.
- Mode labels in `MerlinComposerFrame`: segmented `Chat | Merlin`; roster (Chat): `GPT-5.5 · Claude Opus 4.8 · Claude Sonnet 4.6 · Gemini 3.1 Pro · Perplexity Sonar`; model/agent names render in `monoFontFamily`. Credit estimate line in Merlin mode: `est. {credits} credits · hard stop at 50` fed from the queued playbook.

- [ ] **Step 1:** Write `playbookCatalog.ts` with all 18 entries (real names from spec §8; credits 6–22 range, `cim-screen` = 14).
- [ ] **Step 2:** Build `SlashPlaybookMenu` (MUI `Popper` + `MenuList`, ~180 lines); wire into `ChatComposer`: on value starting `/`, render menu anchored to the input; Escape closes and keeps text.
- [ ] **Step 3:** Add the scope chip to the composer and scope filter chips to `SearchSpotlight`; relabel mode toggle + roster; wire the credit estimate to the queued playbook's `credits`.
- [ ] **Step 4:** Gates + visual pass (type `/cim` on home and in the deal → different recommended sets; select → Merlin flip with staged prompt + estimate); commit `feat: composer contract — slash playbook menu, scope chip, Chat/Merlin labels`.

### Task 7: Runs surface

**Files:**
- Create: `src/app/state/runsFixtures.ts`, `src/app/components/RunsView.tsx`
- Modify: `src/app/components/GrataApp.tsx` (mount at `globalView === 'runs'`; Overnight "View all runs" → here)

**Interfaces:**
- Produces from `runsFixtures.ts`:

```ts
export type RunSection = 'needs-you' | 'running' | 'scheduled' | 'recent';
export interface RunRow {
  id: string; playbookId: string; title: string; project: string; section: RunSection;
  state: string;            // e.g. 'Awaiting plan approval', 'Executing · step 3/7'
  meta: string;             // mono line: 'est. 14 credits · Plan first' | 'next fire 07:55 · to Chat' | '9 credits · committed 08:12'
  dial: 'Guide me' | 'Plan first' | 'Draft ahead' | 'Run it' | 'Sandbox';
  steps?: Array<{ label: string; done: boolean; grataCall?: boolean }>;
}
export const RUN_ROWS: RunRow[] = [ /* 2 needs-you (Caldera CIM plan gate, Meridian review), 1 running (buyer list · step trace), 3 scheduled (morning-meeting-prep 07:55, portco-news, seller-intent watch), 3 recent (committed with audit stamps) */ ];
```

- Produces `<RunsView rows={RunRow[]} onOpenRun={(r: RunRow) => void} onOpenProject={(project: string) => void} />`: four titled sections in spec order (`Needs you` first — "the highest-value screen"); each row: state dot (blue only in `needs-you`), title, project link, mono `meta`; clicking a row opens a right slide-over (MUI `Drawer`) with the step trace (reuse the step-list rendering pattern from `CimWorkLog`, domain-language labels, `@Grata` badge on `grataCall` steps) + audit line + dial stamp.
- Needs-you row for the Caldera plan gate deep-links via `onOpenProject('Project Caldera')` → `GrataApp` opens the deal.

- [ ] **Step 1:** Write fixtures (9 rows across the four sections, real playbook ids from the catalog).
- [ ] **Step 2:** Build `RunsView` + drawer; mount in the view switch; wire the two deep-links.
- [ ] **Step 3:** Gates + visual pass; commit `feat: Runs surface — needs-you / running / scheduled / recent`.

### Task 8: Playbooks library

**Files:**
- Create: `src/app/components/PlaybooksView.tsx`
- Modify: `src/app/components/GrataApp.tsx` (mount at `globalView === 'playbooks'`; `SlashPlaybookMenu.onBrowseAll` navigates here)

**Interfaces:**
- Consumes: `PLAYBOOK_CATALOG`, `Playbook` from Task 6.
- Produces `<PlaybooksView onRun={(p: Playbook) => void} onCreate={() => void} />`: Stage as the primary structure (5 stage tabs, `All` default), filter chips for Seat / Output / Cadence / Scope; card grid (outcome-named title, mono name + credits, cadence + scope badges); `Run` on a card → `onRun` (opens Caldera deal with the playbook queued via `QUEUE_PLAYBOOK`); header button `Create playbook` → `onCreate` (Task 9 dialog).

- [ ] **Step 1:** Build the faceted view (~220 lines; filtering is plain `Array.filter` over the catalog).
- [ ] **Step 2:** Wire `onRun` deep-link and mount in view switch.
- [ ] **Step 3:** Gates + visual pass; commit `feat: playbooks library — faceted, stage-primary`.

### Task 9: Create flows + Save as Playbook

**Files:**
- Create: `src/app/components/CreateDialogs.tsx` (menu + `CreatePlaybookDialog` + `CreateAgentDialog`)
- Modify: `src/app/components/GrataApp.tsx` (rail `onCreate` wiring), `src/app/components/CimOutputCard.tsx` (Save as Playbook button)

**Interfaces:**
- Produces: `<CreateMenu anchorEl onPick={(kind: 'project' | 'playbook' | 'agent') => void} />`; `<CreatePlaybookDialog open prefill?: { name: string; steps: string[]; inputs: string[] } onClose />` — fields: name, typed inputs (chip editor), steps (ordered list), output type select, optional schedule, scope radio `Personal (default) | Firm`; choosing Firm reveals an info surface (`grataBlueInfo` bg): `Publishing to Firm scope requires review by a named approver.` Submit → success snackbar `Saved to your playbooks` (fixture-only; no catalog mutation). `<CreateAgentDialog>` — the contract form: identity, tools/capabilities checklist **including explicit denials** (pre-checked rows + one styled denial row `Financials — not granted · staged disclosure`), approval default (dial select), budget cap (number, credits). `create project` pick → routes to the home composer with focus (sourcing IS project creation — promote-to-Project).
- Produces on `CimOutputCard` (accepted state only): tertiary button `Save as Playbook` → opens `CreatePlaybookDialog` prefilled from the run (`name: 'caldera-cim-screen'`, steps from the exec log labels, inputs `['CIM document', 'Thesis']`).

- [ ] **Step 1:** Build `CreateDialogs.tsx` (~320 lines, MUI Dialog, fixture-backed).
- [ ] **Step 2:** Wire rail `+ Create`, Playbooks `Create playbook`, and the `CimOutputCard` capture door.
- [ ] **Step 3:** Gates + visual pass (both doors produce the dialog; Firm reveals the review notice); commit `feat: create flows — playbook + agent authoring, save-as-playbook capture`.

### Task 10: Deal space alignment — context rail labels, Intelligence, provenance

**Files:**
- Modify: `src/app/components/DealRailSections.tsx`, `src/app/components/RightContextCanvas.tsx`, `src/app/components/CimReviewCanvasView.tsx`, `src/app/components/AssistantRail.tsx`

**Interfaces:**
- Produces: deal context-rail section labels exactly `Overview · Documents · Tables · Intelligence · Activity` (rename existing sections; `Q&A`/`Notes` fold away with Aldgate; Tables = the cited review artifacts; Activity = per-deal slice rendered with `RunsView`'s row component filtered to the open project). The rail's agents group header reads `Playbooks` grouped `Source · Evaluate · Diligence · Monitor` (relabel of the existing lifecycle grouping).
- Produces: provenance chips on the cited review table cells/legend using tags `[SOURCE] [ASSUMPTION] [DERIVED] [UNVERIFIED]` in `monoFontFamily` 11px (`n500`; `[UNVERIFIED]` in the destructive red).

- [ ] **Step 1:** Relabel/reroute the rail sections; wire Activity to the filtered runs rows; keep the Intelligence canvas view as-is (already Grata profile + comps).
- [ ] **Step 2:** Add the provenance legend + per-row tags to `CimReviewCanvasView`.
- [ ] **Step 3:** Gates + full visual pass of the deal space in both seats (Alex chat-first, Morgan structure-first); commit `feat: deal space aligned — context rail, activity slice, provenance tags`.

### Task 11: Demo script, docs, final copy sweep

**Files:**
- Create: `BRIEF.md` (repo root), rewrite `README.md`, rewrite `CLAUDE.md`
- Modify: `public/index.html`-equivalent title/favicon (rsbuild config `html.title` → `Grata — powered by Blueflame AI`)

**Interfaces:**
- Produces: `BRIEF.md` = the 8-beat demo script from spec §12 with click-by-click instructions; `README.md` = what/run/deploy; `CLAUDE.md` = single-app architecture notes (no gallery references).

- [ ] **Step 1:** Write the three docs; set the HTML title.
- [ ] **Step 2:** Final sweep: `grep -rn "Datasite\|One Enterprise\|Ask Ana\|Sidecar\|Halo" src/` → zero user-facing hits; `grep -rn "halo" src/theme` → only historical comments allowed.
- [ ] **Step 3:** Gates; walk all 8 beats in the dev server; commit `docs: demo brief, readme, agent notes`.

### Task 12: Deploy to Vercel + live QA

**Files:**
- Create: `.vercel/` (project link — gitignored)

**Interfaces:**
- Produces: production URL `https://grata-blueflame-demo.vercel.app` (scope `pazas-projects`) serving the app with `X-Robots-Tag: noindex`.

- [ ] **Step 1:** `vercel link --yes --project grata-blueflame-demo --scope pazas-projects` then `vercel deploy --prod`.
- [ ] **Step 2:** Verify live: `curl -sI` the URL (200 + noindex header); walk the 8 demo beats on the production URL via the browse skill; fix anything broken → redeploy.
- [ ] **Step 3:** Push final state to GitHub; report the URL.
