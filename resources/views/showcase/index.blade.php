@extends('kadoorie::showcase.layout')

@section('content')
    <header class="mb-6">
        <h1 data-test="showcase-heading" class="text-3xl font-semibold text-text">Component dashboard</h1>
        <p class="mt-1 text-sm text-text-muted">
            A live gallery of every Kadoorie component — the shell, widgets, and previews are built
            from the components themselves.
        </p>
    </header>

    <div class="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-test="showcase-hero">
        <x-kadoorie::small-box tone="primary" value="{{ count($allComponents) }}" label="Components" icon="menu" />
        <x-kadoorie::small-box tone="success" value="AA" label="WCAG 2.1" icon="circle-check" />
        <x-kadoorie::small-box tone="info" value="3" label="Livewire" icon="info" />
        <x-kadoorie::small-box tone="warning" value="3" label="Viewports" icon="triangle-alert" />
    </div>

    <div class="mb-8 grid gap-4 sm:grid-cols-2">
        <x-kadoorie::info-box tone="primary" icon="circle-check" label="Test coverage" value="3 layers" description="Pest feature, Playwright functional, and WCAG axe." />
        <x-kadoorie::info-box tone="accent" icon="info" label="Theming" value="Design tokens" :progress="100" description="Override any --kad-* token to retheme." />
    </div>

    @foreach ($navigation as $category => $items)
        <section class="mb-6" data-test="showcase-category">
            <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-text-muted">{{ $category }}</h2>
            <ul data-test="showcase-index" class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                @foreach ($items as $component)
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
        </section>
    @endforeach
@endsection
