@if ($paginator->hasPages())
    @php($elements = $window())
    <nav
        role="navigation"
        aria-label="{{ $label }}"
        data-test="pagination"
        {{ $attributes->merge(['class' => 'flex items-center gap-1']) }}
    >
        @if ($paginator->onFirstPage())
            <span
                aria-disabled="true"
                data-test="pagination-prev"
                class="inline-flex min-h-11 min-w-11 cursor-not-allowed items-center justify-center rounded-md px-2 text-text-disabled"
            >
                <x-kadoorie::icon name="chevron-left" size="sm" />
                <span class="sr-only">Previous page</span>
            </span>
        @else
            <a
                href="{{ $paginator->previousPageUrl() }}"
                rel="prev"
                aria-label="Previous page"
                data-test="pagination-prev"
                class="kad-focusable inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-text-body hover:bg-surface-muted"
            >
                <x-kadoorie::icon name="chevron-left" size="sm" />
            </a>
        @endif

        @foreach (['first', 'slider', 'last'] as $segment)
            @if (is_array($elements[$segment]))
                @foreach ($elements[$segment] as $page => $url)
                    @if ($page == $paginator->currentPage())
                        <span
                            aria-current="page"
                            data-test="pagination-page"
                            class="kad-nums inline-flex min-h-11 min-w-11 items-center justify-center rounded-md bg-primary px-2 text-sm font-medium text-on-primary"
                        >
                            {{ $page }}
                        </span>
                    @else
                        <a
                            href="{{ $url }}"
                            aria-label="Go to page {{ $page }}"
                            data-test="pagination-page"
                            class="kad-focusable kad-nums inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-sm text-text-body hover:bg-surface-muted"
                        >
                            {{ $page }}
                        </a>
                    @endif
                @endforeach

                @if ($segment !== 'last' && is_array($elements[$segment === 'first' ? 'slider' : 'last'] ?? null))
                    <span aria-hidden="true" class="px-1 text-text-muted-large">&hellip;</span>
                @endif
            @endif
        @endforeach

        @if ($paginator->hasMorePages())
            <a
                href="{{ $paginator->nextPageUrl() }}"
                rel="next"
                aria-label="Next page"
                data-test="pagination-next"
                class="kad-focusable inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-text-body hover:bg-surface-muted"
            >
                <x-kadoorie::icon name="chevron-right" size="sm" />
            </a>
        @else
            <span
                aria-disabled="true"
                data-test="pagination-next"
                class="inline-flex min-h-11 min-w-11 cursor-not-allowed items-center justify-center rounded-md px-2 text-text-disabled"
            >
                <x-kadoorie::icon name="chevron-right" size="sm" />
                <span class="sr-only">Next page</span>
            </span>
        @endif
    </nav>
@endif
