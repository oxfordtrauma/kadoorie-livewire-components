{{-- Live region persists so screen readers announce toasts as they appear.
     Auto-dismiss pauses on hover; the timer lives in Alpine. --}}
<div
    aria-live="polite"
    aria-atomic="true"
    data-test="toast-region"
    class="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:items-end sm:pr-6"
>
    @if ($visible)
        <div
            data-test="toast"
            role="{{ $this->toneRole() }}"
            x-data="{
                show: true,
                timer: null,
                start() { if ({{ $duration }} > 0) { this.timer = setTimeout(() => { this.show = false; $wire.dismiss() }, {{ $duration }}) } },
                stop() { clearTimeout(this.timer) },
            }"
            x-init="start()"
            x-show="show"
            x-on:mouseenter="stop()"
            x-on:mouseleave="start()"
            class="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-md border p-3 shadow-md {{ $this->toneContainerClasses() }}"
        >
            <span class="mt-0.5 shrink-0 {{ $this->toneIconColor() }}">
                <x-kadoorie::icon :name="$this->toneIcon()" size="sm" />
            </span>
            <p class="flex-1 text-sm text-text-body" data-test="toast-message">{{ $message }}</p>
            <button
                type="button"
                data-test="toast-dismiss"
                aria-label="Dismiss"
                wire:click="dismiss"
                x-on:click="show = false"
                class="kad-focusable -m-1 inline-flex size-11 shrink-0 items-center justify-center rounded-md text-text-muted-large hover:bg-black/5"
            >
                <x-kadoorie::icon name="x" size="sm" />
            </button>
        </div>
    @endif
</div>
