/**
 * Project: Kadoorie Livewire Components
 * File: tailwind-theme-parity.test.ts
 * User: dappelbe
 * Created: 2026-10-20
 * Last updated by: dappelbe
 * Last updated on: 2026-10-20
 * Version: 0.1.0
 */

// @vitest-environment node
/// <reference types="node" />

import { resolve } from 'node:path';
import postcss, { type AtRule, type Container, type Rule } from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

/**
 * resources/css/theme.css is the Tailwind v4 port of the deprecated
 * tailwind-preset.cjs. Until the preset is removed, both integration paths
 * must compile the same utilities to the same declarations.
 */

const cssDir = resolve(__dirname, '../../resources/css');

const probe = [
  'rounded',
  'rounded-sm',
  'rounded-base',
  'rounded-md',
  'rounded-lg',
  'rounded-xl',
  'rounded-2xl',
  'rounded-full',
  'shadow-sm',
  'shadow-md',
  'shadow-lg',
  'text-2xs',
  'text-xs',
  'text-sm',
  'text-md',
  'text-base',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
  'font-sans',
  'max-w-container',
  'bg-primary',
  'hover:bg-primary-hover',
  'bg-primary-subtle',
  'text-on-primary',
  'bg-surface-muted',
  'text-text-muted-large',
  'border-border-strong',
  'bg-danger-solid',
  'bg-light-blue-subtle',
  'border-pink-border',
  'bg-footer',
  'text-footer-fg',
  'text-body',
  'border-stroke',
  'sm:flex',
  'md:flex',
  'lg:flex',
  'xl:flex',
  '2xl:flex',
];

/** @return Map of selector => declarations plus any width media query. */
type CompiledRules = Map<string, string>;

async function compile(header: string, candidates: string[] = probe): Promise<string> {
  const source = `@import 'tailwindcss' source(none);\n${header}\n@source inline('${candidates.join(' ')}');\n`;
  const result = await postcss([tailwindcss()]).process(source, {
    from: resolve(cssDir, 'parity-probe.css'),
  });

  return result.css;
}

/** Decodes CSS escapes, including hex escapes such as `.\32 xl\:flex`. */
function unescapeSelector(selector: string): string {
  return selector
    .replace(/\\([0-9a-fA-F]{1,6}) ?/g, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/\\(.)/g, '$1');
}

function widthMedia(rule: Rule): string {
  const queries: string[] = [];
  let parent: Container | undefined = rule.parent as Container | undefined;

  while (parent && parent.type !== 'root') {
    const atRule = parent as unknown as AtRule;
    if (atRule.type === 'atrule' && atRule.name === 'media' && atRule.params.includes('width')) {
      queries.push(atRule.params);
    }
    parent = parent.parent as Container | undefined;
  }

  return queries.join(' and ');
}

function utilityRules(css: string): CompiledRules {
  const rules: CompiledRules = new Map();

  postcss.parse(css).walkRules((rule) => {
    const selector = unescapeSelector(rule.selector);
    const matched = probe.find(
      (name) => selector === `.${name}` || selector.startsWith(`.${name}:`)
    );
    if (!matched) {
      return;
    }

    const declarations: string[] = [];
    rule.walkDecls((decl) => {
      declarations.push(`${decl.prop}: ${decl.value}`);
    });

    rules.set(matched, `${widthMedia(rule)} { ${declarations.join('; ')} }`);
  });

  return rules;
}

describe('Tailwind v4 theme parity with the deprecated preset', () => {
  let themeCss: string;
  let presetCss: string;

  beforeAll(async () => {
    themeCss = await compile(`@import './theme.css';`);
    presetCss = await compile(`@config '../../tailwind-preset.cjs';`);
  });

  it('compiles every probed utility through theme.css', () => {
    expect([...utilityRules(themeCss).keys()].sort()).toEqual([...probe].sort());
  });

  it.each(probe)('compiles %s identically through theme.css and the preset', (name) => {
    const fromTheme = utilityRules(themeCss).get(name);

    expect(fromTheme).toBeDefined();
    expect(fromTheme).toBe(utilityRules(presetCss).get(name));
  });

  it('maps the theme straight onto the --kad-* tokens', () => {
    const rules = utilityRules(themeCss);

    expect(rules.get('rounded')).toContain('border-radius: var(--kad-radius-base)');
    expect(rules.get('rounded-full')).toContain('border-radius: var(--kad-radius-full)');
    expect(rules.get('shadow-sm')).toContain('--tw-shadow: var(--kad-shadow-sm)');
    expect(rules.get('max-w-container')).toContain('max-width: var(--kad-container-max)');
    expect(rules.get('sm:flex')).toContain('width >= 480px');
  });

  it('keeps the v3 hover, border colour and button cursor behaviour', () => {
    expect(themeCss).not.toContain('(hover: hover)');
    expect(themeCss).toContain('border-color: var(--kad-color-border, currentcolor)');
    expect(themeCss).toMatch(/button:not\(:disabled\)[\s\S]*?cursor: pointer/);
  });

  it('keeps the v3 divide-y border placement', async () => {
    const css = await compile(`@import './theme.css';`, ['divide-y']);

    expect(css).toMatch(/\.divide-y > :not\(\[hidden\]\) \{\s*border-bottom-width: 0;/);
    expect(css).toMatch(
      /\.divide-y > :not\(\[hidden\]\) ~ :not\(\[hidden\]\) \{\s*border-top-width: 1px;/
    );
  });
});
