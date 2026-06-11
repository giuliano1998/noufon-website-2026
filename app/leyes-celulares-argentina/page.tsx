import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import CtaLink from '@/components/CtaLink';

export const metadata: Metadata = {
  title: 'Leyes sobre celulares en escuelas, por provincia | NOUFON',
  description:
    'Tracker del estado legislativo sobre el uso de celulares en escuelas de Argentina: qué provincias ya restringen, cuáles debaten y cómo cumplir.',
  alternates: { canonical: `${SITE.url}/leyes-celulares-argentina/` },
};

type Estado = 'vigente' | 'debate' | 'sin-norma';

interface Provincia {
  nombre: string;
  estado: Estado;
  detalle: string;
  link?: string;
}

/*
 * Hub legislativo — modelo "tracker" (clonando la jugada SEO de Yondr con
 * estados de USA, aplicada a provincias argentinas; escalable a LATAM).
 * Actualizar `estado` y `detalle` a medida que avancen las legislaturas.
 */
const provincias: Provincia[] = [
  {
    nombre: 'Buenos Aires',
    estado: 'vigente',
    detalle:
      'Ley 15.534: restringe el uso de celulares en escuelas primarias y regula su uso pedagógico en secundarias.',
    link: '/ley-15534-celulares-escuela',
  },
  { nombre: 'CABA', estado: 'vigente', detalle: 'Regulación vigente: restricción del uso de celulares en primaria y pautas para secundaria.' },
  { nombre: 'Córdoba', estado: 'debate', detalle: 'Proyectos presentados en la Legislatura para restringir dispositivos en el aula.' },
  { nombre: 'Santa Fe', estado: 'debate', detalle: 'Iniciativas legislativas y programas piloto en discusión.' },
  { nombre: 'Mendoza', estado: 'debate', detalle: 'Proyectos de regulación del uso de celulares en escuelas en comisión.' },
  { nombre: 'Tucumán', estado: 'sin-norma', detalle: 'Sin norma provincial específica; cada institución define su política.' },
  { nombre: 'Entre Ríos', estado: 'sin-norma', detalle: 'Sin norma provincial específica; recomendaciones a nivel de consejo escolar.' },
  { nombre: 'Salta', estado: 'sin-norma', detalle: 'Sin norma provincial específica; políticas a criterio de cada escuela.' },
  { nombre: 'Neuquén', estado: 'sin-norma', detalle: 'Sin norma provincial específica por el momento.' },
  { nombre: 'Río Negro', estado: 'sin-norma', detalle: 'Sin norma provincial específica por el momento.' },
];

const estadoUI: Record<Estado, { label: string; color: string; bg: string }> = {
  vigente: { label: 'Ley vigente', color: 'var(--teal-deep)', bg: 'rgba(45,212,191,0.14)' },
  debate: { label: 'En debate', color: '#9a6b00', bg: 'rgba(240,180,41,0.16)' },
  'sin-norma': { label: 'Sin norma', color: 'var(--text-soft)', bg: 'var(--gray)' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE.url}/leyes-celulares-argentina/#page`,
  url: `${SITE.url}/leyes-celulares-argentina/`,
  name: 'Leyes sobre celulares en escuelas de Argentina',
  inLanguage: 'es',
  isPartOf: { '@id': `${SITE.url}/#website` },
};

export default function Leyes() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="section" style={{ paddingTop: 150 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div data-reveal>
            <span className="kicker">Tracker legislativo</span>
            <h1 className="h2" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', marginBottom: '1.2rem' }}>
              Leyes sobre celulares en escuelas, provincia por provincia.
            </h1>
            <p className="lead">
              La regulación del celular en el aula avanza en toda Argentina. Esta página se actualiza
              a medida que las legislaturas provinciales tratan nuevos proyectos. Si tu provincia ya
              tiene ley, NOUFON es el mecanismo estructural para cumplirla sin conflictos.
            </p>
          </div>

          <div style={{ marginTop: '3rem' }} data-reveal="stagger">
            {provincias.map((p) => (
              <div
                key={p.nombre}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(110px, 160px) auto 1fr',
                  gap: '1.2rem',
                  alignItems: 'baseline',
                  padding: '1.2rem 0.2rem',
                  borderBottom: '1px solid var(--gray-mid)',
                }}
              >
                <strong style={{ fontSize: '1.02rem' }}>
                  {p.link ? (
                    <a href={p.link} style={{ color: 'var(--teal-deep)' }}>{p.nombre}</a>
                  ) : (
                    p.nombre
                  )}
                </strong>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 50,
                    whiteSpace: 'nowrap',
                    color: estadoUI[p.estado].color,
                    background: estadoUI[p.estado].bg,
                  }}
                >
                  {estadoUI[p.estado].label}
                </span>
                <span style={{ color: 'var(--text-soft)', fontSize: '0.93rem', lineHeight: 1.55 }}>{p.detalle}</span>
              </div>
            ))}
          </div>

          <p style={{ marginTop: '1.6rem', fontSize: '0.78rem', color: 'var(--text-soft)' }}>
            Última revisión: junio 2026. Este tracker es informativo y no constituye asesoramiento
            legal. ¿Detectaste un cambio? <Link href="/contacto/" style={{ color: 'var(--teal-deep)' }}>Avisanos</Link>.
          </p>
        </div>
      </section>

      <section className="section section-dark on-dark cta-final">
        <div className="container" data-reveal>
          <span className="kicker">Cumplimiento sin conflictos</span>
          <h2 className="h2" style={{ marginBottom: '1.2rem' }}>
            Una ley dice qué no se puede. NOUFON hace que no haga falta decirlo.
          </h2>
          <div className="hero-ctas" style={{ justifyContent: 'center', marginTop: '2rem' }}>
            <CtaLink href="/colegios/" vertical="leyes" label="Ver NOUFON para colegios">
              Ver NOUFON para colegios
            </CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}
