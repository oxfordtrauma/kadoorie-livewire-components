# SOLID & DRY Principles

## SOLID

Apply the SOLID principles practically — not academically. Each principle has a
concrete meaning within this component library's architecture.

### Single Responsibility

- Each class owns exactly one responsibility. A component renders and manages its
  own state; it does not also fetch unrelated data or format values for others.
- A Livewire component handles its own interaction and view; shared behaviour
  lives in a concern or support class, not copied across components.
- Blade view components stay presentational; business logic belongs in the host
  application, not the package.

### Open/Closed

- Variant, size, and tone enums expose their own styling (for example
  `ButtonVariant::classes()`) so behaviour is extended by adding a case, not by
  modifying existing consumers.
- Use strategy objects or contracts when a behaviour needs to vary by type.

### Liskov Substitution

- When a class implements an interface, every concrete implementation must be a
  safe substitute. Do not add preconditions that callers cannot know about.

### Interface Segregation

- Define small, focused interfaces. Do not create a `ComponentInterface` that
  lists every public method of a component.

### Dependency Inversion

- Inject dependencies through constructors. Never instantiate collaborators with
  `new` inside a component or service.
- Type hints should target interfaces or abstract classes when a contract exists.

## DRY — Eliminating Duplication

Apply DRY to _meaningful_ duplication — shared styling contracts, repeated
accessibility wiring, common validation schemas. Do not over-abstract two lines
that happen to look similar but serve different invariants.

## Review Gate: Similar Classes or Functions

> **If two proposed classes or functions differ by only one or two variables,
> stop and request a review before writing either.**

This rule applies to:
- Component classes that differ only by a variant, tone, or status value.
- Blade views that differ only by a label, icon, or colour token.
- Enum-backed styling maps that repeat the same structure per case.
- Concern or trait candidates where the same accessibility or state wiring is
  copied across components.

### How to Flag

1. Identify the two candidates in a comment, PR description, or conversation
   message referencing the component inventory in
   `docs/kadoorie-components-plan-1.md`.
2. Propose one of:
   - An abstract base class or trait for the shared logic.
   - A single class with a parameter that covers the variation.
   - Explicit acceptance of the duplication with a written justification.
3. Do not create the second class until the decision is recorded.

### Known Review Items (from the component inventory)

These pairs are already flagged and must be resolved before implementation:

| Pair | Shared pattern | Proposed resolution |
|---|---|---|
| Error pages `401`/`403`/`404`/`405`/`406`/`412`/`500`/`501`/`502` | Differ only by status code, title, and message | Single parameterised `ErrorPage` component driven by an `HttpErrorStatus` enum |
| `Input` / `Textarea` / `Select` / `Checkbox` / `Radio` / `Toggle` | All share label, hint, error, wrapper, and aria wiring | Shared `<x-kadoorie::field>` wrapper plus a `HandlesFieldState` concern |
| `Badge` / `Tag` / `Pill` | Same shape, differ only by size and shape variant | Single `Badge` component with `variant` and `shape` enums |
| `Alert` + `Toast` | Same semantic colour and icon system | Shared `Tone` enum plus a `SupportsSemanticTone` concern |
