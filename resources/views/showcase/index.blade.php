<!DOCTYPE html>
<html lang="en">
    <head>
        @include('kadoorie::showcase.partials.head', ['title' => 'Component gallery'])
    </head>
    <body class="bg-bg text-text-body">
        <main id="main-content" class="mx-auto max-w-container px-4 py-8">
            <header class="mb-8">
                <h1 class="text-3xl font-semibold text-text">Kadoorie Components</h1>
                <p class="mt-1 text-sm text-text-muted">
                    A static gallery of every component. Alpine-driven components are interactive;
                    Livewire components show their markup and initial state.
                </p>
            </header>

            <ul
                data-test="showcase-index"
                class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
                @foreach ($components as $component)
                    <li>
                        <a
                            href="{{ $component }}.html"
                            data-test="showcase-link-{{ $component }}"
                            class="kad-focusable flex min-h-11 items-center rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium capitalize text-text hover:bg-surface-muted"
                        >
                            {{ str_replace('-', ' ', $component) }}
                        </a>
                    </li>
                @endforeach
            </ul>
        </main>
        @include('kadoorie::showcase.partials.scripts')
    </body>
</html>
