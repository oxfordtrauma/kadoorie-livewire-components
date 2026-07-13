<?php

/**
 * Project: Kadoorie Livewire Components
 * File: IconButton.php
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
 * Icon-only button. Requires an accessible `label` (rendered as aria-label).
 * The `ghost` variant is a bare hover target; `pill` adds the light rounded
 * container used in the app header.
 */
final class IconButton extends Component
{
    public function __construct(
        public string $icon,
        public string $label,
        public string $variant = 'ghost',
        public string $type = 'button',
    ) {}

    public function variantClasses(): string
    {
        return match ($this->variant) {
            'pill' => 'rounded-full bg-bg text-text hover:bg-surface-muted',
            default => 'rounded-md text-text hover:bg-surface-muted',
        };
    }

    public function render(): View
    {
        return view('kadoorie::components.icon-button');
    }
}
