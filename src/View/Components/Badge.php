<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Badge.php
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
use Kadoorie\LivewireComponents\Enums\BadgeShape;
use Kadoorie\LivewireComponents\Enums\Size;
use Kadoorie\LivewireComponents\Enums\Tone;

/**
 * Single badge component covering the former Badge/Tag/Pill triplet (rule 14),
 * parameterised by tone, shape, and size. Tone is conveyed with a tinted
 * surface, a coloured icon, and a text label - never colour alone.
 */
final class Badge extends Component
{
    public Tone $tone;

    public BadgeShape $shape;

    public Size $size;

    public function __construct(
        Tone|string $tone = Tone::Info,
        BadgeShape|string $shape = BadgeShape::Rounded,
        Size|string $size = Size::Sm,
        public bool $icon = true,
    ) {
        $this->tone = is_string($tone) ? Tone::from($tone) : $tone;
        $this->shape = is_string($shape) ? BadgeShape::from($shape) : $shape;
        $this->size = is_string($size) ? Size::from($size) : $size;
    }

    public function sizeClasses(): string
    {
        return match ($this->size) {
            Size::Sm => 'gap-1 px-2 py-0.5 text-xs',
            Size::Md => 'gap-1.5 px-2.5 py-1 text-sm',
            Size::Lg => 'gap-1.5 px-3 py-1.5 text-base',
        };
    }

    public function render(): View
    {
        return view('kadoorie::components.badge');
    }
}
