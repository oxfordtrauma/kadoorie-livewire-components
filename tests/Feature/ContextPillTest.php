<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ContextPillTest.php
 * User: stodd
 * Created: 2026-09-14
 * Last updated by: stodd
 * Last updated on: 2026-09-14
 * Version: 0.0.0
 */

declare(strict_types=1);

it('renders static label and value context without interactive controls', function (): void {
    $this->blade('<x-kadoorie::context-pill label="View" value="Summary" />')
        ->assertSee('data-test="context-pill"', false)
        ->assertSee('data-test="context-pill-label"', false)
        ->assertSee('data-test="context-pill-value"', false)
        ->assertSee('View')
        ->assertSee('Summary')
        ->assertDontSee('<button', false)
        ->assertDontSee('chevron', false)
        ->assertDontSee('aria-expanded', false);
});

it('renders context without a value when none is supplied', function (): void {
    $this->blade('<x-kadoorie::context-pill label="View" />')
        ->assertSee('View')
        ->assertDontSee('data-test="context-pill-value"', false);
});
