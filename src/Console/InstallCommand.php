<?php

/**
 * Project: Kadoorie Livewire Components
 * File: InstallCommand.php
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

use function Laravel\Prompts\multiselect;

final class InstallCommand extends Command
{
    protected $signature = 'kadoorie:install {--set= : blade|react|both (skip prompts)} {--force : Overwrite existing published files}';

    protected $description = 'Publish and wire the Kadoorie component set(s): Blade (Livewire) and/or React.';

    public function handle(): int
    {
        $set = $this->resolveSet();

        if ($set === null) {
            $this->components->error('Invalid --set value. Use blade, react, or both.');

            return self::FAILURE;
        }

        $force = (bool) $this->option('force');

        if (in_array($set, ['blade', 'both'], true)) {
            $this->installBlade($force);
        }

        if (in_array($set, ['react', 'both'], true)) {
            $this->installReact($force);
        }

        $this->components->info('Kadoorie install complete.');

        return self::SUCCESS;
    }

    /**
     * Resolve the requested set from --set or an interactive prompt. Returns
     * null when an explicit --set value is invalid.
     */
    private function resolveSet(): ?string
    {
        $option = $this->option('set');

        if (is_string($option) && $option !== '') {
            $option = strtolower($option);

            return in_array($option, ['blade', 'react', 'both'], true) ? $option : null;
        }

        return $this->promptForSet();
    }

    /**
     * Ask the operator which set(s) to install (Laravel Prompts).
     */
    private function promptForSet(): string
    {
        /** @var array<int, string> $choices */
        $choices = multiselect(
            label: 'Which component set(s) do you want to install?',
            options: ['blade' => 'Blade (Livewire)', 'react' => 'React'],
            default: ['blade'],
            required: true,
        );

        $wantsBlade = in_array('blade', $choices, true);
        $wantsReact = in_array('react', $choices, true);

        return match (true) {
            $wantsBlade && $wantsReact => 'both',
            $wantsReact => 'react',
            default => 'blade',
        };
    }

    private function installBlade(bool $force): void
    {
        $this->call('vendor:publish', [
            '--tag' => 'kadoorie-styles',
            '--force' => $force,
        ]);

        $this->components->info('Blade styles published. Register the Alpine focus and collapse plugins (see the user guide).');
    }

    private function installReact(bool $force): void
    {
        $source = dirname(__DIR__, 2) . '/resources/react/src';
        $target = $this->reactTargetPath();

        if (File::isDirectory($target) && ! $force && ! File::isEmptyDirectory($target)) {
            $this->components->warn(sprintf('React components already present at %s. Use --force to overwrite.', $target));

            return;
        }

        File::ensureDirectoryExists($target);
        File::copyDirectory($source, $target);

        $this->components->info(sprintf(
            'React components published to %s. Ensure react, react-dom and typescript are installed, import the source via @/kadoorie, and import the compiled kadoorie.css in your Vite entry.',
            $target,
        ));
    }

    /**
     * Absolute target directory for the published React source, from
     * kadoorie.react.path (relative paths are resolved against base_path()).
     */
    private function reactTargetPath(): string
    {
        $path = config('kadoorie.react.path', 'resources/js/kadoorie');
        $path = is_string($path) && $path !== '' ? $path : 'resources/js/kadoorie';

        return str_starts_with($path, '/') ? $path : base_path($path);
    }
}
