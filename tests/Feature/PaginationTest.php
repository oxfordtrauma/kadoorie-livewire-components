<?php

/**
 * Project: Kadoorie Livewire Components
 * File: PaginationTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

use Illuminate\Pagination\LengthAwarePaginator;

$make = fn(int $current = 2, int $total = 50): LengthAwarePaginator => new LengthAwarePaginator(
    range(1, 10),
    $total,
    10,
    $current,
    ['path' => 'http://localhost/items'],
);

it('renders a labelled pagination nav with a current page', function () use ($make): void {
    $this->blade('<x-kadoorie::pagination :paginator="$p" />', ['p' => $make(2)])
        ->assertSee('aria-label="Pagination"', false)
        ->assertSee('data-test="pagination"', false)
        ->assertSee('aria-current="page"', false)
        ->assertSee('aria-label="Go to page 1"', false);
});

it('disables the previous edge on the first page', function () use ($make): void {
    $this->blade('<x-kadoorie::pagination :paginator="$p" />', ['p' => $make(1)])
        ->assertSee('data-test="pagination-prev"', false)
        ->assertSee('aria-disabled="true"', false)
        ->assertSee('Previous page');
});

it('renders nothing when there is only one page', function () use ($make): void {
    $this->blade('<x-kadoorie::pagination :paginator="$p" />', ['p' => $make(1, 5)])
        ->assertDontSee('data-test="pagination"', false);
});
