<?php

/**
 * Project: Kadoorie Livewire Components
 * File: DataTableContainer.php
 * User: stodd
 * Created: 2026-09-15
 * Last updated by: stodd
 * Last updated on: 2026-09-15
 * Version: 0.0.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

final class DataTableContainer extends Component
{
    public function __construct(public ?string $title = null) {}

    public function render(): View
    {
        return view('kadoorie::components.data-table-container');
    }
}
