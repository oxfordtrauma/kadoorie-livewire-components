<?php

/**
 * Project: Kadoorie Livewire Components
 * File: SelectPill.php
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
 * A labelled pill dropdown used in the app header (Page, View As, Trial, Role).
 * Wraps the shared Dropdown for the open/close, focus, and menu behaviour; adds
 * the rounded pill trigger with a label and an optional selected value.
 */
final class SelectPill extends Component
{
    public function __construct(
        public string $label,
        public ?string $value = null,
        public string $align = 'left',
    ) {}

    public function render(): View
    {
        return view('kadoorie::components.select-pill');
    }
}
