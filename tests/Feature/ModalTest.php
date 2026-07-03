<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ModalTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

use Kadoorie\LivewireComponents\Livewire\Modal;
use Livewire\Livewire;

it('opens and closes, toggling the dialog markup', function (): void {
    Livewire::test(Modal::class, ['title' => 'Confirm'])
        ->assertSet('isOpen', false)
        ->assertDontSeeHtml('aria-modal="true"')
        ->call('open')
        ->assertSet('isOpen', true)
        ->assertSeeHtml('aria-modal="true"')
        ->assertSee('Confirm')
        ->call('close')
        ->assertSet('isOpen', false);
});

it('opens in response to the kadoorie-open-modal event', function (): void {
    Livewire::test(Modal::class, ['title' => 'Confirm'])
        ->dispatch('kadoorie-open-modal')
        ->assertSet('isOpen', true);
});

it('labels the dialog by its title and describes it by its body', function (): void {
    Livewire::test(Modal::class, ['title' => 'Delete', 'description' => 'Are you sure?'])
        ->call('open')
        ->assertSeeHtml('role="dialog"')
        ->assertSeeHtml('aria-labelledby')
        ->assertSeeHtml('aria-describedby')
        ->assertSee('Are you sure?');
});

it('omits the escape handler and close button when not dismissible', function (): void {
    Livewire::test(Modal::class, ['title' => 'Locked', 'dismissible' => false])
        ->call('open')
        ->assertDontSeeHtml('data-test="modal-close"')
        ->assertDontSeeHtml('keydown.escape.window');
});
