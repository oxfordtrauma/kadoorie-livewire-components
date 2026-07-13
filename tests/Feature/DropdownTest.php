<?php

/**
 * Project: Kadoorie Livewire Components
 * File: DropdownTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a menu trigger with aria-haspopup and expanded state', function (): void {
    $this->blade(
        '<x-kadoorie::dropdown label="Actions">'
        . '<x-kadoorie::dropdown-item href="/edit">Edit</x-kadoorie::dropdown-item>'
        . '</x-kadoorie::dropdown>',
    )
        ->assertSee('data-test="dropdown-trigger"', false)
        ->assertSee('aria-haspopup="true"', false)
        ->assertSee('aria-expanded="false"', false)
        ->assertSee('role="menu"', false)
        ->assertSee('Actions');
});

it('renders menu items with the menuitem role', function (): void {
    $this->blade(
        '<x-kadoorie::dropdown label="Actions">'
        . '<x-kadoorie::dropdown-item href="/edit">Edit</x-kadoorie::dropdown-item>'
        . '<x-kadoorie::dropdown-item>Delete</x-kadoorie::dropdown-item>'
        . '</x-kadoorie::dropdown>',
    )
        ->assertSee('role="menuitem"', false)
        ->assertSee('href="/edit"', false)
        ->assertSee('Edit')
        ->assertSee('Delete');
});
