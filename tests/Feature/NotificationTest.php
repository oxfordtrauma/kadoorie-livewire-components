<?php

/**
 * Project: Kadoorie Livewire Components
 * File: NotificationTest.php
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a bell with the unread count folded into the accessible name', function (): void {
    $this->blade('<x-kadoorie::notification :count="3" />')
        ->assertSee('data-test="notification"', false)
        ->assertSee('data-test="notification-count"', false)
        ->assertSee('aria-label="Notifications, 3 unread"', false);
});

it('omits the badge when there is no unread count', function (): void {
    $this->blade('<x-kadoorie::notification />')
        ->assertSee('aria-label="Notifications"', false)
        ->assertDontSee('data-test="notification-count"', false);
});

it('caps the displayed count at 99+', function (): void {
    $this->blade('<x-kadoorie::notification :count="150" />')
        ->assertSee('99+');
});
