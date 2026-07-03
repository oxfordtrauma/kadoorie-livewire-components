<nav aria-label="{{ $label }}" data-test="breadcrumbs" {{ $attributes }}>
    <ol class="flex flex-wrap items-center gap-1 text-sm text-text-muted">
        @foreach ($items as $item)
            <li class="inline-flex items-center gap-1" data-test="breadcrumb-item">
                @if (! $loop->last && isset($item['url']))
                    <a
                        href="{{ $item['url'] }}"
                        data-test="breadcrumb-link"
                        class="kad-focusable rounded hover:text-primary hover:underline"
                    >
                        {{ $item['label'] }}
                    </a>
                    <x-kadoorie::icon name="chevron-right" size="sm" class="text-text-muted-large" />
                @else
                    <span aria-current="page" data-test="breadcrumb-current" class="font-medium text-text">
                        {{ $item['label'] }}
                    </span>
                @endif
            </li>
        @endforeach
    </ol>
</nav>
