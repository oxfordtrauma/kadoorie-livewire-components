<?php

/**
 * Project: Kadoorie Livewire Components
 * File: IconCatalogTest.php
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

declare(strict_types=1);

use Kadoorie\LivewireComponents\Support\IconCatalog;
use Kadoorie\LivewireComponents\View\Components\Icon;

it('lists the bundled icons grouped by set', function (): void {
    $grouped = IconCatalog::grouped();

    expect($grouped)->toHaveKeys(['kadoorie', 'lucide'])
        ->and($grouped['kadoorie'])->toContain('leaf', 'mark')
        ->and($grouped['lucide'])->toContain('check', 'search');
});

it('sorts icon names within each set', function (): void {
    foreach (IconCatalog::grouped() as $names) {
        $sorted = $names;
        sort($sorted);

        expect($names)->toBe($sorted);
    }
});

it('resolves every catalogued reference to renderable svg markup', function (): void {
    $references = IconCatalog::references();

    expect($references)->not->toBeEmpty();

    foreach ($references as $reference) {
        expect((string) (new Icon($reference))->inner())->not->toBe('');
    }
});

it('counts every bundled icon across all sets', function (): void {
    $expected = array_sum(array_map('count', IconCatalog::grouped()));

    expect(IconCatalog::count())->toBe($expected);
});
