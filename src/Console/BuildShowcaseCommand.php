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

    public function handle(): int
    {
        $output = $this->resolveOutput();

        File::ensureDirectoryExists($output);

        $this->copyStylesheet($output);

        $grouped = ComponentExampleRegistry::grouped();

        File::put(
            $output . '/index.html',
            view('kadoorie::showcase.index', ['components' => array_keys($grouped)])->render(),
        );

        foreach ($grouped as $component => $examples) {
            File::put(
                $output . '/' . $component . '.html',
                view('kadoorie::showcase.component', [
                    'component' => $component,
                    'heading' => ucfirst(str_replace('-', ' ', $component)),
                    'examples' => $examples,
                ])->render(),
            );
        }

        $this->info(sprintf('Showcase written to %s (%d component pages).', $output, count($grouped)));

        return self::SUCCESS;
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
}
