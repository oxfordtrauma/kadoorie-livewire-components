<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ValidationShowcaseTest.php
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

declare(strict_types=1);

use Illuminate\Support\Facades\Blade;
use Kadoorie\LivewireComponents\Support\ComponentExampleRegistry;

it('registers a validation section with a live form and static error states', function (): void {
    $examples = ComponentExampleRegistry::grouped()['validation'] ?? [];

    expect($examples)->toHaveCount(2);

    $html = collect($examples)
        ->map(fn($example) => Blade::render($example->snippet))
        ->implode("\n");

    expect($html)
        ->toContain('data-test="validation-form"')
        ->toContain('data-test="validation-submit"')
        ->toContain('role="alert"')
        ->toContain('aria-invalid="true"');
});
