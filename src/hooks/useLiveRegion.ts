import { useRef, useCallback, useEffect } from 'react';

export function useLiveRegion(politeness: 'polite' | 'assertive' = 'polite') {
  const regionRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', politeness);
    el.setAttribute('aria-atomic', 'true');
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
    el.textContent = '';
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      el.textContent = message;
    }, 50);
  }, []);

  return { announce };
}