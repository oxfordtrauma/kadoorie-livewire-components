<?php

/**
 * Project: Kadoorie Livewire Components
 * File: FieldTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('associates the label with the control id derived from the name', function (): void {
    $this->blade('<x-kadoorie::field label="Email" name="email" />')
        ->assertSee('for="email"', false)
        ->assertSee('data-test="email-label"', false)
        ->assertSee('data-test="email-field"', false);
});

it('renders a hint with a stable id', function (): void {
    $this->blade('<x-kadoorie::field label="Email" name="email" hint="Work address" />')
        ->assertSee('id="email-hint"', false)
        ->assertSee('Work address');
});

it('renders an error as an alert with a stable id', function (): void {
    $this->blade('<x-kadoorie::field label="Email" name="email" error="Required" />')
        ->assertSee('id="email-error"', false)
        ->assertSee('role="alert"', false)
        ->assertSee('Required');
});

it('marks a required field with an accessible indicator', function (): void {
    $this->blade('<x-kadoorie::field label="Email" name="email" :required="true" />')
        ->assertSee('(required)')
        ->assertSee('aria-hidden="true"', false);
});
