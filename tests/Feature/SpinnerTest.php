<?php

/**
 * Project: Kadoorie Livewire Components
 * File: SpinnerTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a status role with a visually-hidden label', function (): void {
    $this->blade('<x-kadoorie::spinner />')
        ->assertSee('role="status"', false)
        ->assertSee('data-test="spinner"', false)
        ->assertSee('kad-spinner', false)
        ->assertSee('Loading...');
});

it('accepts a custom label and size', function (): void {
    $this->blade('<x-kadoorie::spinner label="Saving" size="lg" />')
        ->assertSee('Saving')
        ->assertSee('text-3xl', false);
});

it('supports the extra-small size', function (): void {
    $this->blade('<x-kadoorie::spinner size="xs" />')
        ->assertSee('text-sm', false);
});
