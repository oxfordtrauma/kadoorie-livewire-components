{{--
    Normalised inline-SVG icon wrapper. Decorative by default (aria-hidden);
    pass a `label` to expose it to assistive tech (role="img" + <title>).
--}}
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="{{ $pixels() }}"
    height="{{ $pixels() }}"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    data-test="kadoorie-icon"
    @if ($label !== null)
        role="img"
        aria-label="{{ $label }}"
    @else
        aria-hidden="true"
        focusable="false"
    @endif
    {{ $attributes->merge(['class' => 'kad-icon inline-block shrink-0 align-middle']) }}
>
    @if ($label !== null)
        <title>{{ $label }}</title>
    @endif
    {!! $inner() !!}
</svg>
