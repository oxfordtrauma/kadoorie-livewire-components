<div
    data-test="kadoorie-error-page"
    {{ $attributes->merge(['class' => 'flex min-h-dvh items-center justify-center bg-bg p-4']) }}
>
    <main id="main-content" class="w-full max-w-md text-center">
        <p data-test="error-page-status" class="kad-nums text-5xl font-bold text-primary">
            {{ $status }}
        </p>

        <h1 data-test="error-page-title" class="mt-2 text-2xl font-semibold text-text">
            {{ $title }}
        </h1>

        <p class="mt-2 text-sm text-text-muted">{{ $description }}</p>

        <div class="mt-6 flex items-center justify-center gap-3">
            @isset($actions)
                {{ $actions }}
            @else
                <a
                    href="/"
                    data-test="error-page-home"
                    class="kad-focusable inline-flex min-h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-on-primary hover:bg-primary-hover"
                >
                    Back to home
                </a>
            @endisset
        </div>
    </main>
</div>
