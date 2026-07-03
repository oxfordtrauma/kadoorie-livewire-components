# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Package scaffold: Composer and npm manifests, Spatie-based service provider,
  configuration file, and publishable asset target.
- Dockerised development environment (`kadoorie-app`): PHP 8.3, Composer, Node 20.
- Quality tooling: Pint (PER), Larastan (max), Pest via Orchestra Testbench,
  ESLint, Prettier, Jest, and Playwright (functional + WCAG projects).
- Continuous integration workflow and a header-maintaining pre-commit hook.
