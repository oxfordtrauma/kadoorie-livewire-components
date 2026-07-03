<?php

/**
 * Project: Kadoorie Livewire Components
 * File: SmallBoxTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a solid-filled small box with value, label, and icon', function (): void {
    $this->blade('<x-kadoorie::small-box tone="primary" value="150" label="New orders" icon="info" />')
        ->assertSee('data-test="small-box"', false)
        ->assertSee('data-test="small-box-value"', false)
        ->assertSee('150')
        ->assertSee('New orders')
        ->assertSee('bg-primary', false)
        ->assertSee('data-test="small-box-icon"', false);
});

it('renders a more-info link when a url is given', function (): void {
    $this->blade('<x-kadoorie::small-box tone="success" value="1" label="Orders" icon="info" url="/orders" />')
        ->assertSee('data-test="small-box-link"', false)
        ->assertSee('href="/orders"', false);
});

it('omits the more-info link when no url is given', function (): void {
    $this->blade('<x-kadoorie::small-box tone="danger" value="1" label="Orders" icon="info" />')
        ->assertDontSee('data-test="small-box-link"', false);
});
