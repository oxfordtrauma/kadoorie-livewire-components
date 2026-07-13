<?php

/**
 * Project: Kadoorie Livewire Components
 * File: WorkbenchGalleryTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

use Kadoorie\LivewireComponents\Support\ComponentExampleRegistry;

it('renders the workbench gallery with a section for every component', function (): void {
    $bufferLevel = ob_get_level();

    $html = view('kadoorie::workbench.gallery', [
        'groups' => ComponentExampleRegistry::grouped(),
        'css' => '/* tokens */',
    ])->render();

    while (ob_get_level() > $bufferLevel) {
        ob_end_clean();
    }

    expect($html)
        ->toContain('<html lang="en">')
        ->toContain('Kadoorie Components')
        ->toContain('data-test="showcase-button"')
        ->toContain('data-test="showcase-nav"')
        ->toContain('data-test="showcase-data-table"')
        ->toContain('data-test="kadoorie-button"');
});
