<?php

/**
 * Project: Kadoorie Livewire Components
 * File: KadoorieColors.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Filament;

/**
 * Kadoorie brand colour ramp for Filament. Returned as Filament's native RGB
 * channel strings so it can be passed straight to
 * FilamentColor::register(['primary' => KadoorieColors::primary()]) with no hard
 * dependency on filament/support. The ramp is anchored on the brand primary
 * #aa1a2d at shade 700.
 */
final class KadoorieColors
{
    /**
     * The primary shade ramp, keyed by Tailwind/Filament shade.
     *
     * @return array<int, string> Shade (50–950) => "R, G, B" channels.
     */
    public static function primary(): array
    {
        return [
            50 => '253, 242, 243',
            100 => '251, 229, 231',
            200 => '246, 204, 209',
            300 => '238, 163, 172',
            400 => '226, 111, 126',
            500 => '209, 65, 86',
            600 => '189, 39, 64',
            700 => '170, 26, 45',
            800 => '140, 15, 32',
            900 => '117, 18, 31',
            950 => '65, 6, 13',
        ];
    }
}
