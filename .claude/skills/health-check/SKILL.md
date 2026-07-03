---
name: health-check
description: Run the Docker-based Laravel quality gates after implementation work.
---

# Health Check

Run this skill after implementation work. Execute the core checks in order.
If a check fails, fix the issue and rerun the failed check before reporting
completion.

## Prerequisite

The Docker `app` container must be running. If it is not running, report that
the health check could not be completed.

## Step 1: Code Style

Run Pint in test mode to detect style violations without silently fixing them:

```bash
docker exec app ./vendor/bin/pint --test --format agent
```

If violations are found:

- Review the diff output.
- Fix the code manually so you understand what was wrong.
- Do not run Pint without `--test` to silently fix issues.
- Run Pint with `--test` again to confirm the fixes.

## Step 2: Test Suite

Run the Laravel test suite:

```bash
docker exec app php artisan test --compact
```

For narrow changes, a focused test command may be run first, but the full
health check requires the broader test suite before completion.

If tests fail:

- Read the failure output carefully.
- Determine whether the failure is in your new code or existing tests.
- Fix your code if the failure is yours.
- If an existing test broke because of your changes, check whether the test
  expectation is outdated or your code introduced a regression.
- Re-run only the failing test file first, then the full suite.

## Step 3: Static Analysis

Run PHPStan/Larastan:

```bash
docker exec app ./vendor/bin/phpstan analyse
```

If errors are found, fix type issues and missing return types. Do not suppress
errors with `@phpstan-ignore` unless discussed first.

## Conditional Checks

Run these checks when the change touches the relevant area:

- JavaScript: run the configured ESLint, Prettier, and Jest checks. If no
  script exists, report the tooling gap.
- UI or Blade: run axe-core or an equivalent accessibility check.
- Lock files: run the applicable Composer, npm, and osv-scanner audits.
- Mermaid: run `npm run validate:mermaid -- <changed-file>`.

## Completion

Report the commands run and whether they passed. Do not report implementation
work as complete while required checks are failing unless the user explicitly
asks to stop with known failures.
