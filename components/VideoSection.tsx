'use client';

import { useEffect, useRef, useState } from 'react';
import CtaLink from '@/components/CtaLink';

/**
 * Sección de video grande 16:9 — "NOUFON en acción".
 * Lazy: el iframe se monta (con autoplay mute) solo al entrar al viewport.
 */
export default function VideoSection({
  src = 'https://www.youtube.com/embed/BU4OpfYtV3k',
  id = 'noufon-en-accion',
}: {
  src?: string;
  id?: string;
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
      { rootMargin: '250px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section section-gray" id={id} style={{ scrollMarginTop: 80 }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div data-reveal>
          <span className="kicker">Conocé cómo funciona</span>
          <h2 className="h2" style={{ marginBottom: '2.4rem' }}>NOUFON en acción</h2>
        </div>
        <div ref={ref} className="video-big" data-reveal>
          {visible && (
            <iframe
              src={`${src}?autoplay=1&mute=1&rel=0`}
              title="NOUFON — Sistema de fundas para espacios libres de celulares"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          )}
        </div>
        <div data-reveal style={{ marginTop: '2.4rem' }}>
          <CtaLink href="/contacto/" vertical="home" label="Quiero NOUFON (video)">
            Quiero NOUFON
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
