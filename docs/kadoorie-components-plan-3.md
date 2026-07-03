# Kadoorie Livewire Components — Implementation Plan · Part 3 of 3

> **Plan Set**: `docs/kadoorie-components-plan-*.md`
> **This File**: Part 3 — Phase 3 (Layout), Phase 4 (Data), Phase 5 (Pages), Phase 6 (Integration/Workbench), Phase 7 (Static Showcase & Guides), Phase 8 (Release), Testing Strategy, Appendix
> **Navigation**: [Part 1 — Summary & Architecture](kadoorie-components-plan-1.md) · [Part 2 — Phases 0–2](kadoorie-components-plan-2.md) · **Part 3 (this file)**

Same conventions as Part 2: poker estimates, code deltas, TDD-first tests, the standard
**Definition of Done**, and a **DO NOT COMMIT** commit message per phase.

---

## Phase 3 — Layout & Content · **16 pts** · (depends on 0B) · parallel with 1,2,4

### Phase 3A — Card + Badge + Avatar + Divider · **3 pts**
- `Card` (Blade): surface + `--kad-shadow-sm`, optional header/footer slots, `role` neutral.
- `Badge` **single component** with `variant` (Tone enum) + `shape` (rounded|pill) + `size` — replaces
  Badge/Tag/Pill triplet (DRY gate). Colour conveyed with **text + icon**, never colour alone.
- `Avatar`: image with required `alt`, initials fallback, size enum, presence dot with sr-only label.
- `Divider`: `role="separator"`, horizontal/vertical, optional labelled slot.

### Phase 3B — Tabs + Accordion · **5 pts** (Alpine, full keyboard model)
- `Tabs`: `role="tablist"`/`tab`/`tabpanel`, roving tabindex, Arrow/Home/End keys, `aria-selected`,
  `aria-controls`.
- `Accordion`: button headers with `aria-expanded`/`aria-controls`, single/multi open, Alpine collapse.

### Phase 3C — Breadcrumbs + Nav · **8 pts**
- `Breadcrumbs`: `<nav aria-label>` + ordered list, current = `aria-current="page"`.
- `Nav` — **horizontal top bar** as the desktop primary navigation (confirmed A12): brand/logo,
  inline menu items with active-state (`aria-current`), keyboard-navigable dropdowns (reuses Phase 4
  dropdown), `<x-kadoorie::icon>` icons, and a skip-link target.
- **Responsive collapse — top dropdown sheet** (confirmed A10/A11): at desktop the menu is inline;
  **below `md` it collapses behind a hamburger toggle that expands a full-width panel directly below
  the bar** (accordion-style, not off-canvas). Alpine-driven: `aria-expanded`/`aria-controls` on the
  toggle, the sheet is a labelled region, **focus moves into the open sheet, Esc closes and returns
  focus** to the toggle, click-outside closes; the sheet pushes/overlays content without causing
  horizontal scroll.
- **Sticky option**: a `sticky` bool prop (default via `config('kadoorie.nav.sticky')`). When true →
  `position: sticky; top: 0` with a managed z-index and content offset; when false the bar scrolls
  with the page. Neither variant may overlap or clip content.

### TDD acceptance (Nav — representative)
```php
it('collapses to a toggle + dropdown sheet below md and exposes aria state', function (): void {
    $view = $this->blade('<x-kadoorie::nav :items="$items" />', ['items' => $items]);
    $view->assertSee('data-test="nav-toggle"', false)
         ->assertSee('aria-expanded="false"', false)
         ->assertSee('aria-controls="nav-sheet"', false)
         ->assertSee('data-test="nav-sheet"', false);
});

it('renders sticky positioning only when the sticky prop is set', function (): void {
    $this->blade('<x-kadoorie::nav :sticky="true" :items="$items" />', ['items' => $items])
        ->assertSee('data-test="nav"', false)->assertSee('sticky', false);
    $this->blade('<x-kadoorie::nav :sticky="false" :items="$items" />', ['items' => $items])
        ->assertDontSee('sticky top-0', false);
});
```
Plus **Playwright at all three viewports**: 1920 shows the inline top bar (no toggle); 360 & 768 show
the hamburger with the sheet hidden until toggled, focus moves into the sheet, Esc closes and returns
focus; a **sticky vs non-sticky scroll test** asserts the bar stays pinned when `sticky` and scrolls
away when not; a horizontal-scroll assertion at each width. WCAG axe pass collapsed and expanded.

