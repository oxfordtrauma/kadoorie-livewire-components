# Git Workflow

## Commit Message Format

- Keep the subject line to 50 characters or fewer.
- Prefix the subject with an approved type.
- Capitalize the subject after the prefix.
- Use the imperative mood.
- Do not end the subject with a period.
- Insert an empty line after the subject.
- Wrap the body at 72 characters.
- Use the body to explain what changed and why.

Example:

```text
feat: Add unit tests for user authentication
```

## Approved Commit Types

- `feat:` Adds a new feature.
- `fix:` Fixes a bug.
- `refactor:` Restructures code without changing behavior.
- `chore:` Makes miscellaneous changes that do not modify source or tests.
- `perf:` Improves performance.
- `ci:` Changes CI configuration or workflows.
- `ops:` Changes operational components.
- `build:` Changes build tools, dependencies, or versioning.
- `docs:` Changes documentation.
- `style:` Changes formatting without changing code meaning.
- `revert:` Reverts a previous commit.
- `test:` Adds or corrects tests.

If the correct type is unclear, stop and ask before committing.

## Commit Preferences

- Prefer committing individual files separately when practical and coherent.
- Do not bypass hooks with `--no-verify` unless explicitly justified in the
  commit body.
- Do not create a commit while review findings, failing lint checks, or failing
  tests remain unresolved unless the user explicitly asks.

## Branches

- Use short, descriptive branch names.
- Prefer the `codex/` prefix for Codex-created branches unless the user asks
  for a different prefix.
- Keep each branch focused on one coherent change.
- Do not mix unrelated cleanup with feature, fix, or documentation work.

## Staging

- Stage only files that belong to the requested change.
- Review `git status` and `git diff` before staging or committing.
- Do not revert user changes unless the user explicitly asks.
- If unrelated changes are present, leave them untouched and call them out when
  needed.

## Pull Requests

- PR summaries should state what changed, why it changed, and how it was
  verified.
- Include screenshots or accessibility notes for UI changes when relevant.
- Link related issues when available.
- Call out known risks, skipped checks, or follow-up work explicitly.

## Hooks

- The version-controlled pre-commit hook lives in `.githooks/pre-commit`.
- Run `composer setup-hooks` once after cloning to set
  `core.hooksPath = .githooks`.
- The hook updates staged PHP and JavaScript headers when the header already
  exists.
- JavaScript test files are excluded from header version bumping.
- The hook blocks commits when `composer audit` or high-severity `npm audit`
  checks fail for staged lock files.
