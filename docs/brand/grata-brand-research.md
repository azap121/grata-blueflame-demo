# Grata Brand & Visual-Language Reference

Research date: 2026-07-26. Sources: live CSS extraction (computed styles + Webflow `:root` custom properties) and viewport screenshots via headless browser. All hex values below were read directly from grata.com's stylesheets unless marked as observed/derived.

---

## 1. PRIMARY — Grata (grata.com)

### 1.1 Color — exact tokens from CSS custom properties

**PRIMARY BRAND COLOR (the one we keep):**

| Token | Hex | Usage |
|---|---|---|
| `--_colors---bright-royal-blue` (aliased as `--_colors---blue`) | **`#2464E3`** | Primary CTA buttons ("Get Started", "Request a Demo"), hero gradient start, link/accent. This is the working primary. |
| `--royal-blue` | `#006BED` | Older/secondary blue, cookie-banner & some links. Treat as legacy; `#2464E3` is the current primary. |

**Secondary / support colors (to be neutralized in our work):**

| Token | Hex |
|---|---|
| `--_colors---deep-indigo-blue` / `--_colors---dark-blue` | `#1B2155` |
| `--_colors---grata-dark` / `--_colors---dark-purple` (hero gradient end) | `#140B2A` |
| `--_colors---teal` | `#00CEC8` |
| `--_colors---dark-teal` | `#13A9A4` |
| `--_colors---light-teal` | `#A2EBDF` |
| `--aquamarine` (hero italic highlight "win deals") | `#5CFFD4` |
| `--_colors---light-blue` / `--cornflower-blue` | `#66A6F4` |
| `--_colors---xlight-blue` | `#A5CFFB` |
| `--ice-blue` | `#B7D8FB` |
| `--_colors---blue-80` | `#4584F0` |
| `--_colors---blue-20` | `#D4E6FA` |
| `--_colors---blue-10` | `#EDF6FF` |
| `--_colors---yellow` | `#E7D54C` (also `--yellow` `#FFF55E`) |
| `--_colors---orange` | `#F58A32` |
| `--_colors---alert-red` | `#F4364C` |

**Grata's own neutral scale (already a clean 25–950 ramp, cool-gray cast):**

| Token | Hex |
|---|---|
| neutral-25 | `#FCFCFD` |
| neutral-50 | `#F8FAFC` |
| neutral-100 | `#EEF2F6` |
| neutral-200 | `#E3E8EF` |
| neutral-300 | `#CDD5DF` |
| neutral-400 | `#9AA4B2` |
| neutral-500 | `#697586` |
| neutral-600 / `--_colors---slate-gray` / paragraph-grey | `#4B5565` |
| neutral-700 | `#364152` |
| neutral-800 | `#202939` |
| neutral-900 | `#121926` |
| neutral-950 | `#0D121C` |
| text-black / charcoal | `#0D111B` |
| off-white | `#FBFBFA` |
| cool-grey (surface) | `#F6F8F9` |

Hero background: `--bg-secondary: linear-gradient(180deg, #2464E3 17.93%, #140B2A 95.43%)` — royal blue melting into near-black indigo.

### 1.2 Typography

- Primary family token: `--_typography---font--primary-family: "Work Sans", Arial, sans-serif`. Headings render in Work Sans; body paragraphs currently fall back to Arial in places (body element declares `Factum, sans-serif`).
- Loaded webfonts observed: **Work Sans** (300/400/500/600), **Factum / Faktum** (400/500/600 — brand-adjacent geometric sans), **Roboto Mono** (400/500/600/700 — used for eyebrow/label/mono moments), Montserrat (legacy, full range), Antarctican Mono 500.
- Type scale tokens (rem): h1 `4rem` (64px), h2 `3rem`, h3 `2.25rem`, h4 `1.75rem`, h5 `1.5rem`, h6 `1.125rem`; text sizes 10/14/16/18/20/24/56px tokens.
- Rendered hero H1: Work Sans 52px, weight 400, line-height 1.2, letter-spacing `-1.04px` (tokens: `-0.06rem` / `-0.08rem`). Headline weight is deliberately LIGHT/REGULAR (300–400), not bold — the "big quiet headline" look. Key phrases highlighted with italic + aquamarine color instead of weight.
- Body: 16–18px, line-height 1.4–1.5. Buttons: Work Sans 500, 13px.
- Line-height tokens: 1 / 1.2 / 1.3 / 1.4 / 1.5. Uppercase used for section eyebrows ("WHY GRATA", "SOURCE & DISCOVER").

### 1.3 Logo treatment

