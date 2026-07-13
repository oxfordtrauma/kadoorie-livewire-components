{{-- Horizontal top bar on desktop; below md it collapses behind a hamburger
     into a top dropdown sheet. Focus trapping uses the Alpine Focus plugin. --}}
<nav
    data-test="nav"
    aria-label="Main"
    x-data="{ open: false }"
    x-on:keydown.escape.window="open = false"
    @class([
        'relative w-full border-b border-border bg-surface',
        'sticky top-0 z-40' => $sticky,
    ])
>
    <a
        href="#main-content"
        data-test="nav-skip-link"
        class="sr-only rounded bg-surface px-3 py-2 text-sm font-medium text-primary focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50"
    >
        Skip to content
    </a>

    <div class="mx-auto flex min-h-14 max-w-container items-center justify-between gap-4 px-4">
        <a
            href="{{ $brandUrl }}"
            data-test="nav-brand"
            class="kad-focusable inline-flex items-center gap-2 rounded font-semibold text-text"
        >
            <x-kadoorie::icon name="kadoorie:leaf" size="md" class="text-primary" />
            {{ $brand }}
        </a>

        <ul data-test="nav-menu" class="hidden items-center gap-1 md:flex">
            @foreach ($items as $item)
                <li>
                    <a
                        href="{{ $item['url'] }}"
                        data-test="nav-link"
                        @if (! empty($item['active'])) aria-current="page" @endif
                        @class([
                            'kad-focusable inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium',
                            'bg-primary-subtle text-primary' => ! empty($item['active']),
                            'text-text-body hover:bg-surface-muted' => empty($item['active']),
                        ])
                    >
                        {{ $item['label'] }}
                    </a>
                </li>
            @endforeach
        </ul>

        <button
            type="button"
            data-test="nav-toggle"
            x-ref="toggle"
            aria-controls="nav-sheet"
            aria-expanded="false"
            aria-label="Open menu"
            x-bind:aria-expanded="open ? 'true' : 'false'"
            x-bind:aria-label="open ? 'Close menu' : 'Open menu'"
            x-on:click="open = ! open"
            class="kad-focusable inline-flex size-11 items-center justify-center rounded-md text-text md:hidden"
        >
            <x-kadoorie::icon name="menu" size="md" x-show="! open" />
            <x-kadoorie::icon name="x" size="md" x-show="open" x-cloak />
        </button>
    </div>

    <div
        id="nav-sheet"
        data-test="nav-sheet"
        role="region"
        aria-label="Main menu"
        x-show="open"
        x-cloak
        x-trap="open"
        x-on:click.outside="open = false"
        class="border-t border-border bg-surface md:hidden"
    >
        <ul class="flex flex-col gap-1 px-2 py-2">
            @foreach ($items as $item)
                <li>
                    <a
                        href="{{ $item['url'] }}"
                        data-test="nav-sheet-link"
                        @if (! empty($item['active'])) aria-current="page" @endif
                        @class([
                            'kad-focusable flex min-h-11 items-center rounded-md px-3 text-sm font-medium',
                            'bg-primary-subtle text-primary' => ! empty($item['active']),
                            'text-text-body hover:bg-surface-muted' => empty($item['active']),
                        ])
                    >
                        {{ $item['label'] }}
                    </a>
                </li>
            @endforeach
        </ul>
    </div>
</nav>
