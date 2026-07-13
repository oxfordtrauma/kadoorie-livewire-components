<div
    role="group"
    id="{{ $group }}-panel-{{ $step }}"
    aria-labelledby="{{ $group }}-step-{{ $step }}"
    data-test="wizard-step-{{ $step }}"
    x-show="ids[current] === '{{ $step }}'"
    x-cloak
    {{ $attributes->merge(['class' => 'text-sm text-text-body']) }}
>
    {{ $slot }}
</div>
