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

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\multiselect;

final class InstallCommand extends Command
{
    protected $signature = 'kadoorie:install
        {--set= : blade|react|both (skip prompts)}
        {--with-config : Also publish the React tsconfig alias and eslint config (non-interactive)}
        {--force : Overwrite existing published files}';

    protected $description = 'Publish and wire the Kadoorie component set(s): Blade (Livewire) and/or React.';

    /**
     * Rows collected for the closing summary table.
     *
     * @var list<array{string, string, string}>
     */
    private array $summary = [];

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

            if ($this->wantsReactConfig()) {
                $this->installReactConfig($force);
            }
        }

        $this->newLine();
        $this->table(['Set', 'Target', 'Status'], $this->summary);
        $this->printNextSteps($set);
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

    /**
     * Whether the React tsconfig/eslint stubs should be published: the
     * --with-config flag forces it, otherwise an interactive run asks.
     */
    private function wantsReactConfig(): bool
    {
        if ((bool) $this->option('with-config')) {
            return true;
        }

        if (! $this->isInteractive()) {
            return false;
        }

        return confirm(
            label: 'Publish a tsconfig path alias and an eslint a11y config for the React set?',
            default: true,
        );
    }

    /**
     * True when no explicit --set was supplied, so prompts were shown.
     */
    private function isInteractive(): bool
    {
        $option = $this->option('set');

        return ! is_string($option) || $option === '';
    }

    private function installBlade(bool $force): void
    {
        $this->call('vendor:publish', [
            '--tag' => 'kadoorie-styles',
            '--force' => $force,
        ]);

        $this->summary[] = ['Blade styles', 'public/vendor/kadoorie', 'published'];
    }

    private function installReact(bool $force): void
    {
        $source = dirname(__DIR__, 2) . '/resources/react/src';
        $target = $this->reactTargetPath();

        if (File::isDirectory($target) && ! $force && ! File::isEmptyDirectory($target)) {
            $this->components->warn(sprintf('React components already present at %s. Use --force to overwrite.', $target));
            $this->summary[] = ['React source', $target, 'skipped (exists)'];

            return;
        }

        File::ensureDirectoryExists($target);
        File::copyDirectory($source, $target);
        $this->summary[] = ['React source', $target, 'published'];
    }

    private function installReactConfig(bool $force): void
    {
        $this->call('vendor:publish', [
            '--tag' => 'kadoorie-react-config',
            '--force' => $force,
        ]);

        $this->summary[] = ['React config', 'tsconfig.kadoorie.json, eslint.kadoorie.cjs', 'published'];
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

    /**
     * Print the set-specific follow-up steps the operator still needs to run.
     */
    private function printNextSteps(string $set): void
    {
        $this->newLine();
        $this->components->info('Next steps:');

        if (in_array($set, ['blade', 'both'], true)) {
            $this->line('  Blade: register the Alpine focus and collapse plugins, then build your CSS (see docs/user-guide.md).');
        }

        if (in_array($set, ['react', 'both'], true)) {
            $this->line('  React: install react, react-dom and typescript, import the compiled kadoorie.css in your Vite entry,');
            $this->line('         and import components from the published source (alias "@/kadoorie"). See docs/react-guide.md.');
        }
    }
}
