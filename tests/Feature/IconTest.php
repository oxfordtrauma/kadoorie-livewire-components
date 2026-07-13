<?php

/**
 * Project: Kadoorie Livewire Components
 * File: IconTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a decorative icon as an aria-hidden inline svg', function (): void {
    $this->blade('<x-kadoorie::icon name="check" />')
        ->assertSee('<svg', false)
        ->assertSee('data-test="kadoorie-icon"', false)
        ->assertSee('aria-hidden="true"', false)
        ->assertSee('focusable="false"', false);
});

it('exposes a labelled icon to assistive tech with role img and a title', function (): void {
    $this->blade('<x-kadoorie::icon name="triangle-alert" label="Warning" />')
        ->assertSee('role="img"', false)
        ->assertSee('aria-label="Warning"', false)
        ->assertSee('<title>Warning</title>', false);
});

it('resolves a bespoke Kadoorie icon set via the name prefix', function (): void {
    $this->blade('<x-kadoorie::icon name="kadoorie:leaf" label="Kadoorie" />')
        ->assertSee('<svg', false)
        ->assertSee('role="img"', false);
});

it('sizes the icon from the size token', function (): void {
    $this->blade('<x-kadoorie::icon name="check" size="lg" />')
        ->assertSee('width="24"', false)
        ->assertSee('height="24"', false);
});

it('keeps monochrome line icons themeable via the source currentColor paint', function (): void {
    $this->blade('<x-kadoorie::icon name="check" />')
        ->assertSee('viewBox="0 0 24 24"', false)
        ->assertSee('stroke="currentColor"', false)
        ->assertSee('fill="none"', false);
});

it('renders a self-coloured icon on its own viewBox instead of clipping it', function (): void {
    // The bespoke Figma badge icons are drawn on a 32x32 grid with their own
    // fills; the wrapper must honour that grid rather than force 0 0 24 24.
    $this->blade('<x-kadoorie::icon name="kadoorie:message" />')
        ->assertSee('viewBox="0 0 32 32"', false)
        ->assertDontSee('viewBox="0 0 24 24"', false)
        ->assertSee('fill="#AA1A2D"', false);
});

it('rejects an unknown icon name', function (): void {
    (new Kadoorie\LivewireComponents\View\Components\Icon('does-not-exist'))->inner();
})->throws(InvalidArgumentException::class, 'Unknown Kadoorie icon');

it('rejects an icon reference with unsafe characters', function (): void {
    (new Kadoorie\LivewireComponents\View\Components\Icon('../../etc/passwd'))->inner();
})->throws(InvalidArgumentException::class, 'Invalid Kadoorie icon reference');
