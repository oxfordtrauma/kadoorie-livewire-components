<?php

/**
 * Project: Kadoorie Livewire Components
 * File: SelectPillTest.php
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a labelled pill dropdown with its menu items', function (): void {
    $this->blade('<x-kadoorie::select-pill label="Page"><x-kadoorie::dropdown-item href="#">Dashboard</x-kadoorie::dropdown-item></x-kadoorie::select-pill>')
        ->assertSee('data-test="select-pill"', false)
        ->assertSee('data-test="select-pill-trigger"', false)
        ->assertSee('Page')
        ->assertSee('Dashboard')
        ->assertDontSee('data-test="select-pill-value"', false);
});

it('shows the selected value when one is provided', function (): void {
    $this->blade('<x-kadoorie::select-pill label="Role" value="Manager"><x-kadoorie::dropdown-item href="#">Manager</x-kadoorie::dropdown-item></x-kadoorie::select-pill>')
        ->assertSee('data-test="select-pill-value"', false)
        ->assertSee('Manager');
});
