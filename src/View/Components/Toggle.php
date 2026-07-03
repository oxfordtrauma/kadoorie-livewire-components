<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Toggle.php
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
use Kadoorie\LivewireComponents\Concerns\HandlesFieldState;

final class Toggle extends Component
{
    use HandlesFieldState;

    public function __construct(
        public string $name,
        public string $value = '1',
        public ?string $id = null,
        public ?string $label = null,
        public bool $checked = false,
        public bool $disabled = false,
        public bool $required = false,
    ) {}

    public function render(): View
    {
        return view('kadoorie::components.toggle');
    }
}
