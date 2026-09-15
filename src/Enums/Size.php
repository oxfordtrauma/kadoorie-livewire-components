<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Size.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Enums;

enum Size: string
{
    case Xs = 'xs';
    case Sm = 'sm';
    case Md = 'md';
    case Lg = 'lg';

    /**
     * Horizontal padding, typography, and spacing for buttons. Buttons retain
     * the shared touch-target height in their base component styles.
     */
    public function classes(): string
    {
        return match ($this) {
            self::Xs => 'text-xs px-2 gap-1',
            self::Sm => 'text-xs px-2.5 gap-1',
            self::Md => 'text-sm px-3.5 gap-1.5',
            self::Lg => 'text-base px-4 gap-2',
        };
    }

    /**
     * Padding and text size for text-entry controls (input, textarea, select).
     * Mobile text is forced to >=16px (text-lg) to prevent iOS auto-zoom, then
     * relaxes to the dense scale from `md` up.
     */
    public function inputClasses(): string
    {
        return match ($this) {
            self::Xs => 'text-lg md:text-xs px-2',
            self::Sm => 'text-lg md:text-xs px-2.5',
            self::Md => 'text-lg md:text-sm px-3',
            self::Lg => 'text-lg md:text-base px-3.5',
        };
    }
}
