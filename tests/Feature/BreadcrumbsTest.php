<?php

/**
 * Project: Kadoorie Livewire Components
 * File: BreadcrumbsTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

$trail = [
    ['label' => 'Home', 'url' => '/'],
    ['label' => 'Library', 'url' => '/library'],
    ['label' => 'Buttons'],
];

it('renders a labelled breadcrumb nav with links and a current page', function () use ($trail): void {
    $this->blade('<x-kadoorie::breadcrumbs :items="$items" />', ['items' => $trail])
        ->assertSee('aria-label="Breadcrumb"', false)
        ->assertSee('data-test="breadcrumbs"', false)
        ->assertSee('data-test="breadcrumb-link"', false)
        ->assertSee('href="/library"', false);
});

it('marks the last item as the current page', function () use ($trail): void {
    $this->blade('<x-kadoorie::breadcrumbs :items="$items" />', ['items' => $trail])
        ->assertSee('aria-current="page"', false)
        ->assertSee('data-test="breadcrumb-current"', false)
        ->assertSee('Buttons');
});
