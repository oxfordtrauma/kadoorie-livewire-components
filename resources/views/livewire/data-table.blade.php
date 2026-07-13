{{-- Real <table> on desktop; below md it reflows to stacked cards
     (.kad-table-stack) so there is no horizontal scroll. --}}
<div data-test="data-table" class="w-full">
    @if (count($rows) === 0)
        <x-kadoorie::empty-state :heading="$emptyHeading" />
    @else
        <div class="relative overflow-hidden rounded-lg border border-border">
            <div
                wire:loading.delay.long
                data-test="data-table-skeleton"
                aria-hidden="true"
                class="absolute inset-0 z-10 flex flex-col gap-3 bg-surface p-4"
            >
                @for ($i = 0; $i < 5; $i++)
                    <div class="kad-skeleton h-6 w-full"></div>
                @endfor
            </div>

            <table class="kad-table-stack w-full text-left text-sm" data-test="data-table-table">
                <thead class="bg-surface-muted text-xs uppercase tracking-wide text-text-muted">
                    <tr>
                        @if ($selectable)
                            <th scope="col" class="w-10 px-3 py-2">
                                <span class="sr-only">Select</span>
                            </th>
                        @endif
                        @foreach ($this->columnDefs() as $col)
                            <th
                                scope="col"
                                aria-sort="{{ $this->ariaSort($col->field) }}"
                                data-test="data-table-th-{{ $col->field }}"
                                @class(['px-3 py-2 font-semibold', 'text-right' => $col->numeric])
                            >
                                @if ($col->sortable)
                                    <button
                                        type="button"
                                        wire:click="sortBy('{{ $col->field }}')"
                                        data-test="data-table-sort-{{ $col->field }}"
                                        class="kad-focusable inline-flex items-center gap-1 hover:text-text"
                                    >
                                        {{ $col->label }}
                                        @if ($sortField === $col->field)
                                            <x-kadoorie::icon
                                                :name="$sortDirection === 'asc' ? 'chevron-up' : 'chevron-down'"
                                                size="sm"
                                            />
                                        @endif
                                    </button>
                                @else
                                    {{ $col->label }}
                                @endif
                            </th>
                        @endforeach
                    </tr>
                </thead>
                <tbody class="divide-y divide-border bg-surface">
                    @foreach ($this->pageRows() as $index => $row)
                        <tr data-test="data-table-row" wire:key="row-{{ $row['id'] ?? $index }}">
                            @if ($selectable)
                                <td data-label="Select" class="px-3 py-2">
                                    <input
                                        type="checkbox"
                                        value="{{ $row['id'] ?? $index }}"
                                        wire:model="selected"
                                        data-test="data-table-select"
                                        aria-label="Select row"
                                        class="kad-focusable size-5 accent-primary"
                                    />
                                </td>
                            @endif
                            @foreach ($this->columnDefs() as $col)
                                <td
                                    data-label="{{ $col->label }}"
                                    @class(['px-3 py-2 text-text-body', 'text-right kad-nums' => $col->numeric])
                                >
                                    {{ $row[$col->field] ?? '' }}
                                </td>
                            @endforeach
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        @if ($this->totalPages() > 1)
            <nav
                aria-label="Table pagination"
                data-test="data-table-pagination"
                class="mt-3 flex items-center justify-between gap-2 text-sm"
            >
                <button
                    type="button"
                    wire:click="previousPage"
                    @disabled($page <= 1)
                    data-test="data-table-prev"
                    class="kad-focusable inline-flex min-h-11 items-center gap-1 rounded-md border border-border px-3 disabled:opacity-50"
                >
                    <x-kadoorie::icon name="chevron-left" size="sm" />
                    Previous
                </button>
                <span class="kad-nums text-text-muted" data-test="data-table-page">
                    Page {{ $page }} of {{ $this->totalPages() }}
                </span>
                <button
                    type="button"
                    wire:click="nextPage"
                    @disabled($page >= $this->totalPages())
                    data-test="data-table-next"
                    class="kad-focusable inline-flex min-h-11 items-center gap-1 rounded-md border border-border px-3 disabled:opacity-50"
                >
                    Next
                    <x-kadoorie::icon name="chevron-right" size="sm" />
                </button>
            </nav>
        @endif
    @endif
</div>
