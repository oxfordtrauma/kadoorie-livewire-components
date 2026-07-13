<?php

/**
 * Project: Kadoorie Livewire Components
 * File: InstallCommandTest.php
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

declare(strict_types=1);

use Illuminate\Support\Facades\File;

it('publishes the React source when --set=react', function (): void {
    $target = sys_get_temp_dir() . '/kad-react-' . uniqid();
    config()->set('kadoorie.react.path', $target);

    $this->artisan('kadoorie:install', ['--set' => 'react', '--force' => true])
        ->assertSuccessful();

    expect($target . '/index.ts')->toBeReadableFile()
        ->and($target . '/lib/cn.ts')->toBeReadableFile()
        ->and($target . '/hooks/useFieldState.ts')->toBeReadableFile();

    File::deleteDirectory($target);
});

it('rejects an invalid --set value', function (): void {
    $this->artisan('kadoorie:install', ['--set' => 'angular'])
        ->assertFailed();
});

it('accepts both sets without error', function (): void {
    $target = sys_get_temp_dir() . '/kad-react-' . uniqid();
    config()->set('kadoorie.react.path', $target);

    $this->artisan('kadoorie:install', ['--set' => 'both', '--force' => true])
        ->assertSuccessful();

    expect($target . '/index.ts')->toBeReadableFile();

    File::deleteDirectory($target);
});

it('publishes the tsconfig and eslint stubs with --with-config', function (): void {
    $target = sys_get_temp_dir() . '/kad-react-' . uniqid();
    config()->set('kadoorie.react.path', $target);

    $tsconfig = base_path('tsconfig.kadoorie.json');
    $eslint = base_path('eslint.kadoorie.cjs');
    File::delete([$tsconfig, $eslint]);

    $this->artisan('kadoorie:install', ['--set' => 'react', '--with-config' => true, '--force' => true])
        ->assertSuccessful();

    expect($tsconfig)->toBeReadableFile()
        ->and($eslint)->toBeReadableFile();

    File::deleteDirectory($target);
    File::delete([$tsconfig, $eslint]);
});

it('does not publish the React config without --with-config when non-interactive', function (): void {
    $target = sys_get_temp_dir() . '/kad-react-' . uniqid();
    config()->set('kadoorie.react.path', $target);

    $tsconfig = base_path('tsconfig.kadoorie.json');
    File::delete($tsconfig);

    $this->artisan('kadoorie:install', ['--set' => 'react', '--force' => true])
        ->assertSuccessful();

    expect(File::exists($tsconfig))->toBeFalse();

    File::deleteDirectory($target);
});
