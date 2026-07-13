{{-- Page shell: skip link, header slot, main content region (app body colour),
     and footer slot. Owns the document landmarks. --}}
<div data-test="app-layout" class="flex min-h-screen flex-col bg-body">
    <a
        href="#main-content"
        data-test="app-layout-skip-link"
        class="sr-only rounded bg-surface px-3 py-2 text-sm font-medium text-primary focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50"
    >
        Skip to content
    </a>

    @isset($header)
        {{ $header }}
    @endisset

    <main id="main-content" data-test="app-layout-main" class="flex-1 bg-body">
        {{ $slot }}
    </main>

    @isset($footer)
        {{ $footer }}
    @endisset
</div>
