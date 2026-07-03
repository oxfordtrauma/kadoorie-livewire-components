<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ToastTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

use Kadoorie\LivewireComponents\Livewire\Toast;
use Livewire\Livewire;

it('renders a persistent polite live region that is initially empty', function (): void {
    Livewire::test(Toast::class)
        ->assertSet('visible', false)
        ->assertSeeHtml('aria-live="polite"')
        ->assertDontSeeHtml('data-test="toast"');
});

it('shows a toast in response to the kadoorie-toast event', function (): void {
    Livewire::test(Toast::class)
        ->dispatch('kadoorie-toast', message: 'Saved successfully', tone: 'success')
        ->assertSet('visible', true)
        ->assertSet('message', 'Saved successfully')
        ->assertSeeHtml('data-test="toast"')
        ->assertSee('Saved successfully')
        ->assertSeeHtml('role="status"');
});

it('uses an assertive role for a danger toast and hides on dismiss', function (): void {
    Livewire::test(Toast::class)
        ->dispatch('kadoorie-toast', message: 'It broke', tone: 'danger')
        ->assertSeeHtml('role="alert"')
        ->call('dismiss')
        ->assertSet('visible', false);
});
