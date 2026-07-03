<?php

/**
 * Project: Kadoorie Livewire Components
 * File: AvatarTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders an image avatar with required alt text', function (): void {
    $this->blade('<x-kadoorie::avatar src="/me.jpg" alt="Jane Doe" />')
        ->assertSee('data-test="avatar-image"', false)
        ->assertSee('alt="Jane Doe"', false);
});

it('falls back to initials with an accessible name', function (): void {
    $this->blade('<x-kadoorie::avatar alt="Jane Doe" initials="JD" />')
        ->assertSee('data-test="avatar-initials"', false)
        ->assertSee('JD')
        ->assertSee('Jane Doe');
});

it('renders a presence dot with a screen-reader label', function (): void {
    $this->blade('<x-kadoorie::avatar alt="Jane Doe" initials="JD" presence="online" />')
        ->assertSee('data-test="avatar-presence"', false)
        ->assertSee('Online');
});
