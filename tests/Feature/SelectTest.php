<?php

/**
 * Project: Kadoorie Livewire Components
 * File: SelectTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a native select with options and a test hook', function (): void {
    $this->blade('<x-kadoorie::select name="role" :options="[\'admin\' => \'Admin\', \'user\' => \'User\']" />')
        ->assertSee('data-test="role-select"', false)
        ->assertSee('id="role"', false)
        ->assertSee('<option value="admin"', false)
        ->assertSee('Admin');
});

it('marks the matching option as selected', function (): void {
    $this->blade('<x-kadoorie::select name="role" value="user" :options="[\'admin\' => \'Admin\', \'user\' => \'User\']" />')
        ->assertSee('value="user" selected', false);
});

it('renders a disabled placeholder option', function (): void {
    $this->blade('<x-kadoorie::select name="role" placeholder="Choose..." :options="[]" />')
        ->assertSee('Choose...')
        ->assertSee('disabled', false);
});

it('inherits the field error and wires aria on the select', function (): void {
    $this->blade(
        '<x-kadoorie::field label="Role" error="Required" name="role">'
        . '<x-kadoorie::select name="role" :options="[]" />'
        . '</x-kadoorie::field>',
    )
        ->assertSee('aria-describedby="role-error"', false)
        ->assertSee('aria-invalid="true"', false);
});
