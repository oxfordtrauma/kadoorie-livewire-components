<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ComponentExampleRegistry.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Support;

/**
 * The single source of component examples, consumed by the workbench preview
 * and the static showcase generator so examples are defined exactly once.
 */
final class ComponentExampleRegistry
{
    /**
     * @return array<int, ComponentExample>
     */
    public static function all(): array
    {
        return array_map(
            static fn(array $example): ComponentExample => new ComponentExample(...$example),
            self::definitions(),
        );
    }

    /**
     * Examples grouped by component, preserving definition order.
     *
     * @return array<string, array<int, ComponentExample>>
     */
    public static function grouped(): array
    {
        $grouped = [];

        foreach (self::all() as $example) {
            $grouped[$example->component][] = $example;
        }

        return $grouped;
    }

    /**
     * @return array<int, string>
     */
    public static function components(): array
    {
        return array_keys(self::grouped());
    }

    /**
     * @return array<int, array{component: string, title: string, snippet: string}>
     */
    private static function definitions(): array
    {
        return [
            ['component' => 'icon', 'title' => 'Labelled', 'snippet' => '<x-kadoorie::icon name="circle-check" label="Complete" class="text-success" size="lg" />'],

            ['component' => 'button', 'title' => 'Primary', 'snippet' => '<x-kadoorie::button>Save changes</x-kadoorie::button>'],
            ['component' => 'button', 'title' => 'Danger / loading', 'snippet' => '<x-kadoorie::button variant="danger" :loading="true">Deleting</x-kadoorie::button>'],
            ['component' => 'button', 'title' => 'Ghost', 'snippet' => '<x-kadoorie::button variant="ghost">Cancel</x-kadoorie::button>'],

            ['component' => 'label', 'title' => 'Required', 'snippet' => '<x-kadoorie::label for="email" :required="true">Email</x-kadoorie::label>'],

            ['component' => 'field', 'title' => 'With error', 'snippet' => '<x-kadoorie::field label="Email" name="email" hint="Work address" error="Email is required"><x-kadoorie::input type="email" name="email" /></x-kadoorie::field>'],

            ['component' => 'input', 'title' => 'Email', 'snippet' => '<x-kadoorie::field label="Email" name="email"><x-kadoorie::input type="email" name="email" placeholder="you@example.com" /></x-kadoorie::field>'],

            ['component' => 'textarea', 'title' => 'Notes', 'snippet' => '<x-kadoorie::field label="Notes" name="notes"><x-kadoorie::textarea name="notes" rows="3" /></x-kadoorie::field>'],

            ['component' => 'select', 'title' => 'Roles', 'snippet' => '<x-kadoorie::field label="Role" name="role"><x-kadoorie::select name="role" placeholder="Choose a role" :options="[\'admin\' => \'Admin\', \'editor\' => \'Editor\', \'viewer\' => \'Viewer\']" /></x-kadoorie::field>'],

            ['component' => 'checkbox', 'title' => 'Terms', 'snippet' => '<x-kadoorie::checkbox name="terms" label="I accept the terms" />'],

            ['component' => 'radio', 'title' => 'Plan', 'snippet' => '<div class="flex flex-col gap-2"><x-kadoorie::radio name="plan" value="pro" label="Pro" :checked="true" /><x-kadoorie::radio name="plan" value="team" label="Team" /></div>'],

            ['component' => 'toggle', 'title' => 'Notifications', 'snippet' => '<x-kadoorie::toggle name="notify" label="Email notifications" :checked="true" />'],

            ['component' => 'badge', 'title' => 'Tones', 'snippet' => '<div class="flex flex-wrap gap-2"><x-kadoorie::badge tone="success">Active</x-kadoorie::badge><x-kadoorie::badge tone="warning">Pending</x-kadoorie::badge><x-kadoorie::badge tone="danger" shape="pill">Failed</x-kadoorie::badge></div>'],

            ['component' => 'card', 'title' => 'With header', 'snippet' => '<x-kadoorie::card title="Monthly report">Revenue is up 12% on last month.</x-kadoorie::card>'],

            ['component' => 'avatar', 'title' => 'Initials + presence', 'snippet' => '<x-kadoorie::avatar alt="Jane Doe" initials="JD" presence="online" size="lg" />'],

            ['component' => 'divider', 'title' => 'Labelled', 'snippet' => '<x-kadoorie::divider>OR</x-kadoorie::divider>'],

            ['component' => 'alert', 'title' => 'Success', 'snippet' => '<x-kadoorie::alert tone="success" title="Saved" :dismissible="true">Your changes were saved.</x-kadoorie::alert>'],
            ['component' => 'alert', 'title' => 'Danger', 'snippet' => '<x-kadoorie::alert tone="danger" title="Payment failed">Please check your card details.</x-kadoorie::alert>'],

            ['component' => 'tooltip', 'title' => 'On a button', 'snippet' => '<x-kadoorie::tooltip text="Copied to clipboard"><x-kadoorie::button variant="ghost">Hover me</x-kadoorie::button></x-kadoorie::tooltip>'],

            ['component' => 'spinner', 'title' => 'Loading', 'snippet' => '<x-kadoorie::spinner label="Loading report" size="lg" class="text-primary" />'],

            ['component' => 'tabs', 'title' => 'Two panels', 'snippet' => '<x-kadoorie::tabs :tabs="[[\'id\' => \'details\', \'label\' => \'Details\'], [\'id\' => \'history\', \'label\' => \'History\']]" id="demo"><x-kadoorie::tab-panel tab="details" group="demo">Detail content.</x-kadoorie::tab-panel><x-kadoorie::tab-panel tab="history" group="demo">History content.</x-kadoorie::tab-panel></x-kadoorie::tabs>'],

            ['component' => 'accordion', 'title' => 'FAQ', 'snippet' => '<x-kadoorie::accordion id="faq"><x-kadoorie::accordion-item id="one" heading="How do I install?" group="faq">Via Composer.</x-kadoorie::accordion-item><x-kadoorie::accordion-item id="two" heading="Is it accessible?" group="faq">Yes, WCAG 2.1 AA.</x-kadoorie::accordion-item></x-kadoorie::accordion>'],
            ['component' => 'accordion', 'title' => 'Multiple open', 'snippet' => '<x-kadoorie::accordion id="specs" :multiple="true"><x-kadoorie::accordion-item id="size" heading="Dimensions" group="specs">100 x 50 cm.</x-kadoorie::accordion-item><x-kadoorie::accordion-item id="weight" heading="Weight" group="specs">2.5 kg.</x-kadoorie::accordion-item></x-kadoorie::accordion>'],

            ['component' => 'breadcrumbs', 'title' => 'Trail', 'snippet' => '<x-kadoorie::breadcrumbs :items="[[\'label\' => \'Home\', \'url\' => \'#\'], [\'label\' => \'Library\', \'url\' => \'#\'], [\'label\' => \'Buttons\']]" />'],

            ['component' => 'nav', 'title' => 'Top bar', 'snippet' => '<x-kadoorie::nav brand="Kadoorie" :items="[[\'label\' => \'Dashboard\', \'url\' => \'#\', \'active\' => true], [\'label\' => \'Reports\', \'url\' => \'#\'], [\'label\' => \'Settings\', \'url\' => \'#\']]" />'],
            ['component' => 'nav', 'title' => 'Sticky top bar', 'snippet' => '<x-kadoorie::nav brand="Kadoorie" :sticky="true" :items="[[\'label\' => \'Dashboard\', \'url\' => \'#\', \'active\' => true], [\'label\' => \'Reports\', \'url\' => \'#\'], [\'label\' => \'Settings\', \'url\' => \'#\']]" />'],

            ['component' => 'dropdown', 'title' => 'Menu', 'snippet' => '<x-kadoorie::dropdown label="Actions"><x-kadoorie::dropdown-item href="#">Edit</x-kadoorie::dropdown-item><x-kadoorie::dropdown-item href="#">Duplicate</x-kadoorie::dropdown-item><x-kadoorie::dropdown-item>Delete</x-kadoorie::dropdown-item></x-kadoorie::dropdown>'],

            ['component' => 'empty-state', 'title' => 'No results', 'snippet' => '<x-kadoorie::empty-state heading="No results found" description="Try adjusting your filters." />'],

            ['component' => 'pagination', 'title' => 'Windowed', 'snippet' => '@php($paginator = new \Illuminate\Pagination\LengthAwarePaginator(range(1, 10), 95, 10, 4, [\'path\' => \'#\']))' . "\n" . '<x-kadoorie::pagination :paginator="$paginator" />'],

            ['component' => 'error-page', 'title' => '404', 'snippet' => '<x-kadoorie::error-page :status="404" />'],

            ['component' => 'modal', 'title' => 'Dialog', 'snippet' => '<livewire:kadoorie::modal title="Delete item" description="This action cannot be undone." />'],

            ['component' => 'toast', 'title' => 'Region', 'snippet' => '<livewire:kadoorie::toast />'],

            ['component' => 'data-table', 'title' => 'Sortable', 'snippet' => '<livewire:kadoorie::data-table :columns="[[\'field\' => \'name\', \'label\' => \'Name\', \'sortable\' => true], [\'field\' => \'age\', \'label\' => \'Age\', \'sortable\' => true, \'numeric\' => true]]" :rows="[[\'id\' => 1, \'name\' => \'Alice\', \'age\' => 30], [\'id\' => 2, \'name\' => \'Bob\', \'age\' => 25]]" />'],

            ['component' => 'login', 'title' => 'Sign in', 'snippet' => '<livewire:kadoorie::pages.login />'],
        ];
    }
}
