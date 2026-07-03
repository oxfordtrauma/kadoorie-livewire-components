<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ProfileMenu.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * Avatar dropdown exposing "Change details" and "Log out" actions. It is
 * auth-agnostic: pass URLs (logout renders a POST form with @csrf) or override
 * the logout action through the `logout` slot. It performs no authentication.
 */
final class ProfileMenu extends Component
{
    public function __construct(
        public string $name,
        public ?string $email = null,
        public ?string $src = null,
        public ?string $initials = null,
        public ?string $changeDetailsUrl = null,
        public ?string $logoutUrl = null,
    ) {}

    public function render(): View
    {
        return view('kadoorie::components.profile-menu');
    }
}
