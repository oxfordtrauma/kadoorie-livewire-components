{{--
    Compact application footer (dark utility bar). A labelled row of external
    "useful links", an optional organisation/version meta block, and the
    bundled Kadoorie logo lockup (resources/logos/kadoorieLogo.svg). Stacks on
    mobile.
--}}
<footer role="contentinfo" data-test="app-footer" class="bg-footer text-footer-fg">
    <div class="mx-auto flex max-w-container flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:justify-between">
        <div>
            <p data-test="app-footer-links-label" class="text-sm font-semibold underline">
                {{ $label }}
            </p>

            @if ($links !== [])
                <ul data-test="app-footer-links" class="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                    @foreach ($links as $link)
                        @php($external = $link['external'] ?? true)
                        <li>
                            <a
                                href="{{ $link['url'] }}"
                                data-test="app-footer-link"
                                @if ($external) target="_blank" rel="noopener noreferrer" @endif
                                class="kad-focusable inline-flex items-center gap-1 rounded py-1 text-sm text-footer-fg hover:underline"
                            >
                                {{ $link['label'] }}
                                @if ($external)
                                    <x-kadoorie::icon name="external-link" class="size-3" />
                                    <span class="sr-only">(opens in a new tab)</span>
                                @endif
                            </a>
                        </li>
                    @endforeach
                </ul>
            @endif
        </div>

        <div class="flex items-center gap-5 md:justify-end">
            @if ($organisation !== null || $version !== null)
                <div data-test="app-footer-meta" class="text-sm text-footer-muted md:text-right">
                    @if ($organisation !== null)
                        <p data-test="app-footer-organisation">{{ $organisation }}</p>
                    @endif
                    @if ($version !== null)
                        <p data-test="app-footer-version">{{ $version }}</p>
                    @endif
                </div>
            @endif

            <div data-test="app-footer-logo" class="shrink-0">
                <span role="img" aria-label="Kadoorie" class="inline-block">
                    {!! $logo() !!}
                </span>
            </div>
        </div>
    </div>
</footer>
