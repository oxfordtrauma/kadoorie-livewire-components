# Security

## Dependencies And Audits

- `roave/security-advisories` prevents Composer from installing packages with
  known CVEs.
- `composer audit` runs after Composer install/update/require commands and in
  the pre-commit hook when `composer.lock` is staged.
- `npm audit --audit-level=high` runs after `npm install` and in the
  pre-commit hook when `package-lock.json` is staged.
- `osv-scanner` runs from the pre-commit hook when lock files are staged. It
  warns but does not block commits.
- Manual cross-ecosystem scan:

```bash
osv-scanner --lockfile=composer.lock --lockfile=package-lock.json
```

## Laravel Security

- Authorize user actions with policies, FormRequests, middleware, or Filament
  action authorization.
- Do not expose sensitive data in logs, exceptions, browser output, API
  resources, fixtures, seeds, or screenshots.
- Do not commit secrets, tokens, credentials, private keys, or real personal
  data.
- Use config files for environment-backed values. Do not call `env()` outside
  config.
- Validate all external input before using it.
- Prefer FormRequest authorization and validation for controller input.
- Use `$fillable` to control mass assignment.
- Do not return raw Eloquent models from API endpoints when resources are the
  local convention.
- Keep authentication and authorization behavior aligned with Fortify, Sanctum,
  and existing project policies.

## Review Focus

Security reviews should look for OWASP Top 10 issues, broken authentication,
broken authorization, insecure defaults, missing validation, sensitive data
exposure, and unsafe dependency changes.
