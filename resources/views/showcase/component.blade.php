@extends('kadoorie::showcase.layout')

@section('content')
    <header class="mb-6">
        <h1 data-test="showcase-heading" class="text-3xl font-semibold capitalize text-text">
            {{ str_replace('-', ' ', $heading) }}
        </h1>
    </header>

    <div class="flex flex-col gap-6">
        @foreach ($examples as $example)
            {{-- Alias before the <x-...> slot: inside a component slot $component is
                 reserved (the component instance), so the demo needs its own name. --}}
            @php($componentName = $component)
            @php($exampleId = substr(md5($component . '-' . $example->title), 0, 8))
            <article data-test="showcase-example" class="overflow-hidden rounded-lg border border-border bg-surface">
                <div class="border-b border-border px-4 py-2">
                    <h2 class="text-sm font-medium text-text-muted">{{ $example->title }}</h2>
                </div>

                <div class="p-4">
                    <x-kadoorie::tabs
                        id="ex-{{ $exampleId }}"
                        label="{{ $example->title }} view"
                        :tabs="[['id' => 'preview', 'label' => 'Preview'], ['id' => 'code', 'label' => 'Code']]"
                    >
                        <x-kadoorie::tab-panel tab="preview" group="ex-{{ $exampleId }}">
                            <div data-test="showcase-preview" class="pt-4">
                                @if ($example->isLivewire())
                                    @include('kadoorie::showcase.partials.demo', ['component' => $componentName])
                                @else
                                    {!! \Illuminate\Support\Facades\Blade::render($example->snippet) !!}
                                @endif
                            </div>
                        </x-kadoorie::tab-panel>

                        <x-kadoorie::tab-panel tab="code" group="ex-{{ $exampleId }}">
                            <div data-test="showcase-code" x-data="{ copied: false }" class="relative pt-4">
                                <button
                                    type="button"
                                    data-test="showcase-copy"
                                    x-on:click="navigator.clipboard?.writeText($refs.snippet.textContent.trim()); copied = true; setTimeout(() => copied = false, 1500)"
                                    class="kad-focusable absolute right-2 top-5 z-10 inline-flex min-h-11 items-center gap-1 rounded-md border border-border bg-surface px-3 text-xs font-medium text-text-body hover:bg-surface-muted"
                                >
                                    <span x-show="! copied">Copy</span>
                                    <span x-show="copied" x-cloak data-test="showcase-copied" class="text-success">Copied</span>
                                </button>
                                <pre tabindex="0" x-ref="snippet" class="overflow-x-auto rounded-md bg-surface-muted p-4 pr-24 text-xs text-text-body"><code>{{ $example->snippet }}</code></pre>
                            </div>
                        </x-kadoorie::tab-panel>
                    </x-kadoorie::tabs>
                </div>
            </article>
        @endforeach
    </div>
@endsection
