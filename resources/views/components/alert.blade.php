<div
    role="{{ $toneRole() }}"
    data-test="alert"
    x-data="{ show: true }"
    x-show="show"
    {{ $attributes->merge([
        'class' => 'flex items-start gap-3 rounded-md border p-3 ' . $toneContainerClasses(),
    ]) }}
>
    <span class="mt-0.5 shrink-0 {{ $toneIconColor() }}">
        <x-kadoorie::icon :name="$toneIcon()" size="sm" />
    </span>

    <div class="flex-1 text-sm text-text-body">
        @if ($title !== null)
            <p data-test="alert-title" class="font-semibold text-text">{{ $title }}</p>
        @endif
        <div data-test="alert-body">{{ $slot }}</div>
    </div>

    @if ($dismissible)
        <button
            type="button"
            data-test="alert-dismiss"
            aria-label="Dismiss"
            x-on:click="show = false"
            class="kad-focusable -m-1 inline-flex size-11 shrink-0 items-center justify-center rounded-md text-text-muted-large hover:bg-black/5"
        >
            <x-kadoorie::icon name="x" size="sm" />
        </button>
    @endif
</div>
