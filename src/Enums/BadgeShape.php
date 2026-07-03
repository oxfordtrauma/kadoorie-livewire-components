<?php

/**
 * Project: Kadoorie Livewire Components
 * File: BadgeShape.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Enums;

enum BadgeShape: string
{
    case Rounded = 'rounded';
    case Pill = 'pill';

    public function classes(): string
    {
        return match ($this) {
            self::Rounded => 'rounded-md',
            self::Pill => 'rounded-full',
        };
    }
}
