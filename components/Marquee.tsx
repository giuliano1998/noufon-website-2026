import { Icon } from '@/components/Icons';
import type { IconName } from '@/data/verticales';

export interface MarqueeEntry {
  text: string;
  icon?: IconName;
}

/** Marquee continuo de prensa / social proof (pausa on hover). */
export default function Marquee({ items }: { items: MarqueeEntry[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}>
            <Icon name={item.icon ?? 'spark'} size={18} />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
