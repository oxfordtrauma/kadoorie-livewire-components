<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ButtonTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a primary button with the test hook and idle busy state', function (): void {
    $this->blade('<x-kadoorie::button>Save</x-kadoorie::button>')
        ->assertSee('data-test="kadoorie-button"', false)
        ->assertSee('type="button"', false)
        ->assertSee('aria-busy="false"', false)
        ->assertSee('bg-primary', false)
        ->assertSee('Save');
});

it('marks a loading button as busy, disabled, and shows a spinner', function (): void {
    $this->blade('<x-kadoorie::button :loading="true">Save</x-kadoorie::button>')
        ->assertSee('aria-busy="true"', false)
        ->assertSee('disabled', false)
        ->assertSee('data-test="kadoorie-button-spinner"', false);
});

it('resolves a string variant into styling', function (): void {
    $this->blade('<x-kadoorie::button variant="danger">Delete</x-kadoorie::button>')
        ->assertSee('bg-danger', false);
});

it('keeps the shared button touch target across the size scale', function (): void {
    foreach (['xs', 'sm', 'md', 'lg'] as $size) {
        $this->blade("<x-kadoorie::button size=\"{$size}\">Go</x-kadoorie::button>")
            ->assertSee('min-h-11', false);
    }
});

it('suppresses optional icons while loading but keeps the label', function (): void {
    $this->blade('<x-kadoorie::button leading-icon="check" :loading="true">Saving</x-kadoorie::button>')
        ->assertSee('Saving')
        ->assertDontSee('data-test="kadoorie-icon"', false);
});
