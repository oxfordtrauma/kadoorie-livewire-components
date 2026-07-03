<div
    data-test="card"
    {{ $attributes->merge(['class' => 'overflow-hidden rounded-lg border border-border bg-surface shadow-sm']) }}
>
    @isset($header)
        <div data-test="card-header" class="border-b border-border px-4 py-3">
            {{ $header }}
        </div>
    @elseif ($title !== null)
        <div data-test="card-header" class="border-b border-border px-4 py-3">
            <h3 class="text-base font-semibold text-text">{{ $title }}</h3>
        </div>
    @endisset

    <div data-test="card-body" class="p-4 text-sm text-text-body">
        {{ $slot }}
    </div>

    @isset($footer)
        <div data-test="card-footer" class="border-t border-border bg-surface-muted px-4 py-3">
            {{ $footer }}
        </div>
    @endisset
</div>
