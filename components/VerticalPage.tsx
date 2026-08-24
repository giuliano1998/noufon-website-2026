import Link from 'next/link';
import type { Vertical } from '@/lib/types';
import { Icon } from '@/components/Icons';
import CtaLink from '@/components/CtaLink';
import Faq from '@/components/Faq';
import PhoneDemo from '@/components/PhoneDemo';
import DragScroller from '@/components/DragScroller';

/*
 * <VerticalPage> — ÚNICO template de vertical.
 * Se alimenta de content/verticales/<slug>.json (editable desde /admin).
 * Ritmo de secciones deliberadamente variado:
 * hero full-bleed → editorial 1 col → galería → bento asimétrico →
 * pasos sobre dark → demo 9:16 → quote → FAQ → CTA final.
 */
export default function VerticalPage({ vertical }: { vertical: Vertical }) {
  const { slug } = vertical;

  return (
    <main>
      {/* ── HERO full-bleed ── */}
      <section className="hero" style={{ minHeight: '88vh' }}>
        <img
          src={vertical.heroImage}
          alt={vertical.h1}
          className="hero-img-bg"
          data-parallax
          fetchPriority="high"
        />
        <div className="hero-img-veil" />
        <div className="hero-mesh" />
        <div className="hero-inner container on-dark">
          <span className="kicker">{vertical.kicker}</span>
          <h1 className="display" style={{ maxWidth: '14ch' }}>
            {vertical.h1}
          </h1>
          <p className="hero-sub">{vertical.valueProp}</p>
          <div className="hero-ctas">
            <CtaLink href={vertical.ctaHref} vertical={slug} label={vertical.ctaLabel}>
              {vertical.ctaLabel}
            </CtaLink>
            <CtaLink
              href={`${vertical.ctaHref}&piloto=1`}
              vertical={slug}
              label={vertical.ctaSecundario}
              className="btn btn-outline"
            >
              {vertical.ctaSecundario}
            </CtaLink>
          </div>
        </div>
      </section>

      {/* ── PROBLEMA editorial a una columna ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 780 }} data-reveal>
          <span className="kicker">El problema</span>
          <h2 className="h2" style={{ marginBottom: '1.4rem' }}>{vertical.problemaTitulo}</h2>
          <p className="lead">{vertical.problema}</p>
        </div>
      </section>

      {/* ── GALERÍA contextual del nicho ── */}
      {vertical.galeria.length > 1 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <DragScroller className="gal" ariaLabel={`Galería ${vertical.nav}`}>
              {vertical.galeria.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${vertical.h1} — espacio libre de celulares ${i + 1}`}
                  loading="lazy"
                  draggable={false}
                />
              ))}
            </DragScroller>
          </div>
        </section>
      )}

      {/* ── BENEFICIOS bento asimétrico (consecuencias positivas) ── */}
      <section className="section section-gray" id="beneficios">
        <div className="container">
          <div data-reveal style={{ maxWidth: 640 }}>
            <span className="kicker">Lo que cambia</span>
            <h2 className="h2">Consecuencias de un espacio libre de celulares.</h2>
          </div>
          <div className="bento" data-reveal="stagger">
            {vertical.beneficios.map((b, i) => (
              <div
                key={b.titulo}
                className={
                  i === 0
                    ? 'bento-item bento-feature'
                    : i === 1
                      ? 'bento-item bento-side'
                      : 'bento-item bento-half'
                }
              >
                <div className="icon-wrap">
                  <Icon name={b.icon} size={i === 0 ? 34 : 26} />
                </div>
                <h3 className="h3" style={i === 0 ? { fontSize: '1.5rem' } : undefined}>
                  {b.titulo}
                </h3>
                <p style={i === 0 ? { marginTop: '0.6rem' } : undefined}>{b.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA — 3 pasos sobre dark ── */}
      <section className="section section-dark on-dark" id="como-funciona">
        <div className="container">
          <div data-reveal style={{ maxWidth: 640 }}>
            <span className="kicker">Cómo funciona</span>
            <h2 className="h2">Un mecanismo simple. El dispositivo nunca cambia de manos.</h2>
          </div>
          <div className="steps" data-reveal="stagger">
            {vertical.comoFunciona.map((paso, i) => (
              <div className="step" key={paso.titulo}>
                <span className="step-num">Paso {i + 1}</span>
                <h3 className="h3">{paso.titulo}</h3>
                <p>{paso.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO 9:16 (opcional) ── */}
      {(vertical.demoVideo || vertical.heroVideo) && (
        <section className="section">
          <div className="container demo-split">
            <div data-reveal>
              <span className="kicker">El sistema en acción</span>
              <h2 className="h2" style={{ marginBottom: '1.2rem' }}>
                Mirá cómo funciona en menos de un minuto.
              </h2>
              <p className="lead" style={{ marginBottom: '2rem' }}>
                La funda magnética con forro Faraday bloquea WiFi, Bluetooth y datos. El dispositivo
                queda inerte — visible, propio y fuera de juego.
              </p>
              <CtaLink href={vertical.ctaHref} vertical={slug} label={vertical.ctaLabel}>
                {vertical.ctaLabel}
              </CtaLink>
            </div>
            <PhoneDemo
              src={(vertical.demoVideo || vertical.heroVideo) as string}
              title={`Demo NOUFON — ${vertical.nav}`}
            />
          </div>
        </section>
      )}

      {/* ── TESTIMONIAL editorial ── */}
      {vertical.testimonial?.quote && (
        <section className="section section-gray">
          <div className="container quote-wrap" data-reveal>
            <div className="quote-mark">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9.5 5C6.5 6.5 4.5 9 4.5 12.5V19h6.2v-6.5H7.2c0-2.3 1.1-3.9 3.3-5L9.5 5zm9 0c-3 1.5-5 4-5 7.5V19h6.2v-6.5h-3.5c0-2.3 1.1-3.9 3.3-5L18.5 5z" />
              </svg>
            </div>
            <p className="quote">{vertical.testimonial.quote}</p>
            <p className="quote-attr">
              <strong>{vertical.testimonial.autor}</strong> — {vertical.testimonial.rol}
            </p>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {vertical.faqs?.length > 0 && (
        <section className="section section-gray">
          <div className="container">
            <div data-reveal style={{ textAlign: 'center' }}>
              <span className="kicker">Preguntas frecuentes</span>
              <h2 className="h2">Lo que nos preguntan sobre {vertical.nav.toLowerCase()}.</h2>
            </div>
            <Faq items={vertical.faqs} />
          </div>
        </section>
      )}

      {/* ── Cross-links útiles (solo colegios) ── */}
      {slug === 'colegios' && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container" data-reveal>
            <p className="lead">
              ¿Buscás el marco legal? Leé sobre la{' '}
              <a href="/ley-15534-celulares-escuela.html" style={{ color: 'var(--teal-deep)', fontWeight: 700 }}>
                Ley 15.534
              </a>{' '}
              o el{' '}
              <Link href="/leyes-celulares-argentina/" style={{ color: 'var(--teal-deep)', fontWeight: 700 }}>
                estado de las leyes por provincia
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      {/* ── CTA FINAL sobre dark ── */}
      <section className="section section-dark on-dark cta-final">
        <div className="container" data-reveal>
          <span className="kicker">Siguiente paso</span>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 4.6vw, 3.4rem)' }}>
            {vertical.valueProp}
          </h2>
          <p className="lead">
            Contanos sobre tu espacio y te respondemos en menos de 24 horas hábiles, con información
            concreta y sin compromiso.
          </p>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <CtaLink href={vertical.ctaHref} vertical={slug} label={`${vertical.ctaLabel} (final)`}>
              {vertical.ctaLabel}
            </CtaLink>
            <CtaLink
              href={`${vertical.ctaHref}&piloto=1`}
              vertical={slug}
              label={`${vertical.ctaSecundario} (final)`}
              className="btn btn-outline"
            >
              {vertical.ctaSecundario}
            </CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}
