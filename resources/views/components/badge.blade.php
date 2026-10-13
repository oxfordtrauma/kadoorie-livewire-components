<span
    data-test="badge"
    {{ $attributes->merge([
        'class' =>
            'inline-flex items-center border font-medium text-text '
            . ($useColor ? $colorClasses() : $tone->containerClasses()) . ' ' . $shape->classes() . ' ' . ($indicator->value === 'number' ? str_replace(['gap-1.5', 'gap-1'], ['gap-1', 'gap-0.5'], $sizeClasses()) : $sizeClasses()),
    ]) }}
>
    @if ($indicator->value === 'icon')
        <span class="{{ $useColor ? $iconClasses() : $tone->iconColor() }}" data-test="badge-icon" aria-hidden="true">
            <x-kadoorie::icon :name="$tone->icon()" size="sm" />
        </span>
    @elseif ($indicator->value === 'dot')
        <span class="size-1.5 shrink-0 rounded-full {{ $useColor ? $indicatorClasses() : $tone->iconColor() }}" data-test="badge-dot" aria-hidden="true"></span>
    @elseif ($indicator->value === 'number')
        <span class="-mx-0.5 min-w-5 text-center font-semibold tabular-nums" data-test="badge-number">{{ $number }}</span>
    @endif
    <span data-test="badge-label">{{ $slot }}</span>
</span>
