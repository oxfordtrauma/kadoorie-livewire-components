<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Icon.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\View\Components;

use Illuminate\Support\HtmlString;
use Illuminate\View\Component;
use Illuminate\View\View;
use InvalidArgumentException;
use Kadoorie\LivewireComponents\Enums\IconSize;
use Kadoorie\LivewireComponents\Support\IconCatalog;

final class Icon extends Component
{
    /**
     * Root SVG attributes the view owns. Everything else on the source root
     * (viewBox, fill, stroke, stroke-width, ...) is copied through so each icon
     * renders on its own grid and with its own paint.
     *
     * @var list<string>
     */
    private const RESERVED_ATTRIBUTES = ['width', 'height', 'xmlns', 'class', 'id', 'style'];

    public IconSize $size;

    /**
     * The resolved source SVG parsed once per render into its root attributes
     * and inner body.
     *
     * @var array{attributes: array<string, string>, body: string}|null
     */
    private ?array $source = null;

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
     * so the view can normalise sizing and accessibility around it.
     */
    public function inner(): HtmlString
    {
        return new HtmlString($this->source()['body']);
    }

    /**
     * Presentational root attributes copied from the source SVG — its viewBox
     * and paint (fill/stroke/stroke-width/...) — so monochrome line icons keep
     * inheriting currentColor while self-coloured icons render exactly as they
     * were authored. The view supplies dimensions, namespace, and accessibility.
     */
    public function rootAttributes(): HtmlString
    {
        $attributes = $this->source()['attributes'];

        $rendered = [sprintf('viewBox="%s"', htmlspecialchars($this->viewBox($attributes), ENT_QUOTES))];

        foreach ($attributes as $attribute => $value) {
            if ($attribute === 'viewBox' || in_array($attribute, self::RESERVED_ATTRIBUTES, true)) {
                continue;
            }

            $rendered[] = sprintf('%s="%s"', $attribute, htmlspecialchars($value, ENT_QUOTES));
        }

        return new HtmlString(implode(' ', $rendered));
    }

    /**
     * The source viewBox, falling back to the icon's declared pixel dimensions
     * or the 24x24 design grid when the source omits it.
     *
     * @param  array<string, string>  $attributes
     */
    private function viewBox(array $attributes): string
    {
        if (isset($attributes['viewBox']) && trim($attributes['viewBox']) !== '') {
            return trim($attributes['viewBox']);
        }

        $width = (int) ($attributes['width'] ?? 0);
        $height = (int) ($attributes['height'] ?? 0);

        if ($width > 0 && $height > 0) {
            return "0 0 {$width} {$height}";
        }

        return '0 0 24 24';
    }

    /**
     * Read and parse the resolved SVG once into its root attributes and body.
     *
     * @return array{attributes: array<string, string>, body: string}
     */
    private function source(): array
    {
        if ($this->source !== null) {
            return $this->source;
        }

        [$set, $icon] = $this->reference();

        $path = IconCatalog::pathFor($set, $icon);

        if (! is_file($path)) {
            throw new InvalidArgumentException("Unknown Kadoorie icon [{$this->name}].");
        }

        $raw = (string) file_get_contents($path);

        if (preg_match('/<svg\b(?<attributes>[^>]*)>(?<body>.*)<\/svg>/is', $raw, $matches) !== 1) {
            return $this->source = ['attributes' => [], 'body' => trim($raw)];
        }

        return $this->source = [
            'attributes' => $this->parseAttributes($matches['attributes']),
            'body' => trim($matches['body']),
        ];
    }

    /**
     * Parse an SVG open-tag attribute string into an ordered name/value map,
     * preserving source order and the camelCase of names such as viewBox.
     *
     * @return array<string, string>
     */
    private function parseAttributes(string $raw): array
    {
        preg_match_all('/([a-zA-Z][\w:-]*)\s*=\s*(?:"([^"]*)"|\'([^\']*)\')/', $raw, $pairs, PREG_SET_ORDER);

        $attributes = [];

        foreach ($pairs as $pair) {
            $doubleQuoted = $pair[2] ?? '';
            $singleQuoted = $pair[3] ?? '';
            $attributes[$pair[1]] = $doubleQuoted !== '' ? $doubleQuoted : $singleQuoted;
        }

        return $attributes;
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
