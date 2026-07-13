<button
    type="{{ $type }}"
    aria-label="{{ $label }}"
    {{ $attributes->merge([
        'data-test' => 'icon-button',
        'class' => 'kad-focusable relative inline-flex size-9 shrink-0 items-center justify-center '
            . 'transition disabled:opacity-50 disabled:cursor-not-allowed ' . $variantClasses(),
    ]) }}
>
    <x-kadoorie::icon :name="$icon" size="md" />
    {{ $slot }}
</button>
