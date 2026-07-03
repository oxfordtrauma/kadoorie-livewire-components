<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ErrorPage.php
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
use Kadoorie\LivewireComponents\Enums\HttpErrorStatus;

/**
 * Single parameterised error page (rule 14): one component and one enum cover
 * 401/403/404/405/406/412/500/501/502 plus a generic fallback for any other
 * status. Copy can be overridden per instance.
 */
final class ErrorPage extends Component
{
    public string $title;

    public string $description;

    public function __construct(
        public int $status = 500,
        ?string $title = null,
        ?string $description = null,
    ) {
        $error = HttpErrorStatus::tryFrom($status);

        $this->title = $title ?? $error?->title() ?? 'Unexpected error';
        $this->description = $description
            ?? $error?->description()
            ?? 'Something went wrong. Please try again later.';
    }

    public function render(): View
    {
        return view('kadoorie::components.error-page');
    }
}
