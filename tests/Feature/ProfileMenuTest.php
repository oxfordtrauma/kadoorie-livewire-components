<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ProfileMenuTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders the trigger with the user name and avatar initials', function (): void {
    $this->blade('<x-kadoorie::profile-menu name="Jane Doe" initials="JD" />')
        ->assertSee('data-test="profile-menu-trigger"', false)
        ->assertSee('Jane Doe')
        ->assertSee('JD');
});

it('renders a change-details link when its url is set', function (): void {
    $this->blade('<x-kadoorie::profile-menu name="Jane" change-details-url="/account" />')
        ->assertSee('data-test="profile-menu-change-details"', false)
        ->assertSee('href="/account"', false);
});

it('renders a csrf-protected POST logout form when logoutUrl is set', function (): void {
    $this->blade('<x-kadoorie::profile-menu name="Jane" logout-url="/logout" />')
        ->assertSee('action="/logout"', false)
        ->assertSee('method="POST"', false)
        ->assertSee('name="_token"', false)
        ->assertSee('data-test="profile-menu-logout"', false)
        ->assertSee('type="submit"', false);
});

it('omits the action items when no urls are given', function (): void {
    $this->blade('<x-kadoorie::profile-menu name="Jane" />')
        ->assertDontSee('data-test="profile-menu-change-details"', false)
        ->assertDontSee('data-test="profile-menu-logout"', false);
});
