{{-- Application top bar. Logo (left), an optional contextual selector area
     (`start` slot), a right-aligned actions area (default slot), and an
     optional second row (`subbar` slot). --}}
<header data-test="app-header" class="w-full border-b border-stroke bg-surface shadow-sm">
    <div class="flex items-center gap-4 px-4 py-2">
        <div data-test="app-header-logo" class="flex shrink-0 items-center gap-2 font-semibold text-text">
            @isset($logo)
                {{ $logo }}
            @else
                <x-kadoorie::icon name="kadoorie:mark" size="md" class="text-primary" />
                {{ $brand }}
            @endisset
        </div>

        @isset($start)
            <x-kadoorie::divider orientation="vertical" class="h-6 bg-stroke" />
            <div data-test="app-header-start" class="flex items-center gap-3">
                {{ $start }}
            </div>
        @endisset

        <div data-test="app-header-actions" class="ml-auto flex items-center gap-3">
            {{ $slot }}
        </div>
    </div>

    @isset($subbar)
        <div data-test="app-header-subbar" class="border-t border-stroke px-5 py-2">
            {{ $subbar }}
        </div>
    @endisset
</header>
