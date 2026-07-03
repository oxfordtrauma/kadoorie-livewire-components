{{-- Alpine menu. Arrow-key roving and focus return use the Alpine Focus plugin. --}}
<div
    data-test="dropdown"
    x-data="{ open: false }"
    x-on:keydown.escape="open = false"
    {{ $attributes->merge(['class' => 'relative inline-block text-left']) }}
>
    <button
        type="button"
        x-ref="trigger"
        data-test="dropdown-trigger"
        aria-haspopup="true"
        aria-expanded="false"
        x-bind:aria-expanded="open ? 'true' : 'false'"
        x-on:click="open = ! open; if (open) $nextTick(() => $focus.within($refs.menu).first())"
        class="kad-focusable inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-sm font-medium text-text hover:bg-surface-muted"
    >
        @isset($trigger)
            {{ $trigger }}
        @else
            {{ $label }}
            <x-kadoorie::icon name="chevron-down" size="sm" class="text-text-muted-large" />
        @endisset
    </button>

    <div
        x-ref="menu"
        role="menu"
        data-test="dropdown-menu"
        x-show="open"
        x-cloak
        x-trap="open"
        x-on:click.outside="open = false"
        x-on:keydown.down.prevent="$focus.wrap().next()"
        x-on:keydown.up.prevent="$focus.wrap().previous()"
        class="absolute z-50 mt-1 min-w-44 rounded-md border border-border bg-surface p-1 shadow-lg {{ $alignClasses() }}"
    >
        {{ $slot }}
    </div>
</div>
