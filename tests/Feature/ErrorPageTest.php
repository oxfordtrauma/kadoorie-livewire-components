<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ErrorPageTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders the correct copy for each HTTP status from one component', function (int $code, string $title): void {
    $this->blade('<x-kadoorie::error-page :status="$code" />', ['code' => $code])
        ->assertSee('data-test="kadoorie-error-page"', false)
        ->assertSee((string) $code)
        ->assertSee($title);
})->with([
    [401, 'Authentication required'],
    [403, 'Access denied'],
    [404, 'Page not found'],
    [405, 'Method not allowed'],
    [406, 'Not acceptable'],
    [412, 'Precondition failed'],
    [500, 'Something went wrong'],
    [501, 'Not implemented'],
    [502, 'Bad gateway'],
]);

it('falls back to generic copy for an unmapped status', function (): void {
    $this->blade('<x-kadoorie::error-page :status="418" />')
        ->assertSee('418')
        ->assertSee('Unexpected error');
});

it('allows overriding the title and description', function (): void {
    $this->blade('<x-kadoorie::error-page :status="404" title="Lost" description="Nope" />')
        ->assertSee('Lost')
        ->assertSee('Nope');
});
