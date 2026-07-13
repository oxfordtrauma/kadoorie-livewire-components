<div
    data-test="empty-state"
    @if ($status) role="status" @endif
    {{ $attributes->merge(['class' => 'flex flex-col items-center justify-center gap-3 p-8 text-center']) }}
>
    @isset($icon)
        <div class="text-text-muted-large" data-test="empty-state-icon">
            {{ $icon }}
        </div>
    @endisset

    <h3 class="text-base font-semibold text-text" data-test="empty-state-heading">
        {{ $heading }}
    </h3>

    @if ($description !== null)
        <p class="max-w-sm text-sm text-text-muted">{{ $description }}</p>
    @endif

    @isset($action)
        <div class="mt-2" data-test="empty-state-action">
            {{ $action }}
        </div>
    @endisset
</div>