### DoD + commit messages
Standard DoD; each sub-phase axe-clean with full keyboard support, and the Nav verified at all three
viewports (collapse threshold, dropdown-sheet focus management, sticky/non-sticky).
```
PHASE 3A — feat: Add Card, Badge, Avatar, and Divider components
PHASE 3B — feat: Add accessible Tabs and Accordion (keyboard model)
PHASE 3C — feat: Add Breadcrumbs and responsive Nav
```

---

## Phase 4 — Data Display · **14 pts** · (depends on 0B; DataTable reuses Phase 1 controls)

### Phase 4A — Dropdown menu + Tag + Empty state · **3 pts**
- `Dropdown` (Alpine): `role="menu"`/`menuitem`, arrow-key navigation, Esc close, focus return,
  `aria-expanded` on trigger. Shared by Nav (3C) and DataTable (4C).
- `EmptyState`: illustration slot + heading + action; `role="status"` when used for empty results.

### Phase 4B — Pagination · **3 pts**
- Blade component rendering Laravel paginator links as `<nav aria-label="Pagination">`, `aria-current`
  on the active page, prev/next with accessible labels, disabled edges non-focusable.

### Phase 4C — Data table · **8 pts** (Livewire `kadoorie::data-table`)
- Sortable columns (`aria-sort`), server-side pagination (reuse 4B), optional row selection, loading
  state, empty state (reuse 4A). Column definitions via typed value objects (SRP).
- **Responsive**: renders as a real `<table>` on desktop; **below `md` it reflows to stacked cards**
  (one card per row, each cell labelled) so there is no horizontal scroll on mobile/tablet. Verified
  by the responsive Playwright matrix.
- **Number cells use `.kad-nums` (tabular figures)** to prevent column jitter; a **skeleton/shimmer
  loading state** shows while data loads >300ms (not a bare spinner).
- Bounded queries only (project performance rules): enforce a max page size; eager-load provided
  relations; no unbounded collections.

### TDD acceptance (representative)
```php
it('sorts by a column and exposes aria-sort', function (): void {
    Livewire::test(DataTable::class, ['rows' => $rows, 'columns' => $columns])
        ->call('sortBy', 'name')
        ->assertSet('sortField', 'name')
        ->assertSeeHtml('aria-sort="ascending"');
});
```

### DoD + commit messages
Standard DoD + performance checklist (no N+1, bounded page size) for the DataTable.
```
PHASE 4A — feat: Add Dropdown menu, Tag, and Empty state
PHASE 4B — feat: Add accessible Pagination component
PHASE 4C — feat: Add sortable, paginated Livewire Data table
```

---

## Phase 5 — Page Templates · **10 pts** · (depends on 1, 2, 3)

### Phase 5A — Login page · **5 pts** (Livewire `kadoorie::pages.login`, auth-agnostic — A2)
- Composes Field/Input/Button/Alert; validates email + password; shows validation errors with
  `aria-describedby` and **preserves old input** on redirect-back (project testing rule).
- **Does not authenticate**: emits `kadoorie:login-submitted` with validated credentials **or** invokes
  a configurable handler (`config('kadoorie.login.handler')`), so the host app wires Fortify/Sanctum.
- Semantic landmarks (`<main>`, `<h1>`), Kadoorie logo with `alt`, remember-me, forgot-password slot.

**`src/Livewire/Pages/Login.php`** (CREATE, sketch)
```php
<?php

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Livewire\Pages;

use Illuminate\Contracts\View\View;
use Livewire\Attributes\Validate;
use Livewire\Component;

final class Login extends Component
{
    #[Validate('required|email')]
    public string $email = '';

    #[Validate('required|string')]
    public string $password = '';

    public bool $remember = false;

    public function submit(): void
    {
        $credentials = $this->validate();

        // Auth-agnostic: delegate to the host app.
        $this->dispatch('kadoorie:login-submitted', ...$credentials, remember: $this->remember);
    }

    public function render(): View
    {
        return view('kadoorie::pages.login');
    }
}
```

### Phase 5B — Error pages (generic + 401/403/404/405/406/412/500/501/502) · **5 pts**
**Single parameterised component** (DRY gate resolution). One enum drives all nine + the generic page.