- Inline SVG wordmark: "Grata" in a bold geometric sans, preceded by a compact abstract glyph (angular "S/G"-like mark of stacked bars). Rendered white on the dark indigo header; black (`--nav-color: #000`) on light contexts. No gradient or effects on the logo itself.

### 1.4 Spacing, radius, density

- Fluid clamp-based spacing scale (Webflow "fluid" system): tokens from 4px to 160px, each a `clamp()` interpolating between 20rem and 80rem viewports (e.g. space-32 goes 28px → 32px; space-160 goes 96px → 160px). Section rhythm 64/80/112px.
- Radius tokens: small `.5rem`, main `1rem`, round `100vw`. Buttons however render at ~5px radius — tight, businesslike rectangles, not pills.
- Density feel: marketing-site airy — big section paddings, 12-column grid (`--_default---site--column-count: 12`), gutter 1rem, max-width-small 50rem for prose. Content itself is dense with product nouns (mega-menus, long feature lists) — an enterprise-SaaS "lots to sell" density.

### 1.5 Imagery style

- Hero: pure gradient field (blue → dark indigo) with subtle grid/texture; no photography above the fold.
- Product shown via UI screenshots/AVIF renders in cards; abstract data-ish illustration accents; award badges (G2 etc.) as trust strip.
- Little to no human photography on the homepage — the product and data are the imagery.

### 1.6 Tone of voice

- Confident, loss-averse, punchy: "You can't win deals you can't see." / "Most deal teams think they have full market visibility. They don't."
- Speed and competition framing: "dealmakers who win by moving first", "act sooner", "before your competitors".
- Category vocabulary: "investment-grade data", "verified intelligence", "agentic search", "agentic AI", "MCP". Leaning hard into AI-native positioning (MCP server, Excel add-in + MCP, "AI-Native Deal Sourcing Engine").
- Sentence-case headlines, short declaratives, benefit-first feature blurbs.

### 1.7 Design-system signals

