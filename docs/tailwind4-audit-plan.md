# CI npm Audit Fix: Tailwind 4 Migration Plan

> **Branch**: `feature/icons-header-navigation` (user decision: ship on this branch)
> **Type**: Bug fix (CI gate) with a breaking dependency migration
> **Total estimate**: 24 points across 6 phases
> **Status**: Planned. Nothing implemented yet.

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Intake](#2-intake)
3. [Detect](#3-detect)
4. [Interview Decisions](#4-interview-decisions)
5. [Research and Spikes](#5-research-and-spikes)
6. [Explore: Codebase Impact](#6-explore-codebase-impact)
7. [Refactor Assessment](#7-refactor-assessment)
8. [Architecture](#8-architecture)
9. [Phases and Estimates](#9-phases-and-estimates)
10. [Phase Details](#10-phase-details)
11. [Testing Strategy](#11-testing-strategy)
12. [Risks, Assumptions, Follow-ups](#12-risks-assumptions-follow-ups)

---

## 1. Executive Summary

Every CI run on `feature/icons-header-navigation` fails in one step: **JavaScript quality gates → `npm audit --audit-level=high`**. All of these pass: PHP (Pint, Larastan, Pest, composer audit), ESLint, Prettier, Jest, and React (typecheck, Vitest). The browser job is skipped only because it `needs` the failing JavaScript job.

**Why the failure isn't a code regression:** after `package-lock.json` was last refreshed (`db374bc`), new advisories were published against the existing dev toolchain.

**Why local checks look green:** `.githooks/pre-commit` runs `npm audit` only when `package-lock.json` is staged, so the advisories never showed up locally.

**Reproduced locally:**

```bash
npm audit --audit-level=high
# 44 vulnerabilities (8 moderate, 34 high, 2 critical)
```

| Root advisory | Severity | Introduced by | Resolution in this plan |
|---|---|---|---|
| `tinypool` <2.1.2, prototype pollution to RCE ([GHSA-5gmw-xhrv-c9v3](https://github.com/advisories/GHSA-5gmw-xhrv-c9v3), [GHSA-85c8-ppgw-ccpr](https://github.com/advisories/GHSA-85c8-ppgw-ccpr)) | critical | `vitest@3.2.6` | `vitest@4.1.12`, which no longer depends on tinypool |
| `braces` <=3.0.3, stack-exhaustion DoS ([GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)). **No patched release exists.** | high | `tailwindcss@3.4.19` (micromatch), `postcss-cli@11` (chokidar 3), `jest@29` (micromatch) | Tailwind 4 + `@tailwindcss/postcss`, `postcss-cli@12`, `jest@30` all drop braces |
| `source-map-js` <1.2.2, DoS ([GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q)) | high | postcss / vite | Lockfile refresh resolves `1.2.2` |
| `@vitest/mocker` <4.1.11, path traversal | moderate | vitest 3 | `vitest@4.1.12` |
| `postcss-selector-parser` <7.1.6 | moderate | tailwind 3 (postcss-nested) | Tailwind 4 |
| `sprintf-js` (all versions) | moderate | jest → babel-plugin-istanbul → js-yaml 3 | **Remains.** Moderate, so it does not fail the `high` gate. Track upstream. |

Tailwind 3.4.19 is the final v3 release and still depends on `braces`, so meeting the gate requires **Tailwind 4**. The migration keeps every component class name and the rendered output unchanged. Consumers get a new CSS-first theme, and the JS preset stays as a deprecated compatibility path.

---

## 2. Intake

- **Source**: user request in chat. *"CI tests in GitHub are failing … local checks pass … review and resolve."*
- **Type**: bug fix (CI gate), expanded into a technical migration.
- **Evidence**: run [38370369969](https://github.com/oxfordtrauma/kadoorie-livewire-components/actions/runs/38370369969). Failing job: *JavaScript quality gates*. Failing step: *npm audit (high)*. The four previous runs on this branch fail the same way.
- **Understanding**: dev-toolchain advisories block CI. Only the Tailwind 4 path clears the unpatchable `braces` advisory without weakening the security gate.

## 3. Detect

`CLAUDE.md` is empty and there is no `AGENTS.md`. The stack comes from `.claude/rules/*`, `package.json`, `composer.json` and `ci.yml`.

| Area | Tooling |
|---|---|
| PHP | PHP 8.3, Laravel 13 / Livewire 4 package, Testbench 11 |
| PHP quality | Pint (PER), Larastan max, Pest 4 |
| JS / CSS | Tailwind 3.4 via postcss-cli 11, esbuild, Vite 6 (React workbench) |
| JS quality | ESLint 9, Prettier 3, TypeScript 5.7 |
| JS tests | Jest 29 (jsdom, no test files yet, `passWithNoTests`), Vitest 3 (React), Playwright functional + WCAG (axe) |
| Security | `composer audit`, `npm audit --audit-level=high`, osv-scanner (pre-commit) |

No bootstrap phase is needed. Research was **not bypassed**, because CLAUDE.md is empty, and it was replaced by targeted dependency spikes (§5).

## 4. Interview Decisions

| Question | Decision |
|---|---|
| How to clear the unpatchable `braces` advisory | **Migrate to Tailwind 4.** An allowlist or prod-only audit was rejected. |
| Consumer integration | **New CSS-first `resources/css/theme.css`, and keep `tailwind-preset.cjs` (deprecated) for `@config` users.** |
| Browser baseline (Safari 16.4+, Chrome 111+, Firefox 128+) | **Accepted.** Document it in the user guide and CHANGELOG. |
| v4 default changes (hover, border colour, button cursor) | **Preserve v3 rendering** with compatibility CSS. |
| Delivery | **On this branch.** Release as `0.3.0` with a BREAKING entry. |

## 5. Research and Spikes

All spikes ran in the session scratchpad (`--ignore-scripts`). Nothing in the repo was touched.

1. **Candidate dependency set.** `tailwindcss@4.3.3`, `@tailwindcss/postcss@4.3.3`, `postcss-cli@12.0.0`, `jest@30.5.2`, `jest-environment-jsdom@30.5.2`, `vitest@4.1.12`. Result: `npm audit --audit-level=high` **exits 0**. 19 moderate findings remain, all the `sprintf-js` chain. `braces`/`micromatch` are absent from the tree, and `source-map-js` resolves to `1.2.2`.
2. **`@tailwindcss/cli` instead of PostCSS: rejected.** It re-introduces `braces` through `@parcel/watcher` (4 high, exit 1). The build **must** stay on `@tailwindcss/postcss` + `postcss-cli@12`.
3. **Keeping class names.** With an `@theme` that remaps the namespaces, Tailwind 4.3.3 compiles:
   - bare `rounded` → `border-radius: var(--radius)`
   - `rounded-sm` → `var(--radius-sm)`
   - `shadow-sm` → `--tw-shadow: var(--kad-shadow-sm)`
   - `text-md` → font size and line height from `--text-md` / `--text-md--line-height`
   - `max-w-container` → `var(--max-width-container)`
   - custom px breakpoints → `@media (width >= 480px)` and so on
   - `!block`, `peer-focus-visible:shadow-[var(--kad-ring)]` and `ring-2` all compile.

   **Conclusion: do not run `@tailwindcss/upgrade` renames.** They would map `shadow-sm` → `shadow-xs` and `rounded` → `rounded-sm` against *default* scales the preset has already overridden.
4. **`@config` compatibility.** Loading the unchanged `tailwind-preset.cjs` through `@config` in v4 produced the same utilities, with values inlined as `var(--kad-*)`. It also emitted the preflight `border-color: var(--kad-color-border)`. The deprecated consumer path works.
5. **`@theme` vs `@theme inline`.** Plain `@theme` emits `--radius: var(--kad-radius-base)` on `:root` and utilities reference `var(--radius)`. A `--kad-*` override on a *subtree* would then not propagate, which is a behaviour change from v3. **Use `@theme inline`** so utilities reference `var(--kad-*)` directly, matching v3 and the `@config` output.
6. **Hover.** `@custom-variant hover (&:hover);` restores the v3 behaviour (no `@media (hover: hover)` wrapper). Verified.

## 6. Explore: Codebase Impact

Full inventory from a sub-agent sweep of views, src, React, JS, CSS and tests.

| Concern | Findings | Action |
|---|---|---|
| `shadow-sm` | 18 (9 Blade, 9 React) | None. The theme maps `--shadow-sm`. |
| bare `rounded` | 25 (13 Blade, 12 React). Plus the `BadgeShape` value `'rounded'`, which is **not** a class. | None. The theme maps `--radius`. |
| `outline-none`, bare `ring`, `blur`, `drop-shadow`, `*-opacity-*`, `flex-grow/shrink`, `space-*`, `[--var]` arbitrary values | 0 | None |
| Borders without a literal colour | Wizard step marker (`wizard.blade.php:41`, colour only via Alpine `x-bind:class`). Alert, Toast and Badge get colour from enums. | Covered by the compatibility base rule `border-color: var(--kad-color-border)`. |
| `hover:` | 65 uses | Covered by `@custom-variant hover`. |
| `<button>` cursor | ~33 buttons. v4 preflight drops `cursor: pointer`. | Compatibility base rule. |
| `container` utility | Configured in the preset, **unused** in markup (`max-w-container` is used instead) | Drop from the v4 theme. Document it for `@config` consumers. |
| `corePlugins.preflight` | `tailwind.config.cjs` | v4 always includes preflight through `@import "tailwindcss"`. |
| Content paths | views, js, src, workbench. `resources/react/src` is **not** scanned today. | Explicit `@source` with `source(none)` so v4 does not scan `docs/showcase/*.html` or `.claude/`. Add `resources/react/src`. |
| Filament v4 theme | `resources/filament/kadoorie-v4.css:27` uses `--font-family-sans` (a v3 name, ignored by v4) | Rename to `--font-sans`. |
| Vite React workbench | Imports `../dist/kadoorie.css`. Vite may pick up the root `postcss.config.cjs`. | Verify the compiled CSS is not reprocessed. If it is, set `css.postcss: {}` in `resources/react-workbench/vite.config.ts`. |
| Tests asserting renamed tokens | None | n/a |
| Jest 30 exposure | No files in `tests/JavaScript`. No removed matcher aliases. | Upgrade only. |
| Vitest 4 exposure | ~30 standard `vi.*` uses. No `workspace` or `poolOptions`. | Upgrade, then run. |

## 7. Refactor Assessment

**Confidence: LOW.** The CSS architecture (tokens → theme → utilities) maps cleanly onto v4's CSS-first model, and no refactor phase is needed. Slop analysis was skipped because the skill isn't installed. Roadmap questions were not asked: this is a CI fix with a fixed scope.

Pre-existing issues found in passing:
- **`resources/react/src/ui/Badge.tsx:64`**: the chained `.replace('gap-1','gap-0.5').replace('gap-1.5','gap-1')` turns `gap-1.5` into the invalid `gap-0.5.5` for md/lg sizes. This is **out of scope** and proposed as a separate follow-up.
- **`docs/user-guide.md` Option A** omits `src/` from the consumer content paths, although enum-generated classes live there. Fixed in Phase 3 because that section is rewritten anyway.

## 8. Architecture

```
                 BEFORE (v3)                                      AFTER (v4)
┌──────────────────────────────────┐          ┌───────────────────────────────────────────┐
│ tokens.css  (--kad-* on :root)   │          │ tokens.css  (--kad-* on :root) unchanged   │
└──────────────┬───────────────────┘          └──────────────┬────────────────────────────┘
               │                                              │
┌──────────────▼───────────────────┐          ┌──────────────▼────────────────────────────┐
│ tailwind-preset.cjs (JS theme)   │          │ theme.css  NEW, @theme inline → var(--kad) │
│ tailwind.config.cjs (content)    │          │  + @custom-variant hover                  │
└──────────────┬───────────────────┘          │  + @layer base compat (border, cursor)    │
               │                              └──────────────┬────────────────────────────┘
┌──────────────▼───────────────────┐          ┌──────────────▼────────────────────────────┐
│ kadoorie.css: @tailwind × 3      │          │ kadoorie.css: @import "tailwindcss"       │
│ postcss: import+tailwind+autopfx │          │   source(none); @source …; theme.css      │
└──────────────┬───────────────────┘          │ postcss: @tailwindcss/postcss only        │
               ▼                              └──────────────┬────────────────────────────┘
     resources/dist/kadoorie.css                             ▼
                                                 resources/dist/kadoorie.css (same classes)

Consumers (Tailwind apps):
  v4 native:   @import "tailwindcss"; @import ".../tokens.css"; @import ".../theme.css"; @source ...
  deprecated:  @config ".../tailwind-preset.cjs"   (parity-tested against theme.css)
Consumers (no Tailwind): unchanged, link the published dist/kadoorie.css
```

`theme.css` is the **single source of truth** for v4. `tailwind-preset.cjs` is frozen and deprecated. A parity test keeps the two from drifting until the preset is removed (a future major).

---

## 9. Phases and Estimates

```
            ┌──────────────────────────────┐
            │ Phase 1: Dependency manifest │  (3)
            │ package.json + lockfile      │
            └───────┬───────────┬──────────┘
                    │           │
     ┌──────────────▼──┐   ┌────▼───────────────────────┐   ┌─────────────────────────┐
     │ 2A: Test runner │   │ 2B: Tailwind 4 stylesheet   │   │ 3: Docs + CHANGELOG     │
     │ Jest30/Vitest4  │   │ migration + dist rebuild    │   │ (parallel from start)   │
     │ (2)             │   │ (8)                         │   │ (3)                     │
     └──────────────┬──┘   └────┬───────────────────────┘   └───────────┬─────────────┘
                    │           │                                       │
                    │      ┌────▼───────────────────────┐               │
                    │      │ 2C: Consumer compat +      │               │
                    │      │ parity test (3)            │               │
                    │      └────┬───────────────────────┘               │
                    └───────────┼───────────────────────────────────────┘
                           ┌────▼───────────────────────┐
                           │ 4: Integration verification │  (5)
                           └─────────────────────────────┘
```

| Phase | Name | Depends On | Parallel With | Estimate | Status |
|---|---|---|---|---|---|
| 1 | Dependency manifest and lockfile | n/a | 3 | 3 | ✅ |
| 2A | Test-runner compatibility (Jest 30, Vitest 4) | 1 | 2B, 3 | 2 | ✅ |
| 2B | Tailwind 4 stylesheet migration | 1 | 2A, 3 | 8 | ✅ |
| 2C | Consumer compatibility and theme parity test | 2B | 2A, 3 | 3 | ✅ |
| 3 | Documentation and CHANGELOG | n/a | 1, 2A, 2B, 2C | 3 | ✅ |
| 4 | Integration verification (CI parity and visual diff) | 2A, 2B, 2C, 3 | n/a | 5 | ✅ (push pending) |

Phase 1 is sequential because every other code phase needs the new `node_modules`. 2A and 2B touch disjoint files. 2C depends on `theme.css` from 2B. Phase 3 touches only docs.

---

## 10. Phase Details

### Phase 1: Dependency Manifest and Lockfile (3)

**Goal:** a lockfile for which `npm audit --audit-level=high` exits 0.

**Tasks**
- [x] `package.json` devDependencies:
  ```diff
  -    "autoprefixer": "^10.4.0",
  +    "@tailwindcss/postcss": "^4.3.3",
  -    "jest": "^29.7.0",
  -    "jest-environment-jsdom": "^29.7.0",
  +    "jest": "^30.5.2",
  +    "jest-environment-jsdom": "^30.5.2",
  -    "postcss-cli": "^11.0.0",
  -    "postcss-import": "^16.1.0",
  +    "postcss-cli": "^12.0.0",
  -    "tailwindcss": "^3.4.0",
  +    "tailwindcss": "^4.3.3",
  -    "vitest": "^3.2.4",
  +    "vitest": "^4.1.12",
  ```
  `autoprefixer` and `postcss-import` are dropped because Tailwind 4 handles vendor prefixes and `@import` inlining itself. Keep `postcss` (a peer of postcss-cli).
- [x] Host `npm install` (the `kadoorie-app` container was not running), then `npm audit fix` (non-breaking: `source-map-js` → 1.2.2). `npm audit --audit-level=high` exits 0; 19 moderate (`sprintf-js` chain) remain as expected. Do NOT run `npm audit fix --force`: it would downgrade Jest to 25.
- [ ] `osv-scanner --lockfile=package-lock.json`: **not run**, `osv-scanner` is not installed on this host (environmental). Run it before merging.

**Acceptance:** `npm audit --audit-level=high; echo $?` → `0`. `npm ls braces tinypool` → empty. ✅ Verified 2026-10-20: exit 0; `braces`, `tinypool` and `micromatch` are absent.

### Phase 2A: Test-Runner Compatibility (2)

**Files:** `jest.config.js`, `vitest.config.ts`, `tests/React/**`, but only if a run fails.

**Tasks**
- [x] `npm run test:js`: Jest 30 with `passWithNoTests`. Confirm the config loads (Jest 30 renamed `testPathPattern` → `testPathPatterns`; the repo doesn't use it).
- [x] `npm run test:react` and `npm run typecheck`: fix any Vitest 4 breakage. Likely spots: `vi.fn()` typing, `vi.spyOn` restore semantics, and `vitest-axe@0.1.0` matcher typing against the Vitest 4 `expect`.
- [x] Not needed: If `vitest-axe` is incompatible with the Vitest 4 `expect.extend` types, add a typed shim in `tests/React/setup.ts` rather than downgrading. The existing `tests/React/vitest.d.ts` augmentation still type-checks.

**Acceptance:** `test:js`, `test:react` and `typecheck` are green, with the same Vitest test count as before the upgrade (record it first). ✅ Verified 2026-10-20: Jest 30 exits 0 (no tests). Vitest 4: 30 files / 160 tests, same as the baseline. typecheck, lint and format are green. No config or test changes were needed. Known noise: jsdom canvas `getContext` stderr from axe colour-contrast, not a failure.

### Phase 2B: Tailwind 4 Stylesheet Migration (8)

**Files**

| File | Action |
|---|---|
| `postcss.config.cjs` | MODIFY |
| `resources/css/theme.css` | CREATE |
| `resources/css/kadoorie.css` | MODIFY |
| `tailwind.config.cjs` | DELETE |
| `.gitattributes` | MODIFY |
| `resources/react-workbench/vite.config.ts` | MODIFY (only if needed) |
| `resources/dist/kadoorie.css`, `resources/dist/*.js` | REBUILD |
| `docs/showcase/**` | REGENERATE |

**`postcss.config.cjs`**
```diff
 module.exports = {
   plugins: {
-    'postcss-import': {},
-    tailwindcss: {},
-    autoprefixer: {},
+    '@tailwindcss/postcss': {},
   },
 };
```
Update the header's `Last updated` fields.

**`resources/css/theme.css`** (CREATE). This is a v4 port of `tailwind-preset.cjs`:
```css
/*
 * Project: Kadoorie Livewire Components
 * File: theme.css
 * User: dappelbe
 * Created: <date>
 * Last updated by: dappelbe
 * Last updated on: <date>
 * Version: 0.1.0
 *
 * Tailwind CSS v4 theme for the Kadoorie components. It maps every theme value
 * to a --kad-* token. Import it after `tailwindcss` and tokens.css. `inline`
 * makes utilities reference var(--kad-*) directly, so overriding a token on any
 * element restyles its subtree, as the v3 preset did.
 */

@theme inline {
  --breakpoint-*: initial;
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;

  --font-sans: var(--kad-font-sans);

  --text-2xs: var(--kad-text-2xs);
  --text-2xs--line-height: 1.5;
  --text-xs: var(--kad-text-xs);
  --text-xs--line-height: 1.5;
  --text-sm: var(--kad-text-sm);
  --text-sm--line-height: 1.5;
  --text-md: var(--kad-text-md);
  --text-md--line-height: 1.54;
  --text-base: var(--kad-text-base);
  --text-base--line-height: 1.43;
  --text-lg: var(--kad-text-lg);
  --text-lg--line-height: 1.5;
  --text-xl: var(--kad-text-xl);
  --text-xl--line-height: 1.56;
  --text-2xl: var(--kad-text-2xl);
  --text-2xl--line-height: 1.4;
  --text-3xl: var(--kad-text-3xl);
  --text-3xl--line-height: 1.33;

  /* Colours extend (not replace) the default palette: bg-black/5 etc. are used. */
  --color-primary: var(--kad-color-primary);
  --color-primary-hover: var(--kad-color-primary-hover);
  --color-primary-emphasis: var(--kad-color-primary-emphasis);
  --color-primary-subtle: var(--kad-color-primary-subtle);
  --color-on-primary: var(--kad-color-on-primary);
  --color-secondary: var(--kad-color-secondary);
  --color-bg: var(--kad-color-bg);
  --color-surface: var(--kad-color-surface);
  --color-surface-muted: var(--kad-color-surface-muted);
  --color-border: var(--kad-color-border);
  --color-border-strong: var(--kad-color-border-strong);
  --color-text: var(--kad-color-text);
  --color-text-body: var(--kad-color-text-body);
  --color-text-muted: var(--kad-color-text-muted);
  --color-text-muted-large: var(--kad-color-text-muted-large);
  --color-text-disabled: var(--kad-color-text-disabled);
  --color-danger: var(--kad-color-danger);
  --color-danger-subtle: var(--kad-color-danger-subtle);
  --color-danger-solid: var(--kad-color-danger-solid);
  --color-success: var(--kad-color-success);
  --color-success-subtle: var(--kad-color-success-subtle);
  --color-success-solid: var(--kad-color-success-solid);
  --color-info: var(--kad-color-info);
  --color-info-subtle: var(--kad-color-info-subtle);
  --color-pink: var(--kad-color-pink);
  --color-pink-subtle: var(--kad-color-pink-subtle);
  --color-pink-border: var(--kad-color-pink-border);
  --color-light-blue: var(--kad-color-light-blue);
  --color-light-blue-subtle: var(--kad-color-light-blue-subtle);
  --color-light-blue-border: var(--kad-color-light-blue-border);
  --color-warning: var(--kad-color-warning);
  --color-warning-subtle: var(--kad-color-warning-subtle);
  --color-accent: var(--kad-color-accent);
  --color-accent-subtle: var(--kad-color-accent-subtle);
  --color-footer: var(--kad-color-footer-bg);
  --color-footer-fg: var(--kad-color-footer-fg);
  --color-footer-muted: var(--kad-color-footer-muted);
  --color-body: var(--kad-color-body);
  --color-stroke: var(--kad-color-stroke);

  /* Bare `rounded` reads --radius; keep v3 names, do not adopt v4's xs scale. */
  --radius: var(--kad-radius-base);
  --radius-sm: var(--kad-radius-sm);
  --radius-base: var(--kad-radius-base);
  --radius-md: var(--kad-radius-md);
  --radius-lg: var(--kad-radius-lg);
  --radius-xl: var(--kad-radius-xl);
  --radius-2xl: var(--kad-radius-2xl);
  --radius-full: var(--kad-radius-full);

  --shadow-sm: var(--kad-shadow-sm);
  --shadow-md: var(--kad-shadow-md);
  --shadow-lg: var(--kad-shadow-lg);

  --max-width-container: var(--kad-container-max);
}

/* v3 behaviour: hover applies on any device, not only hover-capable ones. */
@custom-variant hover (&:hover);

@layer base {
  /* v3 default border colour (the preset's borderColor.DEFAULT). */
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--kad-color-border, currentcolor);
  }

  /* v3 preflight gave buttons a pointer cursor; v4 removed it. */
  button:not(:disabled),
  [role='button']:not(:disabled) {
    cursor: pointer;
  }
}
```
> Verify during implementation: does `--radius-full` override v4's static `rounded-full` (`calc(infinity * 1px)`)? The parity test in 2C asserts `rounded-full` → `var(--kad-radius-full)`. If v4 keeps the static value, accept it, because both render as a pill, and note it in the CHANGELOG. Also verify that `--max-width-container` is still honoured. The 4.3.3 spike says yes. If it isn't, use `--container-container`. ✅ Resolved: `rounded-full` → `var(--kad-radius-full)` and `max-w-container` → `var(--kad-container-max)` in the 4.3.3 build. No CHANGELOG note needed.

**`resources/css/kadoorie.css`**
```diff
-@import './tokens.css';
-
-@tailwind base;
-@tailwind components;
-@tailwind utilities;
+@import 'tailwindcss' source(none);
+@import './tokens.css';
+@import './theme.css';
+
+/* Explicit sources: never auto-scan docs/showcase HTML, .claude/, or vendor. */
+@source '../views';
+@source '../js';
+@source '../react/src';
+@source '../../src';
+@source '../../workbench';

 @layer base {
   body {
```
Update the header comment ("layers Tailwind" → "imports Tailwind v4"). The `.kad-*` helpers stay unlayered. In v4, unlayered CSS beats layered utilities, which keeps today's precedence (helpers already came after `@tailwind utilities`). The trade-off: a host's unlayered CSS now also beats Kadoorie utilities. That goes in the CHANGELOG.

**`tailwind.config.cjs`**: DELETE. The build no longer reads it.

**`.gitattributes`**: remove the `/tailwind.config.cjs export-ignore` line. Update the header comment so it lists `resources/css` (which already ships, and now includes `theme.css`).

**Build and regenerate**
- [x] `npm run build && npm run build:workbench && npm run build:showcase`
- [x] `docker exec kadoorie-app vendor/bin/testbench kadoorie:build-showcase`
- [x] **Vite reprocessing check:** run `npm run build:react-workbench` and diff the emitted CSS asset against `resources/dist/kadoorie.css`. If it differs (Vite applied the root PostCSS config), add `css: { postcss: {} }` to `resources/react-workbench/vite.config.ts`. ✅ The built React workbench CSS is only minified (one line), with the same 350 classes and no second Tailwind pass. `vite.config.ts` is unchanged.

**Acceptance**
- `resources/dist/kadoorie.css` builds without warnings.
- Every class in the §6 inventory is present in the output (grep spot-check: `.shadow-sm`, `.rounded`, `.max-w-container`, `.text-2xs`, `.hover\:bg-surface-muted:hover`, `.\!block`).
- No `@media (hover: hover)` in the output.
- Confirm the user guide Option B claim that the compiled file declares `@layer theme, base, components, utilities` (written in Phase 3). Fix the doc if the output differs. ✅ Confirmed: the output starts with `@layer properties;` then `@layer theme, base, components, utilities;`.

**2B results (2026-10-20):**
- Built in the `kadoorie-app` container. The host `node_modules` had mixed Linux/macOS native binaries, so I reinstalled with `npm ci` in the container. `vendor/` also had to be synced with `composer install` in the container (host PHP 8.5 vs container 8.3); `composer.lock` is unchanged.
- Class-set diff, v3 dist vs v4 dist: 350 vs 350. The only difference is the scanner false positives `filter` (v3) and `transform` (v4), which are not used as classes.
- Showcase regenerated (46 pages). `icon.html` and `showcase.js` were also stale before this change (the `list` icon from `2b2de2d` was missing), and are now up to date.
- Gates: build has no warnings. Prettier, ESLint, Vitest 160/160 and Pest 189 passed. Test coverage for `theme.css` comes from the 2C parity test.

### Phase 2C: Consumer Compatibility and Theme Parity Test (3)

**Files:** `tailwind-preset.cjs` (MODIFY), `resources/filament/kadoorie-v4.css` (MODIFY), `tests/Build/tailwind-theme-parity.test.ts` (CREATE), `vitest.config.ts` (MODIFY), `package.json` (MODIFY: lint/format globs).

**Tasks**
- [x] `tailwind-preset.cjs`: header note: *"Deprecated in 0.3.0. Tailwind v4 apps should `@import` `resources/css/theme.css`. Kept for `@config` users and removed in the next major."* No theme value changes (frozen).
- [x] `resources/filament/kadoorie-v4.css`: `--font-family-sans` → `--font-sans` (the v4 namespace; the old name is silently ignored). Regression test added: `tests/Feature/FilamentThemeTest.php` checks for `--font-sans:` and that `--font-family-sans` is gone.
- [x] **Parity test (write first, TDD)**: `tests/Build/tailwind-theme-parity.test.ts` with `// @vitest-environment node`. It compiles a fixed probe of class names twice with `postcss` + `@tailwindcss/postcss`:
  1. `@import "tailwindcss" source(none); @import tokens.css; @import theme.css; @source inline("<probe>")`
  2. `@import "tailwindcss" source(none); @config "tailwind-preset.cjs"; @source inline("<probe>")`

  The test extracts the declarations for each probe class from both outputs and asserts they are equal. Probe: `rounded rounded-sm rounded-md rounded-lg rounded-xl rounded-2xl rounded-full shadow-sm shadow-md shadow-lg text-2xs text-xs text-sm text-md text-base text-lg text-xl text-2xl text-3xl font-sans max-w-container bg-primary hover:bg-primary-hover text-text-muted-large border-border-strong bg-footer text-footer-fg sm:flex md:flex lg:flex xl:flex 2xl:flex`. Separate assertions:
  - no `@media (hover: hover)` in output 1
  - output 1 contains `border-color: var(--kad-color-border`
  - output 1 contains `cursor: pointer`
- [x] `vitest.config.ts`: add `'tests/Build/**/*.test.ts'` to `test.include`.
- [x] `package.json` `lint` and `format:*` scripts: add `tests/Build`. Confirm `tsconfig.json` `include` covers it, or add it.

**Acceptance:** the parity test fails before `theme.css` exists or with a deliberately wrong value, then passes. `npm run lint`, `format:check` and `typecheck` are green. ✅ Verified 2026-10-20. Mutation check: breaking `--shadow-sm`, `--breakpoint-sm` and removing the hover variant gave 4 failing tests, and restoring gave 44/44. A real bug turned up and was fixed: `2xl:flex` compiles to the escaped selector `.\32 xl\:flex`, so the test now decodes CSS hex escapes and asserts that each rule exists (otherwise undefined === undefined passed vacuously).

**2C gates (container):** ESLint and Prettier pass, typecheck passes, Vitest 31 files / 204 tests (160 React + 44 parity), Jest has no tests (exit 0), `npm audit --audit-level=high` exits 0, Pint passes, Pest 190 passed (808 assertions), Larastan reports no errors.

### Phase 3: Documentation and CHANGELOG (3)

**Files:** `docs/user-guide.md`, `docs/react-guide.md` (check only), `docs/filament.md` (check only), `docs/release-checklist.md`, `README.md`, `CHANGELOG.md`. Do **not** edit historical `docs/kadoorie-*-plan-*.md`.

**Tasks**
- [x] `docs/user-guide.md`:
  - Requirements: Tailwind `^3.4` → `^4.3` (Option A).
  - New browser baseline: Safari 16.4+, Chrome 111+, Firefox 128+.
  - Rewrite **Option A** for v4:
    ```css
    /* resources/css/app.css */
    @import 'tailwindcss';
    @import '../../vendor/kadoorie/livewire-components/resources/css/tokens.css';
    @import '../../vendor/kadoorie/livewire-components/resources/css/theme.css';
    @source '../../vendor/kadoorie/livewire-components/resources/views';
    @source '../../vendor/kadoorie/livewire-components/src';
    ```
    This also fixes the missing `src/` path.
  - Add an **"Upgrading from Tailwind 3 / the JS preset"** subsection: either migrate to the above, or keep `@config '../../vendor/kadoorie/livewire-components/tailwind-preset.cjs';` (deprecated). Note that `container` centring/padding from the preset is not applied by the v4 theme.
  - Option B (precompiled): note the browser baseline, and that the stylesheet now uses native cascade layers, so unlayered host CSS takes precedence over Kadoorie utilities.
- [x] `docs/release-checklist.md`: update any `tailwind.config.cjs` / `npm run build` references.
- [x] `README.md:59`: wording check ("Tailwind preset vs. stylesheet" → "Tailwind theme vs. stylesheet").
- [x] `CHANGELOG.md` under `[Unreleased]`:
  ```markdown
  ### Changed

  - **BREAKING**: the precompiled stylesheet and the Tailwind integration now
    target Tailwind CSS v4 (`^4.3`). Tailwind apps should `@import`
    `resources/css/theme.css` (new, CSS-first `@theme`) after `tokens.css` and
    add `@source` paths for the package `resources/views` and `src`. The
    precompiled `kadoorie.css` now requires Safari 16.4+, Chrome 111+ and
    Firefox 128+, and uses native cascade layers.
  - Dev toolchain: Jest 30, Vitest 4, postcss-cli 12 and `@tailwindcss/postcss`
    replace Jest 29, Vitest 3, postcss-cli 11, `tailwindcss` v3,
    `autoprefixer` and `postcss-import`. This resolves the high/critical
    `npm audit` advisories (tinypool, braces, source-map-js) that were
    failing CI.

  ### Deprecated

  - `tailwind-preset.cjs`: still works via `@config` in Tailwind v4; it will be
    removed in the next major release.

  ### Fixed

  - Filament v4 theme used the v3 `--font-family-sans` variable name; it now
    sets `--font-sans`.
  ```

**Acceptance:** docs render, and the code samples match the shipped paths (`ls vendor`-relative paths checked against `composer.json` `name`). ✅ Examples use the real package path `vendor/oxfordtrauma/kadoorie-livewire-components`.

### Phase 4: Integration Verification (5)

Mirror every CI job locally and prove "preserve v3 rendering".

**Tasks**
- [x] **Visual baseline:** I used the committed v3 `docs/showcase/kadoorie.css` (HEAD) with the current HTML/JS, so the comparison isolates the CSS change. Captured 141 Playwright full-page screenshots (47 pages at 375, 768 and 1920) in the `kadoorie-app` container. A v3-vs-v3 self-check showed 1–2 px rendering noise on a random page per run.
- [x] v4 vs v3: **140/141 pixel-identical**. The remaining case, `data-table-container @ 768`, was 1 px of noise and passed 2 of 3 re-runs. One real regression was found and fixed: v4 `divide-y` puts a border-bottom on every child but the last, which drew an extra rule under the nested data table (its last `<tbody>` child is a collapsed `x-show` row). `theme.css` now restores the v3 `divide-y` with a custom `@utility divide-y`, guarded by a new parity-test case (45 tests). The user guide is updated. Evidence is in the session scratchpad (`phase4-evidence/`).
- [x] Health check: Pint `--test` passes, Pest 190 passed (808 assertions), Larastan reports no errors.
- [x] JS gates: `npm run lint`, `npm run format:check`, `npm run test:js`, `npm run typecheck`, `npm run test:react`, `npm audit --audit-level=high` (**must exit 0**). ✅ All green: Vitest 31 files / 205 tests, Jest exit 0, audit exit 0.
- [x] Browser gates: **all green, two consecutive runs.** Blade functional 198 passed / 9 skipped, Blade WCAG 141, React functional 101 passed / 4 skipped, React WCAG 24. Three earlier failure causes, none caused by the migration (a v3-CSS control run gave the identical 41 failures):
  1. **Livewire update endpoint returned 500** (10 tests × 3 viewports: modal, toast, data-table sort and paging, login validation). Livewire 4.4 rate-limits checksum failures through the cache, and the workbench cache store was `database` on an in-memory SQLite DB with no `cache` table. Fix: `CACHE_STORE=array` in `testbench.yaml`.
  2. **Strict-mode selector ambiguity** after this branch added header/layout examples: the profile-menu spec (3 tests × 3) is now scoped to `showcase-profile-menu`, and the React footer landmark test (× 3) to `getByTestId('footer')` with `toHaveRole('contentinfo')`.
  3. **Dropdown focus-return race** (it showed up once Livewire timing changed): `x-trap` returned focus to the first menu item, which was by then hidden, so focus fell to `<body>`. Fix: Escape returns focus to `$refs.trigger` explicitly, plus `x-trap.noreturn`. Showcase regenerated (only those lines changed across 11 dropdown instances). CHANGELOG Fixed entry added.
- [x] `composer audit`: fixed. `symfony/yaml` v7.4.15 → v7.4.21 (CVE-2026-109413, dev dependency via testbench), and `composer audit` / `composer validate --strict` pass.
- [ ] Push. Confirm all four CI jobs are green on the PR, including *Browser (functional + WCAG)*, which has been skipped on this branch so far.

**Acceptance:** every CI-equivalent command is green, the visual diff is clean, and the PR checks are green.

---

### Definition of Done (applies to every phase)

- [ ] Code passes ESLint (`npm run lint`) and Pint (`--dirty`) where PHP is touched
- [ ] Code passes Prettier (`npm run format:check`)
- [ ] Code passes type checking (`npm run typecheck`; Larastan where PHP is touched)
- [ ] New code has test coverage (the parity test covers the theme port)
- [ ] All new tests pass
- [ ] All existing tests still pass (Pest, Jest, Vitest, Playwright functional + WCAG)
- [ ] No new warnings introduced (Tailwind build output, Vitest deprecations)
- [ ] `npm audit --audit-level=high` exits 0 from Phase 1 onward
- [ ] New CSS/JS/TS files carry the project file header
- [ ] Completed tasks are checked off in this document

### Suggested Commit Messages (user handles git)

| Phase | Message |
|---|---|
| 1 | `build: Upgrade Tailwind 4, Jest 30, Vitest 4` |
| 2A | `test: Adapt test setup to Jest 30 and Vitest 4` (only if changes were needed) |
| 2B | `build: Migrate stylesheet build to Tailwind v4` |
| 2C | `feat: Add Tailwind v4 theme with preset parity test` |
| 3 | `docs: Document Tailwind v4 integration and 0.3.0` |

(Subjects are 50 characters or fewer, per `.claude/rules/08-git-workflow.md`. The pre-commit hook will run `npm audit` because `package-lock.json` is staged in Phase 1.)

---

## 11. Testing Strategy

| Layer | Test | Purpose |
|---|---|---|
| Unit (build) | `tests/Build/tailwind-theme-parity.test.ts` | `theme.css` and the deprecated preset compile to identical utilities. The v3 compatibility rules exist. |
| Existing unit / feature | Pest (class-string assertions), Vitest (`variants.test.ts`, component tests) | Class names are unchanged, so these must pass untouched. A failure means an unintended rename. |
| E2E | Playwright functional (Blade + React) | Behaviour (overlays, nav, data table) is unaffected by cascade-layer changes. |
| Accessibility | Playwright + axe (Blade + React) | Contrast and borders are preserved (the compatibility border colour). |
| Visual | Scratch pixel diff of the showcase pages at 3 widths | Evidence for "preserve v3 rendering". Not committed. |
| Security | `npm audit --audit-level=high`, `osv-scanner` | The original CI failure is resolved. |

## 12. Risks, Assumptions, Follow-ups

**Risks**
- **Cascade layers for Option B consumers:** host CSS that is unlayered now overrides Kadoorie utilities. Mitigation: CHANGELOG and user-guide note. Accepted as part of the v4 baseline.
- **Unpatched moderate `sprintf-js`:** stays in the Jest chain. It doesn't fail the gate. Revisit when Jest/istanbul drops js-yaml 3.
- **New advisories on the remaining tree:** the gate is time-sensitive, and this can recur on any branch. Consider a scheduled CI audit on `main` so drift is caught outside PRs (follow-up, not in scope).
- **Branch scope:** the icons/header PR now also carries a breaking toolchain migration (user decision). The PR description must call it out.

**Assumptions**
- The project is developed in the `kadoorie-app` container, but Node commands may run on the host (CI uses Node 24; the host has Node 26).
- The `docs/showcase` output is committed and must be regenerated (CI regenerates it before WCAG).

**Follow-ups (out of scope)**
- `resources/react/src/ui/Badge.tsx:64`: `gap-1.5` → `gap-0.5.5` replace-chain bug (React only; Blade is correct).
- Remove `tailwind-preset.cjs` in the next major release.
