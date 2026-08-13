<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Logo.php
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\View\Components;

use Illuminate\Support\HtmlString;
use Illuminate\View\Component;
use Illuminate\View\ComponentAttributeBag;
use Illuminate\View\View;

/**
 * The Kadoorie wordmark, retained at its native 114 × 32 aspect ratio.
 */
final class Logo extends Component
{
    public function __construct(public ?string $label = 'Kadoorie')
    {
    }

    public function markup(ComponentAttributeBag $attributes): HtmlString
    {
        $path = dirname(__DIR__, 3) . '/resources/svg/kadoorie/logo.svg';
        $raw = (string) file_get_contents($path);

        preg_match('/<svg\b[^>]*>(?<body>.*)<\/svg>/is', $raw, $matches);
        $body = trim($matches['body'] ?? $raw);
        $attributes = $attributes->class('block h-8 w-auto');

        $accessibility = $this->label === null
            ? 'aria-hidden="true" focusable="false"'
            : 'role="img" aria-label="' . e($this->label) . '"';

        $title = $this->label === null ? '' : '<title>' . e($this->label) . '</title>';

        return new HtmlString(
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
            . 'width="114" height="32" viewBox="0 0 114 32" fill="none" data-test="kadoorie-logo" ' . $accessibility . ' '
            . $attributes . '>' . $title . $body . '</svg>',
        );
    }

    public function render(): View
    {
        return view('kadoorie::components.logo');
    }
}
