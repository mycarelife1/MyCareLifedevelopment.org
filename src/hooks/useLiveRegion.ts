import { useRef, useCallback, useEffect } from 'react';

/**
 * Provides an ARIA live region for announcing dynamic content changes to
 * screen readers (WCAG 2.1 SC 4.1.3 – Status Messages).
 *
 * Usage:
 *   const { announce, LiveRegion } = useLiveRegion();
 *   // Render <LiveRegion /> once per component instance.
 *   // Call announce('3 results loaded') whenever content updates.
 */
export function useLiveRegion(politeness: 'polite' | 'assertive' = 'polite') {
  const regionRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Create the live region element on first use and remove on unmount
  useEffect(() => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', politeness);
    el.setAttribute('aria-atomic', 'true');
    // Position off-screen but still readable by AT
    el.style.cssText =
      'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0;';
    document.body.appendChild(el);
    regionRef.current = el;
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.body.removeChild(el);
    };
  }, [politeness]);

  const announce = useCallback((message: string) => {
    const el = regionRef.current;
    if (!el) return;
    // Clear then re-set so repeated identical messages still trigger a change event
    el.textContent = '';
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      el.textContent = message;
    }, 50);
  }, []);

  return { announce };
}
