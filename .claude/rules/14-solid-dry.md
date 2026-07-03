# SOLID & DRY Principles

## SOLID

Apply the SOLID principles practically — not academically. Each principle has a
concrete meaning within this project's architecture.

### Single Responsibility

- Each service owns exactly one domain aggregate. `ResultService` records and
  updates results; it does not also manage concessions.
- Controllers validate, delegate to a service, and return a response. No business
  logic belongs in a controller.
- Listeners do the side-effect work; events carry minimal payloads.

### Open/Closed

- Enums implement Filament label, color, and icon interfaces so behaviour can be
  extended by adding cases, not by modifying existing consumers.
- Use strategy objects or contracts when a behaviour needs to vary by type.

### Liskov Substitution

- When a service implements an interface, every concrete implementation must be a
  safe substitute. Do not add preconditions that callers cannot know about.

### Interface Segregation

- Define small, focused interfaces. Do not create a `ServiceInterface` that lists
  every public method of a service.

### Dependency Inversion

- Inject services through constructors. Never instantiate services with `new`
  inside controllers or other services.
- Type hints should target interfaces or abstract classes when a contract exists.

## DRY — Eliminating Duplication

Apply DRY to _meaningful_ duplication — shared business rules, repeated queries,
common validation schemas. Do not over-abstract two lines that happen to look
similar but serve different invariants.

## Review Gate: Similar Classes or Functions

> **If two proposed classes or functions differ by only one or two variables,
> stop and request a review before writing either.**

This rule applies to:
- Service methods that differ only by the model type or event they fire.
- FormRequest classes where `rules()` differs by one or two field names.
- Policy classes whose ability methods have identical role-check logic.
- Event classes that differ only by a status value.
- Listener classes that differ only by the notification class they dispatch.

### How to Flag

1. Identify the two candidates in a comment, PR description, or conversation
   message referencing the class inventory in `docs/smc-tennis-plan-1.md`.
2. Propose one of:
   - An abstract base class or trait for the shared logic.
   - A single class with a parameter that covers the variation.
   - Explicit acceptance of the duplication with a written justification.
3. Do not create the second class until the decision is recorded.

### Known Review Items (from the class inventory)

These pairs are already flagged and must be resolved before implementation:

| Pair | Shared pattern | Proposed resolution |
|---|---|---|
| `ResultService::record()` + `ConcessionService::record()` | DB transaction → create model → fire event → return model | Extract `RecordsMatchOutcome` trait or abstract `MatchOutcomeService` |
| `PostponementService::approve()` + `reject()` | Differ by one `FixtureStatus` value | Extract private `applyDecision(Postponement, FixtureStatus)` |
| `StoreClubRequest` / `StoreTeamRequest` / `StorePlayerRequest` | All validate `name` (required string) + `active` (bool) | Review abstract `ResourceRequest` base |
| `ClubPolicy` + `TeamPolicy` + `PlayerPolicy` + others | Same five CRUD abilities with same role checks | Review abstract `StandardCrudPolicy` base |
| `ResultRecordedEvent` + `ConcessionRecordedEvent` | Both trigger `InvalidateLeagueTableCache` | Review single `MatchOutcomeRecordedEvent(type)` |
| `PostponementApprovedEvent` + `PostponementRejectedEvent` | Differ by status | Review `PostponementDecidedEvent(status: FixtureStatus)` |
| `NotifyTeamOfResult` + `NotifyTeamOfConcession` + `NotifyTeamOfPostponementDecision` | All send a notification to a captain | Review single `NotifyTeamListener(notification)` |
