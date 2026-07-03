<!DOCTYPE html>
<html lang="en">
    <head>
        @include('kadoorie::showcase.partials.head', ['title' => $heading])
    </head>
    <body class="bg-bg text-text-body">
        <main id="main-content" class="mx-auto max-w-container px-4 py-8">
            <nav aria-label="Breadcrumb" class="mb-4 text-sm">
                <a href="index.html" class="kad-focusable rounded text-primary hover:underline">
                    &larr; All components
                </a>
            </nav>

            <h1 class="mb-6 text-3xl font-semibold capitalize text-text">
                {{ str_replace('-', ' ', $heading) }}
            </h1>

            <div class="flex flex-col gap-6">
                @foreach ($examples as $example)
                    <article class="overflow-hidden rounded-lg border border-border bg-surface">
                        <h2 class="border-b border-border px-4 py-2 text-sm font-medium text-text-muted">
                            {{ $example->title }}
                        </h2>

                        @if ($example->isLivewire())
                            <p
                                role="note"
                                data-test="showcase-livewire-note"
                                class="border-b border-border bg-info-subtle px-4 py-2 text-xs text-text-body"
                            >
                                This is a Livewire component. Its full interactive behaviour needs a
                                Livewire runtime; the source is shown below.
                            </p>
                        @else
                            <div class="p-4">
                                {!! \Illuminate\Support\Facades\Blade::render($example->snippet) !!}
                            </div>
                        @endif

                        <pre class="overflow-x-auto border-t border-border bg-surface-muted p-4 text-xs text-text-body"><code>{{ $example->snippet }}</code></pre>
                    </article>
                @endforeach
            </div>
        </main>
        @include('kadoorie::showcase.partials.scripts')
    </body>
</html>
