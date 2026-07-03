<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Tone.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Enums;

enum Tone: string
{
    case Info = 'info';
    case Success = 'success';
    case Warning = 'warning';
    case Danger = 'danger';

    public function icon(): string
    {
        return match ($this) {
            self::Info => 'info',
            self::Success => 'circle-check',
            self::Warning => 'triangle-alert',
            self::Danger => 'circle-alert',
        };
    }

    public function containerClasses(): string
    {
        return match ($this) {
            self::Info => 'bg-info-subtle border-info',
            self::Success => 'bg-success-subtle border-success',
            self::Warning => 'bg-warning-subtle border-warning',
            self::Danger => 'bg-danger-subtle border-danger',
        };
    }

    public function iconColor(): string
    {
        return match ($this) {
            self::Info => 'text-info',
            self::Success => 'text-success',
            self::Warning => 'text-warning',
            self::Danger => 'text-danger',
        };
    }

    /**
     * Assertive for danger (interrupts), polite status otherwise (WCAG).
     */
    public function role(): string
    {
        return $this === self::Danger ? 'alert' : 'status';
    }
}
