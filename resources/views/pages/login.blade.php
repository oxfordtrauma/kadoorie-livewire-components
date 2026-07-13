<div data-test="login-page" class="flex min-h-dvh items-center justify-center bg-bg p-4">
    <main id="main-content" class="w-full max-w-sm">
        <div class="mb-6 flex flex-col items-center gap-2 text-center">
            <x-kadoorie::icon name="kadoorie:leaf" size="lg" class="text-primary" label="Kadoorie" />
            <h1 class="text-2xl font-semibold text-text" data-test="login-heading">Sign in</h1>
        </div>

        <form wire:submit="submit" data-test="login-form" novalidate class="flex flex-col gap-4">
            <x-kadoorie::field label="Email" name="email" :error="$errors->first('email')">
                <x-kadoorie::input
                    type="email"
                    name="email"
                    wire:model="email"
                    autocomplete="email"
                    required
                />
            </x-kadoorie::field>

            <x-kadoorie::field label="Password" name="password" :error="$errors->first('password')">
                <x-kadoorie::input
                    type="password"
                    name="password"
                    wire:model="password"
                    autocomplete="current-password"
                    required
                />
            </x-kadoorie::field>

            <div class="flex items-center justify-between gap-3">
                <x-kadoorie::checkbox name="remember" wire:model="remember" label="Remember me" />

                @if ($forgotUrl !== null)
                    <a
                        href="{{ $forgotUrl }}"
                        data-test="login-forgot"
                        class="kad-focusable rounded text-sm font-medium text-primary hover:underline"
                    >
                        Forgot password?
                    </a>
                @endif
            </div>

            <x-kadoorie::button type="submit" data-test="login-submit" class="w-full">
                Sign in
            </x-kadoorie::button>
        </form>
    </main>
</div>
