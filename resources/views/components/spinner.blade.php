<span
    role="status"
    data-test="spinner"
    {{ $attributes->merge(['class' => 'inline-flex items-center text-current']) }}
>
    <span class="kad-spinner {{ $diameterClass() }}" aria-hidden="true"></span>
    <span class="sr-only">{{ $label }}</span>
</span>
