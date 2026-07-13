<?php

/**
 * Project: Kadoorie Livewire Components
 * File: InputTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a labelled input with the control id derived from the name', function (): void {
    $this->blade('<x-kadoorie::input name="email" type="email" />')
        ->assertSee('id="email"', false)
        ->assertSee('name="email"', false)
        ->assertSee('type="email"', false)
        ->assertSee('data-test="email-input"', false);
});

it('inherits the field error and wires aria-describedby and aria-invalid', function (): void {
    $this->blade(
        '<x-kadoorie::field label="Email" error="Required" name="email">'
        . '<x-kadoorie::input name="email" />'
        . '</x-kadoorie::field>',
    )
        ->assertSee('aria-describedby="email-error"', false)
        ->assertSee('aria-invalid="true"', false);
});

it('inherits a field hint into aria-describedby', function (): void {
    $this->blade(
        '<x-kadoorie::field label="Email" hint="Work address" name="email">'
        . '<x-kadoorie::input name="email" />'
        . '</x-kadoorie::field>',
    )->assertSee('aria-describedby="email-hint"', false);
});

it('does not mark a valid standalone input as invalid', function (): void {
    $this->blade('<x-kadoorie::input name="email" />')
        ->assertDontSee('aria-invalid', false)
        ->assertDontSee('aria-describedby', false);
});

it('forces a mobile-safe font size to avoid iOS auto-zoom', function (): void {
    $this->blade('<x-kadoorie::input name="email" />')
        ->assertSee('text-lg', false)
        ->assertSee('md:text-sm', false);
});
