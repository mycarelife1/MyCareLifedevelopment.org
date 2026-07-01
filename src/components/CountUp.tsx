import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export default function CountUp({ end, suffix = '', duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * end);
            setCount(current);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
              setDone(true);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  const formatted = end >= 1000 ? count.toLocaleString() : count.toString();
  const finalFormatted = end >= 1000 ? end.toLocaleString() : end.toString();

  return (
    // aria-label always shows the final value so screen readers speak it once
    // and correctly, ignoring the visual animation in between.
    // aria-atomic="true" prevents intermediate partial reads.
    <div
      ref={ref}
      aria-label={`${finalFormatted}${suffix}`}
      aria-atomic="true"
    >
      {/* aria-hidden hides the animated span from AT; the div's aria-label is read instead */}
      <span
        aria-hidden="true"
        className="text-4xl md:text-5xl font-bold"
        style={{ color: '#6eb7c7', fontFamily: 'Poppins, system-ui, sans-serif' }}
      >
        {done ? finalFormatted : formatted}{suffix}
      </span>
    </div>
  );
}
