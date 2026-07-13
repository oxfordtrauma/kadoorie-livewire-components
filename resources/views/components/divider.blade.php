@if ($isVertical())
    <span
        role="separator"
        aria-orientation="vertical"
        data-test="divider"
        {{ $attributes->merge(['class' => 'inline-block w-px self-stretch bg-border']) }}
    ></span>
@elseif ($slot->isNotEmpty())
    <div
        role="separator"
        aria-orientation="horizontal"
        data-test="divider"
        {{ $attributes->merge(['class' => 'flex items-center gap-3 text-xs text-text-muted']) }}
    >
        <span class="h-px flex-1 bg-border"></span>
        {{ $slot }}
        <span class="h-px flex-1 bg-border"></span>
    </div>
@else
    <hr
        role="separator"
        data-test="divider"
        {{ $attributes->merge(['class' => 'border-0 border-t border-border']) }}
    />
@endif
