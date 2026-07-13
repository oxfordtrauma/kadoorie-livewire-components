<?php

/**
 * Project: Kadoorie Livewire Components
 * File: AppFooterTest.php
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a dark contentinfo bar with labelled external links and meta', function (): void {
    $links = [
        ['label' => 'Help Center', 'url' => 'https://help.example.com'],
        ['label' => 'REDCap Login', 'url' => 'https://redcap.example.com'],
    ];

    $this->blade(
        '<x-kadoorie::app-footer label="Useful Links:" :links="$links" organisation="Kadoorie Institute" version="Site Version 1.0" />',
        ['links' => $links],
    )
        ->assertSee('role="contentinfo"', false)
        ->assertSee('data-test="app-footer"', false)
        ->assertSee('bg-footer', false)
        ->assertSee('Useful Links:')
        ->assertSee('Help Center')
        ->assertSee('href="https://redcap.example.com"', false)
        ->assertSee('target="_blank"', false)
        ->assertSee('rel="noopener noreferrer"', false)
        ->assertSee('opens in a new tab')
        ->assertSee('Kadoorie Institute')
        ->assertSee('Site Version 1.0');
});

it('renders the brand mark logo by default and omits the meta block when empty', function (): void {
    $this->blade('<x-kadoorie::app-footer brand="Kadoorie" />')
        ->assertSee('data-test="app-footer-logo"', false)
        ->assertSee('Kadoorie')
        ->assertDontSee('data-test="app-footer-meta"', false);
});

it('lets a link opt out of the external new-tab treatment', function (): void {
    $links = [['label' => 'Home', 'url' => '/home', 'external' => false]];

    $this->blade('<x-kadoorie::app-footer :links="$links" />', ['links' => $links])
        ->assertSee('href="/home"', false)
        ->assertDontSee('target="_blank"', false)
        ->assertDontSee('opens in a new tab');
});

it('accepts a custom logo slot in place of the default brand mark', function (): void {
    $this->blade('<x-kadoorie::app-footer><x-slot:logo><img src="/logo.svg" alt="Acme" /></x-slot:logo></x-kadoorie::app-footer>')
        ->assertSee('src="/logo.svg"', false)
        ->assertSee('alt="Acme"', false);
});
