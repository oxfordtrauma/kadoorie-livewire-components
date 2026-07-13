# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-07-13

### Changed

- **BREAKING**: raised the minimum framework requirements to Laravel 13.17
  (`illuminate/contracts ^13.17`) and Livewire 4.3.2 (`livewire/livewire
  ^4.3.2`), dropping Laravel 11/12 and Livewire 3 support. Livewire components
  are now registered through `Livewire::addNamespace()` to match Livewire 4's
  namespace-based component resolution. The dev toolchain moves to Pest 4 and
  Testbench 11.

## [0.1.1] - 2026-07-13

### Added

- **Wizard**: a multi-step `<x-kadoorie::wizard>` / React `<Wizard>` with an
  ordered step indicator, Back/Next/Finish navigation, linear step gating, and
  `wizard-change` / `wizard-finish` events (`onStepChange` / `onFinish` in
  React).

## [0.1.0] - 2026-07-13

Initial release of the Kadoorie Livewire Components library.

### Added

- **Tooling & environment**: Dockerised dev container (`kadoorie-app`),
  Composer and npm manifests, a Spatie-based service provider, Pint (PER),
  Larastan (max), Pest via Orchestra Testbench, ESLint, Prettier, Jest,
  Playwright projects, a CI workflow, and a header-maintaining pre-commit hook.
- **Design system**: `--kad-*` design tokens from the Figma source (light
  theme, AA-safe muted split), a Tailwind preset with responsive breakpoints
  and a capped container, a precompiled publishable stylesheet, and an
  `<x-kadoorie::icon>` component backed by a Lucide + bespoke Kadoorie SVG
  registry, with a browsable icon catalogue in the showcase and per-icon
  viewBox/paint so bespoke and monochrome icons both render correctly.
- **Form controls**: Field wrapper, Label, Button, Input, Textarea, Select,
  Checkbox, Radio, and Toggle — all sharing the `HandlesFieldState` concern for
  label/hint/error wiring.
- **Feedback & overlays**: Modal, Alert, Toast (shared `Tone`), Tooltip, and
  Spinner.
- **Layout & content**: Card, Badge (covering Badge/Tag/Pill), Avatar, Divider,
  Tabs, Accordion, Breadcrumbs, and a responsive Nav that collapses into a top
  dropdown sheet below `md` with an optional sticky mode.
- **Data display**: Dropdown menu, Empty state, Pagination, and a sortable,
  paginated Livewire Data table that reflows to stacked cards on mobile.
- **Page templates**: an auth-agnostic Login page and a single parameterised
  HTTP error page (401/403/404/405/406/412/500/501/502 + generic).
- **Dashboard widgets**: Small-box, Info-box, and a Profile menu.
- **Application shell**: an `app-layout` page scaffold, an `app-header`
  application top bar, and a compact dark `app-footer`, composed from
  `select-pill`, `icon-button`, and `notification` controls.
- **Showcase & docs**: a `kadoorie:build-showcase` generator, the generated
  static gallery under `docs/showcase/`, a user guide, and a data-binding guide.

### Accessibility

- WCAG 2.1 AA: keyboard operation, visible focus, labelled controls,
  `aria-live` regions, focus trapping/return on overlays, colour never used
  alone, responsive layouts (360×800 / 768×1024 / 1920×1080) with no horizontal
  scroll and 44×44px touch targets.

### Notes

- Dark mode and RTL are intentionally out of scope for this release.

[Unreleased]: https://github.com/oxfordtrauma/kadoorie-livewire-components/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/oxfordtrauma/kadoorie-livewire-components/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/oxfordtrauma/kadoorie-livewire-components/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/oxfordtrauma/kadoorie-livewire-components/releases/tag/v0.1.0
