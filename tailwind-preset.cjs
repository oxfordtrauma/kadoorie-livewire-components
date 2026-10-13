/**
 * Project: Kadoorie Livewire Components
 * File: tailwind-preset.cjs
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 *
 * Kadoorie Tailwind preset. Consumers extend it:
 *   presets: [require('kadoorie-livewire-components/tailwind-preset.cjs')]
 * Every theme value maps to a --kad-* custom property (see resources/css/tokens.css),
 * so overriding a token restyles the components with no rebuild. Mobile-first,
 * named breakpoints mapped to the reference viewports (Part 1 §5.10).
 */

module.exports = {
  theme: {
    screens: {
      sm: '480px', // large phones
      md: '768px', // tablet (768x1024)
      lg: '1024px', // small desktop / landscape tablet
      xl: '1280px', // desktop content breakpoint
      '2xl': '1536px', // wide desktop (1920x1080 viewport)
    },
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '1280px' }, // --kad-container-max
    },
    extend: {
      fontFamily: {
        sans: 'var(--kad-font-sans)',
      },
      fontSize: {
        '2xs': ['var(--kad-text-2xs)', { lineHeight: '1.5' }],
        xs: ['var(--kad-text-xs)', { lineHeight: '1.5' }],
        sm: ['var(--kad-text-sm)', { lineHeight: '1.5' }],
        md: ['var(--kad-text-md)', { lineHeight: '1.54' }],
        base: ['var(--kad-text-base)', { lineHeight: '1.43' }],
        lg: ['var(--kad-text-lg)', { lineHeight: '1.5' }],
        xl: ['var(--kad-text-xl)', { lineHeight: '1.56' }],
        '2xl': ['var(--kad-text-2xl)', { lineHeight: '1.4' }],
        '3xl': ['var(--kad-text-3xl)', { lineHeight: '1.33' }],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--kad-color-primary)',
          hover: 'var(--kad-color-primary-hover)',
          emphasis: 'var(--kad-color-primary-emphasis)',
          subtle: 'var(--kad-color-primary-subtle)',
        },
        'on-primary': 'var(--kad-color-on-primary)',
        secondary: 'var(--kad-color-secondary)',
        bg: 'var(--kad-color-bg)',
        surface: {
          DEFAULT: 'var(--kad-color-surface)',
          muted: 'var(--kad-color-surface-muted)',
        },
        border: {
          DEFAULT: 'var(--kad-color-border)',
          strong: 'var(--kad-color-border-strong)',
        },
        text: {
          DEFAULT: 'var(--kad-color-text)',
          body: 'var(--kad-color-text-body)',
          muted: 'var(--kad-color-text-muted)',
          'muted-large': 'var(--kad-color-text-muted-large)',
          disabled: 'var(--kad-color-text-disabled)',
        },
        danger: {
          DEFAULT: 'var(--kad-color-danger)',
          subtle: 'var(--kad-color-danger-subtle)',
          solid: 'var(--kad-color-danger-solid)',
        },
        success: {
          DEFAULT: 'var(--kad-color-success)',
          subtle: 'var(--kad-color-success-subtle)',
          solid: 'var(--kad-color-success-solid)',
        },
        info: {
          DEFAULT: 'var(--kad-color-info)',
          subtle: 'var(--kad-color-info-subtle)',
        },
        pink: {
          DEFAULT: 'var(--kad-color-pink)',
          subtle: 'var(--kad-color-pink-subtle)',
          border: 'var(--kad-color-pink-border)',
        },
        'light-blue': {
          DEFAULT: 'var(--kad-color-light-blue)',
          subtle: 'var(--kad-color-light-blue-subtle)',
          border: 'var(--kad-color-light-blue-border)',
        },
        warning: {
          DEFAULT: 'var(--kad-color-warning)',
          subtle: 'var(--kad-color-warning-subtle)',
        },
        accent: {
          DEFAULT: 'var(--kad-color-accent)',
          subtle: 'var(--kad-color-accent-subtle)',
        },
        footer: {
          DEFAULT: 'var(--kad-color-footer-bg)',
          fg: 'var(--kad-color-footer-fg)',
          muted: 'var(--kad-color-footer-muted)',
        },
        body: 'var(--kad-color-body)',
        stroke: 'var(--kad-color-stroke)',
      },
      borderColor: {
        DEFAULT: 'var(--kad-color-border)',
      },
      borderRadius: {
        sm: 'var(--kad-radius-sm)',
        DEFAULT: 'var(--kad-radius-base)',
        base: 'var(--kad-radius-base)',
        md: 'var(--kad-radius-md)',
        lg: 'var(--kad-radius-lg)',
        xl: 'var(--kad-radius-xl)',
        '2xl': 'var(--kad-radius-2xl)',
        full: 'var(--kad-radius-full)',
      },
      boxShadow: {
        sm: 'var(--kad-shadow-sm)',
        md: 'var(--kad-shadow-md)',
        lg: 'var(--kad-shadow-lg)',
      },
      maxWidth: {
        container: 'var(--kad-container-max)',
      },
    },
  },
};
