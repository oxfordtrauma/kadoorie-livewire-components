<?php

/**
 * Project: Kadoorie Livewire Components
 * File: DividerTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a horizontal separator by default', function (): void {
    $this->blade('<x-kadoorie::divider />')
        ->assertSee('role="separator"', false)
        ->assertSee('data-test="divider"', false)
        ->assertSee('<hr', false);
});

it('renders a labelled separator when given slot content', function (): void {
    $this->blade('<x-kadoorie::divider>OR</x-kadoorie::divider>')
        ->assertSee('role="separator"', false)
        ->assertSee('OR');
});

it('renders a vertical separator with the correct orientation', function (): void {
    $this->blade('<x-kadoorie::divider orientation="vertical" />')
        ->assertSee('aria-orientation="vertical"', false);
});
