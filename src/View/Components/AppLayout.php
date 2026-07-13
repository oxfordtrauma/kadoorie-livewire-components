<?php

/**
 * Project: Kadoorie Livewire Components
 * File: AppLayout.php
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
 * Application page shell: a skip link, a `header` slot, the main content region
 * (default slot, on the app body colour), and a `footer` slot. Provides the
 * document landmarks so a page composes from app-header + content + app-footer.
 */
final class AppLayout extends Component
{
    public function render(): View
    {
        return view('kadoorie::components.app-layout');
    }
}
