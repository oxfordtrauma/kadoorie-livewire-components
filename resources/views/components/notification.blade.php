<div data-test="notification" class="relative inline-flex">
    <x-kadoorie::icon-button icon="bell" :label="$accessibleLabel()" variant="pill" {{ $attributes }} />

    @if ($hasCount())
        <span
            data-test="notification-count"
            aria-hidden="true"
            class="pointer-events-none absolute right-0 top-0 inline-flex min-w-4 -translate-y-1/3 translate-x-1/3
                   items-center justify-center rounded-full bg-primary px-1 text-2xs font-semibold leading-4 text-on-primary"
        >{{ $display() }}</span>
    @endif
</div>
