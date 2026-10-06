<section data-test="data-table-container" {{ $attributes->merge(['class' => 'overflow-hidden rounded-lg border border-border bg-surface shadow-sm']) }}>
    @if ($title !== null || isset($icon) || isset($description) || isset($summary) || isset($actions))
        <header data-test="data-table-container-header" class="flex flex-wrap items-start gap-3 border-b border-border px-4 py-3">
            @isset($icon)<div data-test="data-table-container-icon" class="shrink-0">{{ $icon }}</div>@endisset
            <div class="min-w-0 flex-1">
                @if ($title !== null)<h2 data-test="data-table-container-title" class="text-base font-semibold text-text">{{ $title }}</h2>@endif
                @isset($description)<p data-test="data-table-container-description" class="mt-1 text-sm text-text-muted">{{ $description }}</p>@endisset
                @isset($summary)<div data-test="data-table-container-summary" class="mt-2 text-sm text-text-muted">{{ $summary }}</div>@endisset
            </div>
            @isset($actions)<div data-test="data-table-container-actions" class="flex shrink-0 flex-wrap items-center gap-2">{{ $actions }}</div>@endisset
        </header>
    @endif
    @isset($toolbar)<div data-test="data-table-container-toolbar" class="border-b border-border px-4 py-3">{{ $toolbar }}</div>@endisset
    <div data-test="data-table-container-content" class="min-w-0">{{ $slot }}</div>
</section>
