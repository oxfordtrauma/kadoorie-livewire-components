<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Modal.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Livewire;

use Illuminate\Contracts\View\View;
use Livewire\Attributes\On;
use Livewire\Component;

final class Modal extends Component
{
    public bool $isOpen = false;

    public string $title = '';

    public string $description = '';

    public bool $dismissible = true;

    public function mount(
        string $title = '',
        string $description = '',
        bool $dismissible = true,
    ): void {
        $this->title = $title;
        $this->description = $description;
        $this->dismissible = $dismissible;
    }

    #[On('kadoorie-open-modal')]
    public function open(): void
    {
        $this->isOpen = true;
    }

    public function close(): void
    {
        $this->isOpen = false;
    }

    public function render(): View
    {
        return view('kadoorie::livewire.modal');
    }
}