- Full Webflow token system (Lumos-style naming: `--_colors---*`, `--_typography---*`, `--_spacing---*`) — real tokens exist for colors, type scale, fluid spacing, radii, borders (`--_default---border-width--main: .094rem`), focus rings (2px, inner/outer offsets).
- The 12-step neutral ramp (#FCFCFD → #0D121C) is production-grade and can be adopted as-is.
- Weakness/opportunity: many overlapping blues (#2464E3, #006BED, #4584F0, #66A6F4, #A5CFFB, #B7D8FB) and stray accents (teal, aquamarine, yellow, orange) — the palette is broader than it needs to be. Body font inconsistency (Work Sans vs Factum vs Arial fallback).

---

## 2. MODERNIZATION REFERENCES

### 2.1 Model ML — modelml.com

- Aesthetic: cinematic "quiet luxury" finance — full-bleed dusk skyline photography with a lone silhouetted figure; feels like a private bank, not a SaaS startup.
- Color: near-monochrome. Warm off-white `#F5F5F4` (stone) on near-black `#0F1420`-ish navy; text uses opacity tints of stone (0.6, 0.8) rather than extra grays. Single accent: pure link-blue `rgb(0,0,238)` used sparingly for hyperlinks only. Zero decorative color.
- Typography: serif display (**Newsreader**, 56px, weight 400, tight tracking) for headlines; **Geist / Geist Mono / Inter** for UI and body. Serif = judgment, mono = machine-precision labels.
- Agentic outcomes: embedded product mock of the real app — near-white workspace, pale gray left rail (Workflow Builder, Skills, Meetings), centered "Ask anything" prompt bar. The product UI is deliberately colorless so the *content* of the answer is the only thing you look at.
- Density: extremely low on marketing pages (one idea per viewport); the product mock is a calm document-like canvas.
- Buttons: pill (99px radius), translucent stone fill — quiet, not shouting.
- Trust strip: monochrome logos of HSBC, PwC, Deloitte, EY, Moelis — social proof carries the persuasion so the design doesn't have to.
- AI-forward read: restraint + mono type + a single prompt input. "The agent is the product; the chrome disappears."

### 2.2 Rogo — rogo.ai

- Aesthetic: editorial-financial. Hero is dusk NYC video (Empire State, flag) with a giant white serif headline; interior sections flip to warm off-white `#F7F7F7` paper.
- Color: black `#151515`/`#0D0D0D` on off-white; grays `#737373`; icon chips in flat light-gray `#E9E9E9` rounded squares with line icons. Accent is, again, only default link-blue `rgb(0,0,238)`. No brand color at all in the classic sense.
- Typography: display serif **ABC Arizona Mix** (64px, 400, letter-spacing -3.2px — very tight) for headlines; **Inter / Inter Display / BR Sonoma** for body; **Fragment Mono / Rooftop Mono** for eyebrows and data labels. Big serif + small mono is the signature pairing.
- Agentic outcomes: sections literally titled "Agents that understand, and act"; product shots show chat answers with inline numbered citations to filings/transcripts, source panels, and structured tables. Evidence is the hero image.
- Density: two-column editorial layout (big serif claim left, explanatory prose right), hairline dividers, huge whitespace; reads like a research memo, not a landing page.
- Buttons: near-black rectangles, 6px radius, white text — high-contrast, minimal.
- AI-forward read: "trusted AI partner" language, agent taxonomy, citation-first product imagery, mono labels = machine output framed by editorial judgment.

### 2.3 Harvey — harvey.ai

- Aesthetic: the category benchmark. True monochrome: warm near-black `#0F0E0D` sections and warm paper `#FAFAF9` sections alternating; black-and-white photography/film of senior professionals (gray-haired lawyer mid-argument) — craft and seniority, not tech.
- Color: literally no chromatic accent on the homepage. Palette = `#0F0E0D`, `#FAFAF9`, warm grays `#8F8B85`, `#CCCAC6`, `#706D66`. Hierarchy is done entirely with value (light/dark), scale, and space.
- Typography: custom pair — **HarveySerifFont** (72px, 400) for display, **HarveySansFont** for everything else; 16px body. Serif headline + neutral sans body, both proprietary: a "we invested in type, not colors" signal.
- Agentic outcomes: banner copy "Harvey Agents execute legal work end-to-end"; product shots are document-centric — drafted memos, redlines, review tables with source citations, shown in a colorless UI where only the generated artifact has visual weight.
- Density: generous; monumental headlines ("Practice Made Perfect"), few words, large media blocks.
- Buttons: paper-white rectangle, 4px radius, dark text (inverse on dark) — again value-contrast, not color.
- AI-forward read: total chromatic restraint + document-artifact imagery + custom type = "serious tool for serious work"; the absence of tech-blue is itself the differentiator.

### 2.4 Legora — legora.com

- Aesthetic: warm cinematic humanism — golden-hour photography (lawyer at an airport window), Helvetica-grotesk headline overlaid; Scandinavian minimalism.
- Color: the exception that proves the rule — one strong brand color, deep forest green `#005032`, used on the announcement bar, CTA pills, and section blocks; everything else is paper `#FAFAF9`, ink `#0D1016`, warm gray `#68655E`. One color, used with total discipline, on an otherwise neutral canvas.
- Typography: **Aktiv Grotesk** (54px, 400, tight -2.2px tracking) for display; **Suisse Intl** for body; **Fragment Mono** for labels; serif/display fonts (Rhymes, Domaine, Playfair) reserved for editorial moments. Grotesk-led rather than serif-led — closest model to keeping Work Sans.
- Agentic outcomes: "Collaborative AI for exceptional lawyers"; product sections show tabular review grids (rows of documents × AI-extracted columns), chat with cited sources, and word-processor views — structured output as imagery.
- Density: hero is a single sentence; product sections use full-width app screenshots with real density inside them.
- Buttons: pill (48px radius), forest green with white text — the brand color is effectively *only* the CTA/identity color.
- AI-forward read: neutral canvas + one disciplined brand hue + evidence-grid screenshots; proves you can keep a saturated brand color and still read as a modern agentic tool.

### Common pattern across all four

1. Neutral, warm-tinted canvas (`#F5F5F4`–`#FAFAF9` paper, `#0D0D0D`–`#151515` ink) — no colored surfaces.
2. Zero-to-one accent colors; accent reserved for links or the single CTA.
3. Display type carries the brand (serif or tight grotesk, weight 400, negative tracking, huge size) — not color.
4. Mono type for eyebrows, labels, and anything "machine-generated".
5. The agent's *output* (cited answer, review grid, drafted document) is the hero image; the UI chrome around it is deliberately colorless.
6. Photography of people/places at dusk or golden hour for emotion; product UI for proof. No 3D blobs, no gradient meshes.

---

## 3. SYNTHESIS — Grata-blue on a neutralized, outcome-first canvas

**Principle: `#2464E3` stops being a paint color and becomes a signal color.** In current Grata marketing it floods heroes and gradients; in the modernized system it appears only where the user should act or where the brand must be identified. Everything else moves to a neutral canvas so agentic outcomes (evidence panels, citations, structured tables) provide the only other visual interest.

### 3.1 Keep

- **Primary: `#2464E3`** (bright royal blue). Retire `#006BED`, `#4584F0`, teal/aquamarine/yellow/orange as brand colors (keep red `#F4364C` for destructive/error semantics only).
- Grata's existing neutral ramp is genuinely good — adopt it as the system neutral scale rather than inventing one.

### 3.2 Suggested tokens

**Neutral scale (from Grata's own tokens, cool-gray, works light & dark):**

```
neutral-0    #FFFFFF   (elevated surfaces)
neutral-25   #FCFCFD   (app canvas, light)
neutral-50   #F8FAFC   (inset/secondary surface)
neutral-100  #EEF2F6   (hover fills, chips)
neutral-200  #E3E8EF   (borders, dividers)
neutral-300  #CDD5DF   (strong borders, disabled)
neutral-400  #9AA4B2   (placeholder, tertiary text)
neutral-500  #697586   (secondary text)
neutral-600  #4B5565   (body text on light)
neutral-700  #364152   (strong body)
neutral-800  #202939   (dark surface-2)
neutral-900  #121926   (dark surface-1)
neutral-950  #0D121C   (dark canvas / headings on light — pairs with text-black #0D111B)
```

Optionally warm this ramp ~2% toward the Harvey/Rogo paper feel; but staying cool keeps continuity with Grata's data-tool DNA.

**Accent (derived tints/shades of #2464E3):**

```
blue-600  #1D53BF  (hover/pressed)
blue-500  #2464E3  (PRIMARY — CTAs, links, focus, selection, active nav)
blue-100  #D4E6FA  (selected-row fill, badge bg — existing blue-20 token)
blue-50   #EDF6FF  (info surface — existing blue-10 token)
```

**Accent usage rules (the discipline that makes it read AI-forward):**

1. One blue element per view region: the primary action. Secondary actions are neutral (outline/ghost).
2. Links, focus rings, selection states, active filters: blue. Never blue section backgrounds, blue cards, or blue gradients in product UI.
3. Agentic output containers (answer panels, evidence cards, generated tables) are neutral-0 on neutral-25/50 with neutral-200 hairline borders — the output text itself is the darkest thing on screen (neutral-950).
4. Citations/sources: neutral-500 mono chips at rest; blue only on hover/active. Confidence and status via neutral value steps, not rainbow semantics.
5. Marketing hero: keep at most ONE blue moment (CTA or a single highlighted word) — replace the blue→indigo gradient flood with paper `#FCFCFD` or ink `#0D121C` fields.
6. Data-viz: neutral grays for context series, blue for the focal series; never more than one hue per chart.

**Type direction:**

- Keep **Work Sans** as the single UI/body family (it's a tight grotesk in the Aktiv Grotesk/Suisse lane — the Legora model). Kill the Factum/Arial/Montserrat drift.
- Display: Work Sans 300–400 at large sizes with -2%…-3% tracking (Grata already does this — lean in). Optional differentiator: add a serif display (Newsreader-class) for marketing headlines to match the Model ML/Rogo/Harvey "judgment" register — but it's optional, Legora proves grotesk-only works.
- Promote **Roboto Mono 400/500** (already loaded) to a first-class role: eyebrows, citation chips, data labels, timestamps, model/agent names, table numerics (tabular lining figures). Mono = "machine output" signal.
- Scale: display 56/64, h1 40, h2 32, h3 24, h4 18, body 16, secondary 14, label/mono 12–13 uppercase with +2% tracking. Weights: 400 default, 500 emphasis/buttons, 600 max — no 700s.

**Shape/density direction:**

- Radius: 6–8px controls, 10–12px cards (between Grata's 5px buttons and 16px cards; avoid pills unless the whole system commits).
- Hairline borders (1px neutral-200) + flat fills instead of shadows; shadows only for overlays.
- Product surfaces denser than the marketing site: 14px body in tables, 8px vertical rhythm in rows — the Rogo/Legora "research memo" density, with generous margins *around* the dense evidence blocks.

### 3.3 Three-sentence summary for the design team

Keep exactly one brand color — Grata blue `#2464E3` — and spend it only on actions, links, and selection. Move every surface to Grata's own #FCFCFD→#0D121C neutral ramp, with hairline borders and 400-weight tight-tracked Work Sans display, plus Roboto Mono for machine-labeled things. Let the agent's evidence — cited answers, structured tables, generated documents — be the most visually prominent object on every screen, exactly as Harvey, Rogo, Model ML, and Legora do.
