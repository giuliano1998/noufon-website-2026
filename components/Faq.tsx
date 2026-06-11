'use client';

import { useRef, useState } from 'react';
import type { Faq as FaqType } from '@/data/verticales';

function FaqItem({ q, a }: FaqType) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-q" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {q}
        <span className="faq-x" aria-hidden="true" />
      </button>
      <div
        ref={bodyRef}
        className="faq-a"
        style={{ maxHeight: open ? bodyRef.current?.scrollHeight ?? 600 : 0 }}
      >
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function Faq({ items }: { items: FaqType[] }) {
  return (
    <div className="faq-list" data-reveal>
      {items.map((f) => (
        <FaqItem key={f.q} {...f} />
      ))}
    </div>
  );
}
