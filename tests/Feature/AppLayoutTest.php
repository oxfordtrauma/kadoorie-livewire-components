<?php

/**
 * Project: Kadoorie Livewire Components
 * File: AppLayoutTest.php
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders the page shell with a skip link, main landmark, and slots', function (): void {
    $this->blade('<x-kadoorie::app-layout><x-slot:header><span>The Header</span></x-slot:header><p>The Body</p><x-slot:footer><span>The Footer</span></x-slot:footer></x-kadoorie::app-layout>')
        ->assertSee('data-test="app-layout"', false)
        ->assertSee('data-test="app-layout-skip-link"', false)
        ->assertSee('id="main-content"', false)
        ->assertSee('The Header')
        ->assertSee('The Body')
        ->assertSee('The Footer');
});