**`src/Enums/HttpErrorStatus.php`** (CREATE, sketch)
```php
<?php

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Enums;

enum HttpErrorStatus: int
{
    case Unauthorized = 401;
    case Forbidden = 403;
    case NotFound = 404;
    case MethodNotAllowed = 405;
    case NotAcceptable = 406;
    case PreconditionFailed = 412;
    case ServerError = 500;
    case NotImplemented = 501;
    case BadGateway = 502;

    public function title(): string
    {
        return match ($this) {
            self::Unauthorized => 'Authentication required',
            self::Forbidden => 'Access denied',
            self::NotFound => 'Page not found',
            self::MethodNotAllowed => 'Method not allowed',
            self::NotAcceptable => 'Not acceptable',
            self::PreconditionFailed => 'Precondition failed',
            self::ServerError => 'Something went wrong',
            self::NotImplemented => 'Not implemented',
            self::BadGateway => 'Bad gateway',
        };
    }

    public function description(): string { /* one match arm per case */ }
}
```

**`src/View/Components/ErrorPage.php`** (CREATE) — accepts a status, resolves via the enum, renders one
view. Host apps map `resources/views/errors/{code}.blade.php` to `<x-kadoorie::error-page :status="404" />`.

### TDD acceptance (representative)
```php
it('renders the correct copy for each HTTP status from one component', function (int $code, string $title): void {
    $this->blade('<x-kadoorie::error-page :status="$code" />', ['code' => $code])
        ->assertSee($title)
        ->assertSee('data-test="kadoorie-error-page"', false);
})->with([
    [404, 'Page not found'],
    [403, 'Access denied'],
    [500, 'Something went wrong'],
]);

it('validates login and preserves old input on failure', function (): void {
    Livewire::test(Login::class)
        ->set('email', 'not-an-email')->call('submit')
        ->assertHasErrors(['email' => 'email']);
});
```

### DoD + commit messages
Standard DoD + each error page axe-clean, one component proven to cover all nine codes.
```
PHASE 5A — feat: Add auth-agnostic Login page component
PHASE 5B — feat: Add parameterised HTTP error page (401–502 + generic)
```

---

## Phase 6 — Integration & Workbench Demo · **6 pts** · (depends on 1–5)

### Goal
A live Testbench demo app plus a machine-readable example registry that both the browser preview and
the Phase 7 static generator consume, so component examples are defined **once**.

### Tasks
- [ ] `workbench/` Testbench demo app with a preview route per component (**3**)
- [ ] `ComponentExample` registry — each component's canonical variants/states + a code snippet, in
      one typed place reused by workbench routes **and** the static showcase generator (**2**)
- [x] Full-suite sweep: Pint, Larastan, Pest, Jest, Playwright functional + WCAG, composer/npm audit (**1**)

**`src/Support/ComponentExample.php`** (CREATE, sketch) — one example = a title, the rendered
Blade/Livewire tag, and the source snippet shown beside it.
```php
<?php

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Support;

final readonly class ComponentExample
{
    public function __construct(
        public string $component,   // e.g. "button"
        public string $title,       // e.g. "Primary / loading"
        public string $snippet,     // literal source shown to the user
    ) {
    }
}
```

### Definition of Done
Standard DoD + every component has ≥1 registered example, the workbench renders each preview route,
and the full suite is green.

### Commit message
```
PHASE 6 — chore: Add workbench demo app and component example registry
(full file list + DO NOT COMMIT warning)
```

---

## Phase 7 — Static HTML Showcase & User Guides · **11 pts** · (depends on 6)

Delivers the three requested artefacts: a **static HTML component gallery**, a **user guide**, and a
**data-binding guide** (how to push data into components).

### Phase 7A — Static HTML showcase generator · **5 pts**
- [ ] `php artisan kadoorie:build-showcase` (workbench command) iterates the Phase 6
      `ComponentExample` registry, renders each example through Blade to an HTML string, and writes
      **flat files**: `docs/showcase/index.html` (gallery landing) + `docs/showcase/<component>.html`
      per component.
- [ ] Each example block shows the **rendered markup** next to its **escaped source snippet** with a
      variant/state label.
- [ ] Generated pages link the **precompiled `resources/dist/kadoorie.css`** and Alpine so
      stateless/Alpine interactions (dropdown, tabs, accordion, modal open/close, tooltip) work in a
      browser **with no server**. Livewire components render their initial state with a clear note
      that full server behaviour needs a Livewire runtime.
- [ ] Output is deterministic and committed under `docs/showcase/` (hostable via GitHub Pages).
- [x] The showcase pages themselves are semantic and **axe-clean** (they are UI too).

