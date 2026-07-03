<?php

/**
 * Project: Kadoorie Livewire Components
 * File: kadoorie.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

return [
    /*
     * Blade / Livewire component namespace prefix (e.g. <x-kadoorie::button />).
     */
    'prefix' => 'kadoorie',

    'assets' => [
        /*
         * Whether the package should reference the bundled Inter web font.
         */
        'inter_webfont' => true,
    ],

    'nav' => [
        /*
         * Default sticky behaviour for <x-kadoorie::nav>. The `sticky` prop
         * overrides this per instance.
         */
        'sticky' => false,
    ],

    'login' => [
        /*
         * Optional server-side handler invoked with the validated credentials
         * (email, password, remember). Keeps the password server-side rather
         * than dispatching it to the browser. Accepts an invokable class name
         * or "Class@method" string. When null, the Login component only
         * dispatches a "kadoorie:login-submitted" event (without the password).
         */
        'handler' => null,
    ],
];
