'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Demo 9:16 integrado en mockup de teléfono — lazy: el video solo se
 * monta cuando el componente entra al viewport.
 */
export default function PhoneDemo({
  src,
  title = 'Demo NOUFON',
  isMp4 = false,
}: {
  src: string;
  title?: string;
  isMp4?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="phone-frame" data-reveal>
      {visible &&
        (isMp4 ? (
          <video src={src} autoPlay muted loop playsInline aria-label={title} />
        ) : (
          <iframe
            src={`${src}${src.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&controls=0&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ))}
    </div>
  );
}
