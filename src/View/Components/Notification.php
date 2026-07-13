<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Notification.php
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * Notification bell (icon button) with an optional unread count badge. The
 * count is folded into the button's accessible name; the visible badge is
 * decorative.
 */
final class Notification extends Component
{
    public function __construct(
        public ?int $count = null,
        public string $label = 'Notifications',
    ) {}

    public function hasCount(): bool
    {
        return $this->count !== null && $this->count > 0;
    }

    public function display(): string
    {
        return ($this->count ?? 0) > 99 ? '99+' : (string) ($this->count ?? 0);
    }

    public function accessibleLabel(): string
    {
        return $this->hasCount() ? "{$this->label}, {$this->count} unread" : $this->label;
    }

    public function render(): View
    {
        return view('kadoorie::components.notification');
    }
}
