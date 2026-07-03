<?php

/**
 * Project: Kadoorie Livewire Components
 * File: AlertTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders an info alert as a status region with icon, title, and body', function (): void {
    $this->blade('<x-kadoorie::alert tone="info" title="Heads up">Details here</x-kadoorie::alert>')
        ->assertSee('data-test="alert"', false)
        ->assertSee('role="status"', false)
        ->assertSee('data-test="kadoorie-icon"', false)
        ->assertSee('Heads up')
        ->assertSee('Details here');
});

it('uses an assertive alert role for the danger tone', function (): void {
    $this->blade('<x-kadoorie::alert tone="danger">Something failed</x-kadoorie::alert>')
        ->assertSee('role="alert"', false)
        ->assertSee('bg-danger-subtle', false);
});

it('renders a dismiss control only when dismissible', function (): void {
    $this->blade('<x-kadoorie::alert tone="success" :dismissible="true">Saved</x-kadoorie::alert>')
        ->assertSee('data-test="alert-dismiss"', false)
        ->assertSee('aria-label="Dismiss"', false);

    $this->blade('<x-kadoorie::alert tone="success">Saved</x-kadoorie::alert>')
        ->assertDontSee('data-test="alert-dismiss"', false);
});
