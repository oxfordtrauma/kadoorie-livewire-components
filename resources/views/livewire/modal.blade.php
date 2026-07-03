{{-- Accessible dialog. Focus trapping uses the Alpine Focus plugin (x-trap);
     hosts that need the trap must register @alpinejs/focus. --}}
<div data-test="modal-root">
    @if ($isOpen)
        <div
            class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
            data-test="modal-overlay"
            x-data
            x-trap.noscroll="true"
            @if ($dismissible) x-on:keydown.escape.window="$wire.close()" @endif
        >
            <div
                class="fixed inset-0 bg-black/40"
                aria-hidden="true"
                data-test="modal-backdrop"
                @if ($dismissible) wire:click="close" @endif
            ></div>

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="{{ $this->getId() }}-title"
                @if ($description !== '') aria-describedby="{{ $this->getId() }}-desc" @endif
                data-test="modal-dialog"
                class="relative z-10 w-full max-w-lg rounded-lg bg-surface p-5 shadow-lg"
            >
                <div class="flex items-start justify-between gap-4">
                    <h2
                        id="{{ $this->getId() }}-title"
                        data-test="modal-title"
                        class="text-xl font-semibold text-text"
                    >
                        {{ $title }}
                    </h2>

                    @if ($dismissible)
                        <button
                            type="button"
                            wire:click="close"
                            data-test="modal-close"
                            aria-label="Close dialog"
                            class="kad-focusable -m-1 inline-flex size-11 shrink-0 items-center justify-center rounded-md text-text-muted-large hover:bg-surface-muted"
                        >
                            <x-kadoorie::icon name="x" size="sm" />
                        </button>
                    @endif
                </div>

                @if ($description !== '')
                    <p
                        id="{{ $this->getId() }}-desc"
                        data-test="modal-body"
                        class="mt-3 text-sm text-text-body"
                    >
                        {{ $description }}
                    </p>
                @endif
            </div>
        </div>
    @endif
</div>
