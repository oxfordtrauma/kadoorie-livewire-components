<?php

/**
 * Project: Kadoorie Livewire Components
 * File: SupportsSemanticTone.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Concerns;

use Kadoorie\LivewireComponents\Enums\Tone;

/**
 * Shared semantic tone wiring for Alert and Toast (rule 14). The icon, colour,
 * and live-region role all derive from a single Tone, so the two components
 * never duplicate the mapping.
 */
trait SupportsSemanticTone
{
    public Tone $tone;

    public function toneIcon(): string
    {
        return $this->tone->icon();
    }

    public function toneContainerClasses(): string
    {
        return $this->tone->containerClasses();
    }

    public function toneIconColor(): string
    {
        return $this->tone->iconColor();
    }

    public function toneRole(): string
    {
        return $this->tone->role();
    }

    protected static function toTone(Tone|string $tone): Tone
    {
        return is_string($tone) ? Tone::from($tone) : $tone;
    }
}
