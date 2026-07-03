<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Breadcrumbs.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

final class Breadcrumbs extends Component
{
    /**
     * @var array<int, array{label: string, url?: string}>
     */
    public array $items;

    /**
     * @param  array<int, array{label: string, url?: string}>  $items
     */
    public function __construct(
        array $items = [],
        public string $label = 'Breadcrumb',
    ) {
        $this->items = $items;
    }

    public function render(): View
    {
        return view('kadoorie::components.breadcrumbs');
    }
}
