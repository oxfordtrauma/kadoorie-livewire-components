{{-- Accessible switch: a native checkbox (keyboard + wire:model friendly)
     with role="switch"; the visual track/thumb are driven by peer-checked.
     Alpine keeps aria-checked in sync at runtime. Inherits field state via @aware. --}}
@aware(['error' => null, 'hint' => null])
@php($describedBy = $describedBy($hint !== null, $error !== null))
<label
    data-test="{{ $name }}-toggle-label"
    class="inline-flex min-h-11 cursor-pointer items-center gap-2"
>
    <span class="relative inline-flex shrink-0">
        <input
            type="checkbox"
            role="switch"
            id="{{ $fieldId() }}"
            name="{{ $name }}"
            value="{{ $value }}"
            data-test="{{ $name }}-toggle"
            aria-checked="{{ $checked ? 'true' : 'false' }}"
            x-data
            x-bind:aria-checked="$el.checked ? 'true' : 'false'"
            @checked($checked)
            @disabled($disabled)
            @required($required)
            @if ($describedBy !== null) aria-describedby="{{ $describedBy }}" @endif
            @if ($error !== null) aria-invalid="true" @endif
            class="peer sr-only"
        />
        <span
            aria-hidden="true"
            class="h-6 w-11 rounded-full bg-border-strong transition-colors peer-checked:bg-primary peer-focus-visible:shadow-[var(--kad-ring)] peer-disabled:opacity-50"
        ></span>
        <span
            aria-hidden="true"
            class="absolute left-0.5 top-0.5 size-5 rounded-full bg-surface shadow-sm transition-transform peer-checked:translate-x-5"
        ></span>
    </span>
    @if ($label !== null)
        <span class="text-sm text-text">{{ $label }}</span>
    @endif
</label>
