<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Column.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Support;

/**
 * Typed column definition for the DataTable (SRP): what to read, how to label
 * it, whether it sorts, and whether it holds tabular numbers.
 */
final readonly class Column
{
    public function __construct(
        public string $field,
        public string $label,
        public bool $sortable = false,
        public bool $numeric = false,
    ) {}

    /**
     * @param  array{field: string, label: string, sortable?: bool, numeric?: bool}  $definition
     */
    public static function fromArray(array $definition): self
    {
        return new self(
            $definition['field'],
            $definition['label'],
            $definition['sortable'] ?? false,
            $definition['numeric'] ?? false,
        );
    }

    /**
     * @return array{field: string, label: string, sortable: bool, numeric: bool}
     */
    public function toArray(): array
    {
        return [
            'field' => $this->field,
            'label' => $this->label,
            'sortable' => $this->sortable,
            'numeric' => $this->numeric,
        ];
    }
}
