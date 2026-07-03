<?php

/**
 * Project: Kadoorie Livewire Components
 * File: CardTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

use Illuminate\Support\Facades\Blade;

it('renders a card body with the test hook', function (): void {
    $this->blade('<x-kadoorie::card>Content</x-kadoorie::card>')
        ->assertSee('data-test="card"', false)
        ->assertSee('data-test="card-body"', false)
        ->assertSee('Content');
});

it('renders a title as a header when no header slot is provided', function (): void {
    $this->blade('<x-kadoorie::card title="Summary">Body</x-kadoorie::card>')
        ->assertSee('data-test="card-header"', false)
        ->assertSee('Summary');
});

it('prefers explicit header and footer slots', function (): void {
    // Blade's named-slot rendering can leave an output buffer open; balance it
    // so PHPUnit's strict output-buffering check does not flag the test risky.
    $bufferLevel = ob_get_level();

    $html = Blade::render(
        '<x-kadoorie::card><x-slot:header>Head</x-slot:header>Body<x-slot:footer>Foot</x-slot:footer></x-kadoorie::card>',
    );

    while (ob_get_level() > $bufferLevel) {
        ob_end_clean();
    }

    expect($html)
        ->toContain('data-test="card-header"')
        ->toContain('data-test="card-footer"')
        ->toContain('Head')
        ->toContain('Foot');
});
