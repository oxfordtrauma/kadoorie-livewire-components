<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Kadoorie Components — Workbench</title>
        @livewireStyles
        <style>{!! $css !!}</style>
    </head>
    <body class="bg-bg text-text-body">
        <main id="main-content" class="mx-auto max-w-container px-4 py-8">
            <header class="mb-8">
                <h1 class="text-3xl font-semibold text-text">Kadoorie Components</h1>
                <p class="mt-1 text-sm text-text-muted">
                    Live preview of every component, rendered from the shared example registry.
                </p>
            </header>

            @foreach ($groups as $component => $examples)
                <section class="mb-10" data-test="showcase-{{ $component }}">
                    <h2 class="mb-3 text-xl font-semibold capitalize text-text">
                        {{ str_replace('-', ' ', $component) }}
                    </h2>

                    <div class="flex flex-col gap-4">
                        @foreach ($examples as $example)
                            <article class="overflow-hidden rounded-lg border border-border bg-surface">
                                <div class="border-b border-border px-4 py-2 text-sm font-medium text-text-muted">
                                    {{ $example->title }}
                                </div>
                                <div class="p-4">
                                    {!! \Illuminate\Support\Facades\Blade::render($example->snippet) !!}
                                </div>
                                <pre class="overflow-x-auto border-t border-border bg-surface-muted p-4 text-xs text-text-body"><code>{{ $example->snippet }}</code></pre>
                            </article>
                        @endforeach
                    </div>
                </section>
            @endforeach
        </main>
        @livewireScriptConfig
        <script type="module" src="/assets/workbench.js"></script>
    </body>
</html>
