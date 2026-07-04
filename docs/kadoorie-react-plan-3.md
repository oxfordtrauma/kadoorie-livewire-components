# Kadoorie React Component Set — Plan (Part 3 of 3)

> **Plan Set**: `docs/kadoorie-react-plan-*.md`
> **This file**: Part 3 — R3–R7, Testing Strategy, Assumptions
> **Navigation**: [Part 1 — Summary/Architecture](kadoorie-react-plan-1.md) · [Part 2 — Roadmap + R0–R2](kadoorie-react-plan-2.md) · Part 3 (this)

## Table of Contents

1. [Phase R3 — Layout & Navigation](#1-phase-r3--layout--navigation)
2. [Phase R4 — Data & Pages](#2-phase-r4--data--pages)
3. [Phase R5 — Widgets](#3-phase-r5--widgets)
4. [Phase R6 — Workbench + Playwright (functional + WCAG)](#4-phase-r6)
5. [Phase R7 — Installer UX, CI, Docs, Sweep](#5-phase-r7)
6. [Testing Strategy](#6-testing-strategy)
7. [Assumptions & Open Decisions](#7-assumptions--open-decisions)

All R3–R5 phases follow the **porting recipe** (Part 2 §4), carry the standard
React **Definition of Done** (Part 2 §2), and are **parallelisable sub-agents**
depending only on R0. Each returns its own conventional commit message.

---

## 1. Phase R3 — Layout & Navigation

**card, divider, badge, avatar, breadcrumbs, tabs, accordion, nav, dropdown, empty-state, pagination · 13 pts**

| Component | Hooks / notes | data-test parity |
|---|---|---|
| Card | `header`/`title`/`footer` slots (props/children) | `card-header/-footer` |
| Divider | label variant | (n/a) |
| Badge | single component; `tone` + `shape` (mirrors the consolidated Badge) | `badge`, `badge-icon` |
| Avatar | `src`/`initials`/`presence`; raster img only for photo | `avatar` |
| Breadcrumbs | items → ol/li; last = current | `breadcrumbs`, `-item` |
| Tabs / TabPanel | `useRovingTabIndex` (Arrow/Home/End), roving tabindex, `aria-selected`, panel `role=tabpanel` | `tabs/-list/tab-{id}/tab-panel-{id}` |
| Accordion / Item | single vs `multiple`; height transition (CSS) | `accordion/-item-{id}/-trigger-{id}/-panel-{id}` |
| Nav | responsive: inline ≥md, hamburger sheet <md with `useFocusTrap`+`useDismiss`; `sticky` prop | `nav/-menu/-toggle/-sheet/-sheet-link` |
| Dropdown / Item | `useDisclosure`; arrow-nav + focus-return via `useFocusTrap`; `triggerClass`/override `data-test` | `dropdown/-trigger/-menu/-item` |
| EmptyState | heading/description + optional action children | `empty-state-heading` |
| Pagination | windowed page list; prev/next; `aria-current` | `pagination/-prev/-page/-next` |

**Note:** the Tabs component is **reused by the workbench** for Preview/Code
just like the Blade showcase — so it must match the roving-tabindex contract.

> **R3 status: ✅ complete.** All eleven components shipped under
> `resources/react/src/ui/` (`Card`, `Divider`, `Badge`, `Avatar`, `Breadcrumbs`,
> `Tabs`/`TabPanel`, `Accordion`/`AccordionItem`, `Nav`, `Dropdown`/`DropdownItem`,
> `EmptyState`, `Pagination`), backed by the new zero-dep `useRovingTabIndex`
> hook (Arrow/Home/End) and reusing `useDisclosure`/`useFocusTrap`/`useDismiss`
> for the Nav sheet and Dropdown. `variants.ts` gained `badgeSize`/`avatarSize`/
> `presenceClasses`/`presenceLabel` mirrors and the icon registry gained
> `kadoorie:leaf`. All are exported from `index.ts` and registered in the React
> workbench as the `layout-nav` story. Combined functional (`R3.layout.test.tsx`)
> and axe (`R3.a11y.test.tsx`) suites were added. Gates green: Vitest 97 passed,
> `tsc --noEmit` clean, ESLint + Prettier clean, React workbench builds.
> Playwright react-* matrix remains deferred to R6.

**Commit**: `feat(react): Add React layout and navigation components`

---

## 2. Phase R4 — Data & Pages

**data-table (+ `useDataTable`), error-page, login (form) · 8 pts**

- **`useDataTable({ columns, rows, perPage, selectable })`** (adapter) →
  `{ sortField, sortDirection, page, totalPages, pageRows, selected, sortBy(field),
  nextPage(), prevPage(), toggleSelect(id) }` — a faithful client-side port of the
  Livewire `DataTable` logic (`MAX_PER_PAGE`, stable sort, slice). `<DataTable>`
  renders a real `<table class="kad-table-stack">` (same reflow CSS), sortable
  header buttons (`aria-sort`), pagination, and optional select column — **same
  `data-test`s** (`data-table/-table/-th-{field}/-sort-{field}/-row/-select/
  -pagination/-prev/-page/-next`).
- **`<ErrorPage status={404} />`** — a TS `HttpErrorStatus` map (title/description
  for 401–502 + generic fallback), mirroring the enum.
- **`<LoginForm onSubmit={(c) => …} forgotUrl? rememberable />`** — presentational
  form + client validation; **the password stays in component state until the
  host's `onSubmit`** (auth-agnostic; the "never leak the password" contract
  carries over). No dispatch/serialisation of the password.

**Commit**: `feat(react): Add React data table, error page, and login form`

---

## 3. Phase R5 — Widgets

**small-box, info-box, profile-menu, footer · 5 pts**

| Component | Notes | data-test parity |
|---|---|---|
| SmallBox | `tone` solid fill (AA), value/label/icon, optional more-info link | `small-box/-value/-label/-icon/-link` |
| InfoBox | tone icon square, value/label, optional `role=progressbar` | `info-box/-icon/-label/-value/-progress` |
| ProfileMenu | wraps `Dropdown`; **logout** = an `onLogout` callback **or** a host-supplied `logoutUrl` + `csrfToken` prop rendering a POST form (React can't read `@csrf`; the host passes the token from its meta tag) | `profile-menu-trigger/-change-details/-logout` |
| Footer | configurable columns + legal bar; `role=contentinfo` | `footer/-column/-heading/-link/-legal/-legal-link` |

**Commit**: `feat(react): Add React dashboard widgets`

---

## 4. Phase R6

**React workbench parity + Playwright functional + WCAG · 8 pts**

### Tasks

- [ ] Fill `resources/react-workbench/App.tsx` to render **every** React component
      (wrapped in `<ToastProvider>`), importing the compiled `kadoorie.css`, each
      in a labelled section (`data-test="react-showcase-<name>"`) mirroring the
      Blade workbench.
- [ ] `build:react-workbench` → static output; Playwright `react-wcag-*` serve it
      over `file://`; `react-functional-*` drive the Vite dev server (or the built
      output) — reusing `REFERENCE_VIEWPORTS` and `testIdAttribute: 'data-test'`.
- [ ] **Functional specs** `tests/Playwright/react-*.spec.ts` — port the Blade
      specs (forms, overlays, nav, tabs, accordion, data-table, dropdown,
      pagination, login, widgets, validation): keyboard, **focus trap + return**,
      Nav collapse + sticky, DataTable sort/paginate/**reflow**, Toast
      auto-dismiss + **hover-pause**, across the matrix; `expectNoHorizontalScroll`
      on every page. Many assertions copy over verbatim thanks to `data-test`
      parity.
- [ ] **WCAG specs** — axe (`wcag2a`+`wcag2aa`) on each workbench section × 3
      viewports, **zero violations** — this is where **contrast** is verified
      (the jsdom/`vitest-axe` gap from Part 1 §4).
- [ ] Triage any real violation back into the component; re-run Vitest.

**DoD**: `react-functional-*` + `react-wcag-*` green across 360·768·1920; no
h-scroll; ≥44px targets; contrast AA. **Commit**: `test(react): Add React workbench functional + WCAG specs`

---

## 5. Phase R7

**Installer UX, publish flow, CI, docs, final sweep · 8 pts**

### Tasks

- [ ] **Installer UX** — flesh out `kadoorie:install` with **Laravel Prompts**:
      `multiselect('Which component set(s)?', ['Blade (Livewire)', 'React'])`,
      then `confirm('Add a tsconfig path alias and eslint a11y rules?')`; honour
      `--set=`/`--force`; print tailored next-steps per set. Idempotent
      (skip-existing) with a summary table of published files.
- [ ] **Config** — `config('kadoorie.react.path')` (default `resources/js/kadoorie`)
      + publish the stubs (`tsconfig.kadoorie.json`, vite/eslint snippets).
- [ ] **CI** — add a `react` job to `.github/workflows/ci.yml`: `npm ci` →
      `tsc --noEmit` → eslint/prettier (TSX) → `vitest run --coverage` → build the
      React workbench → `playwright test --project=react-*` (Chromium `--with-deps`).
- [ ] **Docs** — `docs/react-guide.md` (install via `kadoorie:install`, importing
      the CSS, wiring Vite, controlled/uncontrolled, the adapters, the security
      notes for Login/ProfileMenu) + update `docs/user-guide.md` (the two sets +
      the installer) + a React parity note in each showcase page is **out of
      scope** (the React set has its own workbench, not the static showcase).
- [ ] **Final sweep** — Pint · Larastan · Pest · `tsc` · ESLint · Prettier ·
      Vitest · Playwright (Blade **and** React matrices) · composer/npm audit.

**DoD**: `kadoorie:install` interactively installs Blade/React/both into a fresh
Testbench app (Pest); CI green including the React job; docs complete.
**Commit**: `feat(react): Add interactive installer, CI, and docs`

---

## 6. Testing Strategy

| Layer | Tool | Scope | Location |
|---|---|---|---|
| Types | `tsc --noEmit` | strict type safety (gate) | `resources/react`, `tests/React` |
| Unit + interaction | Vitest + RTL + `userEvent` | render, props, keyboard, controlled/uncontrolled, adapters | `tests/React/*.test.tsx` |
| Structural a11y | `vitest-axe` | roles/labels/aria on rendered components | `tests/React/*.a11y.test.tsx` |
| Functional (real browser) | Playwright `react-functional-*` | focus trap/return, reflow, Nav/Tabs/DataTable/Toast, no-h-scroll | `tests/Playwright/react-*.spec.ts` |
| WCAG (real browser) | Playwright `react-wcag-*` + axe | zero violations **incl. contrast**, every section × 3 viewports | (React workbench, `file://`) |
| Installer | Pest + Testbench | publish tags + interactive `--set` paths | `tests/Feature/InstallCommandTest.php` |

- **Static styles gap:** contrast + responsive WCAG are asserted **only** in
  Playwright (jsdom can't compute styles — Part 1 §4). Vitest owns structure +
  behaviour; Playwright owns pixels.
- **`data-test` is the cross-set contract** — the React workbench reusing the
  Blade `data-test` names is what keeps the two sets from drifting.
- **TDD** — write the failing Vitest spec first each component; the Playwright
  layer lands in R6.

## 7. Assumptions & Open Decisions

| # | Assumption (override by telling me) |
|---|---|
| A1 | React ships as **source** via the Composer package (publish tag `kadoorie-react`) into `resources/js/kadoorie`; **no npm package**. The consumer supplies `react`, `react-dom`, `typescript`, and a Vite build. |
| A2 | A11y behaviour uses **zero-dep internal hooks** (`useFocusTrap`/`useDismiss`/`useRovingTabIndex`), not Radix — matching the library's dependency-light ethos. Radix/React-Aria is a drop-in alternative if you'd prefer battle-tested primitives (say the word). |
| A3 | `variants.ts` **mirrors the PHP enums by hand**; drift is caught by the workbench `data-test` reuse + Playwright WCAG. **Codegen (PHP enum → TS)** is a future option, out of scope. |
| A4 | Target is **React 18/19 client components** (function components + hooks); no RSC/Server-Component assumption. Mount however the app does (Inertia, a Vite entry, or islands in Blade). |
| A5 | Styling is the **existing compiled `kadoorie.css` + `--kad-*` tokens** (or the Tailwind preset). React introduces **no** new styling system; the installer helps the consumer import it. |
| A6 | **Login/ProfileMenu stay auth-agnostic**: the password never leaves component state until the host's `onSubmit`; logout is an `onLogout` callback or a host-provided `logoutUrl` + `csrfToken` (React can't read Blade's `@csrf`). |
| A7 | Publish path default `resources/js/kadoorie`, configurable via `config('kadoorie.react.path')` and the installer prompt. |
| A8 | The React set is **Laravel-only** by decision — it is validated in a Testbench app + the React workbench, not shipped to npm. If a standalone npm package is wanted later, it's an additive phase (package.json + bundling + types export). |
| A9 | Full parity = all 31 Blade views + 4 Livewire components. The 4 stateful ones (DataTable, Toast, Modal, Login) additionally ship an **adapter** so hosts wire data/behaviour without forking the component. |

---

**Ready to build?** Execute with `superbuild` starting at **R0**
(`docs/kadoorie-react-plan-2.md`), then run R1–R5 as parallel sub-agents, then
R6–R7. Or review/adjust the assumptions above first.
