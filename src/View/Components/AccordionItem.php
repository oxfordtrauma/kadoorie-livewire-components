<?php

/**
 * Project: Kadoorie Livewire Components
 * File: AccordionItem.php
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

final class AccordionItem extends Component
{
    public function __construct(
        public string $id,
        public string $heading,
        public string $group = 'accordion',
    ) {}

    public function render(): View
    {
        return view('kadoorie::components.accordion-item');
    }
}
