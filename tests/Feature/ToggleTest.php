<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ToggleTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders an accessible switch with role and initial state', function (): void {
    $this->blade('<x-kadoorie::toggle name="notify" label="Notifications" />')
        ->assertSee('role="switch"', false)
        ->assertSee('aria-checked="false"', false)
        ->assertSee('data-test="notify-toggle"', false)
        ->assertSee('Notifications');
});

it('reflects the checked state on the switch', function (): void {
    $this->blade('<x-kadoorie::toggle name="notify" :checked="true" />')
        ->assertSee('aria-checked="true"', false)
        ->assertSee('checked', false);
});

it('inherits the field error and wires aria on the toggle', function (): void {
    $this->blade(
        '<x-kadoorie::field label="Notify" error="Required" name="notify">'
        . '<x-kadoorie::toggle name="notify" />'
        . '</x-kadoorie::field>',
    )
        ->assertSee('aria-describedby="notify-error"', false)
        ->assertSee('aria-invalid="true"', false);
});