**`src/Console/BuildShowcaseCommand.php`** (CREATE, sketch)
```php
<?php

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Blade;

final class BuildShowcaseCommand extends Command
{
    protected $signature = 'kadoorie:build-showcase {--output=docs/showcase}';
    protected $description = 'Render every registered component example to static HTML.';

    public function handle(): int
    {
        // 1. Load ComponentExample registry (grouped by component).
        // 2. Blade::render() each snippet to HTML.
        // 3. Wrap markup + escaped snippet in the static page layout
        //    (links resources/dist/kadoorie.css + Alpine).
        // 4. Write index.html + one page per component to --output.
        return self::SUCCESS;
    }
}
```

### Phase 7B — User guide · **3 pts**
- [ ] `docs/user-guide.md`: introduction, requirements, **installation from the private VCS repo**,
      auto-discovery, publishing `kadoorie-config` / `kadoorie-views` / `kadoorie-styles`, choosing
      **Tailwind preset vs precompiled CSS**, theming via `--kad-*`, accessibility guidance, and a
      component catalogue with copy-paste usage per component. Linked from `README`.

### Phase 7C — Data-binding guide ("how to push data into components") · **3 pts**
- [ ] `docs/data-binding.md` covering, with runnable examples:
  - **Blade components**: attributes/props (`:variant`, `:size`, bound vs literal), named slots,
    forwarding `$attributes`, `@props` defaults.
  - **Livewire components**: mount parameters (`<livewire:kadoorie::modal :title="$title" />`), public
    properties, two-way binding with `wire:model` / `wire:model.live`, `#[Reactive]` props from a
    parent, dispatching data **in** via events and listening for events **out** (e.g.
    `kadoorie:login-submitted`), and Alpine `@entangle`.
  - **Recipes**: feed a `Collection` / `LengthAwarePaginator` + column definitions into the
    `DataTable`; pass option arrays to `Select`; drive `Alert`/`Toast` tone via the `Tone` enum; wire
    the auth-agnostic `Login` handler.
- [ ] Cross-linked from the user guide and the relevant showcase pages.

### TDD acceptance (Phase 7)
```php
it('builds a static showcase page for every registered component', function (): void {
    $this->artisan('kadoorie:build-showcase', ['--output' => $tmp = sys_get_temp_dir() . '/kad'])
        ->assertSuccessful();

    expect($tmp . '/index.html')->toBeReadableFile()
        ->and(file_get_contents($tmp . '/button.html'))
        ->toContain('data-test="kadoorie-button"');
});
```
Plus a Playwright WCAG pass over the generated `index.html` and one component page.

### Definition of Done (Phase 7)
Standard DoD + `kadoorie:build-showcase` is deterministic and opens correctly from flat files; every
component appears in the gallery; the user guide and data-binding guide cover **every** component and
all internal links resolve; showcase pages are axe-clean.

### Commit messages
```
PHASE 7A — feat: Add static HTML component showcase generator
PHASE 7B — docs: Add Kadoorie components user guide
PHASE 7C — docs: Add data-binding guide for pushing data into components
(each with full file list + DO NOT COMMIT warning)
```

---

## Phase 8 — Release · **3 pts** · (depends on 7)

### Tasks
- [ ] Semver `0.1.0`, `CHANGELOG.md`, private-repo install docs + `composer.json` `repositories`
      example, and a tag checklist (**2**)
- [ ] Optional: publish `docs/showcase/` via GitHub Pages; final green CI on the release commit (**1**)

### Definition of Done
Standard DoD across the **whole** package + green CI on the release commit + `composer install` from
the private VCS repo works in a scratch Laravel app + the showcase and guides are reachable.

### Commit message
```
PHASE 8 — chore: Prepare 0.1.0 release (changelog, install docs, tag checklist)
(full file list + DO NOT COMMIT warning)
```

---

## Testing Strategy

Pyramid (project rules 04 / 06):

| Layer | Tooling | Scope | Location |
|---|---|---|---|
| Unit (most) | Pest | enums, concerns, value objects, class rendering | `tests/Unit` |
| Feature | Pest + Testbench + `Livewire::test()` | component render, state, validation, a11y attrs, **SVG-icon assertions** | `tests/Feature` |
| JS unit | Jest (≥85%) | Alpine behaviors in `resources/js` | `tests/JavaScript/**.test.js` |
| Functional browser | Playwright `--project=functional` | keyboard, focus trap/return, interactions, **Nav collapse + sticky** | `tests/Playwright/*.spec.ts` |
| Responsive | Playwright viewport **matrix** (functional + wcag) | **360×800, 768×1024, 1920×1080**: no horizontal scroll, correct collapse/reflow, touch targets | run via `project` × `viewport` |
| Accessibility | Playwright `--project=wcag` + `@axe-core/playwright` | zero axe violations at every viewport | `tests/WCAG/*.spec.ts` |

