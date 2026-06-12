import Link from 'next/link';
import { SITE } from '@/lib/site';
import CtaLink from '@/components/CtaLink';

export interface ArticleMeta {
  slug: string;            // /blog/<slug>/
  titulo: string;
  bajada: string;
  tag: string;
  imagen: string;
  fecha: string;           // ISO
  vertical: string;        // slug de la vertical relacionada
  ctaLabel: string;
}

/** Layout editorial compartido por las notas del blog (Next) + schema Article. */
export default function BlogArticle({ meta, children }: { meta: ArticleMeta; children: React.ReactNode }) {
  const url = `${SITE.url}/blog/${meta.slug}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: meta.titulo,
    description: meta.bajada,
    image: meta.imagen.startsWith('http') ? meta.imagen : `${SITE.url}${meta.imagen}`,
    datePublished: meta.fecha,
    dateModified: meta.fecha,
    inLanguage: 'es',
    mainEntityOfPage: url,
    author: { '@id': `${SITE.url}/#organization` },
    publisher: { '@id': `${SITE.url}/#organization` },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="section" style={{ paddingTop: 150 }}>
        <div className="container article">
          <span className="kicker">{meta.tag}</span>
          <h1 className="h2" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', marginBottom: '1.1rem' }}>
            {meta.titulo}
          </h1>
          <p className="lead" style={{ marginBottom: '2.2rem' }}>{meta.bajada}</p>
          <div className="split-img" style={{ marginBottom: '2.6rem' }}>
            <img src={meta.imagen} alt={meta.titulo} />
          </div>

          {children}

          <div className="roi" style={{ padding: '2.4rem', marginTop: '3rem' }}>
            <h2 className="h3" style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>
              ¿Querés un espacio libre de celulares?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, marginBottom: '1.6rem', position: 'relative', zIndex: 1 }}>
              NOUFON es el sistema de fundas magnéticas con bloqueo de señal. Cada persona conserva su
              dispositivo — bloqueado, no confiscado.
            </p>
            <CtaLink href={`/contacto/?vertical=${meta.vertical}`} vertical={meta.vertical} label={`${meta.ctaLabel} (blog)`}>
              {meta.ctaLabel}
            </CtaLink>
          </div>

          <p style={{ marginTop: '2.4rem' }}>
            <Link href="/blog/" className="btn-ghost">← Volver al blog</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
