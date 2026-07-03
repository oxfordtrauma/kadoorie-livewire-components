<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ToneTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

use Kadoorie\LivewireComponents\Enums\Tone;

it('exposes brand tones alongside the semantic ones', function (): void {
    expect(Tone::from('primary'))->toBe(Tone::Primary)
        ->and(Tone::from('secondary'))->toBe(Tone::Secondary)
        ->and(Tone::from('accent'))->toBe(Tone::Accent);
});

it('returns a solid fill with a background and a text colour for every tone', function (Tone $tone): void {
    expect($tone->solidClasses())
        ->toContain('bg-')
        ->toContain('text-');
})->with(Tone::cases());

it('keeps the live-region role assertive only for danger', function (): void {
    expect(Tone::Danger->role())->toBe('alert')
        ->and(Tone::Primary->role())->toBe('status')
        ->and(Tone::Accent->role())->toBe('status')
        ->and(Tone::Success->role())->toBe('status');
});

it('provides a valid icon, container, and icon colour for the brand tones', function (Tone $tone): void {
    expect($tone->icon())->toBeString()->not->toBe('')
        ->and($tone->containerClasses())->toContain('bg-')
        ->and($tone->iconColor())->toContain('text-');
})->with([Tone::Primary, Tone::Secondary, Tone::Accent]);
