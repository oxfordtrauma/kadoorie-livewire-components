{{-- Avatar dropdown with change-details and logout. Reuses <x-kadoorie::dropdown>
     for the accessible menu (role=menu, arrow-nav, focus return). Auth-agnostic:
     pass a logoutUrl (renders a POST form + @csrf) or override via the `logout`
     slot for wire:click / custom flows. --}}
<x-kadoorie::dropdown
    data-test="profile-menu"
    trigger-test="profile-menu-trigger"
    trigger-class="kad-focusable inline-flex min-h-11 items-center gap-2 rounded-full py-0.5 pl-0.5 pr-2 hover:bg-surface-muted"
>
    <x-slot:trigger>
        <x-kadoorie::avatar :alt="$name" :src="$src" :initials="$initials" size="sm" />
        <span class="hidden text-sm font-medium text-text sm:inline" data-test="profile-menu-name">{{ $name }}</span>
        <x-kadoorie::icon name="chevron-down" size="sm" class="text-text-muted-large" />
    </x-slot:trigger>

    <div data-test="profile-menu-header" class="border-b border-border px-3 py-2">
        <p class="text-sm font-medium text-text">{{ $name }}</p>
        @if ($email !== null)
            <p class="text-xs text-text-muted">{{ $email }}</p>
        @endif
    </div>

    @if ($changeDetailsUrl !== null)
        <x-kadoorie::dropdown-item :href="$changeDetailsUrl" data-test="profile-menu-change-details">
            Change details
        </x-kadoorie::dropdown-item>
    @endif

    @isset($logout)
        {{ $logout }}
    @elseif ($logoutUrl !== null)
        <form method="POST" action="{{ $logoutUrl }}" data-test="profile-menu-logout-form" class="block">
            @csrf
            <x-kadoorie::dropdown-item type="submit" data-test="profile-menu-logout">
                Log out
            </x-kadoorie::dropdown-item>
        </form>
    @endisset
</x-kadoorie::dropdown>
