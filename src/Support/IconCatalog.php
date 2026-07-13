<?php

/**
 * Project: Kadoorie Livewire Components
 * File: IconCatalog.php
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Support;

/**
 * The single source of truth for the icons bundled with the package. Every icon
 * is one SVG file under resources/svg/<set>/<name>.svg; this class enumerates
 * those files so the showcase, the workbench, and any host application can list
 * the available icons without hard-coding names.
 */
final class IconCatalog
{
    /**
     * Absolute path to the bundled SVG icon directory. Shared with the Icon
     * component so the icon location is defined in exactly one place.
     */
    public static function directory(): string
    {
        return dirname(__DIR__, 2) . '/resources/svg';
    }

    /**
     * Absolute path to a single icon file. The set and icon must already be
     * validated by the caller (see the Icon component).
     */
    public static function pathFor(string $set, string $icon): string
    {
        return self::directory() . "/{$set}/{$icon}.svg";
    }

    /**
     * Available icons keyed by set, each value a name-sorted list of icon names.
     * Sets are returned in alphabetical order for a deterministic showcase.
     *
     * @return array<string, list<string>>
     */
    public static function grouped(): array
    {
        $catalog = [];

        foreach (glob(self::directory() . '/*', GLOB_ONLYDIR) ?: [] as $setDirectory) {
            $names = array_map(
                static fn(string $file): string => basename($file, '.svg'),
                glob($setDirectory . '/*.svg') ?: [],
            );

            if ($names === []) {
                continue;
            }

            sort($names);
            $catalog[basename($setDirectory)] = $names;
        }

        ksort($catalog);

        return $catalog;
    }

    /**
     * Every icon as a flat list of "set:name" references, ready to pass straight
     * to <x-kadoorie::icon :name="..." />.
     *
     * @return list<string>
     */
    public static function references(): array
    {
        $references = [];

        foreach (self::grouped() as $set => $names) {
            foreach ($names as $name) {
                $references[] = $set . ':' . $name;
            }
        }

        return $references;
    }

    /**
     * Total number of bundled icons across every set.
     */
    public static function count(): int
    {
        return array_sum(array_map('count', self::grouped()));
    }
}
