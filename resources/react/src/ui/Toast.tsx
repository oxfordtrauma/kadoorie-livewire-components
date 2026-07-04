/**
 * Project: Kadoorie Livewire Components
 * File: Toast.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '../lib/cn';
import { toneContainer, toneIcon, toneIconColor, toneRole, type Tone } from '../lib/variants';
import { Icon } from './Icon';

export interface ToastOptions {
  message: string;
  tone?: Tone;
  duration?: number;
}

interface ToastItem extends Required<Omit<ToastOptions, 'duration'>> {
  id: number;
  duration: number;
}

export interface ToastContextValue {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Access the toast bus provided by <ToastProvider>. The React analogue of the
 * Livewire `kadoorie-toast` event bus.
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (context === null) {
    throw new Error('useToast must be used within a <ToastProvider>.');
  }

  return context;
}

let nextId = 0;

/**
 * Holds the toast queue and renders the `aria-live="polite"` region mirroring
 * the Livewire `toast` view. Auto-dismiss pauses on hover.
 */
export function ToastProvider({ children }: { children?: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    const id = nextId++;
    setToasts((current) => [
      ...current,
      {
        id,
        message: options.message,
        tone: options.tone ?? 'info',
        duration: options.duration ?? 4000,
      },
    ]);
    return id;
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        data-test="toast-region"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:items-end sm:pr-6"
      >
        {toasts.map((item) => (
          <ToastCard key={item.id} item={item} onDismiss={() => dismiss(item.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

interface ToastCardProps {
  item: ToastItem;
  onDismiss: () => void;
}

/** A single toast with a hover-pausing auto-dismiss timer. */
function ToastCard({ item, onDismiss }: ToastCardProps) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = useState(false);

  const clear = useCallback(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => {
    if (item.duration > 0 && !paused) {
      timer.current = setTimeout(onDismiss, item.duration);
    }

    return clear;
  }, [item.duration, paused, onDismiss, clear]);

  return (
    <div
      data-test="toast"
      role={toneRole(item.tone)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-md border p-3 shadow-md',
        toneContainer[item.tone]
      )}
    >
      <span className={cn('mt-0.5 shrink-0', toneIconColor[item.tone])}>
        <Icon name={toneIcon[item.tone]} size="sm" />
      </span>
      <p className="flex-1 text-sm text-text-body" data-test="toast-message">
        {item.message}
      </p>
      <button
        type="button"
        data-test="toast-dismiss"
        aria-label="Dismiss"
        onClick={onDismiss}
        className="kad-focusable -m-1 inline-flex size-11 shrink-0 items-center justify-center rounded-md text-text-muted-large hover:bg-black/5"
      >
        <Icon name="x" size="sm" />
      </button>
    </div>
  );
}
