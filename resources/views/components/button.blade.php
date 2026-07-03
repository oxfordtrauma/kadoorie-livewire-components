<button
    type="{{ $type }}"
    data-test="kadoorie-button"
    @disabled($disabled || $loading)
    aria-busy="{{ $loading ? 'true' : 'false' }}"
    {{ $attributes->merge([
        'class' =>
            'kad-focusable inline-flex items-center justify-center whitespace-nowrap rounded-md '
            . 'font-medium min-h-11 transition select-none disabled:opacity-50 '
            . 'disabled:cursor-not-allowed '
            . $variant->classes() . ' ' . $size->classes(),
    ]) }}
>
    @if ($loading)
        <span data-test="kadoorie-button-spinner" class="kad-spinner" aria-hidden="true"></span>
    @endif
    {{ $slot }}
</button>
