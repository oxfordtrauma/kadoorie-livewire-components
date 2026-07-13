/**
 * Project: Kadoorie Livewire Components
 * File: jest.config.js
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

export default {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests/JavaScript'],
  testMatch: ['**/*.test.js'],
  collectCoverage: true,
  collectCoverageFrom: ['resources/js/**/*.js'],
  coverageDirectory: 'tests/coverage',
  // JavaScript source lands in Phase 0B onward; keep the gate green until then.
  passWithNoTests: true,
};
