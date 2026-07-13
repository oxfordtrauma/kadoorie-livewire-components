<span
    data-test="avatar"
    {{ $attributes->merge(['class' => 'relative inline-flex shrink-0 ' . $sizeClasses()]) }}
>
    @if ($src !== null)
        <img
            src="{{ $src }}"
            alt="{{ $alt }}"
            data-test="avatar-image"
            class="h-full w-full rounded-full object-cover"
        />
    @else
        <span
            aria-hidden="true"
            data-test="avatar-initials"
            class="flex h-full w-full items-center justify-center rounded-full bg-primary-subtle font-semibold text-primary"
        >
            {{ $initials }}
        </span>
        <span class="sr-only">{{ $alt }}</span>
    @endif

    @if ($presence !== null)
        <span
            aria-hidden="true"
            data-test="avatar-presence"
            class="absolute bottom-0 right-0 block size-1/4 rounded-full ring-2 ring-surface {{ $presenceClasses() }}"
        ></span>
        <span class="sr-only">{{ $presenceLabel() }}</span>
    @endif
</span>
