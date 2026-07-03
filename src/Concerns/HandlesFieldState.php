<?php

/**
 * Project: Kadoorie Livewire Components
 * File: HandlesFieldState.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Concerns;

/**
 * Shared label/hint/error id conventions for the field wrapper and every
 * form control. Using classes must expose `string $name` and `?string $id`.
 */
trait HandlesFieldState
{
    public function fieldId(): string
    {
        return $this->id ?? $this->name;
    }

    public function hintId(): string
    {
        return $this->fieldId() . '-hint';
    }

    public function errorId(): string
    {
        return $this->fieldId() . '-error';
    }

    public function describedBy(bool $hasHint, bool $hasError): ?string
    {
        $ids = [];

        if ($hasHint) {
            $ids[] = $this->hintId();
        }

        if ($hasError) {
            $ids[] = $this->errorId();
        }

        return $ids === [] ? null : implode(' ', $ids);
    }
}
