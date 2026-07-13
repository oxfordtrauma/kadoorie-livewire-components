{{-- Inherits hint/error state from a wrapping <x-kadoorie::field> via @aware. --}}
@aware(['error' => null, 'hint' => null])
@php($describedBy = $describedBy(filled($hint), filled($error)))
<textarea
    id="{{ $fieldId() }}"
    name="{{ $name }}"
    rows="{{ $rows }}"
    data-test="{{ $name }}-textarea"
    @if ($placeholder !== null) placeholder="{{ $placeholder }}" @endif
    @if ($describedBy !== null) aria-describedby="{{ $describedBy }}" @endif
    @if (filled($error)) aria-invalid="true" @endif
    @disabled($disabled)
    @readonly($readonly)
    @required($required)
    {{ $attributes->merge([
        'class' =>
            'kad-focusable block w-full rounded-md border border-border bg-surface text-text '
            . 'shadow-sm min-h-11 py-2 placeholder:text-text-disabled '
            . 'aria-[invalid=true]:border-danger disabled:opacity-50 disabled:cursor-not-allowed '
            . 'read-only:bg-surface-muted ' . $size->inputClasses(),
    ]) }}
>{{ $value }}</textarea>
