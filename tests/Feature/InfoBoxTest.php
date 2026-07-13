<?php

/**
 * Project: Kadoorie Livewire Components
 * File: InfoBoxTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders an info box with icon, label, and value', function (): void {
    $this->blade('<x-kadoorie::info-box tone="info" icon="info" label="Messages" value="1,410" />')
        ->assertSee('data-test="info-box"', false)
        ->assertSee('data-test="info-box-icon"', false)
        ->assertSee('Messages')
        ->assertSee('1,410');
});

it('renders an accessible progressbar when progress is set', function (): void {
    $this->blade('<x-kadoorie::info-box tone="success" icon="info" label="Goal" value="70%" :progress="70" />')
        ->assertSee('role="progressbar"', false)
        ->assertSee('aria-valuenow="70"', false)
        ->assertSee('aria-valuemin="0"', false)
        ->assertSee('aria-valuemax="100"', false);
});

it('omits the progressbar when no progress is given', function (): void {
    $this->blade('<x-kadoorie::info-box tone="info" icon="info" label="Messages" value="10" />')
        ->assertDontSee('role="progressbar"', false);
});
