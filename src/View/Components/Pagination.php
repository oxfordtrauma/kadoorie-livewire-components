<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Pagination.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\View\Components;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\UrlWindow;
use Illuminate\View\Component;
use Illuminate\View\View;

final class Pagination extends Component
{
    /**
     * @param  \Illuminate\Contracts\Pagination\LengthAwarePaginator<int, mixed>  $paginator
     */
    public function __construct(
        public LengthAwarePaginator $paginator,
        public string $label = 'Pagination',
    ) {}

    /**
     * The first / slider / last page segments (page => url), with nulls where a
     * segment is absent. Ellipses are rendered between present segments.
     *
     * @return array<string, array<int, string>|null>
     */
    public function window(): array
    {
        /** @var array<string, array<int, string>|null> $window */
        $window = UrlWindow::make($this->paginator);

        return $window;
    }

    public function render(): View
    {
        return view('kadoorie::components.pagination');
    }
}
