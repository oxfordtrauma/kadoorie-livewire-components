{{-- Alpine reimplementations so a Livewire component's behaviour is visible in
     the static showcase with no server, and with no volatile wire: snapshot ids
     (keeping the committed output deterministic). The real Livewire source is in
     the Code tab. --}}
@switch($component)
    @case('modal')
        <div x-data="{ open: false }">
            <x-kadoorie::button data-test="demo-modal-open" x-on:click="open = true">Open dialog</x-kadoorie::button>

            <div x-show="open" x-cloak data-test="demo-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div class="fixed inset-0 bg-black/40" x-on:click="open = false"></div>
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Demo dialog"
                    x-trap="open"
                    x-on:keydown.escape.window="open = false"
                    class="relative z-10 w-full max-w-md rounded-lg bg-surface p-5 shadow-lg"
                >
                    <h3 class="text-lg font-semibold text-text">Delete item</h3>
                    <p class="mt-2 text-sm text-text-body">An Alpine preview of the Livewire modal's open/close and focus trap.</p>
                    <div class="mt-4 flex justify-end">
                        <x-kadoorie::button variant="ghost" data-test="demo-modal-close" x-on:click="open = false">Close</x-kadoorie::button>
                    </div>
                </div>
            </div>
        </div>
        @break

    @case('toast')
        <div x-data="{ show: false, timer: null, fire() { this.show = true; clearTimeout(this.timer); this.timer = setTimeout(() => this.show = false, 3000) } }">
            <x-kadoorie::button data-test="demo-toast-fire" x-on:click="fire()">Show toast</x-kadoorie::button>

            <div
                x-show="show"
                x-cloak
                data-test="demo-toast"
                role="status"
                class="mt-3 inline-flex items-center gap-2 rounded-md border border-success bg-success-subtle px-3 py-2 text-sm text-text-body"
            >
                <x-kadoorie::icon name="circle-check" size="sm" class="text-success" />
                Saved successfully
            </div>
        </div>
        @break

    @default
        <div data-test="showcase-livewire-note">
            <x-kadoorie::alert tone="info" title="Livewire component">
                This component needs a Livewire runtime to run live. The full source is in the Code tab.
            </x-kadoorie::alert>
        </div>
@endswitch
