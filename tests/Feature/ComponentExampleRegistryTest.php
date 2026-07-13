<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ComponentExampleRegistryTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

use Illuminate\Support\Facades\Blade;
use Kadoorie\LivewireComponents\Support\ComponentExampleRegistry;

it('registers at least one example for every shipped component', function (): void {
    $components = ComponentExampleRegistry::components();

    expect($components)->toContain(
        'button',
        'input',
        'select',
        'checkbox',
        'toggle',
        'badge',
        'card',
        'alert',
        'tooltip',
        'spinner',
        'tabs',
        'accordion',
        'breadcrumbs',
        'nav',
        'dropdown',
        'empty-state',
        'pagination',
        'error-page',
        'modal',
        'toast',
        'data-table',
        'login',
    );
});

it('renders every registered example without error', function (): void {
    foreach (ComponentExampleRegistry::all() as $example) {
        $bufferLevel = ob_get_level();

        $html = Blade::render($example->snippet);

        while (ob_get_level() > $bufferLevel) {
            ob_end_clean();
        }

        expect(trim($html))->not->toBe('', "Example [{$example->component} / {$example->title}] rendered empty");
    }
});
