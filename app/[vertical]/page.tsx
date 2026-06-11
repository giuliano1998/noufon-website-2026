import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getVertical, verticales } from '@/data/verticales';
import VerticalPage from '@/components/VerticalPage';
import { SITE } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return verticales.map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}): Promise<Metadata> {
  const { vertical: slug } = await params;
  const v = getVertical(slug);
  if (!v) return {};
  const { seo } = v.copy;
  const url = `${SITE.url}/${slug}/`;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      images: [{ url: v.heroImage.startsWith('http') ? v.heroImage : `${SITE.url}${v.heroImage}` }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ vertical: string }> }) {
  const { vertical: slug } = await params;
  const v = getVertical(slug);
  if (!v) notFound();
  const copy = v.copy;

  const schema: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SITE.url}/${slug}/#service`,
      name: copy.seo.title,
      description: copy.seo.description,
      serviceType: 'Espacios libres de celulares',
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: 'AR',
      url: `${SITE.url}/${slug}/`,
    },
  ];
  if (copy.faqs?.length) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${SITE.url}/${slug}/#faq`,
      mainEntity: copy.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <VerticalPage vertical={v} copy={copy} />
    </>
  );
}
