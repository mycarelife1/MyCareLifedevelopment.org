import { useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

interface FocusTrapProps {
  active: boolean;
  children: React.ReactNode;
  /** Element to focus when the trap activates. Defaults to the first focusable child. */
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  onEscape?: () => void;
}

/**
 * Constrains keyboard focus to its children while `active` is true.
 * Implements WCAG 2.1 SC 2.4.3 (Focus Order) for modal dialogs.
 *
 * - Moves focus inside on mount (or when activated)
 * - Wraps Tab / Shift+Tab at the boundaries
 * - Calls onEscape when the Escape key is pressed
 */
export default function FocusTrap({ active, children, initialFocusRef, onEscape }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Move focus inside when activated
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const target = initialFocusRef?.current ?? firstFocusable(containerRef.current);
    if (target) {
      // Defer so the browser finishes painting the dialog
      requestAnimationFrame(() => target.focus());
    }
  }, [active, initialFocusRef]);

  // Trap Tab / Shift+Tab and handle Escape
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape?.();
        return;
      }
      if (e.key !== 'Tab' || !containerRef.current) return;

      const focusable = getFocusable(containerRef.current);
      if (focusable.length === 0) { e.preventDefault(); return; }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [active, onEscape]);

  return (
    <div ref={containerRef} style={{ display: 'contents' }}>
      {children}
    </div>
  );
}

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.closest('[inert]') && getComputedStyle(el).display !== 'none'
  );
}

function firstFocusable(container: HTMLElement): HTMLElement | null {
  return getFocusable(container)[0] ?? null;
}
