<?php

/**
 * Project: Kadoorie Livewire Components
 * File: FooterTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a contentinfo footer with brand, columns, and legal bar', function (): void {
    $columns = [
        ['heading' => 'Product', 'links' => [['label' => 'Components', 'url' => '/components']]],
    ];
    $legal = [['label' => 'Privacy', 'url' => '/privacy']];

    $this->blade(
        '<x-kadoorie::footer brand="Kadoorie" tagline="Tagline here" :columns="$columns" copyright="© 2026 Kadoorie" :legal-links="$legal" />',
        ['columns' => $columns, 'legal' => $legal],
    )
        ->assertSee('role="contentinfo"', false)
        ->assertSee('data-test="footer"', false)
        ->assertSee('Tagline here')
        ->assertSee('Product')
        ->assertSee('Components')
        ->assertSee('href="/components"', false)
        ->assertSee('© 2026 Kadoorie')
        ->assertSee('Privacy')
        ->assertSee('href="/privacy"', false);
});

it('omits the legal bar when neither copyright nor legal links are given', function (): void {
    $this->blade('<x-kadoorie::footer brand="Kadoorie" />')
        ->assertSee('role="contentinfo"', false)
        ->assertDontSee('data-test="footer-legal"', false);
});
