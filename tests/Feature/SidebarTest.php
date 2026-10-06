<?php

/**
 * Project: Kadoorie Livewire Components
 * File: SidebarTest.php
 * User: stodd
 * Created: 2026-09-14
 * Last updated by: stodd
 * Last updated on: 2026-09-14
 * Version: 0.0.0
 */

declare(strict_types=1);

use Illuminate\Support\Facades\Blade;

it('renders sidebar landmarks and optional slots', function (): void {
    // Blade's named-slot rendering can leave an output buffer open; balance it
    // so PHPUnit's strict output-buffering check does not flag the test risky.
    $bufferLevel = ob_get_level();

    $html = Blade::render(
        '<x-kadoorie::sidebar><x-slot:sidebar>Links</x-slot:sidebar><x-slot:search>Search</x-slot:search>Page</x-kadoorie::sidebar>',
    );

    while (ob_get_level() > $bufferLevel) {
        ob_end_clean();
    }

    expect($html)->toContain('data-test="sidebar-aside"')
        ->toContain('aria-label="Sidebar navigation"')
        ->toContain('data-test="sidebar-search"')
        ->toContain('data-test="sidebar-main"');
});
