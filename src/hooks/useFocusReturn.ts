import { useRef, useCallback } from 'react';

/**
 * Saves the currently focused element and returns a function that restores
 * focus to it. Use before opening a modal/dialog, call the returned restore
 * function when the modal closes.
 *
 *   const { save, restore } = useFocusReturn();
 *   const open = () => { save(); setOpen(true); };
 *   const close = () => { setOpen(false); restore(); };
 */
export function useFocusReturn() {
  const savedRef = useRef<Element | null>(null);

  const save = useCallback(() => {
    savedRef.current = document.activeElement;
  }, []);

  const restore = useCallback(() => {
    const el = savedRef.current;
    if (el && 'focus' in el) {
      // Defer one tick so the DOM has finished unmounting the dialog
      requestAnimationFrame(() => {
        (el as HTMLElement).focus({ preventScroll: true });
      });
    }
    savedRef.current = null;
  }, []);

  return { save, restore };
}
