# Kadoorie React Component Set — Plan (Part 1 of 3)

> **Plan Set**: `docs/kadoorie-react-plan-*.md`
> **This file**: Part 1 — Summary, Requirements, Research, Architecture, Refactor
> **Navigation**: Part 1 (this) · [Part 2 — Roadmap + R0–R2](kadoorie-react-plan-2.md) · [Part 3 — R3–R7 + Testing + Assumptions](kadoorie-react-plan-3.md)
> **Builds on**: the shipped Blade/Livewire library (`docs/kadoorie-components-plan-*.md`,
> `docs/kadoorie-testing-plan.md`, `docs/kadoorie-widgets-plan.md`) — all complete.

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Requirements](#2-requirements)
3. [Stack & Detect](#3-stack--detect)
4. [Research Findings](#4-research-findings)
5. [Refactor Assessment](#5-refactor-assessment)
6. [Architecture](#6-architecture)

---

## 1. Executive Summary

Ship **React equivalents of all ~35 components** alongside the existing
Blade/Livewire set, and add an **interactive `php artisan kadoorie:install`**
command that lets a consumer choose which set(s) to install after pulling the
Composer package.

Per the intake decisions:

- **Both** — presentational/headless React components for every component, plus
  **optional adapter hooks** for the stateful ones (DataTable, Toast, Modal,
  Login) so a host can wire data/behaviour without the component hard-coding it.
- **Laravel-only distribution** — the React set ships as **source** inside the
  Composer package (`resources/react/`) and is **published into the app's
  `resources/js/kadoorie/`** by the installer (shadcn-style "own the code"). No
  standalone npm package; the consumer builds it with their own Vite.
- **Interactive installer** — `kadoorie:install` (Laravel Prompts) asks Blade /
  React / both and wires the chosen set(s).
- **Full parity** — all 31 Blade views + 4 Livewire components get React versions.

The React set **reuses the existing design system unchanged**: the same
`--kad-*` tokens, the same compiled `resources/dist/kadoorie.css` (or the
Tailwind preset), the same `data-test` selectors, and the same WCAG 2.1 AA /
responsive (360·768·1920) / 44px-target contracts. That lets the **existing
Playwright harness** extend to a React workbench and, in many cases, reuse the
same `data-test`-based specs.

**Estimated total: ~81 points** across 8 phases (R0–R7).

## 2. Requirements

| # | Decision (from intake) |
|---|---|
| R1 | React components are **presentational/headless** (props + callbacks + local state, reusing `--kad-*` + the compiled CSS), **plus optional adapters** (`useDataTable`, a Toast provider/bus, `useDisclosure`, a `LoginForm` `onSubmit`) for the stateful components. |
| R2 | **Laravel-only**: React ships as **source** in the Composer package and is **published** into `resources/js/kadoorie/`. **No npm package.** The consumer supplies `react`/`react-dom`/`typescript` and a Vite build. |
| R3 | **Interactive installer** `php artisan kadoorie:install` (Laravel Prompts) chooses Blade / React / both and publishes/wires the chosen set(s). Idempotent; `--force` to overwrite. |
| R4 | **Full parity** — a React version of every component (form controls, feedback/overlays, layout/content, data display, widgets, pages). |
| R5 | Same non-functional bar as the library: **WCAG 2.1 AA**, responsive at 360·768·1920 with no horizontal scroll, ≥44px touch targets, unique kebab-case `data-test` on meaningful elements, strict TypeScript, and the project file header on every `.ts`/`.tsx` file. |
| R6 | **TDD-first** per phase: Vitest + React Testing Library (+ `vitest-axe`) unit/interaction tests, then real-browser **Playwright** functional + WCAG via a React workbench. |

## 3. Stack & Detect

**Existing** (from `.claude/rules/*`, complete for the PHP side): PHP 8.3 /
Laravel 11–12 / Livewire 3 / Alpine / Tailwind 3 + a JS toolchain (esbuild,
ESLint 9 flat config, Prettier, Jest, Playwright with a 6-project matrix).
`laravel/prompts` is already present (transitive) — the installer can use it.

**New stack this plan introduces (⇒ Phase R0 bootstrap required):**

| Concern | Choice |
|---|---|
| Language | **TypeScript** (strict), React 18/19 function components + hooks |
| Component test runner | **Vitest** + `@testing-library/react` + `@testing-library/user-event` + `@testing-library/jest-dom` + `jsdom` |
| Runtime a11y (unit) | **`vitest-axe`** (`.a11y.test.tsx`) — structural only (jsdom caveat, §4) |
| Static a11y | **`eslint-plugin-jsx-a11y`** + `eslint-plugin-react-hooks` |
| Dev/workbench build | **Vite** + `@vitejs/plugin-react` (a React workbench for Playwright) |
| Typecheck gate | `tsc --noEmit` |
| Real-browser E2E/WCAG | **Playwright** (existing harness, extended with React-workbench projects) |

**RESEARCH: required** (React distribution + testing not covered by existing docs) — see §4.

## 4. Research Findings

**Distribution — copy-in ("own the source") is the 2026 norm.** Rather than an
npm dependency with precompiled runtime, ship source the consumer copies and
owns: leaner bundle (styling is Tailwind, purged at build; logic is inlined), no
upgrade-hell, full customisation. Recommended layout: raw components in a `ui/`
folder, behaviour in hooks/adapters, and **documentation is mandatory** because
the code lives in the consumer's repo. This maps precisely to R2 (publish source
from the Composer package into `resources/js/kadoorie/`).

**Testing — layered, and jsdom can't do contrast.** `eslint-plugin-jsx-a11y`
gives high-value static AST checks; `vitest-axe`/`jest-axe` wrap axe-core for
rendered components; React Testing Library + `userEvent` cover keyboard and
interaction. **Critical gotcha:** *Vitest runs in jsdom, which doesn't compute
real styles, so contrast violations from CSS variables/theme overrides slip
through.* ⇒ contrast/visual WCAG **must** be verified in a real browser →
**Playwright** (which we already run across the 3-viewport matrix). Convention:
name axe tests `*.a11y.test.tsx` so CI can run them as a distinct step.

Sources:
- [shadcn/ui docs — distribution model](https://ui.shadcn.com/docs)
- [ShadCN UI in 2026 — own your components (DEV)](https://dev.to/whoffagents/shadcn-ui-in-2026-why-i-stopped-installing-component-libraries-and-started-owning-my-components-2eel)
- [Testing React accessibility with axe — Vitest (Medium)](https://medium.com/@echilaka/testing-react-accessibility-with-axe-dev-console-vitest-and-the-chrome-extension-e24b5ae623df)
- [Automated accessibility testing for React — tools & best practices](https://howtotestfrontend.com/resources/accessibility-testing-your-react-app)
- [Test React accessibility with axe-core (OneUptime, 2026)](https://oneuptime.com/blog/post/2026-01-15-test-react-accessibility-axe-core/view)

## 5. Refactor Assessment

**Confidence: LOW. Recommendation: no refactor before starting.** The library
was just shipped with every gate green; there are no code smells blocking this
work. One architectural note, handled *within* the plan (not as pre-work):

- **Single source of truth for contracts.** Variant/size/tone/shape maps,
  `data-test` names, and ARIA wiring currently live in PHP (enums + Blade). React
  re-declares them in `lib/variants.ts` and per-component TSX. This is
  cross-language duplication that cannot be removed without codegen. Mitigation:
  (a) a **parity checklist** (Part 3) enumerating each component's props, class
  map, `data-test` names, and ARIA contract; (b) the **React workbench reuses the
  same `data-test` selectors**, so a drift in names is caught by Playwright.
  **Future option (out of scope):** generate `variants.ts` + a `data-test`
  manifest from the PHP enums so the two sets can never diverge.

No Mikado/Strangler work needed; this is additive.

## 6. Architecture

### 6.1 Package layout (additions)

```
resources/react/                     # shipped in the Composer package; NOT built here for release
├── src/
│   ├── lib/
│   │   ├── cn.ts                     # tiny className joiner (no runtime dep)
│   │   ├── variants.ts               # Variant/Size/Tone/BadgeShape unions + class maps (mirror PHP enums)
│   │   ├── ids.ts                    # field/hint/error id helpers (mirror HandlesFieldState)
│   │   └── icons.ts                  # inline SVG registry (mirror the Lucide/Kadoorie set)
│   ├── hooks/
│   │   ├── useControllableState.ts   # controlled/uncontrolled prop pattern
│   │   ├── useFieldState.ts          # error/hint/aria wiring for controls
│   │   ├── useDisclosure.ts          # open/close (Modal, Dropdown, Nav sheet, Accordion)
│   │   ├── useFocusTrap.ts           # focus trap + return (zero-dep)
│   │   ├── useDismiss.ts             # Esc + outside-click
│   │   ├── useRovingTabIndex.ts      # Tabs / arrow-key groups
│   │   └── useToaster.tsx            # Toast context + bus (adapter)
│   ├── ui/                           # all ~35 presentational components (Button.tsx, Input.tsx, …)
│   ├── adapters/
│   │   ├── useDataTable.ts           # sort/paginate/select (mirror the Livewire DataTable, client-side)
│   │   └── LoginForm.tsx             # presentational form + validation → onSubmit(credentials)
│   └── index.ts                      # barrel
├── stubs/                            # tsconfig.kadoorie.json, vite + eslint snippets the installer can offer
└── README.md                        # published alongside the source (docs-in-repo)

resources/react-workbench/           # dev-only Vite app in THIS repo, to test the React set (not shipped)
tests/React/                          # Vitest + RTL (*.test.tsx, *.a11y.test.tsx)
tests/Playwright/react-*.spec.ts      # real-browser functional specs vs the React workbench
```

The **same** `resources/dist/kadoorie.css` and `--kad-*` tokens are reused —
React introduces **no new styling system**.

### 6.2 Install flow (`php artisan kadoorie:install`)

```
php artisan kadoorie:install
   │  (Laravel Prompts)
   ├─ multiselect: "Which component set(s) do you want?"
   │      ◦ Blade (Livewire)        ◦ React
   │
   ├─ Blade ─▶ vendor:publish --tag=kadoorie-styles (+ --tag=kadoorie-config)
   │           └ note: register the Alpine focus/collapse plugins (user-guide)
   │
   └─ React ─▶ vendor:publish --tag=kadoorie-react
   │           (resources/react/src  ─▶  resources/js/kadoorie/  — configurable path)
   │           + copy compiled kadoorie.css (or point at the preset)
   │           + optional (confirm): add a tsconfig path alias + eslint a11y snippet
   │           + print next steps: ensure react/react-dom/typescript installed;
   │             import '@/kadoorie/index'; import the CSS; add to your Vite entry
   │
   └─ idempotent: skips existing files unless --force; --set=blade|react|both to skip prompts (CI)
```

Backed by a new **`kadoorie-react`** publish tag registered in the service
provider. The command validates the target path, is non-destructive by default,
and supports `--set=` for non-interactive/CI use.

### 6.3 Component model — headless + optional adapters

- **Presentational (all):** props in, callbacks out, local state only. Reuse the
  Kadoorie classes via `cn()` + `variants.ts`. Controlled **and** uncontrolled
  supported via `useControllableState` (e.g. `<Toggle checked … onCheckedChange>`
  or uncontrolled `defaultChecked`).
- **Accessibility parity:** the same ARIA + focus behaviour as the Blade/Livewire
  components, via zero-dep hooks (`useFocusTrap`, `useDismiss`,
  `useRovingTabIndex`) — no Radix dependency (kept dependency-light to match the
  library ethos; Radix noted as an alternative in Part 3 assumptions).
- **Adapters (stateful ones), optional:**
  - `useDataTable({ columns, rows, perPage })` → `{ sort, page, pageRows, sortBy, next, prev, toggleSelect }` — the Livewire DataTable's logic, client-side.
  - `<ToastProvider>` + `useToast()` — a client bus mirroring the `kadoorie-toast` event; `toast({ message, tone })`.
  - `useDisclosure()` / controlled `open`+`onOpenChange` for Modal/Dropdown/Nav.
  - `<LoginForm onSubmit={(c) => …} />` — presentational + validation; **password stays client-side until the host's `onSubmit`** (the auth-agnostic + "never leak the password" security contract carries over verbatim).

### 6.4 Data-test + selector reuse

Every React element carries the **same `data-test`** as its Blade twin (Part 3
parity table). The React workbench renders each component with those hooks, so
the Playwright **functional** specs are largely a copy of the Blade specs with a
different base URL, and the **WCAG** specs axe-scan the workbench pages (real
browser ⇒ catches the contrast that jsdom/`vitest-axe` cannot).

### 6.5 Testing pyramid

```
tsc --noEmit ........................ types (gate)
Vitest + RTL + userEvent ............ unit + interaction + structural a11y  (*.test.tsx)   — per component
vitest-axe .......................... axe on rendered components (structural) (*.a11y.test.tsx)
Playwright (React workbench, real browser)
   ├─ react-functional-{mobile,tablet,desktop} ... keyboard, focus trap/return, reflow, adapters
   └─ react-wcag-{mobile,tablet,desktop} ......... axe incl. CONTRAST (the jsdom gap)
ESLint (jsx-a11y + react-hooks) + Prettier ....... static (gate)
```

### 6.6 CI

Extend `.github/workflows/ci.yml` with a **react** job: `npm ci` → `tsc
--noEmit` → `eslint`/`prettier` (TSX) → `vitest run --coverage` → build the React
workbench → `playwright test --project=react-*`. Gated the same as the PHP/JS/
browser jobs.
