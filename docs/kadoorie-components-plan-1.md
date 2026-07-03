# Kadoorie Livewire Components — Implementation Plan · Part 1 of 3

> **Plan Set**: `docs/kadoorie-components-plan-*.md`
> **This File**: Part 1 — Executive Summary, Requirements, Research, Design Tokens, Architecture
> **Navigation**: **Part 1 (this file)** · [Part 2 — Phases 0–2](kadoorie-components-plan-2.md) · [Part 3 — Phases 3–8 + Testing](kadoorie-components-plan-3.md)

## Table of Contents (Part 1)

1. [Executive Summary](#1-executive-summary)
2. [Requirements](#2-requirements)
3. [Detect / Research Findings](#3-detect--research-findings)
4. [Refactor Assessment](#4-refactor-assessment)
5. [Design Token System (from Figma)](#5-design-token-system-from-figma)
6. [Architecture](#6-architecture)
7. [Phase Roadmap & Estimates](#7-phase-roadmap--estimates)
8. [Assumptions & Open Decisions](#8-assumptions--open-decisions)

---

## 1. Executive Summary

Build **`kadoorie/livewire-components`** — a private, best-practice Composer package that ships
prebuilt Laravel **Livewire 3** components implementing the **Kadoorie look and feel**. The package
provides form controls, feedback/overlays, layout/content, data-display components, and full page
templates (login + a parameterised HTTP error page covering 401/403/404/405/406/412/500/501/502). It
also ships a **static HTML component showcase**, a **user guide**, and a **data-binding guide** (how
to push data into components).

- **Source of truth for visuals**: Figma file `Newsletter` (`VJ2yhCdYrREAqW7fpQK8xr`), tokens
  extracted in [§5](#5-design-token-system-from-figma).
- **Stack**: PHP 8.3+, Laravel 11+, Livewire 3, Alpine.js, Tailwind CSS (+ publishable compiled CSS).
- **Cross-cutting mandates**: WCAG 2.1 AA, Alpine-driven interactivity, `data-test`
  selectors on every meaningful element, strict types, PER Coding Style 3.0.
- **Distribution**: private GitHub (VCS repository / Private Packagist), released to public-quality
  standards (semver, CHANGELOG, CI, tests, docs).
- **Total estimate**: **98 points** across 10 phases (0, 0B, 1–8). All quality gates run inside a
  Docker container named `kadoorie-app` (`docker exec kadoorie-app …`).

## 2. Requirements

### 2.1 Source

Interactive intake via `/superplan`. Confirmed decisions:

| Decision | Value |
|---|---|
| Scope | Full component library (epic) |
| Design source | Figma `Newsletter` file (tokens extracted via Figma REST API) |
| Styling | Tailwind CSS **and** publishable compiled CSS |
| Versions | Laravel 11+, Livewire 3, PHP 8.3+ |
| Distribution | Private GitHub, public-quality standards |
| Must-haves | WCAG 2.1 AA · Alpine.js interactivity |
| Out of scope | RTL support and dark mode (explicitly deferred) |

### 2.2 Component Inventory

**Tier A — Core form controls**: Button, Input, Textarea, Select, Checkbox, Radio, Toggle/Switch,
Label, Field wrapper + validation-error display.

**Tier B — Feedback & overlays**: Modal/Dialog, Alert (inline), Toast/Notification, Tooltip,
Loading/Spinner.

**Tier C — Layout & content**: Card, Badge, Avatar, Divider, Tabs, Accordion, Breadcrumbs,
Nav (top bar + sidebar).

**Tier D — Data display**: Data table (sortable, paginated), Pagination, Dropdown menu, Tag/Pill,
Empty state.

**Tier E — Page templates**: Login page; generic error page + HTTP error pages **401, 403, 404,
405, 406, 412, 500, 501, 502** (single parameterised component — see [DRY gate](#43-dry-review-gate)).

**Docs & tooling deliverables**: a **static HTML component showcase** (flat-file gallery of every
component and its variants, generated from a single example registry), a **user guide**
(install/config/theming/usage), and a **data-binding guide** (how to push data into components).

### 2.3 Functional Requirements

- Components are consumable as `<x-kadoorie::button>` (stateless Blade) or
  `<livewire:kadoorie::modal>` (stateful Livewire).
- Every component is themeable at runtime via CSS custom properties (`--kad-*`) without recompilation.
- Every interactive element is keyboard-operable, focus-visible, and screen-reader labelled.
- Consuming apps may use Tailwind (extend the shipped preset) **or** publish precompiled CSS.
- Login page is **auth-agnostic**: it renders the form and emits/validates, delegating actual
  authentication to the host app (see [§8](#8-assumptions--open-decisions)).
- The static showcase must render from **flat files with no PHP server**: stateless/Alpine components
  are fully interactive in the browser; Livewire components show their initial rendered state with a
  note that full behaviour needs a Livewire runtime.

### 2.4 Non-Functional Requirements

- WCAG 2.1 AA (axe-core clean, contrast ≥ 4.5:1 normal / 3:1 large & UI).
- **Fully responsive**: every component is mobile-first and works at the three reference viewports —
  **Mobile 360×800**, **Tablet 768×1024**, **Desktop 1920×1080** — with **no horizontal scroll**, no
  clipped content, and touch targets ≥ 44×44px on touch viewports. Verified by tests at all three
  sizes (see [§6.5](#65-responsive-strategy) and Part 3 testing strategy).
- **SVG-first imagery**: all icons, the Kadoorie logo, and illustrations (error/empty states) are
  **inline SVG** — no emoji-as-icon and no raster where an SVG is possible. The only raster exception
  is a user-supplied `Avatar` photo, which still has an SVG initials fallback.
- **Icon set**: **Lucide** as the base set **plus the bespoke Kadoorie/Mantis icons extracted from the
  Figma**, unified to one stroke width and coloured via `currentColor`, exposed through a single
  `<x-kadoorie::icon>` component (see §6.6).
- **Reduced motion**: all Alpine transitions (modal, drawer/sheet, toast, accordion, tabs) respect
  `prefers-reduced-motion: reduce` and drop to instant/opacity-only.
- Strict types in every PHP file; PER Coding Style 3.0; Larastan clean.
- ≥ 85% JS statement coverage; Pest coverage for every component behaviour.
- No secrets, no `env()` outside config, `$fillable` where models exist (none expected here).
- Semver, CHANGELOG, green CI before any tag.

## 3. Detect / Research Findings

**DETECT** — source: `.claude/rules/*.md` (authoritative for standards) + codebase scan (empty repo).
The rules define the project coding standards (strict types, PER 3.0, Pint/Pest/Larastan via Docker,
`data-test` selectors, SOLID/DRY gate, security/performance checklists) and are authoritative here.

- Quality tools mandated: **Pint, Pest, Larastan** (`docker exec kadoorie-app ...`), ESLint, Prettier, Jest,
  Playwright + `@axe-core/playwright`. All greenfield → **Phase 0 bootstrap required**.

**RESEARCH** — distributable Livewire 3 package best practices:

- Extend `Spatie\LaravelPackageTools\PackageServiceProvider`; register Livewire components manually
  with `Livewire::component('kadoorie::x', X::class)` in `packageBooted()`.
- **Do not use the ⚡ emoji** in Livewire component filenames — it breaks Composer publishing.
- Ship a **Tailwind preset** (consumers extend it and add the package view paths to `content`) **and**
  a **precompiled CSS** asset published via `vendor:publish`. CSS custom properties bridge both and
  enable runtime theming without a rebuild.
- Test with `orchestra/testbench` (^10.x for LW3) as the base `TestCase`. Per project rules, use
  `Livewire::test(Class::class)` (not the `livewire()` helper).

Sources:
- [spatie/laravel-package-tools](https://github.com/spatie/laravel-package-tools)
- [Livewire — Package Development](https://livewire.laravel.com/docs/packages)
- [Livewire — Testing](https://livewire.laravel.com/docs/3.x/testing)
- [Tailwind CSS with Laravel](https://tailwindcss.com/docs/guides/laravel)
- [Styling: CSS & Assets in a Laravel package (Laravel Daily)](https://laraveldaily.com/lesson/create-laravel-package/styling-css-assets)

## 4. Refactor Assessment

### 4.1 Confidence: LOW (greenfield)

Nothing exists to refactor. No code smells, no AI slop, no legacy debt. The risk is **forward** debt
(building 40+ near-identical component classes), which we prevent up front via a shared component
pattern and the DRY gate below.

### 4.2 Roadmap impact

This is a foundation library other Kadoorie apps will depend on, so the **token layer and base
component pattern are the highest-leverage investments** — get them right once and every component
inherits them.

### 4.3 DRY Review Gate (rule 14)

Flagged **before** writing any code, per `.claude/rules/14-solid-dry.md`:

| Candidate cluster | Why it would duplicate | Resolution (mandatory) |
|---|---|---|
| **9 HTTP error pages** (401…502) | Differ only by status code + title + message | **Single `ErrorPage` component**, config/enum-driven (`HttpErrorStatus` enum → label/description/icon). One class, one view. |
| **Form controls** (input/textarea/select/checkbox/radio/toggle) | All share label + hint + error + wrapper + `data-test` + aria wiring | Shared **`<x-kadoorie::field>` wrapper** + a `HandlesFieldState` concern; each control renders only its input element. |
| **Badge / Tag / Pill** | Same shape, differ by size/shape variant | One `Badge` component with `variant`/`shape` enums, not three classes. |
| **Alert / Toast** | Same semantic colour + icon system | Shared `SupportsSemanticTone` concern + `Tone` enum; two thin components. |

Any *new* pair discovered during build that differs by 1–2 variables must stop and follow the same
gate.

## 5. Design Token System (from Figma)

Extracted by walking the `Newsletter` node tree (no published styles/variables available under the
non-Enterprise token; values below are the aggregated, de-duplicated palette). All tokens are emitted
as **CSS custom properties** (`--kad-*`) so both the Tailwind preset and the precompiled CSS resolve
identically, and consumers can retheme by overriding variables.

### 5.1 Color — Brand

| Token | Light | Notes |
|---|---|---|
| `--kad-color-primary` | `#aa1a2d` | Kadoorie crimson (buttons, links, active) |
| `--kad-color-primary-hover` | `#af1228` | Hover/pressed & primary borders |
| `--kad-color-primary-emphasis` | `#8c0f20` | Derived darker step (active) |
| `--kad-color-primary-subtle` | `#f7edee` | Tinted background |
| `--kad-color-primary-subtle-border` | `rgb(170 26 45 / .06)` | Faint outline seen in Figma |
| `--kad-color-on-primary` | `#ffffff` | Text/icon on primary |
| `--kad-color-secondary` | `#002147` | Oxford navy accent |

### 5.2 Color — Neutrals (cool, blue-tinted)

| Token | Light | Usage |
|---|---|---|
| `--kad-color-bg` | `#f7f8fa` | App background |
| `--kad-color-surface` | `#ffffff` | Cards, inputs, modals |
| `--kad-color-surface-muted` | `#f0f2f5` | Subtle panels, hovers |
| `--kad-color-border` | `#dde2e8` | Default borders |
| `--kad-color-border-strong` | `#bec7d1` | Emphasised borders |
| `--kad-color-text` | `#0f1620` | Primary text/headings |
| `--kad-color-text-body` | `#2f3b4a` | Body copy |
| `--kad-color-text-muted` | `#5f6b77` | Secondary/help **body** text — darkened from Figma's `#84949e` to meet AA (≥4.5:1 on surface) |
| `--kad-color-text-muted-large` | `#84949e` | Figma muted grey — **large text (≥18px/bold), icons, and non-text UI only** (passes 3:1, not 4.5:1) |
| `--kad-color-text-disabled` | `#99a1af` | Disabled/placeholder (contrast-exempt) |
| `--kad-color-text-on-dark` | `#ffffff` | Text on dark surfaces |

### 5.3 Color — Semantic (each with a `-subtle` tint background)

| Tone | Solid | Subtle bg |
|---|---|---|
| `danger` | `#dc2626` (accent `#e53935`) | `#fef2f2` |
| `success` | `#16a34a` | `#f0fdf4` |
| `info` | `#2563eb` | `#eff6ff` |
| `warning` | `#f59e0b` | `#fffbeb` |
| `accent` (purple) | `#7c3aed` | `#f5f3ff` |

### 5.4 Typography

- **Family**: `--kad-font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;` (ship Inter as an
  optional publishable webfont; fall back to system UI).
- **Weights**: 400 / 500 / 600 / 700.
- **Scale** (rem @ 16px root; matches the dense Figma UI — default body = `sm` 12px):

| Token | rem | px | line-height |
|---|---|---|---|
| `--kad-text-2xs` | 0.625 | 10 | 1.5 |
| `--kad-text-xs` | 0.6875 | 11 | 1.5 |
| `--kad-text-sm` **(body default)** | 0.75 | 12 | 1.5 |
| `--kad-text-md` | 0.8125 | 13 | 1.54 |
| `--kad-text-base` | 0.875 | 14 | 1.43 |
| `--kad-text-lg` | 1.0 | 16 | 1.5 |
| `--kad-text-xl` | 1.125 | 18 | 1.56 |
| `--kad-text-2xl` | 1.25 | 20 | 1.4 |
| `--kad-text-3xl` | 1.5 | 24 | 1.33 |

> **Decisions (confirmed)**: body stays authentic dense **12–14px on tablet/desktop**, but **form
> control text/inputs render ≥16px on mobile** (below `md`) so iOS does not auto-zoom, and body nudges
> up one step below `md`. Body line-height is 1.5 for readability. See [§8](#8-assumptions--open-decisions) A4.

### 5.5 Spacing (4px base with 2px steps, matching Figma auto-layout)

`--kad-space-0.5:2px · -1:4px · -1.5:6px · -2:8px · -2.5:10px · -3:12px · -4:16px · -5:20px · -6:24px`

### 5.6 Radii

`--kad-radius-sm:4px · -base:6px · -md:8px (default) · -lg:10px · -xl:13px · -2xl:20px · -full:9999px`

### 5.7 Elevation (shadows)

| Token | Value |
|---|---|
| `--kad-shadow-sm` | `0 1px 2px -1px rgb(0 0 0 / .1), 0 1px 3px rgb(0 0 0 / .1)` |
| `--kad-shadow-md` | `0 4px 16px rgb(0 0 0 / .12)` |
| `--kad-shadow-lg` | `0 8px 40px rgb(0 0 0 / .18)` |

### 5.8 Focus ring (WCAG)

`--kad-ring: 0 0 0 2px var(--kad-color-surface), 0 0 0 4px var(--kad-color-primary);`
Applied via a `.kad-focusable:focus-visible` utility so focus is always visible (never removed).

### 5.9 Theming

The Figma source is a single light theme, which is what the library ships. Because every token is a
`--kad-*` custom property, a host app can retheme components by overriding variables in its own CSS —
but **dark mode is out of scope** for this package (deferred per intake) and no dark palette is
defined or shipped.

### 5.10 Breakpoints & container (responsive)

Mobile-first. Reference viewports: **Mobile 360×800 · Tablet 768×1024 · Desktop 1920×1080**. The
Tailwind preset exposes a systematic, named breakpoint scale mapped to those targets, plus a capped
content container so ultra-wide desktops (1920) don't stretch line lengths past ~75 chars.

| Breakpoint | min-width | Reference target |
|---|---|---|
| base | 0 | Mobile 360 (design baseline) |
| `sm` | 480px | large phones |
| `md` | 768px | **Tablet** |
| `lg` | 1024px | small desktop / landscape tablet |
| `xl` | 1280px | **Desktop** content breakpoint |
| `2xl` | 1536px | wide desktop (1920 viewport) |

`--kad-container-max: 1280px;` — content max-width centred within the 1920 viewport with responsive
gutters. Prefer `min-h-dvh` over `100vh`; use logical spacing tokens; never disable zoom.

## 6. Architecture

### 6.1 Package layout

```
kadoorie/livewire-components
├── composer.json
├── package.json                         # Tailwind/PostCSS build + JS tooling
├── tailwind-preset.js                   # exported preset (consumers extend this)
├── config/kadoorie.php                  # prefix, defaults, feature toggles
├── src/
│   ├── KadoorieComponentsServiceProvider.php   # Spatie PackageServiceProvider
│   ├── Enums/                           # Variant, Size, Tone, HttpErrorStatus, ...
│   ├── View/Components/                 # stateless Blade components (Button, Badge, Card, ...)
│   ├── Livewire/                        # stateful components (Modal, Toast, DataTable, Login, ...)
│   ├── Concerns/                        # HandlesFieldState, SupportsSemanticTone, ...
│   └── Support/                         # helpers (Alpine data builders, class mergers)
├── resources/
│   ├── css/
│   │   ├── tokens.css                   # --kad-* custom properties (light theme)
│   │   └── kadoorie.css                 # @import tokens + @layer components + Tailwind
│   ├── js/
│   │   └── kadoorie.js                  # Alpine plugins (focus-trap, dismiss, live-region)
│   ├── views/
│   │   ├── components/                  # x-kadoorie::* Blade views
│   │   ├── livewire/                    # livewire:kadoorie::* views
│   │   └── pages/                       # login + error page views
│   └── dist/
│       └── kadoorie.css                 # precompiled, committed, publishable
├── tests/
│   ├── TestCase.php                     # extends Orchestra\Testbench\TestCase
│   ├── Pest.php
│   ├── Unit/  Feature/                  # Pest
│   ├── JavaScript/                      # Jest (mirrors resources/js)
│   ├── Playwright/                      # functional (data-test selectors)
│   └── WCAG/                            # @axe-core/playwright
├── workbench/                           # Testbench demo app for preview & browser tests
├── .github/workflows/ci.yml
├── CHANGELOG.md  README.md  LICENSE
└── docs/
```

### 6.2 Namespacing

| Concern | Value |
|---|---|
| Composer name | `kadoorie/livewire-components` |
| PHP namespace | `Kadoorie\LivewireComponents\` |
| Blade components | `<x-kadoorie::button />` |
| Livewire components | `<livewire:kadoorie::modal />` |
| Views namespace | `kadoorie::` |
| Config key / publish tag prefix | `kadoorie` (`kadoorie-config`, `kadoorie-views`, `kadoorie-styles`) |

### 6.3 Styling data-flow

```
Figma tokens ──▶ resources/css/tokens.css (--kad-* light theme)
                         │
         ┌───────────────┴────────────────┐
         ▼                                 ▼
tailwind-preset.js                 resources/css/kadoorie.css
theme.colors/space/radius   @layer components (.kad-btn, .kad-input…)
= var(--kad-*)                     using @apply + var(--kad-*)
         │                                 │
         ▼                                 ▼
Tailwind consumers                 npm run build ──▶ resources/dist/kadoorie.css
extend preset + add                (precompiled, publishable to non-Tailwind apps)
package views to `content`
```

Both paths resolve the **same** `--kad-*` variables, so overriding a token value restyles every
component with no rebuild.

### 6.4 Component pattern (applied to every component)

1. **Class**: strict types, project file header, constructor property promotion, typed props;
   enums for variants/sizes/tones.
2. **View**: single root element (Livewire requirement); `data-test="<context>-<element>"` on every
   meaningful node; styled via `--kad-*` tokens; Alpine (`x-data`) for client interactivity.
3. **Responsive**: mobile-first; must render cleanly at 360×800, 768×1024, and 1920×1080 with no
   horizontal scroll; layout adapts via the named breakpoints (§5.10); touch targets ≥ 44×44px.
4. **Imagery**: icons, logo, and illustrations are **inline SVG** with `aria-hidden` (decorative) or a
   title/`aria-label` (meaningful); no emoji icons, no raster where SVG is possible.
5. **A11y**: associated `<label>`/`aria-label`, `aria-describedby` for errors/hints, visible focus,
   keyboard operation, focus trap + return for overlays, `aria-live` for dynamic content, and
   **`prefers-reduced-motion` respected** for all transitions.
6. **Tests**: Pest (render + behaviour + a11y attributes) · Jest (any JS behaviour) · Playwright
   functional **at all three viewports** · Playwright WCAG (axe).
7. **Docs**: a usage block in `README`/docs and a preview route in `workbench/`.

### 6.5 Responsive strategy

- **Mobile-first**: base styles target 360px; `md:`/`lg:`/`xl:` progressively enhance for tablet and
  desktop. No fixed-px container widths; content is capped by `--kad-container-max` and centred.
- **Layout primitives**: components that reflow (Nav, DataTable, Tabs, Card grids, Modal) define
  explicit mobile behaviour — e.g. the DataTable switches to stacked cards under `md`, the Nav
  collapses to a top dropdown sheet (see Phase 3C), tab lists become horizontally scrollable with an
  a11y-safe affordance.
- **Verification**: the Playwright functional and WCAG suites run each spec across a **viewport
  matrix** (360×800, 768×1024, 1920×1080); a horizontal-scroll assertion guards every page-level view.

### 6.6 Icon system

- A single **`<x-kadoorie::icon name="..." />`** component renders inline SVG from a registry combining
  **Lucide** (base set) and the **bespoke Kadoorie/Mantis icons extracted from the Figma**, normalised
  to one stroke width and `24×24` viewBox, coloured via `currentColor`, sized by tokens
  (`icon-sm 16 · icon-md 20 · icon-lg 24`).
- Decorative icons render `aria-hidden="true"`; meaningful icons take a `label` prop → `role="img"` +
  `<title>`/`aria-label`. No emoji, no raster. This is a **foundation** deliverable (Phase 0B).

## 7. Phase Roadmap & Estimates

```
Phase 0  Package Scaffold + Quality Bootstrap (10) ── Docker env + tooling; must be first
Phase 0B Design Token Layer + Icon System (6)      ── tokens (done, §5) + Lucide/Figma icons
              │
   ┌──────────┼───────────┬───────────┐   parallel (sub-agents) after 0B
   ▼          ▼           ▼           ▼
 P1 Form    P2 Feedback P3 Layout   P4 Data
 controls   & overlays  & content   display
  (11)        (11)        (16)        (14)
   └──────────┴─────┬─────┴───────────┘
              ▼
        P5 Page templates (10)  ── login + parameterised error page
              ▼
        P6 Integration & Workbench Demo (6)  ── demo app + example registry
              ▼
        P7 Static Showcase & User Guides (11) ── static HTML gallery + user guide + data-binding guide
              ▼
        P8 Release (3)
```

| Phase | Name | Depends on | Parallel with | Estimate | Status |
|---|---|---|---|---|---|
| 0 | Package scaffold + Docker env + quality bootstrap | — | — | 10 | ✅ Complete |
| 0B | Design token layer + icon system | 0 | — | 6 | ✅ Complete |
| 1 | Core form controls | 0B | 2,3,4 | 11 | ✅ Complete |
| 2 | Feedback & overlays | 0B | 1,3,4 | 11 | ✅ Complete |
| 3 | Layout & content (incl. responsive Nav collapse + sticky) | 0B | 1,2,4 | 16 | ⬜ Next |
| 4 | Data display | 0B | 1,2,3 | 14 | ⬜ |
| 5 | Page templates | 1,2,3 | — | 10 | ⬜ |
| 6 | Integration & workbench demo | 1–5 | — | 6 | ⬜ |
| 7 | Static showcase & user guides | 6 | — | 11 | ⬜ |
| 8 | Release | 7 | — | 3 | ⬜ |
| | **Total** | | | **98** | |

Phase detail (goals, tasks, code deltas, tests, Definition of Done, commit messages) is in
[Part 2](kadoorie-components-plan-2.md) (Phases 0, 0B, 1, 2) and
[Part 3](kadoorie-components-plan-3.md) (Phases 3–8).

## 8. Assumptions & Open Decisions

| # | Assumption (default taken) | Override by telling me |
|---|---|---|
| A1 | Package name `kadoorie/livewire-components`, namespace `Kadoorie\LivewireComponents`, prefix `kadoorie`. | Preferred vendor/prefix. |
| A2 | **Login is auth-agnostic**: renders form, validates, emits `kadoorie:login-submitted` (or calls a configurable action); host app wires Fortify/Sanctum/custom. | Bind to a specific auth stack. |
| A3 | **9 error pages = one parameterised `ErrorPage`** component (DRY gate). ✅ **Confirmed by user.** | — |
| A4 | **Type**: dense **12–14px on tablet/desktop**; **form inputs ≥16px on mobile** (no iOS auto-zoom); body nudges up one step below `md`; body line-height 1.5. ✅ **Confirmed by user.** | — |
| A5 | **Dark mode is out of scope** — deferred per user decision (2026-07-03). Only the light theme is defined and shipped; no dark palette. | Add dark mode later (needs a dark Figma). |
| A6 | Ship **Inter** as an optional publishable webfont; default to referencing it with system fallback. | Bundle vs CDN vs host-provided. |
| A7 | Distribution via **private GitHub VCS repo** (composer `repositories` entry); optional Private Packagist later. | Confirm registry. |
| A8 | **No RTL** (per intake). | Add RTL later. |
| A9 | **Static showcase** is generated to `docs/showcase/` (flat files, committed); GitHub Pages publishing is optional in Phase 8. | Prefer a different output path / host. |
| A10 | **Collapsed nav = a top dropdown sheet**: below `md` the top bar collapses behind a hamburger that expands a full-width panel **directly below the bar** (accordion-style), with focus management. ✅ **Confirmed by user.** | — |
| A11 | **Nav collapse breakpoint = `md` (768px)**: inline **top bar** on desktop, dropdown sheet on tablet & mobile. ✅ **Confirmed by user.** | — |
| A12 | **Desktop primary nav = horizontal top bar** (not a sidebar). ✅ **Confirmed by user.** | Switch to a sidebar later. |
| A13 | **Icons = Lucide base set + bespoke Kadoorie/Mantis icons extracted from Figma**, via one `<x-kadoorie::icon>` (Phase 0B). ✅ **Confirmed by user.** | — |
| A14 | **Muted body text darkened** to `#5f6b77` for AA; Figma's `#84949e` reserved for large text / icons / borders. | Keep `#84949e` for body and accept the AA gap. |
| A15 | **Docker dev container = `kadoorie-app`** (not `app`, which is owned by the smctennis project). All gates use `docker exec kadoorie-app …`; `.claude/rules` updated to match. ✅ **Confirmed by user.** | — |

These defaults are safe to build on; none block Phase 0. Confirm or override and I'll adjust before
execution.
