{{-- Tablist with roving tabindex and Arrow/Home/End keyboard support.
     Panels are <x-kadoorie::tab-panel> children nested in this Alpine scope. --}}
<div
    data-test="tabs"
    x-data="{
        active: @js($default),
        ids: @js($ids()),
        focus(id) { this.$refs['tab-' + id]?.focus() },
        go(id) { this.active = id; this.focus(id) },
        next(cur) { this.go(this.ids[(this.ids.indexOf(cur) + 1) % this.ids.length]) },
        prev(cur) { this.go(this.ids[(this.ids.indexOf(cur) - 1 + this.ids.length) % this.ids.length]) },
    }"
    {{ $attributes }}
>
    <div
        role="tablist"
        aria-label="{{ $label }}"
        data-test="tabs-list"
        class="flex gap-1 overflow-x-auto border-b border-border"
    >
        @foreach ($tabs as $tab)
            <button
                type="button"
                role="tab"
                id="{{ $id }}-tab-{{ $tab['id'] }}"
                x-ref="tab-{{ $tab['id'] }}"
                data-test="tab-{{ $tab['id'] }}"
                aria-controls="{{ $id }}-panel-{{ $tab['id'] }}"
                aria-selected="{{ $tab['id'] === $default ? 'true' : 'false' }}"
                tabindex="{{ $tab['id'] === $default ? '0' : '-1' }}"
                x-bind:aria-selected="active === '{{ $tab['id'] }}' ? 'true' : 'false'"
                x-bind:tabindex="active === '{{ $tab['id'] }}' ? '0' : '-1'"
                x-on:click="active = '{{ $tab['id'] }}'"
                x-on:keydown.arrow-right.prevent="next('{{ $tab['id'] }}')"
                x-on:keydown.arrow-left.prevent="prev('{{ $tab['id'] }}')"
                x-on:keydown.home.prevent="go(ids[0])"
                x-on:keydown.end.prevent="go(ids[ids.length - 1])"
                class="kad-focusable -mb-px min-h-11 whitespace-nowrap border-b-2 border-transparent px-3 text-sm font-medium text-text-muted aria-selected:border-primary aria-selected:text-primary"
            >
                {{ $tab['label'] }}
            </button>
        @endforeach
    </div>

    <div data-test="tabs-panels" class="pt-3">
        {{ $slot }}
    </div>
</div>
