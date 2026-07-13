<?php

/**
 * Project: Kadoorie Livewire Components
 * File: TabsTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

$tabs = [
    ['id' => 'a', 'label' => 'Tab A'],
    ['id' => 'b', 'label' => 'Tab B'],
];

it('renders an accessible tablist with roving tabindex', function () use ($tabs): void {
    $this->blade(
        '<x-kadoorie::tabs :tabs="$tabs" id="demo">'
        . '<x-kadoorie::tab-panel tab="a" group="demo">A body</x-kadoorie::tab-panel>'
        . '<x-kadoorie::tab-panel tab="b" group="demo">B body</x-kadoorie::tab-panel>'
        . '</x-kadoorie::tabs>',
        ['tabs' => $tabs],
    )
        ->assertSee('role="tablist"', false)
        ->assertSee('role="tab"', false)
        ->assertSee('id="demo-tab-a"', false)
        ->assertSee('aria-controls="demo-panel-a"', false)
        ->assertSee('Tab A');
});

it('selects the first tab by default via aria-selected and tabindex', function () use ($tabs): void {
    $this->blade('<x-kadoorie::tabs :tabs="$tabs" id="demo" />', ['tabs' => $tabs])
        ->assertSee('aria-selected="true"', false)
        ->assertSee('tabindex="0"', false)
        ->assertSee('tabindex="-1"', false);
});

it('associates each panel with its tab', function () use ($tabs): void {
    $this->blade(
        '<x-kadoorie::tabs :tabs="$tabs" id="demo">'
        . '<x-kadoorie::tab-panel tab="a" group="demo">A body</x-kadoorie::tab-panel>'
        . '</x-kadoorie::tabs>',
        ['tabs' => $tabs],
    )
        ->assertSee('role="tabpanel"', false)
        ->assertSee('id="demo-panel-a"', false)
        ->assertSee('aria-labelledby="demo-tab-a"', false);
});
