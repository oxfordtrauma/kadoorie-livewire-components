<?php

/**
 * Project: Kadoorie Livewire Components
 * File: TooltipTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('associates the trigger with the tooltip via aria-describedby', function (): void {
    $html = $this->blade('<x-kadoorie::tooltip text="More info" id="tt-1"><span>?</span></x-kadoorie::tooltip>')
        ->assertSee('role="tooltip"', false)
        ->assertSee('aria-describedby="tt-1"', false)
        ->assertSee('id="tt-1"', false)
        ->assertSee('More info');
});

it('is dismissible with escape and not a focus trap', function (): void {
    $this->blade('<x-kadoorie::tooltip text="More info">?</x-kadoorie::tooltip>')
        ->assertSee('keydown.escape', false)
        ->assertSee('x-cloak', false)
        ->assertSee('data-test="tooltip-trigger"', false);
});

it('positions the tooltip from the placement prop', function (): void {
    $this->blade('<x-kadoorie::tooltip text="Info" placement="right">?</x-kadoorie::tooltip>')
        ->assertSee('left-full', false);
});
