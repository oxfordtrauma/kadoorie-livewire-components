<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Tabs.php
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

final class Tabs extends Component
{
    public string $default;

    /**
     * @var array<int, array{id: string, label: string}>
     */
    public array $tabs;

    /**
     * @param  array<int, array{id: string, label: string}>  $tabs
     */
    public function __construct(
        array $tabs,
        ?string $default = null,
        public string $id = 'tabs',
        public string $label = 'Tabs',
    ) {
        $this->tabs = $tabs;
        $this->default = $default ?? ($tabs[0]['id'] ?? '');
    }

    /**
     * @return array<int, string>
     */
    public function ids(): array
    {
        return array_column($this->tabs, 'id');
    }

    public function render(): View
    {
        return view('kadoorie::components.tabs');
    }
}
