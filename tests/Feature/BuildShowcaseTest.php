<?php

/**
 * Project: Kadoorie Livewire Components
 * File: BuildShowcaseTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

use Illuminate\Support\Facades\File;

it('builds a static showcase page for every registered component', function (): void {
    $output = sys_get_temp_dir() . '/kad-showcase-' . uniqid();

    $this->artisan('kadoorie:build-showcase', ['--output' => $output])
        ->assertSuccessful();

    expect($output . '/index.html')->toBeReadableFile()
        ->and($output . '/kadoorie.css')->toBeReadableFile()
        ->and(file_get_contents($output . '/button.html'))->toContain('data-test="kadoorie-button"')
        ->and(file_get_contents($output . '/index.html'))->toContain('data-test="showcase-link-button"');

    File::deleteDirectory($output);
});

it('renders a static note instead of live output for Livewire components', function (): void {
    $output = sys_get_temp_dir() . '/kad-showcase-' . uniqid();

    $this->artisan('kadoorie:build-showcase', ['--output' => $output])->assertSuccessful();

    expect(file_get_contents($output . '/data-table.html'))
        ->toContain('data-test="showcase-livewire-note"');

    File::deleteDirectory($output);
});
