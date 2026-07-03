<?php

/**
 * Project: Kadoorie Livewire Components
 * File: NavTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

$items = [
    ['label' => 'Dashboard', 'url' => '/dashboard', 'active' => true],
    ['label' => 'Reports', 'url' => '/reports'],
];

it('collapses to a toggle and dropdown sheet below md and exposes aria state', function () use ($items): void {
    $this->blade('<x-kadoorie::nav :items="$items" />', ['items' => $items])
        ->assertSee('data-test="nav-toggle"', false)
        ->assertSee('aria-expanded="false"', false)
        ->assertSee('aria-controls="nav-sheet"', false)
        ->assertSee('data-test="nav-sheet"', false);
});

it('renders an inline desktop menu with the active item marked', function () use ($items): void {
    $this->blade('<x-kadoorie::nav :items="$items" />', ['items' => $items])
        ->assertSee('data-test="nav-menu"', false)
        ->assertSee('data-test="nav-link"', false)
        ->assertSee('aria-current="page"', false)
        ->assertSee('href="/reports"', false)
        ->assertSee('data-test="nav-skip-link"', false);
});

it('renders sticky positioning only when the sticky prop is set', function () use ($items): void {
    $this->blade('<x-kadoorie::nav :sticky="true" :items="$items" />', ['items' => $items])
        ->assertSee('data-test="nav"', false)
        ->assertSee('sticky', false);

    $this->blade('<x-kadoorie::nav :sticky="false" :items="$items" />', ['items' => $items])
        ->assertDontSee('sticky top-0', false);
});

it('defaults sticky from configuration', function () use ($items): void {
    config()->set('kadoorie.nav.sticky', true);

    $this->blade('<x-kadoorie::nav :items="$items" />', ['items' => $items])
        ->assertSee('sticky top-0', false);
});
