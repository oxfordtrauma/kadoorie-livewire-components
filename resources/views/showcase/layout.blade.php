<!DOCTYPE html>
<html lang="en">
    <head>
        @include('kadoorie::showcase.partials.head', ['title' => $title])
    </head>
    <body class="min-h-dvh bg-bg text-text-body" x-data="{ sidebar: false }">
        <a
            href="#main-content"
            class="sr-only rounded bg-surface px-3 py-2 text-sm font-medium text-primary focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50"
        >
            Skip to content
        </a>

        <header
            data-test="showcase-topbar"
            class="sticky top-0 z-30 flex min-h-14 items-center gap-3 border-b border-border bg-surface px-4"
        >
            <button
                type="button"
                data-test="showcase-sidebar-toggle"
                aria-label="Toggle navigation"
                aria-controls="showcase-sidebar"
                x-bind:aria-expanded="sidebar ? 'true' : 'false'"
                x-on:click="sidebar = ! sidebar"
                class="kad-focusable inline-flex size-11 items-center justify-center rounded-md text-text lg:hidden"
            >
                <x-kadoorie::icon name="menu" size="md" />
            </button>

            <a href="index.html" data-test="showcase-brand" class="flex items-center gap-2 font-semibold text-text">
                <x-kadoorie::icon name="kadoorie:leaf" size="md" class="text-primary" />
                Kadoorie Components
            </a>

            <span class="ml-auto text-xs text-text-muted" data-test="showcase-count">
                {{ count($allComponents) }} components
            </span>
        </header>

        <div class="mx-auto flex max-w-container flex-col lg:flex-row">
            <nav
                id="showcase-sidebar"
                data-test="showcase-sidebar"
                aria-label="Components"
                x-bind:class="{ '!block': sidebar }"
                class="hidden border-b border-border bg-surface p-3 lg:sticky lg:top-14 lg:block lg:max-h-[calc(100dvh-3.5rem)] lg:w-60 lg:shrink-0 lg:self-start lg:overflow-y-auto lg:border-b-0 lg:border-r"
            >
                <a
                    href="index.html"
                    data-test="showcase-nav-dashboard"
                    @class([
                        'kad-focusable flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium',
                        'bg-primary-subtle text-primary' => $current === null,
                        'text-text-body hover:bg-surface-muted' => $current !== null,
                    ])
                >
                    <x-kadoorie::icon name="menu" size="sm" />
                    Dashboard
                </a>

                @foreach ($navigation as $category => $items)
                    <p class="mt-4 px-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
                        {{ $category }}
                    </p>
                    <ul class="mt-1 flex flex-col">
                        @foreach ($items as $item)
                            <li>
                                <a
                                    href="{{ $item }}.html"
                                    data-test="showcase-nav-{{ $item }}"
                                    @if ($item === $current) aria-current="page" @endif
                                    @class([
                                        'kad-focusable flex min-h-11 items-center rounded-md px-3 text-sm capitalize',
                                        'bg-primary-subtle font-medium text-primary' => $item === $current,
                                        'text-text-body hover:bg-surface-muted' => $item !== $current,
                                    ])
                                >
                                    {{ str_replace('-', ' ', $item) }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                @endforeach
            </nav>

            <main id="main-content" class="min-w-0 flex-1 px-4 py-8">
                @if ($current !== null)
                    <x-kadoorie::breadcrumbs
                        class="mb-4"
                        :items="[['label' => 'Dashboard', 'url' => 'index.html'], ['label' => $heading]]"
                    />
                @endif

                @yield('content')
            </main>
        </div>

        @include('kadoorie::showcase.partials.scripts')
    </body>
</html>
