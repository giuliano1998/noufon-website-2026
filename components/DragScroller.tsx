'use client';

import { useRef } from 'react';

/**
 * Contenedor con drag-to-scroll + snap (desktop). En mobile usa el scroll
 * táctil nativo. Se usa para el carrusel de verticales y las galerías.
 */
export default function DragScroller({
  className,
  children,
  ariaLabel,
}: {
  className: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ down: false, startX: 0, scrollStart: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = ref.current!;
    state.current = { down: true, startX: e.pageX, scrollStart: el.scrollLeft, moved: false };
    el.classList.add('dragging');
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.down) return;
    const dx = e.pageX - s.startX;
    if (Math.abs(dx) > 6) s.moved = true;
    ref.current!.scrollLeft = s.scrollStart - dx;
  };

  const end = () => {
    state.current.down = false;
    ref.current?.classList.remove('dragging');
  };

  const onClickCapture = (e: React.MouseEvent) => {
    // Evita navegar si el usuario estaba arrastrando
    if (state.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      state.current.moved = false;
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      role="region"
      aria-label={ariaLabel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerLeave={end}
      onClickCapture={onClickCapture}
    >
      {children}
    </div>
  );
}
