# Kadoorie React Component Set — Plan (Part 2 of 3)

> **Plan Set**: `docs/kadoorie-react-plan-*.md`
> **This file**: Part 2 — Phase Roadmap, R0 bootstrap, R1–R2 (porting recipe + TDD)
> **Navigation**: [Part 1 — Summary/Architecture](kadoorie-react-plan-1.md) · Part 2 (this) · [Part 3 — R3–R7 + Testing + Assumptions](kadoorie-react-plan-3.md)

## Table of Contents

1. [Phase Roadmap & Estimates](#1-phase-roadmap--estimates)
2. [Standard Definition of Done](#2-standard-definition-of-done)
3. [Phase R0 — Toolchain, Shared Lib, Installer, Workbench](#3-phase-r0)
4. [The Component Porting Recipe](#4-the-component-porting-recipe)
5. [Phase R1 — Form Controls](#5-phase-r1--form-controls)
6. [Phase R2 — Feedback & Overlays](#6-phase-r2--feedback--overlays)

---

## 1. Phase Roadmap & Estimates

```
R0 Toolchain + shared lib + installer skeleton + React workbench (13)
        │
   ┌────┴───────┬───────────┬───────────┬───────────┐
   ▼            ▼           ▼           ▼           ▼
R1 Forms(13) R2 Overlays(13) R3 Layout/Nav(13) R4 Data/Pages(8) R5 Widgets(5)   [parallel — sub-agents]
   └────┴───────┴───────────┴───────────┴───────────┘
        ▼
R6 React workbench parity + Playwright functional + WCAG matrix (8)
        ▼
R7 Installer UX (Prompts) + publish flow + CI + docs + final sweep (8)
```

| Phase | Name | Depends on | Parallel with | Estimate | Status |
|---|---|---|---|---|---|
| R0 | Toolchain + shared lib + installer skeleton + workbench | — | — | 13 | ✅ |
| R1 | Form controls (icon, button, label, field, input, textarea, select, checkbox, radio, toggle) | R0 | R2–R5 | 13 | ✅ |
| R2 | Feedback & overlays (alert, toast + provider, tooltip, spinner, modal) | R0 | R1,R3–R5 | 13 | ✅ |
| R3 | Layout & nav (card, divider, badge, avatar, breadcrumbs, tabs, accordion, nav, dropdown, empty-state, pagination) | R0 | R1,R2,R4,R5 | 13 | ✅ |
| R4 | Data & pages (data-table + `useDataTable`, error-page, login form) | R0 | R1–R3,R5 | 8 | ✅ |
| R5 | Widgets (small-box, info-box, profile-menu, footer) | R0 | R1–R4 | 5 | ⬜ |
| R6 | React workbench parity + Playwright functional + WCAG | R1–R5 | — | 8 | ⬜ |
| R7 | Installer UX + publish flow + CI + docs + final sweep | R6 | — | 8 | ⬜ |
| | **Total** | | | **81** | |

**Parallelisation:** R1–R5 touch disjoint files under `resources/react/src/ui/`
and `tests/React/` → run as **parallel sub-agents**. Each sub-agent returns its
conventional commit message; the main agent bubbles them all up.

## 2. Standard Definition of Done

```
- [ ] tsc --noEmit clean; ESLint (jsx-a11y + react-hooks) + Prettier clean on changed TSX
- [ ] Vitest green: unit + interaction (RTL + userEvent) + vitest-axe (*.a11y.test.tsx)
- [ ] Component exported from index.ts and registered in the React workbench
- [ ] data-test parity with the Blade twin (Part 3 §parity table); project header on every .ts/.tsx
- [ ] Controlled AND uncontrolled paths covered where applicable
- [ ] Plan tasks checked off
```
(Playwright react-functional + react-wcag across the 360·768·1920 matrix, no-h-scroll,
≥44px targets, and **contrast AA** are enforced in **R6** once the workbench hosts every component.)

---

## 3. Phase R0

**Toolchain, shared lib, installer skeleton, React workbench · 13 pts**

### Tasks

- [x] Add dev deps: `react`, `react-dom`, `typescript`, `@types/react`,
      `@types/react-dom`, `vitest`, `@vitejs/plugin-react`, `vite`,
      `@testing-library/react`, `@testing-library/user-event`,
      `@testing-library/jest-dom`, `jsdom`, `vitest-axe`,
      `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`,
      `typescript-eslint`. (`composer audit`/`npm audit` clean.)
- [x] `tsconfig.json` (strict, `jsx: react-jsx`, `noEmit`, `@kadoorie/*` paths,
      `resources/react` + `resources/react-workbench` + `tests/React` includes)
      and a publishable `resources/react/stubs/tsconfig.kadoorie.json`.
- [x] Extend `eslint.config.js` with a TSX block (jsx-a11y + react-hooks
      recommended, typescript-eslint) scoped to `resources/react/**`,
      `resources/react-workbench/**`, and `tests/React/**`.
      Extend Prettier scope. Extend `test:js`/lint scripts (`typecheck`,
      `test:react`, `build/dev:react-workbench`, `test:react:e2e/wcag`).
- [x] `vitest.config.ts` (jsdom env, `setupFiles` with `@testing-library/jest-dom`
      + `vitest-axe/extend-expect`, globs `tests/React/**/*.test.{ts,tsx}`).
- [x] **Shared lib** (`resources/react/src/lib/`): `cn.ts`, `variants.ts`
      (mirror `ButtonVariant`/`Size`/`Tone`/`BadgeShape`/`IconSize`),
      `ids.ts` (mirror `HandlesFieldState`), `icons.ts` (inline SVG registry),
      plus an `index.ts` barrel.
- [x] **Core hooks**: `useControllableState`, `useFieldState` (+ Vitest tests).
- [x] **Installer skeleton**: `src/Console/InstallCommand.php`
      (`kadoorie:install`, `--set=`, `--force`, Laravel Prompts multiselect) +
      register the **`kadoorie-react`** publish tag in the service provider
      (`resources/react/src` → configurable `kadoorie.react.path`, default
      `resources/js/kadoorie`). R0 wires the publish + a Pest test.
- [x] **React workbench**: `resources/react-workbench/` (Vite + `@vitejs/plugin-react`),
      a story registry + `main.tsx` gallery (foundation smoke story now),
      and `build:react-workbench` / `dev:react-workbench` scripts → served for
      the React Playwright projects (mirrors the Blade showcase).
- [x] Add Playwright projects `react-functional-*` / `react-wcag-*` (viewport
      matrix) pointing at the React workbench dev server via a second `webServer`.

### Key deltas (representative)

**`resources/react/src/lib/cn.ts`** (CREATE) — zero-dep class joiner:
```ts
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
```

**`resources/react/src/lib/variants.ts`** (CREATE) — mirrors the PHP enums so the
class maps are identical to the Blade output:
```ts
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type Size = 'sm' | 'md' | 'lg';
export type Tone = 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'secondary' | 'accent';

export const buttonVariant: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover',
  secondary: 'bg-secondary text-white hover:brightness-110',
  ghost: 'bg-transparent text-text hover:bg-surface-muted',
  danger: 'bg-danger text-white hover:brightness-95',
};
export const buttonSize: Record<Size, string> = { sm: 'text-xs px-3 gap-1', md: 'text-sm px-3.5 gap-1.5', lg: 'text-base px-4 gap-2' };
export const toneSolid: Record<Tone, string> = { /* mirror Tone::solidClasses() incl. bg-success-solid/bg-danger-solid */ } as Record<Tone, string>;
export const toneContainer: Record<Tone, string> = { /* mirror Tone::containerClasses() */ } as Record<Tone, string>;
```
> The values are **copied from the PHP enums' `classes()`/`solidClasses()`
> methods verbatim**; R6's `data-test` reuse + WCAG contrast catches any drift.

**`resources/react/src/hooks/useControllableState.ts`** (CREATE):
```ts
import { useCallback, useState } from 'react';
export function useControllableState<T>(controlled: T | undefined, defaultValue: T, onChange?: (v: T) => void) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? (controlled as T) : uncontrolled;
  const setValue = useCallback((next: T) => {
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  }, [isControlled, onChange]);
  return [value, setValue] as const;
}
```

**Installer** — `src/Console/InstallCommand.php` (CREATE, R0 skeleton; Prompts in R7):
```php
protected $signature = 'kadoorie:install {--set= : blade|react|both (skip prompts)} {--force}';

public function handle(): int
{
    $set = $this->option('set') ?? $this->promptForSet();   // R7: Laravel Prompts multiselect
    if (in_array($set, ['blade', 'both'], true)) {
        $this->call('vendor:publish', ['--tag' => 'kadoorie-styles', '--force' => (bool) $this->option('force')]);
    }
    if (in_array($set, ['react', 'both'], true)) {
        $this->call('vendor:publish', ['--tag' => 'kadoorie-react', '--force' => (bool) $this->option('force')]);
        $this->components->info('React components published to resources/js/kadoorie. Ensure react, react-dom and typescript are installed and import the stylesheet.');
    }
    return self::SUCCESS;
}
```
Service provider: `$this->publishes([__DIR__.'/../resources/react/src' => resource_path('js/kadoorie')], 'kadoorie-react');`
and `->hasCommand(InstallCommand::class)`.

### TDD-first (R0)

- `tests/React/lib/useControllableState.test.tsx` — controlled vs uncontrolled updates + `onChange` firing.
- `tests/React/lib/variants.test.ts` — every enum key present; `buttonVariant.primary` contains `bg-primary`.
- `tests/Feature/InstallCommandTest.php` (Pest) — `kadoorie:install --set=react` publishes into a temp `resources/js/kadoorie`; `--set=blade` publishes styles; the `kadoorie-react` tag is registered.

**DoD**: R0 DoD + `npx playwright test --list` shows the `react-*` projects; `vitest run` green; `tsc --noEmit` clean.

> **R0 status (2026-07-04): ✅ COMPLETE.** Gates green — Pint, PHPStan
> (`--memory-limit=512M`), Pest 149 passed, Prettier, ESLint, `tsc --noEmit`,
> Vitest 13 passed; `playwright test --list` shows all six `react-*` projects
> and the React workbench builds. The React Playwright suites are wired but not
> yet executed (they require both Vite + Testbench servers, exercised from R6).
> The `HttpErrorStatus` variant mirror is deferred to R4 (error-page phase).

**Commit**: `chore(react): Bootstrap React toolchain, shared lib, and installer`

---

## 4. The Component Porting Recipe

Every component in R1–R5 follows the **same recipe** (this is what makes the
large surface tractable and parallelisable):

1. **Read the Blade/Livewire twin** — capture props, class strings, `data-test`
   names, and the ARIA/focus contract.
2. **`ui/<Name>.tsx`** — a typed function component, `forwardRef` where a DOM ref
   is useful, props mirroring the Blade props (+ `className`/`...rest`
   passthrough). Reuse `cn()` + `variants.ts`; **do not** invent new classes.
3. **State** — controlled+uncontrolled via `useControllableState`; behaviour via
   the shared hooks (`useFocusTrap`, `useDismiss`, `useRovingTabIndex`,
   `useFieldState`). Stateful components also export an **adapter** (Part 1 §6.3).
4. **A11y + `data-test` parity** — identical `role`/`aria-*`, focus trap/return,
   and the **same `data-test`** strings as the Blade twin.
5. **Tests** — `tests/React/<Name>.test.tsx` (RTL + `userEvent`: render, props,
   keyboard/interaction, controlled/uncontrolled) **first**, then implement;
   `tests/React/<Name>.a11y.test.tsx` (`vitest-axe`).
6. **Register** in the React workbench gallery + export from `index.ts`.

---

## 5. Phase R1 — Form Controls

**icon, button, label, field, input, textarea, select, checkbox, radio, toggle · 13 pts**

### Worked example — Button

**`resources/react/src/ui/Button.tsx`** (CREATE):
```tsx
import { forwardRef } from 'react';
import { cn } from '../lib/cn';
import { buttonVariant, buttonSize, type ButtonVariant, type Size } from '../lib/variants';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading = false, disabled, className, children, ...rest }, ref,
) {
  return (
    <button
      ref={ref}
      type={rest.type ?? 'button'}
      data-test="kadoorie-button"
      aria-busy={loading}
      disabled={disabled || loading}
      className={cn(
        'kad-focusable inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium min-h-11 transition select-none disabled:opacity-50 disabled:cursor-not-allowed',
        buttonVariant[variant], buttonSize[size], className,
      )}
      {...rest}
    >
      {loading && <span data-test="kadoorie-button-spinner" className="kad-spinner" aria-hidden="true" />}
      {children}
    </button>
  );
});
```

**`tests/React/Button.test.tsx`** (CREATE, write first):
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../resources/react/src/ui/Button';

it('renders a primary button and fires onClick', async () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Save</Button>);
  const btn = screen.getByTestId('kadoorie-button');
  expect(btn).toHaveTextContent('Save');
  await userEvent.click(btn);
  expect(onClick).toHaveBeenCalledOnce();
});

it('is disabled and busy while loading, and does not fire onClick', async () => {
  const onClick = vi.fn();
  render(<Button loading onClick={onClick}>Deleting</Button>);
  const btn = screen.getByTestId('kadoorie-button');
  expect(btn).toBeDisabled();
  expect(btn).toHaveAttribute('aria-busy', 'true');
  await userEvent.click(btn);
  expect(onClick).not.toHaveBeenCalled();
});

it('lets a caller override data-test and class', () => {
  render(<Button data-test="login-submit" className="w-full">Sign in</Button>);
  expect(screen.getByTestId('login-submit')).toHaveClass('w-full');
});
```

**`tests/React/Button.a11y.test.tsx`** (CREATE):
```tsx
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Button } from '../../resources/react/src/ui/Button';

it('has no axe violations', async () => {
  const { container } = render(<Button>Save</Button>);
  expect(await axe(container)).toHaveNoViolations();
});
```

### Field/control pattern (Input, Textarea, Select, Checkbox, Radio, Toggle)

`useFieldState({ name, id, error, hint })` returns `{ fieldId, describedBy,
invalid }` (mirrors `HandlesFieldState`). `<Field>` renders label/hint/error
(`role="alert"` when `error`) and provides context; controls read it (mirroring
Blade `@aware`) and set `aria-invalid`/`aria-describedby`. `Toggle` is a native
checkbox with `role="switch"` whose `aria-checked` is derived from React state
(so it never goes stale — the fix that the Blade suite caught is a non-issue in
React because state is reactive by construction).

### R1 checklist

| Component | Notes / hooks | data-test parity |
|---|---|---|
| Icon | `icons.ts` inline-SVG registry; `label`→`aria-label`, else `aria-hidden` | (n/a — inline svg) |
| Button | variant/size/loading; override-safe `data-test` | `kadoorie-button`, `…-spinner` |
| Label | `htmlFor`, required marker | `{for}-label` |
| Field | label/hint/error + context; `useFieldState` | `{name}-field/-label/-hint/-error` |
| Input/Textarea | field context; `aria-invalid`/`describedby`; iOS 16px | `{name}-input` / `-textarea` |
| Select | options + placeholder | `{name}-select`, `-select-wrap` |
| Checkbox/Radio | shared `Choice`; controlled+uncontrolled | `{name}-checkbox` / `-radio` |
| Toggle | native checkbox `role="switch"`; state-driven `aria-checked` | `{name}-toggle`, `-toggle-label` |

> **R1 status: ✅ complete.** All ten form controls shipped under
> `resources/react/src/ui/` (`Icon`, `Button`, `Label`, `Field` + `fieldContext`,
> `Input`, `Textarea`, `Select`, shared `Choice` with `Checkbox`/`Radio`,
> `Toggle`), exported from `index.ts`, and registered in the React workbench as
> the `form-controls` story. Per-component functional tests (RTL + userEvent) and
> a combined `R1.a11y.test.tsx` (vitest-axe) were added; the Vitest setup now
> registers the axe matcher and points RTL's `getByTestId` at `data-test`.
> Gates green: Vitest 47 passed, `tsc --noEmit` clean, ESLint + Prettier clean,
> React workbench builds. Playwright react-* matrix remains deferred to R6.

**Commit**: `feat(react): Add React form controls`

---

## 6. Phase R2 — Feedback & Overlays

**alert, toast (+ provider), tooltip, spinner, modal · 13 pts**

### Stateful example — Modal (focus trap + return, scroll lock, dismiss)

`Modal` is controlled (`open` + `onOpenChange`) with an uncontrolled
convenience (`defaultOpen`), using `useDisclosure` + `useFocusTrap` (traps focus,
returns it to the trigger on close) + `useDismiss` (Esc + backdrop). Same
`data-test`s (`modal-root/-overlay/-backdrop/-dialog/-title/-body/-close`), same
`role="dialog"`/`aria-modal`/labelledby/describedby. Sketch:
```tsx
export function Modal({ open, defaultOpen, onOpenChange, dismissible = true, title, description, children }: ModalProps) {
  const [isOpen, setOpen] = useControllableState(open, defaultOpen ?? false, onOpenChange);
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, isOpen);                 // trap + return
  useDismiss(isOpen, () => dismissible && setOpen(false)); // Esc + outside
  useScrollLock(isOpen);
  return (
    <div data-test="modal-root">
      {isOpen && (
        <div data-test="modal-overlay" className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <div data-test="modal-backdrop" aria-hidden className="fixed inset-0 bg-black/40" onClick={() => dismissible && setOpen(false)} />
          <div ref={dialogRef} role="dialog" aria-modal data-test="modal-dialog" /* …aria-labelledby/describedby… */>
            {/* title/close/body — same markup + data-test as the Blade view */}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Toast — provider/bus adapter

`<ToastProvider>` holds a queue + `aria-live="polite"` region (`data-test=
"toast-region"`); `useToast()` returns `toast({ message, tone, duration })`.
Auto-dismiss timer **pauses on hover** (mirrors the Livewire/Alpine behaviour).
This is the React analogue of the `kadoorie-toast` event bus.

### R2 checklist

| Component | Hooks/adapter | data-test parity |
|---|---|---|
| Alert | `Tone` container/icon/role; dismissible state | `alert`, `-title/-body/-dismiss` |
| Toast | `ToastProvider` + `useToast` bus; hover-pause | `toast-region/toast/-message/-dismiss` |
| Tooltip | hover/focus + Esc; `useId` | `tooltip-wrap/-trigger/tooltip` |
| Spinner | `role=status` + label | `(label via aria)` |
| Modal | `useDisclosure`/`useFocusTrap`/`useDismiss` | `modal-*` |

> **R2 status: ✅ complete.** All five components shipped under
> `resources/react/src/ui/` (`Alert`, `Spinner`, `Tooltip`, `Modal`, and `Toast`
> with `ToastProvider` + `useToast`), backed by four new zero-dep hooks
> (`useDisclosure`, `useScrollLock`, `useFocusTrap`, `useDismiss`), exported from
> `index.ts`, and registered in the React workbench as the `feedback` story.
> Functional tests (RTL + userEvent/fireEvent, fake timers for the hover-pausing
> toast auto-dismiss) and a combined `R2.a11y.test.tsx` (vitest-axe) were added.
> Gates green: Vitest 67 passed, `tsc --noEmit` clean, ESLint + Prettier clean,
> React workbench builds. Playwright react-* matrix remains deferred to R6.

**Commit**: `feat(react): Add React feedback and overlay components`
