#!/usr/bin/env sh
# ---------------------------------------------------------------------------
# Kadoorie Livewire Components — Phase 0 integration sweep.
#
# Verifies the package skeleton is consumable and every quality gate is green,
# running each check inside the kadoorie-app Docker container.
#
# Usage:
#   sh scripts/test-phase-0.sh          # run the full sweep
#   CONTAINER=other sh scripts/test-phase-0.sh
#
# Exit code 0 = all gates passed; non-zero = the first failing gate.
# ---------------------------------------------------------------------------
set -eu

CONTAINER="${CONTAINER:-kadoorie-app}"
PASS=0
FAIL=0

# ANSI colours (disabled when stdout is not a terminal).
if [ -t 1 ]; then
    GREEN="$(printf '\033[0;32m')"
    RED="$(printf '\033[0;31m')"
    BOLD="$(printf '\033[1m')"
    RESET="$(printf '\033[0m')"
else
    GREEN='' RED='' BOLD='' RESET=''
fi

# run <label> <command...>
run() {
    label="$1"
    shift
    printf '%s──▶ %s%s\n' "$BOLD" "$label" "$RESET"
    if docker exec "$CONTAINER" "$@"; then
        printf '%s   ✔ %s%s\n\n' "$GREEN" "$label" "$RESET"
        PASS=$((PASS + 1))
    else
        printf '%s   x %s FAILED%s\n\n' "$RED" "$label" "$RESET"
        FAIL=$((FAIL + 1))
        return 1
    fi
}

# Ensure the dev container is running before doing anything else.
if ! docker ps --format '{{.Names}}' | grep -qx "$CONTAINER"; then
    printf '%sContainer "%s" is not running. Start it with:%s\n' "$RED" "$CONTAINER" "$RESET" >&2
    printf '  docker compose up -d\n' >&2
    exit 2
fi

printf '%sPhase 0 integration sweep (container: %s)%s\n\n' "$BOLD" "$CONTAINER" "$RESET"

# 1. Dependencies resolve from the committed lock file.
run 'composer install (lock resolves)' composer install --no-interaction --no-progress

# 2. PHP quality gates.
run 'Pint (PER, dry run)'   ./vendor/bin/pint --test
run 'Larastan (level max)'  ./vendor/bin/phpstan analyse --no-progress
run 'Pest'                  ./vendor/bin/pest --compact

# 3. Dependency audits.
run 'composer validate'     composer validate --strict
run 'composer audit'        composer audit

# 4. JavaScript toolchain.
run 'ESLint'                npm run lint
run 'Prettier'              npm run format:check
run 'Jest'                  npm run test:js
run 'npm audit (high)'      npm audit --audit-level=high

# 5. Publishable asset tag is wired.
run 'vendor:publish kadoorie-styles' \
    ./vendor/bin/testbench vendor:publish --tag=kadoorie-styles

printf '%s─────────────────────────────────────────────%s\n' "$BOLD" "$RESET"
printf '%s%s passed%s, %s%s failed%s\n' \
    "$GREEN" "$PASS" "$RESET" "$RED" "$FAIL" "$RESET"

[ "$FAIL" -eq 0 ]
