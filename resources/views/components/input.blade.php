{{-- Inherits hint/error state from a wrapping <x-kadoorie::field> via @aware. --}}
@aware(['error' => null, 'hint' => null])
@php($describedBy = $describedBy($hint !== null, $error !== null))
<input
    type="{{ $type }}"
    id="{{ $fieldId() }}"
    name="{{ $name }}"
    data-test="{{ $name }}-input"
    @if ($placeholder !== null) placeholder="{{ $placeholder }}" @endif
    @if ($value !== null) value="{{ $value }}" @endif
    @if ($autocomplete !== null) autocomplete="{{ $autocomplete }}" @endif
    @if ($describedBy !== null) aria-describedby="{{ $describedBy }}" @endif
    @if ($error !== null) aria-invalid="true" @endif
    @disabled($disabled)
    @readonly($readonly)
    @required($required)
    {{ $attributes->merge([
        'class' =>
            'kad-focusable block w-full rounded-md border border-border bg-surface text-text '
            . 'shadow-sm min-h-11 placeholder:text-text-disabled '
            . 'aria-[invalid=true]:border-danger disabled:opacity-50 disabled:cursor-not-allowed '
            . 'read-only:bg-surface-muted ' . $size->inputClasses(),
    ]) }}
/>
