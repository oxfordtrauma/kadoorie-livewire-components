<label
    for="{{ $for }}"
    data-test="{{ $for }}-label"
    {{ $attributes->merge(['class' => 'inline-flex items-center gap-1 text-sm font-medium text-text']) }}
>
    {{ $slot }}
    @if ($required)
        <span class="text-danger" aria-hidden="true">*</span>
        <span class="sr-only">(required)</span>
    @endif
</label>
