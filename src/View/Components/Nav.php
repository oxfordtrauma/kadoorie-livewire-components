<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Nav.php
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

final class Nav extends Component
{
    public bool $sticky;

    /**
     * @var array<int, array{label: string, url: string, active?: bool}>
     */
    public array $items;

    /**
     * @param  array<int, array{label: string, url: string, active?: bool}>  $items
     */
    public function __construct(
        array $items = [],
        ?bool $sticky = null,
        public string $brand = 'Kadoorie',
        public string $brandUrl = '/',
    ) {
        $this->items = $items;
        $this->sticky = $sticky ?? (bool) config('kadoorie.nav.sticky', false);
    }

    public function render(): View
    {
        return view('kadoorie::components.nav');
    }
}
