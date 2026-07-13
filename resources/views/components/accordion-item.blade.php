<div data-test="accordion-item-{{ $id }}">
    <h3>
        <button
            type="button"
            id="{{ $group }}-header-{{ $id }}"
            aria-controls="{{ $group }}-panel-{{ $id }}"
            data-test="accordion-trigger-{{ $id }}"
            aria-expanded="false"
            x-bind:aria-expanded="isOpen('{{ $id }}') ? 'true' : 'false'"
            x-on:click="toggle('{{ $id }}')"
            class="kad-focusable flex min-h-11 w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-text"
        >
            <span>{{ $heading }}</span>
            <x-kadoorie::icon
                name="chevron-down"
                size="sm"
                class="shrink-0 text-text-muted-large transition-transform"
                x-bind:class="isOpen('{{ $id }}') && 'rotate-180'"
            />
        </button>
    </h3>

    <div
        id="{{ $group }}-panel-{{ $id }}"
        role="region"
        aria-labelledby="{{ $group }}-header-{{ $id }}"
        data-test="accordion-panel-{{ $id }}"
        x-show="isOpen('{{ $id }}')"
        x-cloak
        x-collapse
    >
        <div class="px-4 pb-3 text-sm text-text-body">
            {{ $slot }}
        </div>
    </div>
</div>
