<span
    data-test="badge"
    {{ $attributes->merge([
        'class' =>
            'inline-flex items-center border font-medium text-text '
            . $tone->containerClasses() . ' ' . $shape->classes() . ' ' . $sizeClasses(),
    ]) }}
>
    @if ($icon)
        <span class="{{ $tone->iconColor() }}" data-test="badge-icon">
            <x-kadoorie::icon :name="$tone->icon()" size="sm" />
        </span>
    @endif
    <span data-test="badge-label">{{ $slot }}</span>
</span>
