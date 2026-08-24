import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllVerticales, getVertical } from '@/lib/content';
import VerticalPage from '@/components/VerticalPage';
import { SITE } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllVerticales().map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}): Promise<Metadata> {
  const { vertical: slug } = await params;
  const v = getVertical(slug);
  if (!v) return {};
  const url = `${SITE.url}/${slug}/`;
  return {
    title: v.seo.title,
    description: v.seo.description,
    keywords: v.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: v.seo.title,
      description: v.seo.description,
      url,
      images: [{ url: v.heroImage.startsWith('http') ? v.heroImage : `${SITE.url}${v.heroImage}` }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ vertical: string }> }) {
  const { vertical: slug } = await params;
  const v = getVertical(slug);
  if (!v) notFound();

  const schema: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SITE.url}/${slug}/#service`,
      name: v.seo.title,
      description: v.seo.description,
      serviceType: 'Espacios libres de celulares',
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: 'AR',
      url: `${SITE.url}/${slug}/`,
    },
  ];

  if (v.faqs?.length) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${SITE.url}/${slug}/#faq`,
      mainEntity: v.faqs.map((f) => ({
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
      <VerticalPage vertical={v} />
    </>
  );
}
