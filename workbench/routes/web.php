<?php

/**
 * Project: Kadoorie Livewire Components
 * File: web.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;
use Kadoorie\LivewireComponents\Support\ComponentExampleRegistry;

Route::get('/', static function () {
    $css = dirname(__DIR__, 2) . '/resources/dist/kadoorie.css';

    return view('kadoorie::workbench.gallery', [
        'groups' => ComponentExampleRegistry::grouped(),
        'css' => is_file($css) ? (string) file_get_contents($css) : '',
    ]);
})->name('kadoorie.workbench');

Route::get('/assets/workbench.js', static function (): Response {
    $bundle = dirname(__DIR__, 2) . '/resources/dist/workbench.js';

    return new Response(
        is_file($bundle) ? (string) file_get_contents($bundle) : '',
        Response::HTTP_OK,
        ['Content-Type' => 'application/javascript; charset=utf-8'],
    );
})->name('kadoorie.workbench.js');
