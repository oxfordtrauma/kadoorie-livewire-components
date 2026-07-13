<?php

/**
 * Project: Kadoorie Livewire Components
 * File: SmallBox.php
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
use Kadoorie\LivewireComponents\Enums\Tone;

/**
 * AdminLTE-style small-box: a solid tone fill with a large value, a label, a
 * faded decorative icon, and an optional "more info" footer link.
 */
final class SmallBox extends Component
{
    public Tone $tone;

    public function __construct(
        public string $value,
        public string $label,
        public string $icon,
        Tone|string $tone = Tone::Primary,
        public ?string $url = null,
    ) {
        $this->tone = is_string($tone) ? Tone::from($tone) : $tone;
    }

    public function render(): View
    {
        return view('kadoorie::components.small-box');
    }
}
