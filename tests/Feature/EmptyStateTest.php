<?php

/**
 * Project: Kadoorie Livewire Components
 * File: EmptyStateTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a status region with heading and description', function (): void {
    $this->blade('<x-kadoorie::empty-state heading="No results" description="Try another search." />')
        ->assertSee('data-test="empty-state"', false)
        ->assertSee('role="status"', false)
        ->assertSee('data-test="empty-state-heading"', false)
        ->assertSee('No results')
        ->assertSee('Try another search.');
});

it('can drop the status role for non-result empties', function (): void {
    $this->blade('<x-kadoorie::empty-state heading="Nothing here" :status="false" />')
        ->assertDontSee('role="status"', false);
});
