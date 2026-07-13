<?php

/**
 * Project: Kadoorie Livewire Components
 * File: AppFooter.php
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
 * Compact application footer: a dark utility bar with a labelled row of
 * external "useful links", an optional organisation/version meta block, and a
 * logo slot that defaults to the Kadoorie brand mark. Stacks on mobile.
 */
final class AppFooter extends Component
{
    /**
     * @param  array<int, array{label: string, url: string, external?: bool}>  $links
     */
    public function __construct(
        public string $label = 'Useful Links:',
        public array $links = [],
        public ?string $organisation = null,
        public ?string $version = null,
        public string $brand = 'Kadoorie',
    ) {}

    public function render(): View
    {
        return view('kadoorie::components.app-footer');
    }
}
