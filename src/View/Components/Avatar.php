<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Avatar.php
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
use Kadoorie\LivewireComponents\Enums\Size;

final class Avatar extends Component
{
    public Size $size;

    public function __construct(
        public string $alt,
        public ?string $src = null,
        public ?string $initials = null,
        public ?string $presence = null,
        Size|string $size = Size::Md,
    ) {
        $this->size = is_string($size) ? Size::from($size) : $size;
    }

    public function sizeClasses(): string
    {
        return match ($this->size) {
            Size::Sm => 'size-8 text-xs',
            Size::Md => 'size-10 text-sm',
            Size::Lg => 'size-12 text-base',
        };
    }

    public function presenceClasses(): string
    {
        return match ($this->presence) {
            'online' => 'bg-success',
            'busy' => 'bg-danger',
            default => 'bg-text-muted-large',
        };
    }

    public function presenceLabel(): string
    {
        return match ($this->presence) {
            'online' => 'Online',
            'busy' => 'Busy',
            default => 'Offline',
        };
    }

    public function render(): View
    {
        return view('kadoorie::components.avatar');
    }
}
