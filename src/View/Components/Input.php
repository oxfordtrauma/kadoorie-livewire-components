<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Input.php
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
use Kadoorie\LivewireComponents\Enums\Size;

final class Input extends Component
{
    use HandlesFieldState;

    public Size $size;

    public function __construct(
        public string $name,
        public string $type = 'text',
        public ?string $id = null,
        public ?string $placeholder = null,
        public ?string $value = null,
        public ?string $autocomplete = null,
        public bool $disabled = false,
        public bool $readonly = false,
        public bool $required = false,
        Size|string $size = Size::Md,
    ) {
        $this->size = is_string($size) ? Size::from($size) : $size;
    }

    public function render(): View
    {
        return view('kadoorie::components.input');
    }
}
