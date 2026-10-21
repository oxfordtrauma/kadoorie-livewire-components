<?php

/**
 * Project: Kadoorie Livewire Components
 * File: DataTableContainerTest.php
 * User: stodd
 * Created: 2026-09-15
 * Last updated by: stodd
 * Last updated on: 2026-09-15
 * Version: 0.0.0
 */

declare(strict_types=1);

it('renders a table container with heading metadata and actions', function (): void {
    $bufferLevel = ob_get_level();

    $response = $this->blade(
        '<x-kadoorie::data-table-container title="People">'
        . '<x-slot:description>Directory records</x-slot:description>'
        . '<x-slot:summary>3 records</x-slot:summary>'
        . '<x-slot:actions><button type="button">Export</button></x-slot:actions>'
        . 'Table content'
        . '</x-kadoorie::data-table-container>',
    );

    while (ob_get_level() > $bufferLevel) {
        ob_end_clean();
    }

    $response
        ->assertSee('data-test="data-table-container"', false)
        ->assertSee('data-test="data-table-container-header"', false)
        ->assertSee('data-test="data-table-container-title"', false)
        ->assertSee('data-test="data-table-container-description"', false)
        ->assertSee('data-test="data-table-container-summary"', false)
        ->assertSee('data-test="data-table-container-actions"', false)
        ->assertSee('Export')
        ->assertSee('People')
        ->assertSee('Table content');
});

it('renders a toolbar and content without an optional heading', function (): void {
    $bufferLevel = ob_get_level();

    $response = $this->blade(
        '<x-kadoorie::data-table-container>'
        . '<x-slot:toolbar><span>Filters</span></x-slot:toolbar>'
        . 'Rows'
        . '</x-kadoorie::data-table-container>',
    );

    while (ob_get_level() > $bufferLevel) {
        ob_end_clean();
    }

    $response
        ->assertDontSee('data-test="data-table-container-header"', false)
        ->assertSee('data-test="data-table-container-toolbar"', false)
        ->assertSee('data-test="data-table-container-content"', false)
        ->assertSee('Filters')
        ->assertSee('Rows');
});
