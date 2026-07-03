<?php

/**
 * Project: Kadoorie Livewire Components
 * File: LoginTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

use Kadoorie\LivewireComponents\Livewire\Pages\Login;
use Livewire\Livewire;

it('renders a semantic login page with a form and heading', function (): void {
    Livewire::test(Login::class)
        ->assertSeeHtml('data-test="login-form"')
        ->assertSeeHtml('data-test="login-heading"')
        ->assertSeeHtml('id="main-content"')
        ->assertSee('Sign in');
});

it('validates the email and password before submitting', function (): void {
    Livewire::test(Login::class)
        ->set('email', 'not-an-email')
        ->set('password', '')
        ->call('submit')
        ->assertHasErrors(['email' => 'email', 'password' => 'required']);
});

it('dispatches a login event without the password when no handler is configured', function (): void {
    Livewire::test(Login::class)
        ->set('email', 'user@example.com')
        ->set('password', 'secret-password')
        ->set('remember', true)
        ->call('submit')
        ->assertHasNoErrors()
        ->assertDispatched('kadoorie:login-submitted', email: 'user@example.com', remember: true);
});

it('invokes a configured server-side handler with the credentials', function (): void {
    $captured = [];

    config()->set('kadoorie.login.handler', function (string $email, string $password, bool $remember) use (&$captured): void {
        $captured = compact('email', 'password', 'remember');
    });

    Livewire::test(Login::class)
        ->set('email', 'user@example.com')
        ->set('password', 'secret-password')
        ->call('submit')
        ->assertNotDispatched('kadoorie:login-submitted');

    expect($captured)->toBe([
        'email' => 'user@example.com',
        'password' => 'secret-password',
        'remember' => false,
    ]);
});

it('renders a forgot-password link only when a url is provided', function (): void {
    Livewire::test(Login::class, ['forgotUrl' => '/forgot'])
        ->assertSeeHtml('data-test="login-forgot"')
        ->assertSeeHtml('href="/forgot"');

    Livewire::test(Login::class)
        ->assertDontSeeHtml('data-test="login-forgot"');
});
