<?php

/**
 * Project: Kadoorie Livewire Components
 * File: IconSize.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Enums;

enum IconSize: string
{
    case Sm = 'sm';
    case Md = 'md';
    case Lg = 'lg';

    public function pixels(): int
    {
        return match ($this) {
            self::Sm => 16,
            self::Md => 20,
            self::Lg => 24,
        };
    }
}
