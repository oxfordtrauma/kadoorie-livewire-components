<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Login.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Livewire\Pages;

use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\App;
use Livewire\Attributes\Validate;
use Livewire\Component;

/**
 * Auth-agnostic login form. It validates input but never authenticates: the
 * host app either configures a server-side handler (which receives the
 * password server-side) or listens for the dispatched event (password
 * excluded, per the security rules).
 */
final class Login extends Component
{
    #[Validate('required|email')]
    public string $email = '';

    #[Validate('required|string')]
    public string $password = '';

    public bool $remember = false;

    public ?string $forgotUrl = null;

    public function mount(?string $forgotUrl = null): void
    {
        $this->forgotUrl = $forgotUrl;
    }

    public function submit(): void
    {
        /** @var array{email: string, password: string} $credentials */
        $credentials = $this->validate();

        $handler = config('kadoorie.login.handler');

        if ((is_string($handler) && $handler !== '') || is_callable($handler)) {
            App::call($handler, [
                'email' => $credentials['email'],
                'password' => $credentials['password'],
                'remember' => $this->remember,
            ]);

            return;
        }

        // Fallback signal only. The password is intentionally excluded from the
        // browser event; configure a handler to receive it server-side.
        $this->dispatch(
            'kadoorie:login-submitted',
            email: $credentials['email'],
            remember: $this->remember,
        );
    }

    public function render(): View
    {
        return view('kadoorie::pages.login');
    }
}
