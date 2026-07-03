# Kadoorie Components — E2E & WCAG Testing Plan

> **Plan Set**: `docs/kadoorie-testing-plan.md` (single file)
> **Depends on**: the shipped component library (`build/component-library` branch)
> planned in `docs/kadoorie-components-plan-*.md`.
> **Goal**: close the outstanding DoD category — **Playwright functional + WCAG
> browser tests** across the viewport matrix.
> **Out of scope (by decision)**: Jest JS coverage / the Alpine-to-modules
> refactor. Inline Alpine is retained; no component views or Pest tests are rewritten.

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Requirements](#2-requirements)
3. [Stack & Detect](#3-stack--detect)
4. [Refactor Assessment](#4-refactor-assessment)
5. [Architecture](#5-architecture)
6. [Phase Roadmap & Estimates](#6-phase-roadmap--estimates)
7. [Phase Details](#7-phase-details)
8. [Testing Strategy](#8-testing-strategy)
9. [Assumptions & Open Decisions](#9-assumptions--open-decisions)

---

## 1. Executive Summary

The library has thorough **Pest** coverage of rendered markup and ARIA
attributes, but the plan's DoD also calls for **Playwright functional** specs
(real keyboard, focus trap/return, Nav collapse + sticky, DataTable
sort/paginate/reflow, Toast auto-dismiss) and **Playwright WCAG** specs
(`@axe-core/playwright`, zero violations at every viewport). Neither exists yet.

This plan delivers both by running `functional` specs against a live Testbench
**workbench** and `wcag` specs against the static **showcase**, across the
**360×800 / 768×1024 / 1920×1080** matrix, and wiring both into CI. **Jest
coverage and the Alpine extraction are explicitly excluded** — the inline Alpine
stays exactly as shipped; the only JS added is a small workbench bootstrap that
registers the Alpine `focus`/`collapse` plugins so live focus-trapping can be
tested.

## 2. Requirements

| # | Decision |
|---|---|
| R1 | Scope = **Playwright functional + WCAG only**. Jest ≥85% and the Alpine→modules refactor are **out of scope**. |
| R2 | Coverage = **all ~30 components**, full viewport matrix. |
| R3 | Host = **both** — workbench server for `functional`/Livewire, static showcase `file://` for `wcag`. |
| R4 | CI = install Chromium + run `functional` + `wcag` on every push/PR. |

Non-functional (project rules): `data-test` selectors only; no horizontal scroll
at any viewport; touch targets ≥ 44×44px; project header on any new JS/TS files;
ESLint/Prettier clean.

## 3. Stack & Detect

**DETECT bypassed** — `CLAUDE.md` + `.claude/rules/*` are complete and this
codebase was just built. Relevant facts:

- `playwright.config.ts` already declares `functional` (`tests/Playwright`) and
  `wcag` (`tests/WCAG`) projects and exports `REFERENCE_VIEWPORTS`;
  `@axe-core/playwright` is installed; browsers are **not** installed yet.
- The **showcase** (`resources/views/showcase/partials/scripts.blade.php`) already
  loads standalone Alpine + `@alpinejs/focus` + `@alpinejs/collapse` via CDN, so
  Alpine components hydrate there with no server.
- The **workbench** (`resources/views/workbench/gallery.blade.php`) uses
  `@livewireScripts` (Alpine core only — **no** focus/collapse plugins yet).
- Interactive components rely on inline Alpine (`tabs`, `accordion`, `dropdown`,
  `nav`, `toast`, `tooltip`, `toggle`, `modal`). This stays unchanged.
- All gate commands run via `docker exec kadoorie-app …`.

## 4. Refactor Assessment

**Confidence: LOW. Recommendation: no refactor.**

Inline Alpine is retained. The only new JS is a ~10-line workbench bootstrap to
register two Alpine plugins with Livewire's managed Alpine (documented Livewire 3
"manual start" pattern). No component views, enums, or Pest tests change, so there
is **zero regression risk** to the 115 passing Pest tests.

## 5. Architecture

### 5.1 Test hosting

```
functional specs ─▶ Testbench workbench (real Livewire + Alpine + focus/collapse)
   tests/Playwright/*.spec.ts        http://127.0.0.1:8123/  (Playwright webServer)

wcag specs ─────▶ Static showcase (docs/showcase/*.html, file://, bundled CSS + CDN Alpine)
   tests/WCAG/*.spec.ts              file://…/docs/showcase/<component>.html
```

- **Functional** → live workbench so Livewire round-trips (DataTable
  sort/paginate, Modal open/close, Toast events) and Alpine focus-trapping run for
  real. The workbench renders **every** example (Alpine + Livewire) live.
- **WCAG** → the deterministic, committed static showcase; axe scans each page with
  no server.

### 5.2 Viewport matrix as Playwright projects

Replace the two projects with **six** (suite × viewport) so `--project` selects
one cell and CI can shard:

```
functional-mobile   (360×800,  webServer baseURL)     wcag-mobile   (360×800,  file://)
functional-tablet   (768×1024, webServer baseURL)     wcag-tablet   (768×1024, file://)
functional-desktop  (1920×1080, webServer baseURL)    wcag-desktop  (1920×1080, file://)
```

`npm run test:e2e` → `--project=functional-*`; `npm run test:wcag` → `--project=wcag-*`.

### 5.3 Workbench Alpine plugins (only JS added)

`@livewireScripts` bundles Alpine core but not the plugins the Modal, Nav sheet,
Dropdown (`x-trap`), and Accordion (`x-collapse`) use. Add a minimal esbuild
bootstrap so the workbench registers them (Livewire manual start):

```js
// resources/js/workbench.js  (project header; workbench-only, not shipped in the package API)
import { Livewire, Alpine } from '../../vendor/livewire/livewire/dist/livewire.esm';
import focus from '@alpinejs/focus';
import collapse from '@alpinejs/collapse';

Alpine.plugin(focus);
Alpine.plugin(collapse);
Livewire.start();
```

The gallery swaps `@livewireScripts` for `@livewireScriptConfig` + the bundled
`workbench.js`. The **showcase is untouched** (already loads plugins via CDN).
Fallback if the vendor `livewire.esm` path is awkward in CI: load the plugin CDN
builds and register on `alpine:init` (assumption A3).

## 6. Phase Roadmap & Estimates

```
P0 Harness bootstrap (5) ── 6 matrix projects + webServer + file:// + axe helper + workbench Alpine plugins
        ▼
   ┌───────────────┬───────────────┬───────────────┬───────────────┐
   ▼               ▼               ▼               ▼               ▼
P1A Forms (3)  P1B Overlays (3) P1C Layout/Nav (5) P1D Data (3)  P1E Pages (2)   [functional, parallel]
   └───────────────┴───────────────┴───────────────┴───────────────┘
        ▼
P2 WCAG axe matrix (5) ── every showcase page × 3 viewports, zero violations
        ▼
P3 CI + global guards + docs (3) ── browsers in CI, no-h-scroll/touch-target guards, green
```

| Phase | Name | Depends on | Parallel with | Estimate | Status |
|---|---|---|---|---|---|
| 0 | Test harness bootstrap | — | — | 5 | ✅ |
| 1A | Functional: form controls | 0 | 1B,1C,1D,1E | 3 | ✅ |
| 1B | Functional: feedback & overlays | 0 | 1A,1C,1D,1E | 3 | ⬜ |
| 1C | Functional: layout & Nav (collapse+sticky) | 0 | 1A,1B,1D,1E | 5 | ⬜ |
| 1D | Functional: data display | 0 | 1A,1B,1C,1E | 3 | ⬜ |
| 1E | Functional: pages (login) | 0 | 1A,1B,1C,1D | 2 | ⬜ |
| 2 | WCAG axe matrix (all pages) | 1A–1E | — | 5 | ⬜ |
| 3 | CI + global guards + docs | 2 | — | 3 | ⬜ |
| | **Total** | | | **29** | |

---

## 7. Phase Details

Each phase is TDD-first (write the failing spec first), carries a **Definition of
Done**, and outputs a **conventional commit message** on completion. **Do not
commit** — the user handles git (rule 08). Gates run via `docker exec kadoorie-app`.

### Standard Definition of Done

```
- [ ] Pint clean · Larastan clean · Pest green (no regressions)
- [ ] ESLint + Prettier clean on any new JS/TS
- [ ] Playwright green for the phase's specs across the viewport matrix
- [ ] No horizontal scroll at any reference viewport; touch targets ≥44×44px
- [ ] data-test selectors only; project header on any new JS/TS file
- [ ] Plan tasks checked off; health-check clean
```

### Phase 0 — Test Harness Bootstrap · 5 pts

**Tasks**
- [x] Rework `playwright.config.ts` into 6 projects (functional × 3 with a
      `webServer` booting the workbench; wcag × 3 with `file://` baseURL). Keep
      `REFERENCE_VIEWPORTS`. Also set `testIdAttribute: 'data-test'`.
- [x] `webServer.command = 'vendor/bin/testbench serve --port=8123'`, `url:
      http://127.0.0.1:8123`, `reuseExistingServer: !CI`, `timeout: 120000`.
- [x] Add **esbuild** dev dep + `resources/js/workbench.js` bootstrap (register
      focus/collapse, manual `Livewire.start()`); `package.json` `build:workbench`
      script → `resources/dist/workbench.js` (gitignored); swap the gallery to
      `@livewireScriptConfig` + the bundle served from `/assets/workbench.js`.
- [x] `tests/Playwright/support/axe.ts` (`expectNoViolations(page)`) and
      `tests/Playwright/support/scroll.ts` (`expectNoHorizontalScroll(page)`).
- [x] `npm run test:e2e` / `test:wcag` map to the project groups; document
      `npx playwright install --with-deps chromium`.
- [x] `tests/Playwright/harness.spec.ts` smoke test: workbench boots Livewire +
      Alpine, inline Alpine hydrates (dropdown), no horizontal scroll. Green ×3.

**Key deltas** — `playwright.config.ts` sketch:
```ts
const WB = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:8123';
const SHOW = pathToFileURL(resolve('docs/showcase')).href;
const cell = (suite, name, viewport, base) => ({
  name: `${suite}-${name}`,
  testDir: suite === 'wcag' ? './tests/WCAG' : './tests/Playwright',
  use: { ...devices['Desktop Chrome'], viewport, baseURL: base },
});
export default defineConfig({
  projects: [
    cell('functional','mobile',{width:360,height:800},WB),
    cell('functional','tablet',{width:768,height:1024},WB),
    cell('functional','desktop',{width:1920,height:1080},WB),
    cell('wcag','mobile',{width:360,height:800},SHOW+'/'),
    cell('wcag','tablet',{width:768,height:1024},SHOW+'/'),
    cell('wcag','desktop',{width:1920,height:1080},SHOW+'/'),
  ],
  webServer: { command: 'vendor/bin/testbench serve --port=8123', url: WB, reuseExistingServer: !process.env.CI, timeout: 120_000 },
});
```

**DoD**: `npx playwright test --list` shows 6 projects; the workbench serves and
its Alpine components (Modal/Nav/Dropdown) trap focus; harness lints clean.

**Commit**: `chore: Configure Playwright matrix, workbench server, and Alpine plugins`

### Phases 1A–1E — Functional Playwright (workbench, matrix) · 3+3+5+3+2 pts

Parallelizable sub-agents; each writes `tests/Playwright/<area>.spec.ts` using
`data-test` selectors against the live workbench, run by the three `functional-*`
projects. Every page-level spec calls `expectNoHorizontalScroll(page)`.

- **1A Forms** (`forms.spec.ts`) ✅: label↔control focus, keyboard entry, error
  `aria-invalid`/`aria-describedby`, toggle Space, radio arrow-group, select
  keyboard, ≥44px targets. **Fixed a real defect**: the Toggle bound
  `aria-checked` with `x-bind` on the non-reactive `$el.checked`, so it never
  updated after interaction (stale state for `role="switch"`); now synced via
  `x-on:change`.
- **1B Overlays/Feedback** (`overlays.spec.ts`): **Modal focus-trap + return on
  Esc/backdrop**, scroll lock; Toast appears on event, auto-dismisses, **pauses on
  hover**; Tooltip hover/focus + Esc; Alert dismiss.
- **1C Layout/Nav** (`nav.spec.ts`, `tabs.spec.ts`, `accordion.spec.ts`): **1920 =
  inline bar, no toggle**; **360/768 = hamburger, sheet hidden→toggled, focus moves
  in, Esc closes + returns focus**; **sticky vs non-sticky scroll assertion**; Tabs
  roving Arrow/Home/End; Accordion expand/collapse single vs multi.
- **1D Data** (`data-table.spec.ts`, `dropdown.spec.ts`, `pagination.spec.ts`):
  DataTable sort toggles `aria-sort` + row order, paginate next/prev, **reflow to
  stacked cards < md**, row select; Dropdown arrow-nav + focus return; Pagination.
- **1E Pages** (`login.spec.ts`): submit validation, error focus, semantic
  landmarks, remember-me + forgot link.

**Representative** — `tests/Playwright/nav.spec.ts`:
```ts
import { test, expect } from '@playwright/test';
import { expectNoHorizontalScroll } from './support/scroll';

test('collapses below md and traps focus in the sheet', async ({ page }, info) => {
  test.skip(info.project.name === 'functional-desktop', 'inline bar at desktop');
  await page.goto('/');
  const toggle = page.getByTestId('nav-toggle');
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.getByTestId('nav-sheet')).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('nav-sheet')).toBeHidden();
  await expect(toggle).toBeFocused();          // focus returned (focus plugin)
});

test('no horizontal scroll', async ({ page }) => {
  await page.goto('/');
  await expectNoHorizontalScroll(page);
});
```

**DoD (per sub-phase)**: specs green across the three `functional-*` projects;
focus + reflow verified; no-h-scroll guard passes.

**Commits**:
```
1A test: Add functional browser specs for form controls
1B test: Add functional specs for overlays and feedback
1C test: Add functional specs for layout, Nav collapse, and sticky
1D test: Add functional specs for data display
1E test: Add functional specs for the login page
```

### Phase 2 — WCAG axe Matrix · 5 pts

**Tasks**
- [ ] `tests/WCAG/<component>.spec.ts` per showcase page + `index.spec.ts`:
      `new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa']).analyze()` → expect
      zero violations, at all three `wcag-*` viewports.
- [ ] Triage any real violation back into the component (fix), then re-run Pest.

**Representative** — `tests/WCAG/button.spec.ts`:
```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('button page has no axe violations', async ({ page }) => {
  await page.goto('button.html');             // baseURL = file://…/docs/showcase/
  const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(violations).toEqual([]);
});
```

**DoD**: zero axe violations across every component page × 3 viewports.

**Commit**: `test: Add WCAG axe-core specs across the viewport matrix`

### Phase 3 — CI + Global Guards + Docs · 3 pts

**Tasks**
- [ ] `.github/workflows/ci.yml` browser job: build CSS + workbench JS,
      `vendor:publish` + `kadoorie:build-showcase`, `npx playwright install
      --with-deps chromium`, run `test:e2e` then `test:wcag` (remove the
      "skip if no specs" guards).
- [ ] Ensure the no-horizontal-scroll + touch-target helpers are applied on every
      page-level functional spec.
- [ ] Update `docs/user-guide.md` (running the browser suite) and check off the
      components-plan DoD boxes for browser tests.
- [ ] Final sweep: Pint · Larastan · Pest · ESLint · Prettier · Playwright
      functional + wcag · composer/npm audit.

**DoD**: CI green including browsers; both matrices pass; docs updated.

**Commit**: `ci: Run Playwright functional and WCAG suites in CI`

---

## 8. Testing Strategy

| Layer | Tool | Scope | Location |
|---|---|---|---|
| Feature | Pest + Testbench | render, state, ARIA (unchanged, 115 tests) | `tests/Feature` |
| Functional | Playwright `functional-*` | keyboard, focus trap/return, reflow, Livewire | `tests/Playwright/*.spec.ts` |
| WCAG | Playwright `wcag-*` + axe | zero violations, every page × 3 viewports | `tests/WCAG/*.spec.ts` |

- **Jest** stays configured but a no-op (no bespoke JS beyond the workbench
  bootstrap, which is integration-tested by the functional suite booting the
  workbench). No coverage target is pursued.
- **Matrix**: 6 Playwright projects (suite × viewport); each page-level spec
  asserts `document.documentElement.scrollWidth <= window.innerWidth`.
- **TDD**: write the failing spec first each phase, then implement.

## 9. Assumptions & Open Decisions

| # | Assumption (override by telling me) |
|---|---|
| A1 | Workbench serves on `:8123` via `vendor/bin/testbench serve`; Playwright `webServer` manages it. |
| A2 | Inline Alpine is retained; **no** component views or Pest tests are rewritten. |
| A3 | Workbench loads focus/collapse via a small esbuild bootstrap (Livewire manual start); CDN-plugin fallback if the vendor `livewire.esm` path is awkward in CI. |
| A4 | WCAG target = axe `wcag2a` + `wcag2aa` tags, zero violations. |
| A5 | Chromium only in CI (add Firefox/WebKit later if desired). |
| A6 | `wcag` specs run against the committed static showcase; regenerate it (`kadoorie:build-showcase`) before the suite if components changed. |
