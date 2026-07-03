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

it('gives Livewire components an Alpine demo or a static note', function (): void {
    $output = sys_get_temp_dir() . '/kad-showcase-' . uniqid();

    $this->artisan('kadoorie:build-showcase', ['--output' => $output])->assertSuccessful();

    // Modal and Toast get a server-free Alpine demo of their behaviour.
    expect(file_get_contents($output . '/modal.html'))->toContain('data-test="demo-modal-open"')
        ->and(file_get_contents($output . '/toast.html'))->toContain('data-test="demo-toast-fire"')
        // Components without a bespoke demo fall back to a static note.
        ->and(file_get_contents($output . '/data-table.html'))->toContain('data-test="showcase-livewire-note"');

    File::deleteDirectory($output);
});

it('renders the admin shell with a categorised sidebar and Preview/Code tabs', function (): void {
    $output = sys_get_temp_dir() . '/kad-showcase-' . uniqid();

    $this->artisan('kadoorie:build-showcase', ['--output' => $output])->assertSuccessful();

    expect(file_get_contents($output . '/button.html'))
        ->toContain('data-test="showcase-sidebar"')
        ->toContain('data-test="showcase-nav-button"')
        ->toContain('data-test="showcase-copy"')
        ->toContain('data-test="showcase-preview"');

    File::deleteDirectory($output);
});
