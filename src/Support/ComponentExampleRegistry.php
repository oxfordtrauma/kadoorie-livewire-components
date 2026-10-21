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
            ['component' => 'icon', 'title' => 'Available icons', 'snippet' => '@php($sets = \Kadoorie\LivewireComponents\Support\IconCatalog::grouped())
<div data-test="icon-catalog" class="flex flex-col gap-6">
    @foreach ($sets as $set => $names)
        <div data-test="icon-set-{{ $set }}">
            <h3 class="mb-3 text-sm font-semibold capitalize text-text">
                {{ $set }} <span class="font-normal text-text-muted">({{ count($names) }})</span>
            </h3>
            <ul class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                @foreach ($names as $name)
                    <li class="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2">
                        <x-kadoorie::icon :name="$set . \':\' . $name" size="lg" class="shrink-0 text-text" />
                        <code class="truncate text-xs text-text-body">{{ $set }}:{{ $name }}</code>
                    </li>
                @endforeach
            </ul>
        </div>
    @endforeach
</div>'],

            ['component' => 'button', 'title' => 'Variants', 'snippet' => '<div class="flex flex-wrap items-center gap-2"><x-kadoorie::button>Primary</x-kadoorie::button><x-kadoorie::button variant="secondary">Secondary</x-kadoorie::button><x-kadoorie::button variant="danger">Danger</x-kadoorie::button><x-kadoorie::button variant="ghost">Ghost</x-kadoorie::button></div>'],
            ['component' => 'button', 'title' => 'Size scale', 'snippet' => '<div class="flex flex-wrap items-center gap-2"><x-kadoorie::button size="xs">Row action</x-kadoorie::button><x-kadoorie::button size="sm">Small</x-kadoorie::button><x-kadoorie::button>Medium</x-kadoorie::button><x-kadoorie::button size="lg">Large</x-kadoorie::button></div>'],
            ['component' => 'button', 'title' => 'Leading icon', 'snippet' => '<x-kadoorie::button leading-icon="check">Approve request</x-kadoorie::button>'],
            ['component' => 'button', 'title' => 'Trailing icon', 'snippet' => '<x-kadoorie::button trailing-icon="chevron-right">Continue</x-kadoorie::button>'],
            ['component' => 'button', 'title' => 'Danger / loading', 'snippet' => '<x-kadoorie::button variant="danger" :loading="true">Deleting</x-kadoorie::button>'],
            ['component' => 'button', 'title' => 'Disabled', 'snippet' => '<x-kadoorie::button :disabled="true">Unavailable</x-kadoorie::button>'],

            ['component' => 'context-pill', 'title' => 'Static context', 'snippet' => '<x-kadoorie::context-pill label="View" value="Summary" />'],

            ['component' => 'label', 'title' => 'Required', 'snippet' => '<x-kadoorie::label for="email" :required="true">Email</x-kadoorie::label>'],

            ['component' => 'field', 'title' => 'With error', 'snippet' => '<x-kadoorie::field label="Email" name="email" hint="Work address" error="Email is required"><x-kadoorie::input type="email" name="email" /></x-kadoorie::field>'],

            ['component' => 'input', 'title' => 'Email', 'snippet' => '<x-kadoorie::field label="Email" name="email"><x-kadoorie::input type="email" name="email" placeholder="you@example.com" /></x-kadoorie::field>'],

            ['component' => 'textarea', 'title' => 'Notes', 'snippet' => '<x-kadoorie::field label="Notes" name="notes"><x-kadoorie::textarea name="notes" rows="3" /></x-kadoorie::field>'],

            ['component' => 'select', 'title' => 'Roles', 'snippet' => '<x-kadoorie::field label="Role" name="role"><x-kadoorie::select name="role" placeholder="Choose a role" :options="[\'admin\' => \'Admin\', \'editor\' => \'Editor\', \'viewer\' => \'Viewer\']" /></x-kadoorie::field>'],

            ['component' => 'checkbox', 'title' => 'Terms', 'snippet' => '<x-kadoorie::checkbox name="terms" label="I accept the terms" />'],

            ['component' => 'radio', 'title' => 'Plan', 'snippet' => '<div class="flex flex-col gap-2"><x-kadoorie::radio name="plan" value="pro" label="Pro" :checked="true" /><x-kadoorie::radio name="plan" value="team" label="Team" /></div>'],

            ['component' => 'toggle', 'title' => 'Notifications', 'snippet' => '<x-kadoorie::toggle name="notify" label="Email notifications" :checked="true" />'],

            ['component' => 'badge', 'title' => 'Tones', 'snippet' => '<div class="flex flex-wrap gap-2"><x-kadoorie::badge tone="success">Active</x-kadoorie::badge><x-kadoorie::badge tone="warning">Pending</x-kadoorie::badge><x-kadoorie::badge tone="danger" shape="pill">Failed</x-kadoorie::badge></div>'],
            ['component' => 'badge', 'title' => 'Palette', 'snippet' => '<div class="flex flex-wrap gap-2"><x-kadoorie::badge color="neutral">Neutral</x-kadoorie::badge><x-kadoorie::badge color="red">Red</x-kadoorie::badge><x-kadoorie::badge color="pink">Pink</x-kadoorie::badge><x-kadoorie::badge color="purple">Purple</x-kadoorie::badge><x-kadoorie::badge color="green">Green</x-kadoorie::badge><x-kadoorie::badge color="blue">Blue</x-kadoorie::badge><x-kadoorie::badge color="light-blue">Light blue</x-kadoorie::badge><x-kadoorie::badge color="amber">Amber</x-kadoorie::badge></div>'],
            ['component' => 'badge', 'title' => 'Indicators', 'snippet' => '<div class="flex flex-wrap items-center gap-2"><x-kadoorie::badge color="neutral" indicator="none">Text only</x-kadoorie::badge><x-kadoorie::badge color="green" indicator="dot">Active</x-kadoorie::badge><x-kadoorie::badge color="blue" indicator="number" number="7">Tasks</x-kadoorie::badge><x-kadoorie::badge color="purple" indicator="icon">Review</x-kadoorie::badge></div>'],

            ['component' => 'card', 'title' => 'With header', 'snippet' => '<x-kadoorie::card title="Monthly report">Revenue is up 12% on last month.</x-kadoorie::card>'],

            ['component' => 'sidebar', 'title' => 'Composition', 'snippet' => '<x-kadoorie::sidebar><x-slot:actions><x-kadoorie::button size="sm">New section</x-kadoorie::button></x-slot:actions><x-slot:search><x-kadoorie::input name="sidebar-search" placeholder="Search sections" /></x-slot:search><x-slot:sidebar><div class="grid gap-1"><a href="#">Overview</a><a href="#">People</a></div></x-slot:sidebar><x-slot:footer><span class="text-sm text-text-muted">2 sections</span></x-slot:footer><x-kadoorie::card title="Page content">Adjacent content.</x-kadoorie::card></x-kadoorie::sidebar>'],

            ['component' => 'data-table-container', 'title' => 'Table frame', 'snippet' => '<x-kadoorie::data-table-container title="People"><x-slot:icon><x-kadoorie::icon name="kadoorie:table" label="Directory" /></x-slot:icon><x-slot:description>A generic frame for table or directory content.</x-slot:description><x-slot:summary>3 records</x-slot:summary><x-slot:actions><x-kadoorie::button variant="secondary" size="sm">Export</x-kadoorie::button></x-slot:actions><x-slot:toolbar><span class="text-sm text-text-muted">Toolbar content supplied by the application.</span></x-slot:toolbar><x-kadoorie::card>Table or list content.</x-kadoorie::card></x-kadoorie::data-table-container>'],

            ['component' => 'avatar', 'title' => 'Initials + presence', 'snippet' => '<x-kadoorie::avatar alt="Jane Doe" initials="JD" presence="online" size="lg" />'],

            ['component' => 'divider', 'title' => 'Labelled', 'snippet' => '<x-kadoorie::divider>OR</x-kadoorie::divider>'],

            ['component' => 'alert', 'title' => 'Success', 'snippet' => '<x-kadoorie::alert tone="success" title="Saved" :dismissible="true">Your changes were saved.</x-kadoorie::alert>'],
            ['component' => 'alert', 'title' => 'Danger', 'snippet' => '<x-kadoorie::alert tone="danger" title="Payment failed">Please check your card details.</x-kadoorie::alert>'],

            ['component' => 'tooltip', 'title' => 'On a button', 'snippet' => '<x-kadoorie::tooltip text="Copied to clipboard"><x-kadoorie::button variant="ghost">Hover me</x-kadoorie::button></x-kadoorie::tooltip>'],

            ['component' => 'spinner', 'title' => 'Loading', 'snippet' => '<x-kadoorie::spinner label="Loading report" size="lg" class="text-primary" />'],

            ['component' => 'tabs', 'title' => 'Two panels', 'snippet' => '<x-kadoorie::tabs :tabs="[[\'id\' => \'details\', \'label\' => \'Details\'], [\'id\' => \'history\', \'label\' => \'History\']]" id="demo"><x-kadoorie::tab-panel tab="details" group="demo">Detail content.</x-kadoorie::tab-panel><x-kadoorie::tab-panel tab="history" group="demo">History content.</x-kadoorie::tab-panel></x-kadoorie::tabs>'],

            ['component' => 'accordion', 'title' => 'FAQ', 'snippet' => '<x-kadoorie::accordion id="faq"><x-kadoorie::accordion-item id="one" heading="How do I install?" group="faq">Via Composer.</x-kadoorie::accordion-item><x-kadoorie::accordion-item id="two" heading="Is it accessible?" group="faq">Yes, WCAG 2.1 AA.</x-kadoorie::accordion-item></x-kadoorie::accordion>'],
            ['component' => 'accordion', 'title' => 'Multiple open', 'snippet' => '<x-kadoorie::accordion id="specs" :multiple="true"><x-kadoorie::accordion-item id="size" heading="Dimensions" group="specs">100 x 50 cm.</x-kadoorie::accordion-item><x-kadoorie::accordion-item id="weight" heading="Weight" group="specs">2.5 kg.</x-kadoorie::accordion-item></x-kadoorie::accordion>'],

            ['component' => 'wizard', 'title' => 'Multi-step form', 'snippet' => '<x-kadoorie::wizard
    id="signup"
    :steps="[
        [\'id\' => \'account\', \'label\' => \'Account\'],
        [\'id\' => \'profile\', \'label\' => \'Profile\'],
        [\'id\' => \'review\', \'label\' => \'Review\'],
    ]"
>
    <x-kadoorie::wizard-step step="account" group="signup">
        <x-kadoorie::field label="Email" name="wiz-email">
            <x-kadoorie::input type="email" name="wiz-email" placeholder="you@example.com" />
        </x-kadoorie::field>
    </x-kadoorie::wizard-step>
    <x-kadoorie::wizard-step step="profile" group="signup">
        <x-kadoorie::field label="Display name" name="wiz-name">
            <x-kadoorie::input name="wiz-name" />
        </x-kadoorie::field>
    </x-kadoorie::wizard-step>
    <x-kadoorie::wizard-step step="review" group="signup">
        <p>Review your details, then finish.</p>
    </x-kadoorie::wizard-step>
</x-kadoorie::wizard>'],

            ['component' => 'breadcrumbs', 'title' => 'Trail', 'snippet' => '<x-kadoorie::breadcrumbs :items="[[\'label\' => \'Home\', \'url\' => \'#\'], [\'label\' => \'Library\', \'url\' => \'#\'], [\'label\' => \'Buttons\']]" />'],

            ['component' => 'nav', 'title' => 'Top bar', 'snippet' => '<x-kadoorie::nav brand="Kadoorie" :items="[[\'label\' => \'Dashboard\', \'url\' => \'#\', \'active\' => true], [\'label\' => \'Reports\', \'url\' => \'#\'], [\'label\' => \'Settings\', \'url\' => \'#\']]" />'],
            ['component' => 'nav', 'title' => 'Sticky top bar', 'snippet' => '<x-kadoorie::nav brand="Kadoorie" :sticky="true" :items="[[\'label\' => \'Dashboard\', \'url\' => \'#\', \'active\' => true], [\'label\' => \'Reports\', \'url\' => \'#\'], [\'label\' => \'Settings\', \'url\' => \'#\']]" />'],

            ['component' => 'dropdown', 'title' => 'Menu', 'snippet' => '<x-kadoorie::dropdown label="Actions"><x-kadoorie::dropdown-item href="#">Edit</x-kadoorie::dropdown-item><x-kadoorie::dropdown-item href="#">Duplicate</x-kadoorie::dropdown-item><x-kadoorie::dropdown-item>Delete</x-kadoorie::dropdown-item></x-kadoorie::dropdown>'],

            ['component' => 'empty-state', 'title' => 'No results', 'snippet' => '<x-kadoorie::empty-state heading="No results found" description="Try adjusting your filters." />'],

            ['component' => 'profile-menu', 'title' => 'Account menu', 'snippet' => '<x-kadoorie::profile-menu name="Jane Doe" email="jane@example.com" initials="JD" change-details-url="#" logout-url="#" />'],

            ['component' => 'footer', 'title' => 'Site footer', 'snippet' => '<x-kadoorie::footer brand="Kadoorie" tagline="Accessible Livewire components in the Kadoorie style." :columns="[[\'heading\' => \'Product\', \'links\' => [[\'label\' => \'Components\', \'url\' => \'#\'], [\'label\' => \'Showcase\', \'url\' => \'#\']]], [\'heading\' => \'Resources\', \'links\' => [[\'label\' => \'User guide\', \'url\' => \'#\'], [\'label\' => \'Changelog\', \'url\' => \'#\']]], [\'heading\' => \'Company\', \'links\' => [[\'label\' => \'About\', \'url\' => \'#\'], [\'label\' => \'Contact\', \'url\' => \'#\']]]]" copyright="© 2026 Kadoorie" :legal-links="[[\'label\' => \'Privacy\', \'url\' => \'#\'], [\'label\' => \'Terms\', \'url\' => \'#\']]" />'],

            ['component' => 'app-footer', 'title' => 'Application footer', 'snippet' => '<x-kadoorie::app-footer
    organisation="Kadoorie Institute"
    version="Site Version 1.0 · 18Jun2026"
    :links="[
        [\'label\' => \'Help Center\', \'url\' => \'#\'],
        [\'label\' => \'Privacy Policy\', \'url\' => \'#\'],
        [\'label\' => \'REDCap Login\', \'url\' => \'#\'],
        [\'label\' => \'iPassport Login\', \'url\' => \'#\'],
        [\'label\' => \'eTMF Portal\', \'url\' => \'#\'],
        [\'label\' => \'Contact Support\', \'url\' => \'#\'],
    ]"
/>'],

            ['component' => 'icon-button', 'title' => 'Help and pill', 'snippet' => '<div class="flex items-center gap-3"><x-kadoorie::icon-button icon="circle-help" label="Help" variant="pill" /><x-kadoorie::icon-button icon="bell" label="Notifications" variant="pill" /></div>'],

            ['component' => 'select-pill', 'title' => 'Label and value', 'snippet' => '<div class="flex items-center gap-3"><x-kadoorie::select-pill label="Page"><x-kadoorie::dropdown-item href="#">Dashboard</x-kadoorie::dropdown-item><x-kadoorie::dropdown-item href="#">Participants</x-kadoorie::dropdown-item></x-kadoorie::select-pill><x-kadoorie::select-pill label="Role" value="Manager"><x-kadoorie::dropdown-item href="#">Manager</x-kadoorie::dropdown-item><x-kadoorie::dropdown-item href="#">Viewer</x-kadoorie::dropdown-item></x-kadoorie::select-pill></div>'],

            ['component' => 'notification', 'title' => 'Bell with count', 'snippet' => '<div class="flex items-center gap-4"><x-kadoorie::notification :count="3" /><x-kadoorie::notification :count="128" /><x-kadoorie::notification /></div>'],

            ['component' => 'app-header', 'title' => 'Application top bar', 'snippet' => '<x-kadoorie::app-header brand="Kadoorie">
    <x-slot:start>
        <x-kadoorie::select-pill label="Page"><x-kadoorie::dropdown-item href="#">Dashboard</x-kadoorie::dropdown-item><x-kadoorie::dropdown-item href="#">Participants</x-kadoorie::dropdown-item></x-kadoorie::select-pill>
        <x-kadoorie::select-pill label="View As"><x-kadoorie::dropdown-item href="#">Table</x-kadoorie::dropdown-item><x-kadoorie::dropdown-item href="#">Cards</x-kadoorie::dropdown-item></x-kadoorie::select-pill>
    </x-slot:start>

    <x-kadoorie::select-pill label="Trial" value="BigBOSS"><x-kadoorie::dropdown-item href="#">BigBOSS</x-kadoorie::dropdown-item><x-kadoorie::dropdown-item href="#">MiniBOSS</x-kadoorie::dropdown-item></x-kadoorie::select-pill>
    <x-kadoorie::select-pill label="Role" value="Manager"><x-kadoorie::dropdown-item href="#">Manager</x-kadoorie::dropdown-item><x-kadoorie::dropdown-item href="#">Viewer</x-kadoorie::dropdown-item></x-kadoorie::select-pill>
    <x-kadoorie::button>Pull REDCap Data</x-kadoorie::button>
    <x-kadoorie::icon-button icon="circle-help" label="Help" variant="pill" />
    <x-kadoorie::notification :count="3" />
    <x-kadoorie::profile-menu name="User" initials="U" change-details-url="#" logout-url="#" />

    <x-slot:subbar>
        <x-kadoorie::breadcrumbs :items="[[\'label\' => \'Home\', \'url\' => \'#\'], [\'label\' => \'Participants\']]" />
    </x-slot:subbar>
</x-kadoorie::app-header>'],

            ['component' => 'app-layout', 'title' => 'Page shell', 'snippet' => '<x-kadoorie::app-layout>
    <x-slot:header>
        <x-kadoorie::app-header brand="Kadoorie">
            <x-slot:start>
                <x-kadoorie::select-pill label="Page"><x-kadoorie::dropdown-item href="#">Dashboard</x-kadoorie::dropdown-item></x-kadoorie::select-pill>
            </x-slot:start>
            <x-kadoorie::button>Pull REDCap Data</x-kadoorie::button>
            <x-kadoorie::icon-button icon="circle-help" label="Help" variant="pill" />
            <x-kadoorie::notification :count="3" />
            <x-kadoorie::profile-menu name="User" initials="U" change-details-url="#" logout-url="#" />
        </x-kadoorie::app-header>
    </x-slot:header>

    <div class="mx-auto w-full max-w-container p-6">
        <x-kadoorie::card title="Welcome">Your page content goes here.</x-kadoorie::card>
    </div>

    <x-slot:footer>
        <x-kadoorie::app-footer organisation="Kadoorie Institute" version="Site Version 1.0 · 18Jun2026" :links="[[\'label\' => \'Help Center\', \'url\' => \'#\'], [\'label\' => \'REDCap Login\', \'url\' => \'#\']]" />
    </x-slot:footer>
</x-kadoorie::app-layout>'],

            ['component' => 'small-box', 'title' => 'Stat boxes', 'snippet' => '<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><x-kadoorie::small-box tone="primary" value="150" label="New orders" icon="info" url="#" /><x-kadoorie::small-box tone="success" value="53%" label="Bounce rate" icon="circle-check" url="#" /><x-kadoorie::small-box tone="warning" value="44" label="User registrations" icon="triangle-alert" url="#" /><x-kadoorie::small-box tone="danger" value="65" label="Unique visitors" icon="circle-alert" url="#" /></div>'],

            ['component' => 'info-box', 'title' => 'Info boxes', 'snippet' => '<div class="grid gap-4 sm:grid-cols-2"><x-kadoorie::info-box tone="info" icon="info" label="Messages" value="1,410" /><x-kadoorie::info-box tone="success" icon="circle-check" label="Bookmarks" value="410" :progress="70" description="70% increase in 30 days" /></div>'],

            ['component' => 'recipe', 'title' => 'Sign-in card', 'snippet' => '<div class="max-w-sm">
    <x-kadoorie::card title="Sign in">
        <form class="flex flex-col gap-4">
            <x-kadoorie::field label="Email" name="signin-email">
                <x-kadoorie::input type="email" name="signin-email" placeholder="you@example.com" autocomplete="email" />
            </x-kadoorie::field>
            <x-kadoorie::field label="Password" name="signin-password">
                <x-kadoorie::input type="password" name="signin-password" autocomplete="current-password" />
            </x-kadoorie::field>
            <x-kadoorie::checkbox name="signin-remember" label="Remember me" />
            <x-kadoorie::button type="submit" class="w-full">Sign in</x-kadoorie::button>
        </form>
    </x-kadoorie::card>
</div>'],

            ['component' => 'recipe', 'title' => 'Dashboard stat row', 'snippet' => '<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <x-kadoorie::small-box tone="primary" value="1,410" label="Messages" icon="info" url="#" />
    <x-kadoorie::small-box tone="success" value="410" label="Bookmarks" icon="circle-check" url="#" />
    <x-kadoorie::info-box tone="info" icon="info" label="Uploads" value="13,648" />
    <x-kadoorie::info-box tone="warning" icon="triangle-alert" label="Storage" value="72%" :progress="72" description="72% of your quota used" />
</div>'],

            ['component' => 'recipe', 'title' => 'Settings form', 'snippet' => '<x-kadoorie::card title="Profile settings">
    <form class="flex flex-col gap-4">
        <x-kadoorie::field label="Display name" name="settings-name">
            <x-kadoorie::input name="settings-name" value="Jane Doe" />
        </x-kadoorie::field>
        <x-kadoorie::field label="Bio" name="settings-bio" hint="A short description shown on your profile.">
            <x-kadoorie::textarea name="settings-bio" rows="3" />
        </x-kadoorie::field>
        <x-kadoorie::toggle name="settings-notify" label="Email notifications" :checked="true" />
    </form>

    <x-slot:footer>
        <div class="flex justify-end gap-2">
            <x-kadoorie::button variant="ghost">Cancel</x-kadoorie::button>
            <x-kadoorie::button type="submit">Save changes</x-kadoorie::button>
        </div>
    </x-slot:footer>
</x-kadoorie::card>'],

            ['component' => 'recipe', 'title' => 'Destructive confirmation', 'snippet' => '<x-kadoorie::card title="Delete project">
    <x-kadoorie::alert tone="danger" title="This cannot be undone">
        Deleting this project permanently removes all of its data.
    </x-kadoorie::alert>

    <x-slot:footer>
        <div class="flex justify-end gap-2">
            <x-kadoorie::button variant="ghost">Cancel</x-kadoorie::button>
            <x-kadoorie::button variant="danger">Delete project</x-kadoorie::button>
        </div>
    </x-slot:footer>
</x-kadoorie::card>'],

            ['component' => 'recipe', 'title' => 'Empty state with action', 'snippet' => '<x-kadoorie::card>
    <div class="flex flex-col items-center gap-4">
        <x-kadoorie::empty-state heading="No projects yet" description="Create your first project to get started." />
        <x-kadoorie::button>New project</x-kadoorie::button>
    </div>
</x-kadoorie::card>'],

            ['component' => 'validation', 'title' => 'Live validation', 'snippet' => '{{-- Client-side (Alpine) validation. In a Livewire app you would instead use
     #[Validate] rules and :error="$errors->first(...)"; see docs/data-binding.md. --}}
<form
    data-test="validation-form"
    novalidate
    class="flex max-w-sm flex-col gap-4"
    x-data="{
        values: { email: \'\', role: \'\', terms: false },
        errors: { email: \'\', role: \'\', terms: \'\' },
        done: false,
        check(field) {
            if (field === \'email\') { this.errors.email = ! this.values.email ? \'Email is required.\' : ! this.values.email.includes(\'@\') ? \'Enter a valid email address.\' : \'\' }
            if (field === \'role\') { this.errors.role = this.values.role ? \'\' : \'Please choose a role.\' }
            if (field === \'terms\') { this.errors.terms = this.values.terms ? \'\' : \'You must accept the terms.\' }
        },
        submit() { [\'email\', \'role\', \'terms\'].forEach((f) => this.check(f)); this.done = Object.values(this.errors).every((e) => ! e) },
    }"
    x-on:submit.prevent="submit()"
>
    <x-kadoorie::field label="Email" name="signup-email">
        <x-kadoorie::input type="email" name="signup-email" placeholder="you@example.com" x-model="values.email" x-on:blur="check(\'email\')" x-bind:aria-invalid="errors.email ? \'true\' : \'false\'" x-bind:aria-describedby="errors.email ? \'signup-email-error\' : false" />
        <p data-test="signup-email-error" id="signup-email-error" role="alert" x-show="errors.email" x-cloak x-text="errors.email" class="text-xs text-danger"></p>
    </x-kadoorie::field>

    <x-kadoorie::field label="Role" name="signup-role">
        <x-kadoorie::select name="signup-role" placeholder="Choose a role" :options="[\'admin\' => \'Admin\', \'editor\' => \'Editor\', \'viewer\' => \'Viewer\']" x-model="values.role" x-on:change="$nextTick(() => check(\'role\'))" x-bind:aria-invalid="errors.role ? \'true\' : \'false\'" x-bind:aria-describedby="errors.role ? \'signup-role-error\' : false" />
        <p data-test="signup-role-error" id="signup-role-error" role="alert" x-show="errors.role" x-cloak x-text="errors.role" class="text-xs text-danger"></p>
    </x-kadoorie::field>

    <div>
        <x-kadoorie::checkbox name="signup-terms" label="I accept the terms" x-model="values.terms" x-on:change="$nextTick(() => check(\'terms\'))" x-bind:aria-invalid="errors.terms ? \'true\' : \'false\'" x-bind:aria-describedby="errors.terms ? \'signup-terms-error\' : false" />
        <p data-test="signup-terms-error" id="signup-terms-error" role="alert" x-show="errors.terms" x-cloak x-text="errors.terms" class="mt-1 text-xs text-danger"></p>
    </div>

    <div class="flex items-center gap-3">
        <x-kadoorie::button type="submit" data-test="validation-submit">Create account</x-kadoorie::button>
        <p data-test="validation-success" x-show="done" x-cloak role="status" class="text-sm font-medium text-success">Account created.</p>
    </div>
</form>'],

            ['component' => 'validation', 'title' => 'Error states', 'snippet' => '{{-- Any control shows its error accessibly (role="alert" + aria-invalid +
     aria-describedby) when the wrapping field is given an :error. --}}
<div class="flex max-w-sm flex-col gap-4">
    <x-kadoorie::field label="Email" name="v-email" error="Enter a valid email address.">
        <x-kadoorie::input type="email" name="v-email" value="not-an-email" />
    </x-kadoorie::field>
    <x-kadoorie::field label="Bio" name="v-bio" error="Bio is required.">
        <x-kadoorie::textarea name="v-bio" rows="2" />
    </x-kadoorie::field>
    <x-kadoorie::field label="Role" name="v-role" error="Please choose a role.">
        <x-kadoorie::select name="v-role" placeholder="Choose a role" :options="[\'admin\' => \'Admin\', \'editor\' => \'Editor\']" />
    </x-kadoorie::field>
    <x-kadoorie::field label="Accept" name="v-terms" error="You must accept the terms.">
        <x-kadoorie::checkbox name="v-terms" label="I accept the terms" />
    </x-kadoorie::field>
</div>'],

            ['component' => 'pagination', 'title' => 'Windowed', 'snippet' => '@php($paginator = new \Illuminate\Pagination\LengthAwarePaginator(range(1, 10), 95, 10, 4, [\'path\' => \'#\']))' . "\n" . '<x-kadoorie::pagination :paginator="$paginator" />'],

            ['component' => 'error-page', 'title' => '404', 'snippet' => '<x-kadoorie::error-page :status="404" />'],

            ['component' => 'modal', 'title' => 'Dialog', 'snippet' => '<livewire:kadoorie::modal title="Delete item" description="This action cannot be undone." />'],

            ['component' => 'toast', 'title' => 'Region', 'snippet' => '<livewire:kadoorie::toast />'],

            ['component' => 'data-table', 'title' => 'Sortable', 'snippet' => '<livewire:kadoorie::data-table :columns="[[\'field\' => \'name\', \'label\' => \'Name\', \'sortable\' => true], [\'field\' => \'age\', \'label\' => \'Age\', \'sortable\' => true, \'numeric\' => true]]" :rows="[[\'id\' => 1, \'name\' => \'Alice\', \'age\' => 30], [\'id\' => 2, \'name\' => \'Bob\', \'age\' => 25]]" />'],
            ['component' => 'data-table', 'title' => 'Selectable and paginated', 'snippet' => '@php($rows = collect(range(1, 12))->map(fn (int $n): array => [\'id\' => $n, \'name\' => \'User \' . $n, \'age\' => 20 + $n])->all())' . "\n" . '<livewire:kadoorie::data-table :selectable="true" :columns="[[\'field\' => \'name\', \'label\' => \'Name\', \'sortable\' => true], [\'field\' => \'age\', \'label\' => \'Age\', \'sortable\' => true, \'numeric\' => true]]" :rows="$rows" />'],

            ['component' => 'nested-data-table', 'title' => 'Expandable rows', 'snippet' => '<div data-test="nested-data-table" x-data="{ expanded: null }" class="w-full">
    <div class="relative w-full overflow-x-auto rounded-lg border border-border">
        <table class="w-full min-w-max text-left text-sm" data-test="nested-data-table-table">
            <thead class="bg-surface-muted text-xs uppercase tracking-wide text-text-muted">
                <tr>
                    <th scope="col" class="w-10 px-3 py-2"><span class="sr-only">Expand row</span></th>
                    <th scope="col" class="px-3 py-2 font-semibold">Name</th>
                    <th scope="col" class="px-3 py-2 font-semibold">Role</th>
                    <th scope="col" class="px-3 py-2 font-semibold">Status</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-border bg-surface">
                <tr data-test="nested-data-table-row">
                    <td class="px-3 py-2">
                        <button type="button" data-test="nested-data-table-toggle" x-on:click="expanded = expanded === \'ada\' ? null : \'ada\'" x-bind:aria-expanded="expanded === \'ada\' ? \'true\' : \'false\'" x-bind:aria-controls="expanded === \'ada\' ? \'nested-data-table-expanded-ada\' : null" aria-label="Expand Ada Lovelace row" class="kad-focusable inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-text-muted hover:text-text"><span aria-hidden="true" x-text="expanded === \'ada\' ? \'−\' : \'+\'"></span></button>
                    </td>
                    <td class="px-3 py-2 text-text-body">Ada Lovelace</td>
                    <td class="px-3 py-2 text-text-body">Researcher</td>
                    <td class="px-3 py-2 text-text-body"><x-kadoorie::badge tone="success">active</x-kadoorie::badge></td>
                </tr>
                <tr x-show="expanded === \'ada\'" x-cloak data-test="nested-data-table-expanded-row">
                    <td id="nested-data-table-expanded-ada" colspan="4" data-test="nested-data-table-expanded-content" class="bg-surface-muted px-3 py-3 text-text-body">Ada\'s controlled expanded-row details.</td>
                </tr>
                <tr data-test="nested-data-table-row">
                    <td class="px-3 py-2">
                        <button type="button" data-test="nested-data-table-toggle" x-on:click="expanded = expanded === \'linus\' ? null : \'linus\'" x-bind:aria-expanded="expanded === \'linus\' ? \'true\' : \'false\'" x-bind:aria-controls="expanded === \'linus\' ? \'nested-data-table-expanded-linus\' : null" aria-label="Expand Linus Torvalds row" class="kad-focusable inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-text-muted hover:text-text"><span aria-hidden="true" x-text="expanded === \'linus\' ? \'−\' : \'+\'"></span></button>
                    </td>
                    <td class="px-3 py-2 text-text-body">Linus Torvalds</td>
                    <td class="px-3 py-2 text-text-body">Maintainer</td>
                    <td class="px-3 py-2 text-text-body"><x-kadoorie::badge tone="warning">pending</x-kadoorie::badge></td>
                </tr>
                <tr x-show="expanded === \'linus\'" x-cloak data-test="nested-data-table-expanded-row">
                    <td id="nested-data-table-expanded-linus" colspan="4" data-test="nested-data-table-expanded-content" class="bg-surface-muted px-3 py-3 text-text-body">Linus\' controlled expanded-row details.</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>'],

            ['component' => 'login', 'title' => 'Sign in', 'snippet' => '<livewire:kadoorie::pages.login forgot-url="#" />'],
        ];
    }
}
