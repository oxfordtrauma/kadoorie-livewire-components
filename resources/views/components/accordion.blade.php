{{-- Accordion group. Items are <x-kadoorie::accordion-item> children that
     share this Alpine scope (single- or multi-open). --}}
<div
    data-test="accordion"
    x-data="{
        multiple: @js($multiple),
        items: [],
        toggle(id) {
            if (this.multiple) {
                this.items.includes(id) ? (this.items = this.items.filter((i) => i !== id)) : this.items.push(id)
            } else {
                this.items = this.items.includes(id) ? [] : [id]
            }
        },
        isOpen(id) { return this.items.includes(id) },
    }"
    {{ $attributes->merge(['class' => 'divide-y divide-border rounded-lg border border-border']) }}
>
    {{ $slot }}
</div>
