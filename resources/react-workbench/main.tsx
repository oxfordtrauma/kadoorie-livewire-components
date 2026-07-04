/**
 * Project: Kadoorie Livewire Components
 * File: main.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { findStory, stories } from './registry';
// The compiled Kadoorie stylesheet (design tokens + Tailwind output). Importing
// it here loads it in both the Vite dev server and the built workbench, so the
// Playwright WCAG run measures real component contrast.
import '../dist/kadoorie.css';

/**
 * Mount the story named in ?component=<id>. With no id (or an unknown one) the
 * index of available stories is rendered so the workbench is browsable.
 */
function mount(): void {
  const container = document.getElementById('root');

  if (container === null) {
    return;
  }

  const id = new URLSearchParams(window.location.search).get('component');
  const story = findStory(id);
  // Render the story as a component element (not story.render()) so its hooks run
  // inside React's render cycle; calling it as a plain function triggers an
  // "Invalid hook call" for any story that uses useState/useFieldState.
  const StoryView = story?.render;

  createRoot(container).render(
    <StrictMode>
      {StoryView ? (
        <StoryView />
      ) : (
        <nav data-test="react-workbench-index" aria-label="Stories">
          <ul>
            {stories.map((entry) => (
              <li key={entry.id}>
                <a href={`?component=${entry.id}`} data-test={`story-link-${entry.id}`}>
                  {entry.id}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </StrictMode>
  );
}

mount();
