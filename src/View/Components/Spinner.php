<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Spinner.php
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
use Kadoorie\LivewireComponents\Enums\Size;

final class Spinner extends Component
{
    public Size $size;

    public function __construct(
        Size|string $size = Size::Md,
        public string $label = 'Loading...',
    ) {
        $this->size = is_string($size) ? Size::from($size) : $size;
    }

    /**
     * The spinner sizes to its font-size (its diameter is 1em), so scale via a
     * text utility rather than fixed width/height.
     */
    public function diameterClass(): string
    {
        return match ($this->size) {
            Size::Sm => 'text-base',
            Size::Md => 'text-2xl',
            Size::Lg => 'text-3xl',
        };
    }

    public function render(): View
    {
        return view('kadoorie::components.spinner');
    }
}
