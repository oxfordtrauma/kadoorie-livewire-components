<?php

/**
 * Project: Kadoorie Livewire Components
 * File: ComponentExample.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Support;

/**
 * One canonical component example: the component it belongs to, a state title,
 * and the literal source snippet rendered beside its output. Defined once and
 * consumed by both the workbench preview and the static showcase generator.
 */
final readonly class ComponentExample
{
    public function __construct(
        public string $component,
        public string $title,
        public string $snippet,
    ) {}

    public function isLivewire(): bool
    {
        return str_contains($this->snippet, '<livewire:');
    }
}
