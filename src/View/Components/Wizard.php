<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Wizard.php
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
 * Multi-step wizard: a numbered step indicator, one visible step panel at a
 * time (<x-kadoorie::wizard-step> children keyed by step id), and Back/Next/
 * Finish navigation. Client-side (Alpine) step state; dispatches
 * `wizard-change` on navigation and `wizard-finish` from the last step so a
 * host form or Livewire component can gate and submit.
 */
final class Wizard extends Component
{
    public string $default;

    /**
     * @var array<int, array{id: string, label: string}>
     */
    public array $steps;

    /**
     * @param  array<int, array{id: string, label: string}>  $steps
     */
    public function __construct(
        array $steps,
        ?string $default = null,
        public string $id = 'wizard',
        public string $label = 'Progress',
        public bool $linear = true,
        public string $backLabel = 'Back',
        public string $nextLabel = 'Next',
        public string $finishLabel = 'Finish',
    ) {
        $this->steps = $steps;
        $this->default = $default ?? ($steps[0]['id'] ?? '');
    }

    /**
     * @return array<int, string>
     */
    public function ids(): array
    {
        return array_column($this->steps, 'id');
    }

    public function defaultIndex(): int
    {
        $index = array_search($this->default, $this->ids(), true);

        return $index === false ? 0 : $index;
    }

    public function render(): View
    {
        return view('kadoorie::components.wizard');
    }
}
