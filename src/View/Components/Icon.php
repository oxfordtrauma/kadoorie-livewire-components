<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Icon.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\View\Components;

use Illuminate\Support\HtmlString;
use Illuminate\View\Component;
use Illuminate\View\View;
use InvalidArgumentException;
use Kadoorie\LivewireComponents\Enums\IconSize;

final class Icon extends Component
{
    public IconSize $size;

    public function __construct(
        public string $name,
        IconSize|string $size = IconSize::Md,
        public ?string $label = null,
    ) {
        $this->size = is_string($size) ? IconSize::from($size) : $size;
    }

    public function pixels(): int
    {
        return $this->size->pixels();
    }

    /**
     * Inner SVG markup for the resolved icon, stripped of its own root element
     * so the view's normalised wrapper controls stroke, colour, and sizing.
     */
    public function inner(): HtmlString
    {
        [$set, $icon] = $this->reference();

        $path = dirname(__DIR__, 3) . "/resources/svg/{$set}/{$icon}.svg";

        if (! is_file($path)) {
            throw new InvalidArgumentException("Unknown Kadoorie icon [{$this->name}].");
        }

        $raw = (string) file_get_contents($path);

        if (preg_match('/<svg\b[^>]*>(?<body>.*)<\/svg>/is', $raw, $matches) === 1) {
            return new HtmlString(trim($matches['body']));
        }

        return new HtmlString(trim($raw));
    }

    /**
     * Resolve the icon reference into a validated [set, icon] pair. A name may
     * be prefixed with a set (e.g. "kadoorie:leaf"); it defaults to "lucide".
     *
     * @return array{0: string, 1: string}
     */
    private function reference(): array
    {
        $parts = explode(':', $this->name, 2);

        [$set, $icon] = count($parts) === 2
            ? [$parts[0], $parts[1]]
            : ['lucide', $parts[0]];

        foreach ([$set, $icon] as $segment) {
            if (preg_match('/^[a-z0-9-]+$/', $segment) !== 1) {
                throw new InvalidArgumentException("Invalid Kadoorie icon reference [{$this->name}].");
            }
        }

        return [$set, $icon];
    }

    public function render(): View
    {
        return view('kadoorie::components.icon');
    }
}
