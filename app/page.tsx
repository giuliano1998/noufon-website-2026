import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getAllVerticales, getHome } from '@/lib/content';
import { SITE } from '@/lib/site';
import CtaLink from '@/components/CtaLink';
import DragScroller from '@/components/DragScroller';
import Marquee from '@/components/Marquee';
import BeforeAfter from '@/components/BeforeAfter';
import CalculadoraROI from '@/components/CalculadoraROI';
import VideoSection from '@/components/VideoSection';

export const metadata: Metadata = {
  title: 'NOUFON — Creamos espacios libres de celulares',
  description:
    'Fundas magnéticas con bloqueo de señal para colegios, eventos, exámenes internacionales, teatros, empresas y embajadas. La atención vuelve sola.',
  alternates: { canonical: `${SITE.url}/` },
  openGraph: {
    title: 'NOUFON — Creamos espacios libres de celulares',
    description:
      'No es un problema de disciplina. Es estructural. NOUFON cambia la estructura del espacio para que la atención vuelva sola.',
    url: `${SITE.url}/`,
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE.url}/#webpage`,
  url: `${SITE.url}/`,
  name: 'NOUFON — Creamos espacios libres de celulares',
  inLanguage: 'es',
  isPartOf: { '@id': `${SITE.url}/#website` },
  about: { '@id': `${SITE.url}/#organization` },
};

export default function Home() {
  const verticales = getAllVerticales();
  const home = getHome();
  const posts = getAllPosts();

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      {/* ── HERO raíz multi-vertical ── */}
      <section className="hero">
        <div className="hero-mesh" />
        <div className="hero-inner container on-dark">
          <span className="kicker">{home.heroKicker}</span>
          <h1 className="display" style={{ maxWidth: '15ch' }}>
            {home.heroTituloA}{' '}
            <span style={{ color: 'var(--teal)' }}>{home.heroTituloDestacado}</span>.
          </h1>
          <p className="hero-sub">{home.heroSubtitulo}</p>
          <div className="hero-ctas">
            <CtaLink href="/espacios-libres-de-celulares/" vertical="home" label={home.heroCtaPrimario}>
              {home.heroCtaPrimario}
            </CtaLink>
            <CtaLink href="/contacto/" vertical="home" label={home.heroCtaSecundario} className="btn btn-outline">
              {home.heroCtaSecundario}
            </CtaLink>
          </div>
        </div>
      </section>

      {/* ── MARQUEE atributos / social proof ── */}
      <div style={{ borderBottom: '1px solid var(--gray-mid)' }}>
        <Marquee items={home.marquee.map((m) => ({ text: m.texto, icon: m.icono }))} />
      </div>

      {/* ── TESIS editorial ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }} data-reveal>
          <span className="kicker">{home.tesisKicker}</span>
          <h2 className="h2" style={{ marginBottom: '1.4rem' }}>{home.tesisTitulo}</h2>
          <p className="lead" style={{ marginBottom: '1.1rem' }}>{home.tesisParrafo1}</p>
          <p className="lead">{home.tesisParrafo2}</p>
        </div>
      </section>

      {/* ── VIDEO GRANDE — ancla del nav "Cómo funciona" ── */}
      <VideoSection
        src={home.videoUrl}
        kicker={home.videoKicker}
        titulo={home.videoTitulo}
        cta={home.videoCta}
      />

      {/* ── CARRUSEL DE VERTICALES (drag + snap) ── */}
      <section className="section section-gray" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div data-reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 560 }}>
              <span className="kicker">{home.verticalesKicker}</span>
              <h2 className="h2">{home.verticalesTitulo}</h2>
            </div>
            <Link href="/espacios-libres-de-celulares/" className="btn-ghost">
              Ver todos los espacios →
            </Link>
          </div>
          <DragScroller className="vcar" ariaLabel="Verticales NOUFON">
            {verticales.map((v) => (
              <Link href={`/${v.slug}/`} className="vcar-card" key={v.slug} draggable={false}>
                <img src={v.heroImage} alt={v.h1} loading="lazy" draggable={false} />
                <div className="vcar-body">
                  <span className="vcar-kicker">{v.kicker}</span>
                  <span className="vcar-title">{v.nav}</span>
                  <p className="vcar-vp">{v.valueProp}</p>
                  <span className="vcar-arrow">Conocer más →</span>
                </div>
              </Link>
            ))}
          </DragScroller>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="section section-dark on-dark" id="como-funciona">
        <div className="container">
          <div data-reveal style={{ maxWidth: 680 }}>
            <span className="kicker">{home.comoFuncionaKicker}</span>
            <h2 className="h2">{home.comoFuncionaTitulo}</h2>
            <p className="lead" style={{ marginTop: '1rem' }}>{home.comoFuncionaBajada}</p>
          </div>
          <div className="steps" data-reveal="stagger">
            {home.pasos.map((paso, i) => (
              <div className="step" key={paso.titulo}>
                <span className="step-num">Paso {i + 1}</span>
                <h3 className="h3">{paso.titulo}</h3>
                <p>{paso.texto}</p>
              </div>
            ))}
          </div>
          <div className="stats" data-reveal="stagger">
            {home.stats.map((s) => (
              <div className="stat" key={s.numero + s.texto}>
                <div className="stat-num">{s.numero}</div>
                <p className="stat-label">{s.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANTES / DESPUÉS ── */}
      <section className="section">
        <div className="container">
          <div data-reveal style={{ maxWidth: 640 }}>
            <span className="kicker">{home.comparativaKicker}</span>
            <h2 className="h2">{home.comparativaTitulo}</h2>
            <p className="lead" style={{ marginTop: '1rem' }}>{home.comparativaBajada}</p>
          </div>
          <BeforeAfter
            before={home.comparativaAntes}
            after={home.comparativaDespues}
            altBefore="Aula con alumnos distraídos por sus celulares"
            altAfter="Aula participativa, libre de celulares con NOUFON"
          />
        </div>
      </section>

      {/* ── CALCULADORA ROI ── */}
      <section className="section section-gray">
        <div className="container">
          <CalculadoraROI />
        </div>
      </section>

      {/* ── BLOG editorial ── */}
      <section className="section">
        <div className="container">
          <div data-reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <span className="kicker">{home.blogKicker}</span>
              <h2 className="h2">{home.blogTitulo}</h2>
            </div>
            <Link href="/blog/" className="btn-ghost">Ver todas las notas →</Link>
          </div>
          <div className="faq-list" style={{ maxWidth: 'none' }} data-reveal="stagger">
            {posts.slice(0, 4).map((p) => (
              <a
                key={p.href}
                href={p.href}
                style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '2rem', padding: '1.3rem 0.2rem', borderBottom: '1px solid var(--gray-mid)' }}
              >
                <span style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text)' }}>{p.titulo}</span>
                <span className="kicker" style={{ margin: 0, flex: 'none' }}>{p.tag}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="section section-dark on-dark cta-final">
        <div className="container" data-reveal>
          <span className="kicker">{home.ctaKicker}</span>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 4.6vw, 3.4rem)' }}>
            {home.ctaTitulo}
          </h2>
          <p className="lead">{home.ctaBajada}</p>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <CtaLink href="/contacto/" vertical="home" label={home.ctaPrimario}>
              {home.ctaPrimario}
            </CtaLink>
            <CtaLink href="/contacto/?piloto=1" vertical="home" label={home.ctaSecundario} className="btn btn-outline">
              {home.ctaSecundario}
            </CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}
