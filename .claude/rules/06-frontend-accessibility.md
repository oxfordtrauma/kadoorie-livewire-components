# Frontend And Accessibility

## JavaScript

- JavaScript, `.mjs`, and `.cjs` files must begin with the project file header.
- Use ES modules unless the file is a CommonJS configuration file.
- Use ESLint recommended rules for code-quality checks.
- Use Prettier for formatting.
- After JavaScript changes, check the whole changed file with the configured
  linting and formatting tools.

## JavaScript Header

```js
/**
 * Project: SMC Tennis Website
 * File: <filename>
 * User: <username>
 * Created: <date>
 * Last updated by: <username>
 * Last updated on: <date>
 * Version: 0.1.0
 */
```

The pre-commit hook updates `Last updated by`, `Last updated on`, and
`Version` for staged JavaScript files that already contain this header.
JavaScript test files are excluded from header version bumping.

## Accessibility

All pages and components must meet WCAG 2.1 Level AA.

- Give non-text content useful `alt` text or an `aria-label`.
- Do not rely on color alone to convey information.
- Maintain contrast of at least 4.5:1 for normal text and 3:1 for large text
  and UI components.
- Associate every form input with a visible label or `aria-label`.
- Make every interactive element keyboard reachable and operable.
- Keep focus visible. Do not remove focus rings.
- Avoid keyboard traps. Modal dialogs must return focus to the trigger.
- Keep touch targets at least 44 by 44 pixels.
- Associate validation errors with fields using `aria-describedby`.
- Declare the page language with `<html lang="en">`.
- Use semantic HTML elements.
- Use ARIA live regions for dynamic content updates.

Run axe-core or an equivalent automated accessibility check after UI changes
and resolve violations before committing.

## Test Selectors

- Every meaningful HTML element must have a unique kebab-case `data-test`
  attribute. This includes forms, inputs, buttons, links, headings, navigation
  elements, lists, tables, status messages, and major layout regions.
- Purely structural or decorative elements (`<div>`, `<span>`, `<p>` used only
  for spacing/styling) do not need `data-test` attributes.
- Format: `data-test="<context>-<element-type>"`. Examples:
  `data-test="login-form"`, `data-test="nav-logout-button"`,
  `data-test="fixtures-table"`.
- Do not remove or rename `data-test` attributes without updating related
  Gherkin feature files and Playwright tests.
- Do not use IDs or CSS classes as test selectors.
