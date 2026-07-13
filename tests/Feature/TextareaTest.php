<?php

/**
 * Project: Kadoorie Livewire Components
 * File: TextareaTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a textarea with the control id and test hook', function (): void {
    $this->blade('<x-kadoorie::textarea name="bio" rows="6" />')
        ->assertSee('id="bio"', false)
        ->assertSee('name="bio"', false)
        ->assertSee('rows="6"', false)
        ->assertSee('data-test="bio-textarea"', false);
});

it('renders the provided value as textarea content', function (): void {
    $this->blade('<x-kadoorie::textarea name="bio" value="Hello" />')
        ->assertSee('>Hello</textarea>', false);
});

it('inherits the field error and wires aria on the textarea', function (): void {
    $this->blade(
        '<x-kadoorie::field label="Bio" error="Too long" name="bio">'
        . '<x-kadoorie::textarea name="bio" />'
        . '</x-kadoorie::field>',
    )
        ->assertSee('aria-describedby="bio-error"', false)
        ->assertSee('aria-invalid="true"', false);
});
