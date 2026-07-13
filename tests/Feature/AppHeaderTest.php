<?php

/**
 * Project: Kadoorie Livewire Components
 * File: AppHeaderTest.php
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders the top bar with logo, start, actions, and subbar slots', function (): void {
    $this->blade('<x-kadoorie::app-header brand="Kadoorie"><x-slot:start><span>Selectors</span></x-slot:start><x-kadoorie::button>Action</x-kadoorie::button><x-slot:subbar><span>Breadcrumbs</span></x-slot:subbar></x-kadoorie::app-header>')
        ->assertSee('data-test="app-header"', false)
        ->assertSee('data-test="app-header-logo"', false)
        ->assertSee('Kadoorie')
        ->assertSee('data-test="app-header-start"', false)
        ->assertSee('Selectors')
        ->assertSee('data-test="app-header-actions"', false)
        ->assertSee('Action')
        ->assertSee('data-test="app-header-subbar"', false)
        ->assertSee('Breadcrumbs');
});

it('accepts a custom logo slot in place of the brand mark', function (): void {
    $this->blade('<x-kadoorie::app-header><x-slot:logo><span data-test="custom-logo">Acme</span></x-slot:logo><x-kadoorie::button>Go</x-kadoorie::button></x-kadoorie::app-header>')
        ->assertSee('data-test="custom-logo"', false)
        ->assertSee('Acme')
        ->assertDontSee('data-test="app-header-start"', false);
});
