<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ButtonVariant.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Enums;

enum ButtonVariant: string
{
    case Primary = 'primary';
    case Secondary = 'secondary';
    case Danger = 'danger';
    case Ghost = 'ghost';

    /**
     * Tailwind classes bound to the --kad-* tokens. Extend behaviour by adding a
     * case (Open/Closed), never by editing consumers.
     */
    public function classes(): string
    {
        return match ($this) {
            self::Primary => 'bg-primary text-on-primary hover:bg-primary-hover',
            self::Secondary => 'bg-surface text-text border border-border hover:bg-surface-muted',
            self::Danger => 'bg-danger text-white hover:brightness-95',
            self::Ghost => 'bg-transparent text-text hover:bg-surface-muted',
        };
    }
}
