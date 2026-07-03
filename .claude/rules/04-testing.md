# Testing

## General Rules

- Every implementation change must be covered by an automated test unless the
  user explicitly says to skip tests.
- Write or update Pest tests for new features.
- Run the smallest useful test scope first, then broaden when risk warrants it.
- Do not delete tests without approval.
- Do not skip tests because a change looks simple.

## Pest

- Create Pest tests with `docker exec app php artisan make:test --pest Name`.
- Do not include the suite directory in the generated test name.
- Use feature tests for user-visible behavior, endpoints, authorization, and
  framework integration.
- Use unit tests for isolated services, value objects, and pure domain logic.
- Run tests with:

```bash
docker exec app php artisan test --compact
docker exec app php artisan test --compact --filter=testName
```

## Database-Aware Tests

Before writing tests that depend on persisted data:

1. Use `database-schema` when available to confirm defaults, nullable columns,
   indexes, and foreign keys.
2. Read the model to confirm relationship method names and return types.
3. Use factories and existing factory states before manually assembling models.
4. Test realistic states. Do not assume an empty model means all values are
   null.

When testing form submissions that redirect back with errors, assert that old
input is preserved with `assertSessionHasOldInput()`.

## Laravel Conventions

- Use `fake()` or `$this->faker` according to nearby tests.
- For enum-cast fields, use enum cases rather than raw strings.
- For Livewire tests, use `Livewire::test(class)` rather than `livewire(class)`.

## Authorization Tests

- Every policy-protected action should have tests for allowed and forbidden
  users.
- API endpoint tests should assert `401` for unauthenticated access when the
  route requires authentication.
- Protected resource tests should assert `403` when an authenticated user lacks
  permission.
- Filament action tests should cover authorization when actions use
  `->authorize()`.

## JavaScript Tests

- Every non-test JavaScript file should have a corresponding Jest test file
  under `tests/JavaScript/`, named `<filename>.test.js` and mirroring the
  source file's path relative to `resources/js/`. Do not co-locate tests
  under `resources/js/` or use an adjacent `__tests__/` directory.
- Aim for at least 85 percent statement coverage.
- After JavaScript changes, run `npm run test:js` or `npx jest --coverage`
  according to the available project scripts.

## Playwright Tests

- Functional/interaction browser tests live under `tests/Playwright/`, named
  `<page-or-feature>.spec.ts`.
- WCAG/accessibility browser tests live under `tests/WCAG/`, named
  `<page-or-feature>.spec.ts`, using `@axe-core/playwright`.
- `playwright.config.ts` defines these as separate named projects
  (`functional` and `wcag`) so each suite can run independently:
  `npx playwright test --project=functional` /
  `npx playwright test --project=wcag`.
- Use `data-test` selectors, matching this project's existing selector
  convention — never CSS classes or IDs.
