{{-- Native select (fully keyboard-accessible) with a token-styled chevron. --}}
@aware(['error' => null, 'hint' => null])
@php($describedBy = $describedBy($hint !== null, $error !== null))
<div class="relative" data-test="{{ $name }}-select-wrap">
    <select
        id="{{ $fieldId() }}"
        name="{{ $name }}"
        data-test="{{ $name }}-select"
        @if ($describedBy !== null) aria-describedby="{{ $describedBy }}" @endif
        @if ($error !== null) aria-invalid="true" @endif
        @disabled($disabled)
        @required($required)
        {{ $attributes->merge([
            'class' =>
                'kad-focusable block w-full appearance-none rounded-md border border-border '
                . 'bg-surface text-text shadow-sm min-h-11 pr-10 '
                . 'aria-[invalid=true]:border-danger disabled:opacity-50 '
                . 'disabled:cursor-not-allowed ' . $size->inputClasses(),
        ]) }}
    >
        @if ($placeholder !== null)
            <option value="" disabled @selected($value === null)>{{ $placeholder }}</option>
        @endif
        @foreach ($options as $optionValue => $optionLabel)
            <option value="{{ $optionValue }}" @selected((string) $optionValue === (string) $value)>
                {{ $optionLabel }}
            </option>
        @endforeach
        {{ $slot }}
    </select>
    <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-muted-large">
        <x-kadoorie::icon name="chevron-down" size="sm" />
    </span>
</div>
