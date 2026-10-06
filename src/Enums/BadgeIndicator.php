<?php

/**
 * Project: Kadoorie Livewire Components
 * File: BadgeIndicator.php
 * User: stodd
 * Created: 2026-09-15
 * Last updated by: stodd
 * Last updated on: 2026-09-15
 * Version: 0.0.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Enums;

enum BadgeIndicator: string
{
    case None = 'none';
    case Icon = 'icon';
    case Dot = 'dot';
    case Number = 'number';
}
