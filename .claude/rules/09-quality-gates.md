# Quality Gates

## Required Checks

- Lint all changed code with the current project-standard tools.
- Run affected automated tests for implementation changes.
- Run the health-check skill after implementation work.
- Never commit code that fails Pint, Pest, or Larastan.

## Health Check

The health-check skill is the canonical post-implementation check. It runs:

1. Pint
2. Pest
3. PHPStan/Larastan

For JavaScript or UI changes, also run the configured JavaScript lint,
formatting, Jest, and accessibility checks.

## Reviews Before Commit

Before creating a commit, review the proposed changes for:

- Correctness, regressions, clarity, maintainability, and test coverage.
- OWASP Top 10 issues, authorization flaws, insecure defaults, and sensitive
  data exposure.
- Query efficiency, N+1 behavior, missing indexes, memory use, unnecessary
  computation, and cache or queue opportunities.

Resolve all findings before committing unless the user explicitly asks to
continue with known issues.

## Code Review Checklist

- Confirm the change satisfies the request without unrelated work.
- Check edge cases, empty states, validation paths, and error handling.
- Confirm naming and structure match nearby code.
- Confirm tests cover the behavior rather than implementation details.
- Check that public API responses remain backward compatible unless the change
  is intentionally breaking.

## Security Review Checklist

- Confirm authorization is enforced server-side.
- Confirm validation happens before untrusted input reaches persistence,
  filesystem, shell, HTML, or external-service boundaries.
- Confirm sensitive data is not logged, returned, seeded, screenshotted, or
  committed.
- Confirm mass assignment is controlled by `$fillable`.
- Confirm dependency or lockfile changes have appropriate audit coverage.

## Performance Review Checklist

- Check for N+1 queries and missing eager loading.
- Check for unbounded queries or collections.
- Check whether multi-column filters, joins, or sorts need database indexes.
- Check whether slow synchronous work should be queued.
- Check whether repeated expensive reads should be cached with a clear
  invalidation strategy.

## Failure Reporting

If a required tool or check cannot run, report:

- The exact command attempted.
- The failure reason.
- Whether the failure is environmental or caused by the change.
- The risk of finishing without that check.
- The next command or action needed to complete verification.
