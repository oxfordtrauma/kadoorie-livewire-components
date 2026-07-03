{{-- Hover/focus tooltip. Never traps focus; dismissible with Escape. --}}
<span
    x-data="{ open: false }"
    x-on:mouseenter="open = true"
    x-on:mouseleave="open = false"
    x-on:focusin="open = true"
    x-on:focusout="open = false"
    x-on:keydown.escape="open = false"
    data-test="tooltip-wrap"
    {{ $attributes->merge(['class' => 'relative inline-flex']) }}
>
    <span
        tabindex="0"
        aria-describedby="{{ $id }}"
        data-test="tooltip-trigger"
        class="kad-focusable inline-flex rounded"
    >
        {{ $slot }}
    </span>

    <span
        role="tooltip"
        id="{{ $id }}"
        x-show="open"
        x-cloak
        data-test="tooltip"
        class="pointer-events-none absolute z-50 whitespace-nowrap rounded bg-secondary px-2 py-1 text-xs text-white shadow-md {{ $positionClasses() }}"
    >
        {{ $text }}
    </span>
</span>
