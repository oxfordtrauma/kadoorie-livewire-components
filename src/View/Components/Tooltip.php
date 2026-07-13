<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Tooltip.php
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

final class Tooltip extends Component
{
    public string $id;

    public function __construct(
        public string $text,
        public string $placement = 'top',
        ?string $id = null,
    ) {
        // Deterministic id (stable across renders) so static output does not churn.
        $this->id = $id ?? 'tooltip-' . substr(md5($text), 0, 8);
    }

    public function positionClasses(): string
    {
        return match ($this->placement) {
            'bottom' => 'top-full left-1/2 mt-1 -translate-x-1/2',
            'left' => 'right-full top-1/2 mr-1 -translate-y-1/2',
            'right' => 'left-full top-1/2 ml-1 -translate-y-1/2',
            default => 'bottom-full left-1/2 mb-1 -translate-x-1/2',
        };
    }

    public function render(): View
    {
        return view('kadoorie::components.tooltip');
    }
}
