import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllVerticales } from '@/data/verticales';
import { posts } from '@/data/posts';
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
    'Fundas magnéticas con bloqueo de señal para colegios, eventos, exámenes internacionales, teatros, empresas y juzgados. La atención vuelve sola.',
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

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      {/* ── HERO raíz multi-vertical ── */}
      <section className="hero">
        <div className="hero-mesh" />
        <div className="hero-inner container on-dark">
          <span className="kicker">Sistema de fundas magnéticas con bloqueo de señal</span>
          <h1 className="display" style={{ maxWidth: '15ch' }}>
            Creamos espacios <span style={{ color: 'var(--teal)' }}>libres de celulares</span>.
          </h1>
          <p className="hero-sub">
            Aulas, salas y escenarios donde la atención vuelve sola. Cada persona conserva su
            teléfono — bloqueado, no confiscado.
          </p>
          <div className="hero-ctas">
            <CtaLink href="/espacios-libres-de-celulares/" vertical="home" label="Ver los espacios">
              Ver los espacios
            </CtaLink>
            <CtaLink href="/contacto/" vertical="home" label="Quiero NOUFON" className="btn btn-outline">
              Quiero NOUFON
            </CtaLink>
          </div>
        </div>
      </section>

      {/* ── MARQUEE prensa / social proof ── */}
      <div style={{ borderBottom: '1px solid var(--gray-mid)' }}>
        <Marquee
          items={[
            { text: 'Tecnología Faraday', icon: 'signalOff' },
            { text: 'Cierre Magnético', icon: 'lock' },
            { text: 'Respaldado por la evidencia UNESCO', icon: 'globe' },
            { text: 'Tela de Neopreno', icon: 'shield' },
            { text: 'Encuentros Presentes', icon: 'users' },
            { text: 'Sin confiscación: el dispositivo nunca cambia de manos', icon: 'hand' },
          ]}
        />
      </div>

      {/* ── TESIS editorial ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }} data-reveal>
          <span className="kicker">La tesis NOUFON</span>
          <h2 className="h2" style={{ marginBottom: '1.4rem' }}>
            No es un problema de disciplina ni de reglas. Es estructural.
          </h2>
          <p className="lead" style={{ marginBottom: '1.1rem' }}>
            Pedirle a una persona que ignore su celular es pedirle que le gane a un diseño hecho para
            capturarla. Las reglas dependen de la voluntad; la vigilancia genera conflicto. Ninguna de
            las dos escala.
          </p>
          <p className="lead">
            NOUFON cambia la estructura del espacio: una funda magnética con forro Faraday bloquea
            toda señal mientras cada persona conserva su dispositivo. Sin custodia, sin apps, sin
            negociación. La atención vuelve sola.
          </p>
        </div>
      </section>

      {/* ── VIDEO GRANDE — NOUFON en acción (ancla del nav "Cómo funciona") ── */}
      <VideoSection />

      {/* ── CARRUSEL DE VERTICALES (drag + snap) ── */}
      <section className="section section-gray" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div data-reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 560 }}>
              <span className="kicker">Espacios</span>
              <h2 className="h2">Un sistema. Seis espacios donde cambia todo.</h2>
            </div>
            <Link href="/espacios-libres-de-celulares/" className="btn-ghost">
              Ver todos los espacios →
            </Link>
          </div>
          <DragScroller className="vcar" ariaLabel="Verticales NOUFON">
            {verticales.map((v) => (
              <Link href={`/${v.slug}/`} className="vcar-card" key={v.slug} draggable={false}>
                <img src={v.heroImage} alt={v.copy.h1} loading="lazy" draggable={false} />
                <div className="vcar-body">
                  <span className="vcar-kicker">{v.copy.kicker}</span>
                  <span className="vcar-title">{v.copy.nav}</span>
                  <p className="vcar-vp">{v.copy.valueProp}</p>
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
            <span className="kicker">Cómo funciona</span>
            <h2 className="h2">Un mecanismo simple. Una transformación profunda.</h2>
            <p className="lead" style={{ marginTop: '1rem' }}>
              Sin apps, sin infraestructura, sin capacitación. El sistema es físico y funciona desde
              el primer día.
            </p>
          </div>
          <div className="steps" data-reveal="stagger">
            <div className="step">
              <span className="step-num">Paso 1</span>
              <h3 className="h3">El celular entra en la funda</h3>
              <p>Al ingresar al espacio, cada persona desliza su teléfono en una funda NOUFON y la conserva consigo. Tarda segundos.</p>
            </div>
            <div className="step">
              <span className="step-num">Paso 2</span>
              <h3 className="h3">El forro Faraday corta toda señal</h3>
              <p>WiFi, Bluetooth y datos quedan bloqueados. El dispositivo está presente pero inerte: no vibra, no suena, no tienta.</p>
            </div>
            <div className="step">
              <span className="step-num">Paso 3</span>
              <h3 className="h3">A la salida, se libera</h3>
              <p>Las estaciones de desbloqueo magnético abren la funda al instante. Sin filas, sin depósitos, sin reclamos.</p>
            </div>
          </div>
          <div className="stats" data-reveal="stagger">
            <div className="stat">
              <div className="stat-num">84%</div>
              <p className="stat-label">más participación estudiantil en colegios que implementaron NOUFON</p>
            </div>
            <div className="stat">
              <div className="stat-num">72%</div>
              <p className="stat-label">en la mejora de experiencias por mayor atención de los participantes</p>
            </div>
            <div className="stat">
              <div className="stat-num">68%</div>
              <p className="stat-label">de aumento en la confidencialidad de los proyectos</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANTES / DESPUÉS ── */}
      <section className="section">
        <div className="container">
          <div data-reveal style={{ maxWidth: 640 }}>
            <span className="kicker">El cambio, a la vista</span>
            <h2 className="h2">El mismo espacio. Otra atención.</h2>
            <p className="lead" style={{ marginTop: '1rem' }}>
              Deslizá para comparar un aula con celulares y la misma aula con NOUFON.
            </p>
          </div>
          <BeforeAfter
            before="/assets/verticales/aula-antes.jpg"
            after="/assets/verticales/aula-despues.jpg"
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
              <span className="kicker">Blog</span>
              <h2 className="h2">Investigación y novedades.</h2>
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
          <span className="kicker">Empezá hoy</span>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 4.6vw, 3.4rem)' }}>
            Tu espacio puede estar libre de celulares en semanas.
          </h2>
          <p className="lead">
            Contanos qué espacio querés transformar y te respondemos en menos de 24 horas hábiles
            — sin compromiso, con información concreta.
          </p>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <CtaLink href="/contacto/" vertical="home" label="Solicitar información">
              Solicitar información
            </CtaLink>
            <CtaLink href="/contacto/?piloto=1" vertical="home" label="Pedí un piloto" className="btn btn-outline">
              Pedí un piloto
            </CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}
