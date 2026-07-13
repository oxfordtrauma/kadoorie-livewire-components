<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Dropdown.php
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

final class Dropdown extends Component
{
    public function __construct(
        public string $label = 'Options',
        public string $align = 'right',
        public string $triggerClass = 'kad-focusable inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-sm font-medium text-text hover:bg-surface-muted',
        public string $triggerTest = 'dropdown-trigger',
    ) {}

    public function alignClasses(): string
    {
        return $this->align === 'left' ? 'left-0' : 'right-0';
    }

    public function render(): View
    {
        return view('kadoorie::components.dropdown');
    }
}
