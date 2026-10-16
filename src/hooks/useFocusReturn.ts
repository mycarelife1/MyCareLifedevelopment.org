import { useRef, useCallback } from 'react';

export function useFocusReturn() {
  const savedRef = useRef<Element | null>(null);

  const save = useCallback(() => {
    savedRef.current = document.activeElement;
  }, []);

  const restore = useCallback(() => {
    const el = savedRef.current;
    if (el && 'focus' in el) {
      requestAnimationFrame(() => {
        (el as HTMLElement).focus({ preventScroll: true });
      });
    }
    savedRef.current = null;
  }, []);

  return { save, restore };
}