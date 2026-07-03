<?php

/**
 * Project: Kadoorie Livewire Components
 * File: DataTableTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

use Kadoorie\LivewireComponents\Livewire\DataTable;
use Livewire\Livewire;

$columns = [
    ['field' => 'name', 'label' => 'Name', 'sortable' => true],
    ['field' => 'age', 'label' => 'Age', 'sortable' => true, 'numeric' => true],
];

$rows = [
    ['id' => 1, 'name' => 'Bob', 'age' => 30],
    ['id' => 2, 'name' => 'Alice', 'age' => 25],
];

it('renders a table with columns and rows', function () use ($columns, $rows): void {
    Livewire::test(DataTable::class, ['columns' => $columns, 'rows' => $rows])
        ->assertSeeHtml('data-test="data-table-table"')
        ->assertSee('Name')
        ->assertSee('Alice');
});

it('sorts by a column and exposes aria-sort', function () use ($columns, $rows): void {
    Livewire::test(DataTable::class, ['columns' => $columns, 'rows' => $rows])
        ->call('sortBy', 'name')
        ->assertSet('sortField', 'name')
        ->assertSet('sortDirection', 'asc')
        ->assertSeeHtml('aria-sort="ascending"');
});

it('toggles the sort direction on repeated calls', function () use ($columns, $rows): void {
    Livewire::test(DataTable::class, ['columns' => $columns, 'rows' => $rows])
        ->call('sortBy', 'name')
        ->call('sortBy', 'name')
        ->assertSet('sortDirection', 'desc')
        ->assertSeeHtml('aria-sort="descending"');
});

it('renders the empty state when there are no rows', function () use ($columns): void {
    Livewire::test(DataTable::class, ['columns' => $columns, 'rows' => [], 'emptyHeading' => 'Nothing yet'])
        ->assertSeeHtml('data-test="empty-state"')
        ->assertSee('Nothing yet')
        ->assertDontSeeHtml('data-test="data-table-table"');
});

it('bounds the page size to the maximum', function () use ($columns, $rows): void {
    Livewire::test(DataTable::class, ['columns' => $columns, 'rows' => $rows, 'perPage' => 5000])
        ->assertSet('perPage', 100);
});

it('paginates rows and advances pages', function () use ($columns): void {
    $rows = array_map(static fn(int $i): array => ['id' => $i, 'name' => "User {$i}", 'age' => $i], range(1, 25));

    Livewire::test(DataTable::class, ['columns' => $columns, 'rows' => $rows, 'perPage' => 10])
        ->assertSeeHtml('data-test="data-table-pagination"')
        ->assertSee('Page 1 of 3')
        ->call('nextPage')
        ->assertSet('page', 2)
        ->call('previousPage')
        ->assertSet('page', 1);
});

it('renders selection checkboxes when selectable', function () use ($columns, $rows): void {
    Livewire::test(DataTable::class, ['columns' => $columns, 'rows' => $rows, 'selectable' => true])
        ->assertSeeHtml('data-test="data-table-select"');
});
