@php($tag = $href !== null ? 'a' : 'button')
<{{ $tag }}
    role="menuitem"
    @if ($href !== null) href="{{ $href }}" @else type="{{ $type }}" @endif
    {{ $attributes->merge([
        'data-test' => 'dropdown-item',
        'class' =>
            'kad-focusable flex min-h-11 w-full items-center gap-2 rounded px-3 text-left '
            . 'text-sm text-text-body hover:bg-surface-muted',
    ]) }}
>
    {{ $slot }}
</{{ $tag }}>
