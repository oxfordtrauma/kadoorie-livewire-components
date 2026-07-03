<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Toast.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Livewire;

use Illuminate\Contracts\View\View;
use Kadoorie\LivewireComponents\Concerns\SupportsSemanticTone;
use Kadoorie\LivewireComponents\Enums\Tone;
use Livewire\Attributes\On;
use Livewire\Component;

final class Toast extends Component
{
    use SupportsSemanticTone;

    public bool $visible = false;

    public string $message = '';

    public int $duration = 4000;

    public function mount(
        Tone|string $tone = Tone::Info,
        string $message = '',
        int $duration = 4000,
    ): void {
        $this->tone = self::toTone($tone);
        $this->message = $message;
        $this->duration = $duration;
    }

    #[On('kadoorie-toast')]
    public function show(string $message = '', string $tone = 'info'): void
    {
        $this->message = $message;
        $this->tone = self::toTone($tone);
        $this->visible = true;
    }

    public function dismiss(): void
    {
        $this->visible = false;
    }

    public function render(): View
    {
        return view('kadoorie::livewire.toast');
    }
}
