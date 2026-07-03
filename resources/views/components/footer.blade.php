<footer role="contentinfo" data-test="footer" class="border-t border-border bg-surface">
    <div class="mx-auto max-w-container px-4 py-10">
        <div class="grid gap-8 md:grid-cols-4">
            <div>
                <div data-test="footer-brand" class="flex items-center gap-2 font-semibold text-text">
                    <x-kadoorie::icon name="kadoorie:leaf" size="md" class="text-primary" />
                    {{ $brand }}
                </div>
                @if ($tagline !== null)
                    <p data-test="footer-tagline" class="mt-2 max-w-xs text-sm text-text-muted">
                        {{ $tagline }}
                    </p>
                @endif
            </div>

            @foreach ($columns as $column)
                <div data-test="footer-column">
                    <h2 data-test="footer-heading" class="text-sm font-semibold text-text">
                        {{ $column['heading'] }}
                    </h2>
                    <ul class="mt-3 flex flex-col gap-1">
                        @foreach ($column['links'] as $link)
                            <li>
                                <a
                                    href="{{ $link['url'] }}"
                                    data-test="footer-link"
                                    class="kad-focusable inline-flex min-h-11 items-center rounded text-sm text-text-body hover:text-primary hover:underline"
                                >
                                    {{ $link['label'] }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </div>
            @endforeach
        </div>

        @if ($copyright !== null || $legalLinks !== [])
            <div
                data-test="footer-legal"
                class="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between"
            >
                @if ($copyright !== null)
                    <p data-test="footer-copyright">{{ $copyright }}</p>
                @endif

                @if ($legalLinks !== [])
                    <ul class="flex flex-wrap gap-x-4 gap-y-1">
                        @foreach ($legalLinks as $link)
                            <li>
                                <a
                                    href="{{ $link['url'] }}"
                                    data-test="footer-legal-link"
                                    class="kad-focusable inline-flex min-h-11 items-center rounded hover:text-primary hover:underline"
                                >
                                    {{ $link['label'] }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                @endif
            </div>
        @endif
    </div>
</footer>
