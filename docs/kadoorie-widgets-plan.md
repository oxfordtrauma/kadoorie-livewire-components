# Kadoorie Components — Widgets & Filament Theme Plan

> **Plan Set**: `docs/kadoorie-widgets-plan.md` (single file)
> **Runs AFTER**: `docs/kadoorie-testing-plan.md` (the Playwright harness — matrix
> projects, workbench `webServer`, `file://` WCAG, axe/scroll helpers — must exist
> so the new components get functional + WCAG specs).
> **Builds on**: the shipped library (`docs/kadoorie-components-plan-*.md`).

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Requirements](#2-requirements)
3. [Architecture](#3-architecture)
4. [Phase Roadmap & Estimates](#4-phase-roadmap--estimates)
5. [Phase Details](#5-phase-details)
6. [Testing Strategy](#6-testing-strategy)
7. [Assumptions & Open Decisions](#7-assumptions--open-decisions)

---

## 1. Executive Summary

Adds four dashboard-oriented components — **Profile menu**, **Footer**,
**Small-box** and **Info-box** widgets (AdminLTE patterns re-skinned in the
Kadoorie palette) — plus a publishable **Filament recolour theme** (Filament v3
and v4). Every new component is registered in the existing
`ComponentExampleRegistry` (so it appears in the workbench and static showcase),
covered by Pest, and given **Playwright functional + WCAG** specs on the harness
built by the testing plan.

It also **rebuilds the static showcase into an interactive admin-shell site**
modelled on the AdminLTE v4 widget pages (sidebar + top bar + breadcrumb + content
cards), assembled from the Kadoorie components themselves, with per-example
**Preview / Code** tabs, copy-to-clipboard, and live demos of how each component
behaves. Interactivity is **Alpine-first** (the showcase already ships Alpine +
focus/collapse via CDN), so little or no bespoke JavaScript is introduced.

## 2. Requirements

| # | Decision (from intake) |
|---|---|
| R1 | Profile menu = avatar trigger + a menu with **Change details** and **Log out** actions; auth-agnostic (URLs/slots in, no auth performed). |
| R2 | Footer = **configurable multi-column** (brand + tagline, 2–4 data-driven link columns, bottom legal bar). Figma-exact layout deferred (see A1). |
| R3 | Small-box + Info-box = AdminLTE small-box / info-box behaviour, **Kadoorie palette & style**. |
| R4 | Filament = **recolour theme only**, targeting **both v3 and v4**; publishable + documented. |
| R5 | Each new component gets Pest **and** Playwright functional + WCAG specs. |
| R6 | Rebuild the static showcase as an **AdminLTE-v4-style interactive admin shell** built from the Kadoorie components, with Preview/Code tabs, copy, and live behaviour demos. Alpine-first; bespoke JS only if unavoidable (then linted/formatted). |

Non-functional: WCAG 2.1 AA (incl. contrast on solid tone fills), `data-test`
selectors, responsive at 360/768/1920 with no horizontal scroll, 44×44 targets,
inline SVG icons, strict types + headers.

## 3. Architecture

### 3.1 Single colour palette (rule 14)

Small-box and Info-box need **solid** brand/semantic fills, not the subtle tints
`Tone` currently exposes. Rather than a parallel enum, **extend the existing
`Tone`** (Open/Closed — add cases + methods, touch no consumers):

```php
enum Tone: string {
    case Primary; case Secondary;                 // NEW brand cases
    case Info; case Success; case Warning; case Danger; case Accent; // Accent NEW
    // existing: icon(), containerClasses() (subtle), iconColor(), role()
    public function solidClasses(): string;        // NEW: AA-verified "bg + on-color" pair
}
```

`solidClasses()` returns AA-checked pairs (e.g. `bg-primary text-on-primary`,
`bg-[#15803d] text-white` for success so contrast ≥ 4.5:1, `bg-warning text-text`
so amber uses dark text). Alert/Toast keep using the semantic cases unchanged.

### 3.2 Profile menu reuses Dropdown (DRY)

The Profile menu is a thin wrapper over `<x-kadoorie::dropdown>` (which already
gives the accessible `role=menu`, arrow-nav, focus return). Dropdown gains a
`triggerClass` prop (default = today's classes) so the profile trigger can be a
borderless avatar. No dropdown Alpine is duplicated.

### 3.3 Filament theme (v3 + v4)

Recolour only — no Filament plugin class:

```
resources/filament/
├── kadoorie-v3.css     # @layer overrides of Filament v3 CSS vars → --kad-*
└── kadoorie-v4.css     # Filament v4 CSS-first theme variables → --kad-*
src/Filament/KadoorieColors.php   # returns the primary shade ramp for FilamentColor::register()
```

Published under a new `kadoorie-filament` tag. `filament/support` is added as
`require-dev` + `suggest` (not a hard dependency). Docs in `docs/filament.md`
show: publish the theme, register `FilamentColor::register(['primary' =>
KadoorieColors::primary()])` (v3) or reference the theme in the panel (v4), and
import the CSS in the app's Filament theme build.

### 3.4 Interactive showcase (AdminLTE-style)

The `kadoorie:build-showcase` generator is reworked from flat pages into an
admin-shell static site, assembled from the Kadoorie components (dogfooding):

```
docs/showcase/
├── index.html            # dashboard landing: hero row of small-box + info-box
│                         # widgets, then a component category grid
├── <component>.html      # one page per component inside the shell
├── kadoorie.css          # committed compiled stylesheet (unchanged)
└── (Alpine + focus/collapse + highlight.js loaded via CDN — no server)

Shell (resources/views/showcase/layout.blade.php):
  ├─ <nav> collapsible left sidebar  ── categorised component links (Alpine toggle < md)
  ├─ top bar                         ── brand, GitHub link, "components: N" note
  ├─ <nav aria-label=Breadcrumb>     ── Home / <component>
  └─ <main id=main-content>          ── example Cards

Per-example Card:
  ├─ header: example title + tone chip
  ├─ Alpine tabs  x-data="{ tab: 'preview' }"   Preview | Code
  │     Preview → live rendered component (Blade::render at build)
  │     Code    → <pre><code> source + copy button (navigator.clipboard, Alpine)
  └─ Live demos: Alpine drives "how it works" (open a demo dialog, fire a demo
        toast, expand accordion, page a static table) so behaviour is visible
        with no Livewire runtime.
```

- **Alpine-first**: tabs, copy, sidebar collapse, and Livewire-component demos are
  declarative Alpine — no bespoke JS files (so no Jest obligation). `highlight.js`
  is an optional CDN include for code colouring. If any interaction genuinely needs
  a JS module, it goes in `resources/js/showcase.js` (ESM, project header,
  ESLint/Prettier clean) with a light Jest test for pure logic.
- **Accessibility**: the shell is semantic (sidebar = labelled `nav`, `main`,
  ordered headings); tabs use the roving `role=tablist` pattern; every page stays
  axe-clean at all three viewports (Phase W6).
- **Determinism**: still generated + committed; Livewire demos are Alpine
  reimplementations (no volatile `wire:` snapshot ids), keeping the output stable.

## 4. Phase Roadmap & Estimates

```
(prereq: kadoorie-testing-plan.md complete — harness available)
        ▼
W0 Tone solid palette (2) ── extend Tone with brand cases + solidClasses() (+ Pest)
        ▼
   ┌───────────────┬───────────────┬───────────────┐
   ▼               ▼               ▼
W1 Profile menu (3)  W2 Footer (3)   W3 Small-box + Info-box (5)   [parallel]
   └───────────────┴───────────────┴───────────────┘
        ▼
W4 Filament recolour theme v3+v4 (8)
        ▼
W5 Interactive showcase admin shell (8) ── AdminLTE-style, built from our components, Alpine demos
        ▼
W6 Showcase tests, docs & final sweep (3) ── showcase functional + WCAG specs, guide, sweep
```

| Phase | Name | Depends on | Parallel with | Estimate | Status |
|---|---|---|---|---|---|
| W0 | Tone solid palette | testing-plan | — | 2 | ✅ |
| W1 | Profile menu (+ Dropdown triggerClass) | W0 | W2,W3 | 3 | ⬜ |
| W2 | Footer | W0 | W1,W3 | 3 | ⬜ |
| W3 | Small-box + Info-box widgets | W0 | W1,W2 | 5 | ⬜ |
| W4 | Filament recolour theme (v3 + v4) | W0 | — | 8 | ⬜ |
| W5 | Interactive showcase admin shell | W1–W3 | W4 | 8 | ⬜ |
| W6 | Showcase tests, docs & final sweep | W4,W5 | — | 3 | ⬜ |
| | **Total** | | | **32** | |

---

## 5. Phase Details

Every phase: TDD-first (Pest + Playwright), a **Definition of Done**, and a
**conventional commit message** to output (do **not** commit — rule 08). Gates via
`docker exec kadoorie-app`. New component phases also: register a
`ComponentExample`, add a `tests/Playwright/<name>.spec.ts` (functional, workbench)
and rely on the WCAG matrix scanning its generated showcase page.

### Standard Definition of Done

```
- [ ] Pint clean · Larastan clean · Pest green (incl. the new component's tests)
- [ ] Registered in ComponentExampleRegistry; showcase regenerates cleanly
- [ ] Playwright functional spec green across the 3 functional-* projects
- [ ] WCAG: zero axe violations on the component's showcase page × 3 viewports
- [ ] No horizontal scroll; touch targets ≥44×44px; contrast AA (incl. solid fills)
- [ ] data-test on every meaningful element; strict types + header on new files
- [ ] Plan tasks checked off; health-check clean
```

### Phase W0 — Tone Solid Palette · 2 pts

**Tasks**
- [x] Added `Primary`, `Secondary`, `Accent` cases to `Tone`; added `solidClasses()`
      with AA-verified bg/on-color pairs; added arms to `icon()`/`containerClasses()`/
      `iconColor()` for the new cases (`role()`'s ternary already covers them →
      `status`). Success/danger use new darkened `-solid` tokens; warning uses dark
      text — so white/dark label text clears 4.5:1.
- [x] `ToneTest`: brand cases resolve from strings, `solidClasses()` returns
      bg + text for every tone, role stays assertive only for danger, brand tones
      give a valid icon/container/icon-colour. Alert/Toast/Badge unchanged & green.
- [x] Added `--kad-color-success-solid` / `--kad-color-danger-solid` tokens + preset
      `success.solid`/`danger.solid`; rebuilt `resources/dist/kadoorie.css`.

**DoD**: standard; existing Alert/Toast tests unchanged and green.

**Commit**: `feat: Extend Tone with brand cases and solid fills`

### Phase W1 — Profile Menu · 3 pts

**Tasks**
- [ ] Add `triggerClass` prop to `Dropdown` (default = current classes).
- [ ] `src/View/Components/ProfileMenu.php` + `profile-menu.blade.php`: wraps
      `<x-kadoorie::dropdown>` with an avatar (+ name on `sm+`) trigger, a menu
      header (name/email), a **Change details** `dropdown-item` link, and a
      **Log out** action — a `POST` form with `@csrf` when `logoutUrl` is set, or a
      `logout` slot. Props: `name`, `email`, `src`/`initials`, `changeDetailsUrl`,
      `logoutUrl`.
- [ ] Register `ComponentExample`; Pest (trigger, menu items, csrf form, aria);
      `tests/Playwright/profile-menu.spec.ts` (functional).

**Failing Playwright first** — `profile-menu.spec.ts`:
```ts
test('opens the profile menu and exposes change-details and logout', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('profile-menu-trigger').click();
  await expect(page.getByTestId('profile-menu-change-details')).toBeVisible();
  await expect(page.getByTestId('profile-menu-logout')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('profile-menu-trigger')).toBeFocused();
});
```

**DoD**: standard. **Commit**: `feat: Add Profile menu with change-details and logout`

### Phase W2 — Footer · 3 pts

**Tasks**
- [ ] `src/View/Components/Footer.php` + `footer.blade.php`: `<footer
      role="contentinfo">` with a brand/tagline block, a responsive grid of link
      columns (`:columns` = `[['heading','links'=>[['label','url']]]]`), and a legal
      bar (`copyright` + `:legalLinks`). Kadoorie tokens; stacks to one column on
      mobile (no h-scroll).
- [ ] Register `ComponentExample`; Pest (contentinfo, columns, legal, links);
      `tests/Playwright/footer.spec.ts` (renders, links reachable, no h-scroll at
      each viewport).

**DoD**: standard. **Commit**: `feat: Add configurable multi-column Footer`

### Phase W3 — Small-box + Info-box Widgets · 5 pts

**Tasks**
- [ ] `SmallBox.php` + `small-box.blade.php`: solid `tone->solidClasses()` fill, big
      `.kad-nums` value, label, large faded decorative icon (`aria-hidden`), optional
      **More info** footer link (`url`). Props: `value`, `label`, `tone`, `icon`, `url`.
- [ ] `InfoBox.php` + `info-box.blade.php`: surface card, coloured icon square
      (`tone` solid), label + big value, optional `role="progressbar"`
      (`aria-valuenow/min/max`) + `description`. Props: `icon`, `tone`, `label`,
      `value`, `progress`, `description`.
- [ ] Register both in `ComponentExample`; Pest for each (data-test hooks, solid
      contrast class, progressbar aria); `tests/Playwright/widgets.spec.ts`
      (small-box link navigates; info-box progressbar exposes values; no h-scroll).

**Small-box sketch**:
```blade
<div data-test="small-box" class="relative overflow-hidden rounded-lg shadow-sm {{ $tone->solidClasses() }}">
    <div class="p-4">
        <p data-test="small-box-value" class="kad-nums text-3xl font-bold">{{ $value }}</p>
        <p data-test="small-box-label" class="text-sm">{{ $label }}</p>
    </div>
    <span aria-hidden="true" data-test="small-box-icon" class="absolute right-3 top-2 opacity-30">
        <x-kadoorie::icon :name="$icon" size="lg" class="scale-[2.2]" />
    </span>
    @if ($url)
        <a href="{{ $url }}" data-test="small-box-link"
           class="kad-focusable flex min-h-11 items-center justify-center gap-1 bg-black/10 text-xs font-medium hover:bg-black/20">
            More info <x-kadoorie::icon name="chevron-right" size="sm" />
        </a>
    @endif
</div>
```

**DoD**: standard (contrast on every tone verified). **Commit**:
`feat: Add Small-box and Info-box dashboard widgets`

### Phase W4 — Filament Recolour Theme (v3 + v4) · 8 pts

**Tasks**
- [ ] `resources/filament/kadoorie-v3.css` + `kadoorie-v4.css`: map Filament colour/
      radius/font variables to `--kad-*` (import `tokens.css`); brand primary,
      surfaces, borders, Inter, radii.
- [ ] `src/Filament/KadoorieColors.php`: `primary(): array` returns the 50–950 shade
      ramp (hex) for `FilamentColor::register()`; no hard Filament dependency
      (`filament/support` as `require-dev` + `suggest`).
- [ ] Publish tag `kadoorie-filament` (both CSS files → app theme dir).
- [ ] `docs/filament.md`: v3 (Vite theme import + `FilamentColor::register`) and v4
      (CSS-first theme reference) install steps; note the recolour scope.
- [ ] Pest: the `kadoorie-filament` tag publishes both files; each CSS contains the
      Kadoorie primary token; `KadoorieColors::primary()` returns 11 shades.

**DoD**: standard (minus Playwright — Filament theme has no showcase page; validated
by publish/asset Pest + documented manual verification in a Filament app).

**Commit**: `feat: Add Kadoorie recolour theme for Filament v3 and v4`

### Phase W5 — Interactive Showcase Admin Shell · 8 pts

**Tasks**
- [ ] `resources/views/showcase/layout.blade.php`: an AdminLTE-v4-style shell built
      from Kadoorie components — collapsible labelled left-sidebar `nav` (Alpine
      toggle < md), a top bar, a breadcrumb, and a `<main id="main-content">`.
- [ ] Rework `BuildShowcaseCommand` + `index.blade.php` into a **dashboard landing**:
      a hero row of `small-box` + `info-box` widgets, then a category grid of
      component links.
- [ ] Rework `component.blade.php`: each example in a `Card` with Alpine
      **Preview | Code** tabs (`role=tablist`), a copy-to-clipboard button
      (`navigator.clipboard`, Alpine), and **live behaviour demos** — Alpine
      reimplementations for the Livewire components (demo dialog open/close, demo
      toast trigger, static paged table) so behaviour shows with no server.
- [ ] Optional `highlight.js` via CDN for code colouring; add `resources/js/showcase.js`
      only if an interaction can't be done in Alpine (ESM + header + ESLint/Prettier;
      light Jest test for any pure logic).
- [ ] Regenerate `docs/showcase/`; keep output deterministic (no `wire:` snapshot ids).

**DoD**: standard; the showcase is a coherent admin-shell site, interactive with no
server, deterministic, and every page renders from the registry.

**Commit**: `feat: Rebuild showcase as an interactive Kadoorie admin shell`

### Phase W6 — Showcase Tests, Docs & Final Sweep · 3 pts

**Tasks**
- [ ] `tests/Playwright/showcase.spec.ts` (functional, via absolute `file://` through a
      `showcaseUrl()` helper): Preview/Code tab toggle switches content, copy button
      works, sidebar collapses/expands < md, a demo trigger (dialog/toast) fires —
      across the viewport matrix, no horizontal scroll.
- [ ] WCAG specs for the new shell: `tests/WCAG/showcase-index.spec.ts` +
      the four new component pages (profile-menu, footer, small-box, info-box) — zero
      axe violations × 3 viewports.
- [ ] Extend `docs/user-guide.md` catalogue with the four widgets + a Filament link;
      note the interactive showcase; rebuild `resources/dist/kadoorie.css`.
- [ ] Final full sweep: Pint · Larastan · Pest · ESLint · Prettier · Playwright
      functional + wcag · composer/npm audit.

**DoD**: standard; whole suite green including the new components' and the showcase's
browser tests.

**Commit**: `test: Add showcase interaction + WCAG specs; update guide`

---

## 6. Testing Strategy

| Component | Pest | Playwright functional | WCAG (showcase) |
|---|---|---|---|
| Profile menu | trigger, menu items, csrf logout form, aria | open/Esc/focus-return, logout submit | axe |
| Footer | contentinfo, columns, legal, links | links reachable, no h-scroll | axe |
| Small-box | value/label/icon/link hooks, solid contrast class | More-info navigates, no h-scroll | axe |
| Info-box | icon/label/value, progressbar aria | progressbar values, no h-scroll | axe |
| Filament theme | publish tag + token presence + colour ramp | — (no page) | — |
| Showcase shell | — | tabs toggle, copy, sidebar collapse, demo triggers (file://) | axe (index + pages) |

New components register a `ComponentExample`, so the WCAG matrix scans their
generated pages automatically once regenerated. Component functional specs run on
the workbench (`functional-*`); **showcase** interaction specs run against the
static site via absolute `file://` URLs (`showcaseUrl()` helper), independent of
project baseURL.

## 7. Assumptions & Open Decisions

| # | Assumption (override by telling me) |
|---|---|
| A1 | Footer is a **configurable** multi-column layout, not a pixel-match of a specific Figma frame (which I don't have). Share the frame and I'll align it. |
| A2 | Solid widget fills use AA-verified on-colours (success darkened for white text; warning uses dark text). |
| A3 | Profile-menu logout renders a `POST` form + `@csrf` when `logoutUrl` is set; a `logout` slot overrides for `wire:click`/custom flows. Component performs no auth. |
| A4 | Filament = **recolour theme only** (no plugin class); `filament/support` is a dev/suggest dep, so the package never hard-requires Filament. |
| A5 | Filament theme ships CSS for **both v3 and v4**; deep visual parity is verified manually in a host Filament app (no browser test for the theme). |
| A6 | `Tone` is extended (not duplicated) to carry brand cases + solid fills. |
| A7 | The interactive showcase **replaces** the flat generator output; it stays static + committed + deterministic, with Alpine-driven (not Livewire) demos for the stateful components. |
| A8 | The showcase uses its own **left-sidebar** docs chrome (AdminLTE idiom); the library's own top-bar `Nav` is still demoed on its own page. |
| A9 | Interactivity is Alpine-first; a bespoke `resources/js/showcase.js` is added only if unavoidable, and then linted/formatted (no Jest coverage target, per the testing-plan decision). |