**Responsive matrix**: `playwright.config.ts` defines the three reference viewports and runs the
`functional` and `wcag` projects against each. Every page-level spec asserts
`document.documentElement.scrollWidth <= window.innerWidth` (no horizontal scroll). Reflow components
(Nav → drawer, DataTable → stacked cards, Tabs → scrollable) have explicit per-breakpoint assertions.

**SVG-first tests**: Pest asserts icon/logo/illustration slots render `<svg` (not `<img`/emoji) and
that decorative SVGs carry `aria-hidden="true"` while meaningful ones expose a `<title>`/`aria-label`.

**Nav tests**: collapse threshold at `md`, hamburger `aria-expanded`/`aria-controls`, drawer focus
trap + Esc + focus return, and a sticky-vs-non-sticky scroll assertion (see Phase 3C).

Rules: `data-test` selectors only (never CSS/IDs); `Livewire::test(Class::class)`; enum cases not raw
strings; assert `assertSessionHasOldInput()` on form redirect-back; durable tests (behaviour, not
implementation). TDD: write failing tests first each phase, then implement.

## Parallel Execution Guidance

After **0 → 0B**, launch Phases **1, 2, 3, 4 in parallel sub-agents** (independent component trees;
only shared touch-point is the provider's registration block — serialise those edits or use a
per-phase registration partial). **Phase 5** waits on 1+2+3; **Phase 6** waits on 1–5, then
**Phase 7** (showcase + guides) waits on 6, and **Phase 8** (release) waits on 7. Each sub-agent
returns its conventional commit message; the main agent surfaces every message to the user, who makes
the commits.

## Definition of Done (per phase — canonical)

```
- [ ] Pint clean (docker exec kadoorie-app ./vendor/bin/pint --dirty --format agent)
- [ ] Larastan clean
- [ ] Pest green (docker exec kadoorie-app php artisan test --compact)
- [ ] JS lint + format clean; Jest ≥85% statements
- [x] Playwright functional + WCAG (axe) green across the viewport matrix (360×800, 768×1024, 1920×1080)
- [ ] No horizontal scroll at any reference viewport; touch targets ≥ 44×44px
- [ ] All icons/logo/illustrations are inline SVG (no emoji/raster); decorative SVGs aria-hidden
- [ ] Transitions respect `prefers-reduced-motion`; contrast meets AA (muted body text on the AA token)
- [ ] Unique kebab-case data-test on every meaningful element
- [ ] Strict types + project file header on every PHP/JS file
- [ ] SOLID/DRY gate respected (no near-duplicate classes)
- [ ] Tasks checked off in the plan; health-check skill clean
```

## Appendix

### A. Figma extraction provenance
- File: `Newsletter` (`VJ2yhCdYrREAqW7fpQK8xr`), owner `duncan.appelbe`.
- Method: Figma REST API `GET /v1/files/:key` (full node tree), aggregated fills/strokes/text
  styles/effects/auto-layout. No published styles; Variables endpoint unavailable (non-Enterprise
  scope) — tokens derived from node values. Token used only in-session; **revoke it**.
- Raw aggregation lives in the session scratchpad (`figma_file_full.json`, `extract.py`); not committed.

### B. Cross-cutting checklists (applied every phase)
- **Security (rule 07)**: no secrets, no `env()` outside config, validate external input, `$fillable`
  where models exist, no sensitive data in output.
- **Performance (rule 09)**: no N+1, bounded queries/collections, index multi-column filters, queue
  slow work, cache with clear invalidation.
- **Accessibility (rule 06)**: WCAG 2.1 AA, contrast ≥4.5:1 / 3:1, labels, focus visible, no keyboard
  traps, 44×44 touch targets, `aria-live` for dynamic updates, `<html lang>` in page templates.

### C. Next step
Review/adjust the [assumptions in Part 1 §8](kadoorie-components-plan-1.md#8-assumptions--open-decisions),
then execute with `/superbuild` starting at **Phase 0**.
