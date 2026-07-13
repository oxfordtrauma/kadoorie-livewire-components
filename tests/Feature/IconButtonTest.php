<?php

/**
 * Project: Kadoorie Livewire Components
 * File: IconButtonTest.php
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders an icon-only button with an accessible label', function (): void {
    $this->blade('<x-kadoorie::icon-button icon="circle-help" label="Help" />')
        ->assertSee('data-test="icon-button"', false)
        ->assertSee('aria-label="Help"', false)
        ->assertSee('<svg', false);
});

it('applies the pill variant container', function (): void {
    $this->blade('<x-kadoorie::icon-button icon="bell" label="Notifications" variant="pill" />')
        ->assertSee('rounded-full', false)
        ->assertSee('bg-bg', false);
});
