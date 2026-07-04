/**
 * Project: Kadoorie Livewire Components
 * File: Modal.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useId, useRef } from 'react';
import { useDisclosure } from '../hooks/useDisclosure';
import { useDismiss } from '../hooks/useDismiss';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useScrollLock } from '../hooks/useScrollLock';
import { Icon } from './Icon';

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  dismissible?: boolean;
  title: string;
  description?: string;
  id?: string;
  children?: React.ReactNode;
}

/**
 * Accessible dialog mirroring the Livewire `modal` view: controlled (`open` +
 * `onOpenChange`) with an uncontrolled convenience (`defaultOpen`). Traps focus
 * and returns it to the trigger on close, locks scroll, and dismisses on Escape
 * or backdrop click when `dismissible`.
 */
export function Modal({
  open,
  defaultOpen,
  onOpenChange,
  dismissible = true,
  title,
  description = '',
  id,
  children,
}: ModalProps) {
  const disclosure = useDisclosure(open, defaultOpen ?? false, onOpenChange);
  const { isOpen, close } = disclosure;
  const dialogRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const rootId = id ?? generatedId;
  const hasDescription = description !== '';

  useFocusTrap(dialogRef, isOpen);
  useScrollLock(isOpen);
  useDismiss(isOpen, () => {
    if (dismissible) {
      close();
    }
  });

  return (
    <div data-test="modal-root">
      {isOpen && (
        <div
          data-test="modal-overlay"
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
        >
          <div
            data-test="modal-backdrop"
            aria-hidden="true"
            className="fixed inset-0 bg-black/40"
            onClick={() => dismissible && close()}
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${rootId}-title`}
            aria-describedby={hasDescription ? `${rootId}-desc` : undefined}
            data-test="modal-dialog"
            tabIndex={-1}
            className="relative z-10 w-full max-w-lg rounded-lg bg-surface p-5 shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                id={`${rootId}-title`}
                data-test="modal-title"
                className="text-xl font-semibold text-text"
              >
                {title}
              </h2>

              {dismissible && (
                <button
                  type="button"
                  onClick={close}
                  data-test="modal-close"
                  aria-label="Close dialog"
                  className="kad-focusable -m-1 inline-flex size-11 shrink-0 items-center justify-center rounded-md text-text-muted-large hover:bg-surface-muted"
                >
                  <Icon name="x" size="sm" />
                </button>
              )}
            </div>

            {hasDescription && (
              <p
                id={`${rootId}-desc`}
                data-test="modal-body"
                className="mt-3 text-sm text-text-body"
              >
                {description}
              </p>
            )}

            {children}
          </div>
        </div>
      )}
    </div>
  );
}
