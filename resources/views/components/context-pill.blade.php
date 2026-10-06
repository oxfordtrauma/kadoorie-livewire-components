<span
    data-test="context-pill"
    {{ $attributes->merge(['class' => 'inline-flex items-center gap-1.5 rounded-[10px] bg-bg px-3 py-1.5 text-sm']) }}
>
    <span data-test="context-pill-label" class="whitespace-nowrap text-text-body">{{ $label }}</span>
    @if ($value !== null)
        <span data-test="context-pill-value" class="border-l border-text pl-1.5 font-semibold text-text">
            {{ $value }}
        </span>
    @endif
</span>
