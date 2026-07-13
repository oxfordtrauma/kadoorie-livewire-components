{{-- Multi-step wizard: an ordered step indicator, one visible
     <x-kadoorie::wizard-step> panel at a time, and Back/Next/Finish navigation.
     Client-side (Alpine) step state; dispatches `wizard-change` on navigation
     and `wizard-finish` from the last step so a host form can gate/submit. --}}
<div
    data-test="wizard"
    x-data="{
        current: @js($defaultIndex()),
        ids: @js($ids()),
        linear: @js($linear),
        isFirst() { return this.current === 0 },
        isLast() { return this.current === this.ids.length - 1 },
        canGo(i) { return i >= 0 && i < this.ids.length && (! this.linear || i <= this.current) },
        go(i) { if (this.canGo(i)) { this.current = i; this.changed() } },
        next() {
            if (this.isLast()) { this.$dispatch('wizard-finish', { index: this.current, step: this.ids[this.current] }) }
            else { this.current++; this.changed() }
        },
        prev() { if (! this.isFirst()) { this.current--; this.changed() } },
        changed() {
            this.$dispatch('wizard-change', { index: this.current, step: this.ids[this.current] });
            this.$nextTick(() => this.$refs.panels?.focus());
        },
    }"
    {{ $attributes }}
>
    <ol data-test="wizard-steps" aria-label="{{ $label }}" class="mb-6 flex flex-wrap items-center gap-x-2 gap-y-3">
        @foreach ($steps as $index => $step)
            <li class="flex flex-1 items-center gap-2">
                <button
                    type="button"
                    id="{{ $id }}-step-{{ $step['id'] }}"
                    data-test="wizard-marker-{{ $step['id'] }}"
                    x-bind:aria-current="current === {{ $index }} ? 'step' : false"
                    x-bind:disabled="! canGo({{ $index }})"
                    x-on:click="go({{ $index }})"
                    class="kad-focusable inline-flex min-h-11 items-center gap-2 rounded-md text-left text-sm font-medium disabled:cursor-not-allowed"
                >
                    <span
                        aria-hidden="true"
                        class="inline-flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold"
                        x-bind:class="current > {{ $index }} ? 'border-primary bg-primary text-on-primary' : (current === {{ $index }} ? 'border-primary text-primary' : 'border-border text-text-muted')"
                    >
                        <span x-show="current > {{ $index }}" x-cloak><x-kadoorie::icon name="check" size="sm" /></span>
                        <span x-show="current <= {{ $index }}">{{ $index + 1 }}</span>
                    </span>
                    <span x-bind:class="current === {{ $index }} ? 'text-text' : 'text-text-muted'">{{ $step['label'] }}</span>
                </button>

                @unless ($loop->last)
                    <span aria-hidden="true" class="h-px flex-1 bg-border"></span>
                @endunless
            </li>
        @endforeach
    </ol>

    <div data-test="wizard-panels" x-ref="panels" tabindex="-1" class="kad-focusable">
        {{ $slot }}
    </div>

    <div data-test="wizard-nav" class="mt-6 flex items-center justify-between gap-3">
        <x-kadoorie::button variant="ghost" data-test="wizard-back" x-bind:disabled="isFirst()" x-on:click="prev()">
            {{ $backLabel }}
        </x-kadoorie::button>

        <span data-test="wizard-status" aria-live="polite" class="text-sm text-text-muted">
            Step <span x-text="current + 1"></span> of <span x-text="ids.length"></span>
        </span>

        <x-kadoorie::button data-test="wizard-next" x-on:click="next()">
            <span x-show="! isLast()">{{ $nextLabel }}</span>
            <span x-show="isLast()" x-cloak>{{ $finishLabel }}</span>
        </x-kadoorie::button>
    </div>
</div>
