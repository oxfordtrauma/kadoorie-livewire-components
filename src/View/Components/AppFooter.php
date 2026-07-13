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

use Illuminate\Support\HtmlString;
use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * Compact application footer: a dark utility bar with a labelled row of
 * external "useful links", an optional organisation/version meta block, and
 * the bundled Kadoorie logo lockup. Stacks on mobile.
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
    ) {}

    /**
     * Inline markup for the bundled Kadoorie logo lockup shown at the end of
     * the bar (resources/logos/kadoorieOxfordLogo.svg).
     */
    public function logo(): HtmlString
    {
        $path = dirname(__DIR__, 3) . '/resources/logos/kadoorieOxfordLogo.svg';

        return new HtmlString(is_file($path) ? (string) file_get_contents($path) : '');
    }

    public function render(): View
    {
        return view('kadoorie::components.app-footer');
    }
}
