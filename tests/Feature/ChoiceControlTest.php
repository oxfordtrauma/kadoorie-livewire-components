<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ChoiceControlTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders a checkbox with an implicit label association', function (): void {
    $this->blade('<x-kadoorie::checkbox name="terms" label="I agree" />')
        ->assertSee('type="checkbox"', false)
        ->assertSee('id="terms"', false)
        ->assertSee('for="terms"', false)
        ->assertSee('data-test="terms-checkbox"', false)
        ->assertSee('I agree');
});

it('marks a checked checkbox', function (): void {
    $this->blade('<x-kadoorie::checkbox name="terms" :checked="true" />')
        ->assertSee('checked', false);
});

it('renders a radio with a value-scoped unique id', function (): void {
    $this->blade('<x-kadoorie::radio name="plan" value="pro" label="Pro" />')
        ->assertSee('type="radio"', false)
        ->assertSee('id="plan-pro"', false)
        ->assertSee('data-test="plan-radio"', false)
        ->assertSee('Pro');
});

it('shares one view for checkbox and radio (rule 14 DRY)', function (): void {
    $checkbox = new Kadoorie\LivewireComponents\View\Components\Checkbox('a');
    $radio = new Kadoorie\LivewireComponents\View\Components\Radio('b', 'x');

    expect($checkbox->render()->name())->toBe($radio->render()->name())
        ->and($checkbox->type)->toBe('checkbox')
        ->and($radio->type)->toBe('radio');
});
