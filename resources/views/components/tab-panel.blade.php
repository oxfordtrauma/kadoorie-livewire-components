<div
    role="tabpanel"
    id="{{ $group }}-panel-{{ $tab }}"
    aria-labelledby="{{ $group }}-tab-{{ $tab }}"
    data-test="tab-panel-{{ $tab }}"
    tabindex="0"
    x-show="active === '{{ $tab }}'"
    x-cloak
    {{ $attributes->merge(['class' => 'kad-focusable text-sm text-text-body']) }}
>
    {{ $slot }}
</div>
