<?php

/**
 * Project: Kadoorie Livewire Components
 * File: WizardStep.php
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
 * Content panel for a single wizard step. Shown only while its `step` id is the
 * active step of the surrounding <x-kadoorie::wizard>.
 */
final class WizardStep extends Component
{
    public function __construct(
        public string $step,
        public string $group = 'wizard',
    ) {}

    public function render(): View
    {
        return view('kadoorie::components.wizard-step');
    }
}
