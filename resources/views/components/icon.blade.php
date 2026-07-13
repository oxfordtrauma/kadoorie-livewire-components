{{--
    Normalised inline-SVG icon wrapper. The viewBox and paint (fill/stroke/...)
    are copied from the source SVG so line icons inherit currentColor while
    self-coloured icons keep their own grid and colours; the view owns sizing
    and accessibility. Decorative by default (aria-hidden); pass a `label` to
    expose it to assistive tech (role="img" + <title>).
--}}
<svg
    xmlns="http://www.w3.org/2000/svg"
    {!! $rootAttributes() !!}
    width="{{ $pixels() }}"
    height="{{ $pixels() }}"
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
