import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPostsMarkdown } from '@/lib/content';
import { SITE } from '@/lib/site';
import CtaLink from '@/components/CtaLink';

/* Cada .md dentro de content/blog se convierte en una nota con ruta propia.
 * Crear una nota nueva desde el panel = crear un .md = ruta nueva en el build. */

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostsMarkdown().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE.url}/blog/${slug}/`;
  return {
    title: `${post.titulo} | NOUFON`,
    description: post.bajada,
    alternates: { canonical: url },
    openGraph: {
      title: post.titulo,
      description: post.bajada,
      url,
      type: 'article',
      images: [{ url: post.imagen.startsWith('http') ? post.imagen : `${SITE.url}${post.imagen}` }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE.url}/blog/${slug}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.titulo,
    description: post.bajada,
    image: post.imagen.startsWith('http') ? post.imagen : `${SITE.url}${post.imagen}`,
    datePublished: post.fecha,
    dateModified: post.fecha,
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
          <span className="kicker">{post.tag}</span>
          <h1 className="h2" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', marginBottom: '1.1rem' }}>
            {post.titulo}
          </h1>
          <p className="lead" style={{ marginBottom: '2.2rem' }}>{post.bajada}</p>

          <div className="split-img" style={{ marginBottom: '2.6rem' }}>
            <img src={post.imagen} alt={post.titulo} />
          </div>

          {/* El HTML proviene de un .md del propio repo, revisado vía Git. */}
          <div dangerouslySetInnerHTML={{ __html: post.html ?? '' }} />

          <div className="roi" style={{ padding: '2.4rem', marginTop: '3rem' }}>
            <h2 className="h3" style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>
              ¿Querés un espacio libre de celulares?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, marginBottom: '1.6rem', position: 'relative', zIndex: 1 }}>
              NOUFON es el sistema de fundas magnéticas con bloqueo de señal. Cada persona conserva su
              dispositivo — bloqueado, no confiscado.
            </p>
            <CtaLink
              href={`/contacto/?vertical=${post.vertical}`}
              vertical={post.vertical || 'blog'}
              label={`${post.ctaLabel} (blog)`}
            >
              {post.ctaLabel}
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
