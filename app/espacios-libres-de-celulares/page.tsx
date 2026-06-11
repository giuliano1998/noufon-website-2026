import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllVerticales } from '@/data/verticales';
import { SITE } from '@/lib/site';
import CtaLink from '@/components/CtaLink';
import CalculadoraROI from '@/components/CalculadoraROI';

export const metadata: Metadata = {
  title: 'Espacios libres de celulares | NOUFON',
  description:
    'Colegios, eventos, exámenes internacionales, teatros, empresas y juzgados: todos los espacios donde NOUFON devuelve la atención.',
  alternates: { canonical: `${SITE.url}/espacios-libres-de-celulares/` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE.url}/espacios-libres-de-celulares/#page`,
  url: `${SITE.url}/espacios-libres-de-celulares/`,
  name: 'Espacios libres de celulares',
  inLanguage: 'es',
  isPartOf: { '@id': `${SITE.url}/#website` },
};

export default function Hub() {
  const verticales = getAllVerticales();

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="hero" style={{ minHeight: '62vh', padding: '150px 0 70px' }}>
        <div className="hero-mesh" />
        <div className="hero-inner container on-dark">
          <span className="kicker">Todos los espacios</span>
          <h1 className="display" style={{ maxWidth: '16ch' }}>
            Donde hay un espacio, NOUFON lo libera.
          </h1>
          <p className="hero-sub">
            El mismo sistema — fundas magnéticas con bloqueo total de señal — adaptado al dolor real
            de cada espacio.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="hub-grid" data-reveal="stagger">
            {verticales.map((v) => (
              <Link href={`/${v.slug}/`} className="hub-card" key={v.slug}>
                <img src={v.heroImage} alt={v.copy.h1} loading="lazy" />
                <div className="hub-card-body">
                  <span className="vcar-kicker">{v.copy.kicker}</span>
                  <span className="vcar-title">{v.copy.nav}</span>
                  <p className="vcar-vp">{v.copy.valueProp}</p>
                  <span className="vcar-arrow">Conocer más →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CalculadoraROI />
        </div>
      </section>

      <section className="section section-gray cta-final">
        <div className="container" data-reveal>
          <span className="kicker">¿Tu espacio no está en la lista?</span>
          <h2 className="h2" style={{ marginBottom: '1.2rem' }}>
            Si hay celulares de más, hay un espacio por liberar.
          </h2>
          <p className="lead" style={{ maxWidth: '52ch', margin: '0 auto 2.2rem' }}>
            Trabajamos con cualquier espacio donde la atención, la confidencialidad o la experiencia
            valgan más que una notificación.
          </p>
          <CtaLink href="/contacto/?vertical=otro" vertical="hub" label="Contanos tu caso">
            Contanos tu caso
          </CtaLink>
        </div>
      </section>
    </main>
  );
}
