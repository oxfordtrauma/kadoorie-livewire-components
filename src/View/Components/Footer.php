<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Footer.php
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

/**
 * Configurable site footer: a brand/tagline block, data-driven link columns,
 * and an optional legal bar. Stacks to a single column on mobile.
 */
final class Footer extends Component
{
    /**
     * @param  array<int, array{heading: string, links: array<int, array{label: string, url: string}>}>  $columns
     * @param  array<int, array{label: string, url: string}>  $legalLinks
     */
    public function __construct(
        public string $brand = 'Kadoorie',
        public ?string $tagline = null,
        public array $columns = [],
        public ?string $copyright = null,
        public array $legalLinks = [],
    ) {}

    public function render(): View
    {
        return view('kadoorie::components.footer');
    }
}
