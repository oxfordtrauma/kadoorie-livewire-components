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
    // Brand tones for filled widgets (small-box, info-box); not used by Alert/Toast.
    case Primary = 'primary';
    case Secondary = 'secondary';
    case Accent = 'accent';

    public function icon(): string
    {
        return match ($this) {
            self::Info => 'info',
            self::Success => 'circle-check',
            self::Warning => 'triangle-alert',
            self::Danger => 'circle-alert',
            self::Primary, self::Secondary, self::Accent => 'info',
        };
    }

    public function containerClasses(): string
    {
        return match ($this) {
            self::Info => 'bg-info-subtle border-info',
            self::Success => 'bg-success-subtle border-success',
            self::Warning => 'bg-warning-subtle border-warning',
            self::Danger => 'bg-danger-subtle border-danger',
            self::Primary => 'bg-primary-subtle border-primary',
            self::Secondary => 'bg-surface-muted border-secondary',
            self::Accent => 'bg-accent-subtle border-accent',
        };
    }

    public function iconColor(): string
    {
        return match ($this) {
            self::Info => 'text-info',
            self::Success => 'text-success',
            self::Warning => 'text-warning',
            self::Danger => 'text-danger',
            self::Primary => 'text-primary',
            self::Secondary => 'text-secondary',
            self::Accent => 'text-accent',
        };
    }

    /**
     * AA-verified solid fill: a background paired with an on-colour that clears
     * 4.5:1 for label text. Success and danger use darkened `-solid` tokens and
     * warning uses dark text, since white on the default amber/green/red fails.
     */
    public function solidClasses(): string
    {
        return match ($this) {
            self::Primary => 'bg-primary text-on-primary',
            self::Secondary => 'bg-secondary text-white',
            self::Accent => 'bg-accent text-white',
            self::Info => 'bg-info text-white',
            self::Success => 'bg-success-solid text-white',
            self::Warning => 'bg-warning text-text',
            self::Danger => 'bg-danger-solid text-white',
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
