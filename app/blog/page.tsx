import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/content';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog — Espacios libres de celulares | NOUFON',
  description:
    'Investigación, legislación y novedades sobre el uso de celulares en aulas, eventos y espacios de trabajo.',
  alternates: { canonical: `${SITE.url}/blog/` },
};

export default function Blog() {
  const posts = getAllPosts();
  const [destacada, ...resto] = posts;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE.url}/blog/#blog`,
    url: `${SITE.url}/blog/`,
    name: 'Blog NOUFON',
    inLanguage: 'es',
    publisher: { '@id': `${SITE.url}/#organization` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.titulo,
      url: `${SITE.url}${p.href}`,
      image: p.imagen.startsWith('http') ? p.imagen : `${SITE.url}${p.imagen}`,
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="section" style={{ paddingTop: 150 }}>
        <div className="container">
          <div data-reveal style={{ maxWidth: 640 }}>
            <span className="kicker">Blog</span>
            <h1 className="h2" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}>
              Investigación y novedades sobre espacios libres de celulares.
            </h1>
          </div>

          {/* Nota destacada — editorial split */}
          <a
            href={destacada.href}
            className="split"
            data-reveal
            style={{ marginTop: '3.4rem', textDecoration: 'none', color: 'inherit' }}
          >
            <div className="split-img">
              <img src={destacada.imagen} alt={destacada.titulo} loading="lazy" />
            </div>
            <div>
              <span className="kicker">{destacada.tag}</span>
              <h2 className="h2" style={{ marginBottom: '1rem' }}>{destacada.titulo}</h2>
              <p className="lead">{destacada.bajada}</p>
              <span className="btn-ghost" style={{ marginTop: '1.4rem' }}>Leer la nota →</span>
            </div>
          </a>

          {/* Resto — lista editorial */}
          <div style={{ marginTop: '4rem' }} data-reveal="stagger">
            {resto.map((p) => (
              <a
                key={p.href}
                href={p.href}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '110px 1fr auto',
                  gap: '1.6rem',
                  alignItems: 'center',
                  padding: '1.4rem 0',
                  borderBottom: '1px solid var(--gray-mid)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <img
                  src={p.imagen}
                  alt=""
                  loading="lazy"
                  style={{ width: 110, height: 74, objectFit: 'cover', borderRadius: 10 }}
                />
                <span>
                  <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '0.3rem' }}>{p.titulo}</strong>
                  <span style={{ color: 'var(--text-soft)', fontSize: '0.92rem' }}>{p.bajada}</span>
                </span>
                <span className="kicker" style={{ margin: 0 }}>{p.tag}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
