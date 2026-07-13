<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Select.php
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

final class Select extends Component
{
    use HandlesFieldState;

    public Size $size;

    /**
     * @param  array<int|string, string>  $options  value => label map
     */
    public function __construct(
        public string $name,
        public array $options = [],
        public ?string $id = null,
        public ?string $value = null,
        public ?string $placeholder = null,
        public bool $disabled = false,
        public bool $required = false,
        Size|string $size = Size::Md,
    ) {
        $this->size = is_string($size) ? Size::from($size) : $size;
    }

    public function render(): View
    {
        return view('kadoorie::components.select');
    }
}
