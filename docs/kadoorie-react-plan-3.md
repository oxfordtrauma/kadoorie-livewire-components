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

> **R4 status: ✅ complete.** Shipped `useDataTable` (bounded `MAX_PER_PAGE=100`,
> spaceship-style stable sort, slice pagination, `ariaSort`, selection),
> `<DataTable>` (reflow `kad-table-stack` table, sortable `aria-sort` headers,
> optional select column, `data-table-*` pagination, EmptyState when empty),
> `<ErrorPage>` (new `httpErrorStatus.ts` mirror of the enum: 401–502 + generic
> fallback, per-instance overrides), and `<LoginForm>` (client validation; the
> password stays in component state until the host's `onSubmit` — never
> dispatched/serialised). All exported from `index.ts` and registered in the
> workbench as the `data-pages` story. Tests added: `R4.data.test.tsx`,
> `R4.a11y.test.tsx`, and `lib/useDataTable.test.tsx`. Gates green: Vitest 112
> passed, `tsc --noEmit` clean, ESLint + Prettier clean, React workbench builds.
> Playwright react-* matrix remains deferred to R6.

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

> **R5 status: ✅ complete.** Shipped `<SmallBox>`, `<InfoBox>`
> (optional `role=progressbar`), `<ProfileMenu>` (wraps `<Dropdown>`; logout via
> `onLogout` callback, or a `logoutUrl` + `csrfToken` POST form rendering a hidden
> `_token`, or a custom `logout` slot — auth-agnostic), and a configurable
> `<Footer>` (`role=contentinfo`). All exported from `index.ts` and registered in
> the workbench as the `widgets` story. Tests added: `R5.widgets.test.tsx`,
> `R5.a11y.test.tsx`. Gates green: Vitest 124 passed, `tsc --noEmit` clean,
> ESLint + Prettier clean. Playwright react-* matrix remains deferred to R6.

**Commit**: `feat(react): Add React dashboard widgets`

---

## 4. Phase R6

**React workbench parity + Playwright functional + WCAG · 8 pts**

### Tasks

- [x] Workbench renders **every** React component across eight `?component=<id>`
      stories (`data-test="story-<id>"`), each mounted as a component and importing
      the compiled `kadoorie.css` (via `main.tsx`) so contrast is measurable. The
      page templates (login, error-page) are isolated stories to keep a single
      `<main>` per page.
- [x] Playwright `react-functional-*` and `react-wcag-*` both drive the Vite dev
      server on `127.0.0.1:8124`, reusing `REFERENCE_VIEWPORTS` and
      `testIdAttribute: 'data-test'`. (WCAG scans the live app rather than
      `file://` — the app is a client-rendered SPA.)
- [x] **Functional specs** `tests/ReactPlaywright/*.spec.ts` (forms, overlays,
      layout-nav, data-table, login, widgets): keyboard, **focus trap + return**,
      Nav collapse, DataTable sort/paginate/**reflow**, Toast auto-dismiss +
      **hover-pause**, login client validation + password-stays-client-side,
      across the matrix; `expectNoHorizontalScroll` on every page. Header-sort and
      the inline/hamburger nav are viewport-gated like the Blade suite.
- [x] **WCAG specs** — `tests/ReactWCAG/stories.spec.ts`: axe (`wcag2a`+`wcag2aa`)
      on each story × 3 viewports, **zero violations** — real **contrast** now
      verified in-browser.
- [x] Triaged the violations/failures the real-browser run surfaced (see below);
      re-ran Vitest (124 pass) with no regressions.

> **R6 status: ✅ complete.** Gates green: React functional **101 passed / 4
> viewport-skipped**, React WCAG **24 passed** (8 stories × 3 viewports, zero
> violations incl. contrast), Vitest 124, `tsc` clean, ESLint + Prettier clean.
> **Five real issues the browser run caught (invisible to jsdom/Vitest):**
> (1) the Vite dev server bound to IPv6-only `localhost`, so Playwright's
> `127.0.0.1` webServer wait timed out → pinned `server.host`/`preview.host` to
> `127.0.0.1`; (2) `main.tsx` invoked `story.render()` as a plain function, so any
> story using hooks threw "Invalid hook call" and never mounted → render the story
> as a component (`<StoryView />`); (3) the compiled CSS `<link>` 404'd under the
> dev server → import `kadoorie.css` in `main.tsx`; (4) `useDataTable.sortBy`
> called `setSortDirection` **inside** the `setSortField` updater — an impure
> updater React StrictMode double-invokes, cancelling the toggle → set each piece
> of state directly; (5) `<Pagination>` couldn't fit a 10-page window at 360px →
> added `flex-wrap`. Also labelled the foundation smoke input for axe.

**DoD**: `react-functional-*` + `react-wcag-*` green across 360·768·1920; no
h-scroll; ≥44px targets; contrast AA. **Commit**: `test(react): Add React workbench functional + WCAG specs`

---

## 5. Phase R7

**Installer UX, publish flow, CI, docs, final sweep · 8 pts**

### Tasks

- [x] **Installer UX** — `kadoorie:install` uses Laravel Prompts `multiselect`
      for the set(s), then `confirm(...)` to publish the tsconfig/eslint stubs;
      honours `--set=`/`--with-config`/`--force`; prints a summary table + tailored
      next-steps; idempotent (skip-existing React source, skip-existing stubs).
- [x] **Config** — `config('kadoorie.react.path')` (default `resources/js/kadoorie`)
      + a `kadoorie-react-config` tag publishing `resources/stubs/tsconfig.kadoorie.json`
      and `resources/stubs/eslint.kadoorie.cjs` (vite snippet lives in the docs).
- [x] **CI** — added a `react` job (`npm ci` → `tsc --noEmit` → `vitest run`); the
      `browser` job now also runs `test:react:e2e` + `test:react:wcag` (Chromium
      `--with-deps`, reusing the built `kadoorie.css`). Lint/format already cover
      the React source and the Playwright spec dirs.
- [x] **Docs** — `docs/react-guide.md` (install, CSS import, Vite alias,
      controlled/uncontrolled, adapters, Login/ProfileMenu security notes) +
      `docs/user-guide.md` gained a "Component sets" section and the two React
      publish tags. The static showcase is Blade-only by design (React has its own
      workbench).
- [x] **Final sweep** — all green (see below).

> **R7 status: ✅ complete.** `kadoorie:install` installs blade/react/both into a
> fresh Testbench app (5 InstallCommand tests). Final sweep green: **Pint 96
> files, Larastan clean, Pest 151/511, tsc + ESLint + Prettier clean, Vitest 124,
> Playwright 431 passed / 13 skipped (all 12 Blade+React projects), composer audit
> 0, npm audit 0**. Fixed a pre-existing dev-tooling audit failure the sweep
> surfaced: the R0 vitest/vite toolchain pulled a **critical** (Vitest UI file
> read) and **high** (Vite dev-server path traversal) advisory — bumped
> `vitest` to ^3.2.4 and `vite` to ^6.4.3 (dev-only; 124 tests still pass).

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
