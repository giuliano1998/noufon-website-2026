'use client';

import { useRef } from 'react';

/** Slider comparativo "con celulares / sin celulares". */
export default function BeforeAfter({
  before,
  after,
  beforeLabel = 'Con celulares',
  afterLabel = 'Con NOUFON',
  altBefore = 'Espacio con celulares',
  altAfter = 'Espacio libre de celulares con NOUFON',
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  altBefore?: string;
  altAfter?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100));
    el.style.setProperty('--ba-x', `${pct}%`);
  };

  return (
    <div
      ref={ref}
      className="ba"
      data-reveal
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img src={before} alt={altBefore} loading="lazy" />
      <img src={after} alt={altAfter} loading="lazy" className="ba-after" />
      <div className="ba-handle" aria-hidden="true" />
      <span className="ba-tag ba-tag-before">{beforeLabel}</span>
      <span className="ba-tag ba-tag-after">{afterLabel}</span>
    </div>
  );
}
