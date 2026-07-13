<?php

/**
 * Project: Kadoorie Livewire Components
 * File: LabelTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a label bound to a control with a test hook', function (): void {
    $this->blade('<x-kadoorie::label for="email">Email</x-kadoorie::label>')
        ->assertSee('for="email"', false)
        ->assertSee('data-test="email-label"', false)
        ->assertSee('Email');
});

it('exposes an accessible required indicator', function (): void {
    $this->blade('<x-kadoorie::label for="email" :required="true">Email</x-kadoorie::label>')
        ->assertSee('(required)')
        ->assertSee('aria-hidden="true"', false);
});
