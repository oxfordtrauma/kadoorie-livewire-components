{{-- Reuses the shared Dropdown: a pill-styled trigger (label + chevron, with an
     optional selected value) plus the menu items passed as the default slot. --}}
<x-kadoorie::dropdown
    :align="$align"
    trigger-test="select-pill-trigger"
    trigger-class="kad-focusable inline-flex items-center gap-1.5 rounded-[10px] bg-bg px-3 py-1.5 text-sm hover:bg-surface-muted"
    {{ $attributes->merge(['data-test' => 'select-pill']) }}
>
    <x-slot:trigger>
        <span class="whitespace-nowrap text-text-body">{{ $label }}</span>
        <x-kadoorie::icon name="chevron-down" size="sm" class="text-text-muted-large" />
        @if ($value !== null)
            <span data-test="select-pill-value" class="ml-1 border-l border-text pl-2 font-semibold text-text">
                {{ $value }}
            </span>
        @endif
    </x-slot:trigger>

    {{ $slot }}
</x-kadoorie::dropdown>
