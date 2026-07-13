{{-- Surface card with a solid tone icon square, a label/value, and an optional
     accessible progress bar. The icon square is decorative (aria-hidden). --}}
<div data-test="info-box" class="flex items-center gap-4 overflow-hidden rounded-lg border border-border bg-surface p-4 shadow-sm">
    <span
        data-test="info-box-icon"
        aria-hidden="true"
        class="flex size-14 shrink-0 items-center justify-center rounded-md {{ $tone->solidClasses() }}"
    >
        <x-kadoorie::icon :name="$icon" size="lg" />
    </span>

    <div class="min-w-0 flex-1">
        <p data-test="info-box-label" class="truncate text-sm text-text-muted">{{ $label }}</p>
        <p data-test="info-box-value" class="kad-nums text-2xl font-bold text-text">{{ $value }}</p>

        @if ($progress !== null)
            <div
                data-test="info-box-progress"
                role="progressbar"
                aria-label="{{ $label }}"
                aria-valuenow="{{ $progress }}"
                aria-valuemin="0"
                aria-valuemax="100"
                class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted"
            >
                <div class="h-full rounded-full bg-primary" style="width: {{ $progress }}%"></div>
            </div>
        @endif

        @if ($description !== null)
            <p data-test="info-box-description" class="mt-1 text-xs text-text-muted">{{ $description }}</p>
        @endif
    </div>
</div>
