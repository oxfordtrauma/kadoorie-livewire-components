<?php

/**
 * Project: Kadoorie Livewire Components
 * File: AccordionTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('renders accessible disclosure headers wired to their panels', function (): void {
    $this->blade(
        '<x-kadoorie::accordion id="faq">'
        . '<x-kadoorie::accordion-item id="one" heading="Question one" group="faq">Answer one</x-kadoorie::accordion-item>'
        . '</x-kadoorie::accordion>',
    )
        ->assertSee('data-test="accordion"', false)
        ->assertSee('data-test="accordion-trigger-one"', false)
        ->assertSee('aria-controls="faq-panel-one"', false)
        ->assertSee('aria-expanded="false"', false)
        ->assertSee('Question one');
});

it('marks the panel as a labelled region', function (): void {
    $this->blade(
        '<x-kadoorie::accordion id="faq">'
        . '<x-kadoorie::accordion-item id="one" heading="Question one" group="faq">Answer one</x-kadoorie::accordion-item>'
        . '</x-kadoorie::accordion>',
    )
        ->assertSee('role="region"', false)
        ->assertSee('aria-labelledby="faq-header-one"', false)
        ->assertSee('id="faq-panel-one"', false);
});

it('enables multiple-open mode when requested', function (): void {
    $this->blade('<x-kadoorie::accordion :multiple="true" id="faq" />')
        ->assertSee('multiple: true', false);
});
