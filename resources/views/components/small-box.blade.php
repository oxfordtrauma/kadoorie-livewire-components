{{-- Solid-filled stat box. The tone fill pairs an AA-safe on-colour with the
     value/label text; the oversized icon is decorative (aria-hidden). --}}
<div data-test="small-box" class="relative overflow-hidden rounded-lg shadow-sm {{ $tone->solidClasses() }}">
    <div class="relative p-4">
        <p data-test="small-box-value" class="kad-nums text-3xl font-bold leading-tight">{{ $value }}</p>
        <p data-test="small-box-label" class="text-sm">{{ $label }}</p>
    </div>

    <span
        aria-hidden="true"
        data-test="small-box-icon"
        class="pointer-events-none absolute right-3 top-3 opacity-30"
    >
        <x-kadoorie::icon :name="$icon" size="lg" class="scale-[2.2]" />
    </span>

    @if ($url !== null)
        <a
            href="{{ $url }}"
            data-test="small-box-link"
            class="kad-focusable relative flex min-h-11 items-center justify-center gap-1 bg-black/10 text-xs font-medium hover:bg-black/20"
        >
            More info
            <x-kadoorie::icon name="chevron-right" size="sm" />
        </a>
    @endif
</div>
