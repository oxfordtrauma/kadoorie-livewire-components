<?php

/**
 * Project: Kadoorie Livewire Components
 * File: BadgeColor.php
 * User: stodd
 * Created: 2026-09-15
 * Last updated by: stodd
 * Last updated on: 2026-09-15
 * Version: 0.0.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Enums;

enum BadgeColor: string
{
    case Neutral = 'neutral';
    case Red = 'red';
    case Pink = 'pink';
    case Purple = 'purple';
    case Green = 'green';
    case Blue = 'blue';
    case LightBlue = 'light-blue';
    case Amber = 'amber';

    public function classes(): string
    {
        return match ($this) {
            self::Neutral => 'bg-surface-muted border-border text-text-body',
            self::Red => 'bg-danger-subtle border-danger text-danger',
            self::Pink => 'bg-pink-subtle border-pink-border text-pink',
            self::Purple => 'bg-accent-subtle border-accent text-accent',
            self::Green => 'bg-success-subtle border-success text-success',
            self::Blue => 'bg-info-subtle border-info text-info',
            self::LightBlue => 'bg-light-blue-subtle border-light-blue-border text-light-blue',
            self::Amber => 'bg-warning-subtle border-warning text-text',
        };
    }

    public function indicatorClasses(): string
    {
        return match ($this) {
            self::Neutral => 'bg-text-muted', self::Red => 'bg-danger-solid', self::Pink => 'bg-pink', self::Purple => 'bg-accent',
            self::Green => 'bg-success', self::Blue => 'bg-info', self::LightBlue => 'bg-light-blue', self::Amber => 'bg-warning',
        };
    }

    public function iconClasses(): string
    {
        return match ($this) {
            self::Neutral => 'text-text-muted', self::Red => 'text-danger',
            self::Pink => 'text-pink', self::Purple => 'text-accent', self::Green => 'text-success',
            self::Blue => 'text-info', self::LightBlue => 'text-light-blue', self::Amber => 'text-warning',
        };
    }
}
