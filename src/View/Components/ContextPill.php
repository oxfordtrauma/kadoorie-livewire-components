<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ContextPill.php
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

/**
 * A non-interactive pill for displaying static label/value context.
 */
final class ContextPill extends Component
{
    public function __construct(
        public string $label,
        public ?string $value = null,
    ) {}

    public function render(): View
    {
        return view('kadoorie::components.context-pill');
    }
}
