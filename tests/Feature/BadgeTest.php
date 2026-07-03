<?php

/**
 * Project: Kadoorie Livewire Components
 * File: BadgeTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a badge with a tone icon and label (never colour alone)', function (): void {
    $this->blade('<x-kadoorie::badge tone="success">Active</x-kadoorie::badge>')
        ->assertSee('data-test="badge"', false)
        ->assertSee('data-test="badge-icon"', false)
        ->assertSee('data-test="badge-label"', false)
        ->assertSee('Active');
});

it('renders a pill shape when requested', function (): void {
    $this->blade('<x-kadoorie::badge tone="info" shape="pill">New</x-kadoorie::badge>')
        ->assertSee('rounded-full', false);
});

it('can omit the icon', function (): void {
    $this->blade('<x-kadoorie::badge tone="danger" :icon="false">Error</x-kadoorie::badge>')
        ->assertDontSee('data-test="badge-icon"', false)
        ->assertSee('Error');
});

it('is the single component covering Badge, Tag, and Pill (rule 14)', function (): void {
    expect(class_exists(Kadoorie\LivewireComponents\View\Components\Tag::class))->toBeFalse()
        ->and(class_exists(Kadoorie\LivewireComponents\View\Components\Pill::class))->toBeFalse();
});
