<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Alert.php
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
use Kadoorie\LivewireComponents\Concerns\SupportsSemanticTone;
use Kadoorie\LivewireComponents\Enums\Tone;

final class Alert extends Component
{
    use SupportsSemanticTone;

    public function __construct(
        Tone|string $tone = Tone::Info,
        public ?string $title = null,
        public bool $dismissible = false,
    ) {
        $this->tone = self::toTone($tone);
    }

    public function render(): View
    {
        return view('kadoorie::components.alert');
    }
}
