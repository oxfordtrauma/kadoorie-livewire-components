<div
    data-test="{{ $name }}-field"
    {{ $attributes->merge(['class' => 'kad-field flex flex-col gap-1.5']) }}
>
    @if ($label !== null)
        <label
            for="{{ $fieldId() }}"
            data-test="{{ $name }}-label"
            class="inline-flex items-center gap-1 text-sm font-medium text-text"
        >
            {{ $label }}
            @if ($required)
                <span class="text-danger" aria-hidden="true">*</span>
                <span class="sr-only">(required)</span>
            @endif
        </label>
    @endif

    {{ $slot }}

    @if ($hint !== null)
        <p id="{{ $hintId() }}" data-test="{{ $name }}-hint" class="text-xs text-text-muted">
            {{ $hint }}
        </p>
    @endif

    @if ($error !== null)
        <p
            id="{{ $errorId() }}"
            data-test="{{ $name }}-error"
            role="alert"
            class="text-xs text-danger"
        >
            {{ $error }}
        </p>
    @endif
</div>
