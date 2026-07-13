<?php

/**
 * Project: Kadoorie Livewire Components
 * File: InfoBox.php
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
 * AdminLTE-style info-box: a surface card with a coloured tone icon square, a
 * label and value, and an optional accessible progress bar and description.
 */
final class InfoBox extends Component
{
    public Tone $tone;

    public function __construct(
        public string $icon,
        public string $label,
        public string $value,
        Tone|string $tone = Tone::Primary,
        public ?int $progress = null,
        public ?string $description = null,
    ) {
        $this->tone = is_string($tone) ? Tone::from($tone) : $tone;
    }

    public function render(): View
    {
        return view('kadoorie::components.info-box');
    }
}
