{{-- Shared checkbox/radio control (rule 14 DRY resolution). Inherits field
     hint/error state via @aware; the wrapping <label> gives an implicit
     association and a 44px touch target. --}}
@aware(['error' => null, 'hint' => null])
@php($describedBy = $describedBy(filled($hint), filled($error)))
@php($controlId = $id ?? ($type === 'radio' ? $name . '-' . \Illuminate\Support\Str::slug($value) : $name))
<label
    for="{{ $controlId }}"
    data-test="{{ $name }}-{{ $type }}-label"
    class="inline-flex min-h-11 cursor-pointer items-center gap-2"
>
    <input
        type="{{ $type }}"
        id="{{ $controlId }}"
        name="{{ $name }}"
        value="{{ $value }}"
        data-test="{{ $name }}-{{ $type }}"
        @checked($checked)
        @disabled($disabled)
        @required($required)
        @if ($describedBy !== null) aria-describedby="{{ $describedBy }}" @endif
        @if (filled($error)) aria-invalid="true" @endif
        {{ $attributes->merge([
            'class' =>
                'kad-focusable size-5 shrink-0 accent-primary border-border '
                . ($type === 'radio' ? 'rounded-full' : 'rounded'),
        ]) }}
    />
    @if ($label !== null)
        <span class="text-sm text-text">{{ $label }}</span>
    @endif
</label>
