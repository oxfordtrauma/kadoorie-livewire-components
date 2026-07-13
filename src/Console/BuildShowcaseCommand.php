<?php

/**
 * Project: Kadoorie Livewire Components
 * File: BuildShowcaseCommand.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Kadoorie\LivewireComponents\Support\ComponentExampleRegistry;

final class BuildShowcaseCommand extends Command
{
    protected $signature = 'kadoorie:build-showcase {--output=docs/showcase}';

    protected $description = 'Render every registered component example to static HTML.';

    /**
     * Sidebar grouping for the admin-shell navigation. Any registered component
     * not listed here falls through to an "Other" group, so this never drops a
     * component from the sidebar.
     *
     * @var array<string, array<int, string>>
     */
    private const CATEGORIES = [
        'Forms' => ['label', 'field', 'input', 'textarea', 'select', 'checkbox', 'radio', 'toggle', 'validation'],
        'Actions' => ['button', 'icon-button', 'dropdown', 'select-pill', 'notification', 'profile-menu'],
        'Feedback' => ['alert', 'toast', 'tooltip', 'spinner', 'modal'],
        'Navigation' => ['nav', 'breadcrumbs', 'tabs', 'accordion', 'wizard', 'pagination'],
        'Data display' => ['badge', 'card', 'avatar', 'divider', 'data-table', 'empty-state'],
        'Widgets' => ['small-box', 'info-box'],
        'Recipes' => ['recipe'],
        'Layout' => ['footer', 'app-footer', 'app-header', 'app-layout'],
        'Pages' => ['login', 'error-page'],
        'Media' => ['icon'],
    ];

    public function handle(): int
    {
        $output = $this->resolveOutput();

        File::ensureDirectoryExists($output);

        $this->copyStylesheet($output);
        $this->copyScript($output);

        $grouped = ComponentExampleRegistry::grouped();
        $components = array_keys($grouped);
        $navigation = $this->navigation($components);

        File::put(
            $output . '/index.html',
            view('kadoorie::showcase.index', [
                'title' => 'Dashboard',
                'allComponents' => $components,
                'navigation' => $navigation,
                'current' => null,
                'heading' => null,
            ])->render(),
        );

        foreach ($grouped as $component => $examples) {
            File::put(
                $output . '/' . $component . '.html',
                view('kadoorie::showcase.component', [
                    'component' => $component,
                    'heading' => ucfirst(str_replace('-', ' ', $component)),
                    'examples' => $examples,
                    'title' => ucfirst(str_replace('-', ' ', $component)),
                    'allComponents' => $components,
                    'navigation' => $navigation,
                    'current' => $component,
                ])->render(),
            );
        }

        $this->info(sprintf('Showcase written to %s (%d component pages).', $output, count($grouped)));

        return self::SUCCESS;
    }

    /**
     * Build the categorised sidebar navigation, preserving category order and
     * sweeping any uncategorised components into a trailing "Other" group.
     *
     * @param  array<int, string>  $components
     * @return array<string, array<int, string>>
     */
    private function navigation(array $components): array
    {
        $navigation = [];
        $seen = [];

        foreach (self::CATEGORIES as $category => $items) {
            $present = array_values(array_filter(
                $items,
                static fn(string $component): bool => in_array($component, $components, true),
            ));

            if ($present !== []) {
                $navigation[$category] = $present;
                $seen = array_merge($seen, $present);
            }
        }

        $other = array_values(array_diff($components, $seen));

        if ($other !== []) {
            $navigation['Other'] = $other;
        }

        return $navigation;
    }

    private function resolveOutput(): string
    {
        $option = $this->option('output');
        $path = is_string($option) && $option !== '' ? $option : 'docs/showcase';

        if (str_starts_with($path, '/')) {
            return rtrim($path, '/');
        }

        return dirname(__DIR__, 2) . '/' . trim($path, '/');
    }

    private function copyStylesheet(string $output): void
    {
        $dist = dirname(__DIR__, 2) . '/resources/dist/kadoorie.css';

        if (is_file($dist)) {
            File::copy($dist, $output . '/kadoorie.css');
        }
    }

    private function copyScript(string $output): void
    {
        $dist = dirname(__DIR__, 2) . '/resources/dist/showcase.js';

        if (is_file($dist)) {
            File::copy($dist, $output . '/showcase.js');
        }
    }
}
