<?php

/**
 * Project: Kadoorie Livewire Components
 * File: AppHeader.php
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * Application top bar: a brand/logo, an optional `start` slot for contextual
 * selectors, a right-aligned actions area (default slot), and an optional
 * `subbar` slot for a second row (breadcrumbs or page context). The logo
 * defaults to the Kadoorie brand mark and can be overridden with a `logo` slot.
 */
final class AppHeader extends Component
{
    public function __construct(
        public string $brand = 'Kadoorie',
    ) {}

    public function render(): View
    {
        return view('kadoorie::components.app-header');
    }
}
