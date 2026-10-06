<div data-test="sidebar" {{ $attributes->merge(['class' => 'grid gap-4 lg:grid-cols-[auto_1fr]']) }}>
    <aside data-test="sidebar-aside" aria-label="{{ $label }}" class="flex min-w-0 flex-col gap-4 border-b border-border bg-surface p-4 lg:border-b-0 lg:border-r">
        @isset($actions)<div data-test="sidebar-actions">{{ $actions }}</div>@endisset
        @isset($search)<div data-test="sidebar-search">{{ $search }}</div>@endisset
        <nav data-test="sidebar-content" aria-label="{{ $label }} navigation" class="min-w-0 flex-1">{{ $sidebar }}</nav>
        @isset($footer)<div data-test="sidebar-footer">{{ $footer }}</div>@endisset
    </aside>
    <main data-test="sidebar-main" class="min-w-0">{{ $slot }}</main>
</div>
