<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Button.php
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
use Kadoorie\LivewireComponents\Enums\ButtonVariant;
use Kadoorie\LivewireComponents\Enums\Size;

final class Button extends Component
{
    public ButtonVariant $variant;

    public Size $size;

    public function __construct(
        ButtonVariant|string $variant = ButtonVariant::Primary,
        Size|string $size = Size::Md,
        public string $type = 'button',
        public bool $loading = false,
        public bool $disabled = false,
    ) {
        $this->variant = is_string($variant) ? ButtonVariant::from($variant) : $variant;
        $this->size = is_string($size) ? Size::from($size) : $size;
    }

    public function render(): View
    {
        return view('kadoorie::components.button');
    }
}
