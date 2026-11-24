<?php

/**
 * Project: Kadoorie Livewire Components
 * File: WizardTest.php
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-11-24
 * Version: 0.1.1
 */

declare(strict_types=1);

it('renders the step indicator, panels, and Back/Next/Finish navigation', function (): void {
    $steps = [
        ['id' => 'account', 'label' => 'Account'],
        ['id' => 'review', 'label' => 'Review'],
    ];

    $this->blade(
        '<x-kadoorie::wizard :steps="$steps" id="signup"><x-kadoorie::wizard-step step="account" group="signup">Account fields</x-kadoorie::wizard-step><x-kadoorie::wizard-step step="review" group="signup">Review</x-kadoorie::wizard-step></x-kadoorie::wizard>',
        ['steps' => $steps],
    )
        ->assertSee('data-test="wizard"', false)
        ->assertSee('data-test="wizard-steps"', false)
        ->assertSee('data-test="wizard-marker-account"', false)
        ->assertSee('data-test="wizard-marker-review"', false)
        ->assertSee('Account')
        ->assertSee('id="signup-step-account"', false)
        ->assertSee('data-test="wizard-back"', false)
        ->assertSee('data-test="wizard-next"', false)
        ->assertSee('data-test="wizard-status"', false)
        ->assertSee('Next')
        ->assertSee('Finish');
});

it('links each step panel to its indicator marker for labelling', function (): void {
    $steps = [['id' => 'account', 'label' => 'Account'], ['id' => 'review', 'label' => 'Review']];

    $this->blade(
        '<x-kadoorie::wizard :steps="$steps" id="signup"><x-kadoorie::wizard-step step="account" group="signup">A</x-kadoorie::wizard-step></x-kadoorie::wizard>',
        ['steps' => $steps],
    )
        ->assertSee('role="group"', false)
        ->assertSee('data-test="wizard-step-account"', false)
        ->assertSee('aria-labelledby="signup-step-account"', false);
});

it('starts on the requested default step', function (): void {
    $steps = [['id' => 'account', 'label' => 'Account'], ['id' => 'review', 'label' => 'Review']];

    $this->blade(
        '<x-kadoorie::wizard :steps="$steps" default="review"><x-kadoorie::wizard-step step="review">B</x-kadoorie::wizard-step></x-kadoorie::wizard>',
        ['steps' => $steps],
    )->assertSee('current: 1', false);
});

it('hands the step to the host in controlled mode', function (): void {
    $steps = [['id' => 'account', 'label' => 'Account'], ['id' => 'review', 'label' => 'Review']];

    $this->blade(
        '<x-kadoorie::wizard :steps="$steps" controlled><x-kadoorie::wizard-step step="account">A</x-kadoorie::wizard-step></x-kadoorie::wizard>',
        ['steps' => $steps],
    )
        ->assertSee('controlled: true', false)
        ->assertSee('x-modelable="current"', false)
        ->assertSee("\$dispatch('wizard-next'", false)
        ->assertSee("\$dispatch('wizard-back'", false)
        ->assertSee("\$dispatch('wizard-go'", false);
});

it('keeps the step in Alpine when not controlled', function (): void {
    $steps = [['id' => 'account', 'label' => 'Account']];

    $this->blade('<x-kadoorie::wizard :steps="$steps" />', ['steps' => $steps])
        ->assertSee('controlled: false', false)
        ->assertDontSee('x-modelable', false);
});
