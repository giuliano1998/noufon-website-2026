import type { MetadataRoute } from 'next';
import { verticales } from '@/data/verticales';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const nextRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/espacios-libres-de-celulares/`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...verticales.map((v) => ({
      url: `${SITE.url}/${v.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    { url: `${SITE.url}/leyes-celulares-argentina/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE.url}/blog/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE.url}/contacto/`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ];

  // Páginas estáticas preservadas en /public
  const legacy: MetadataRoute.Sitemap = [
    'ley-15534-celulares-escuela',
    'como-implementar-politica-de-celulares-en-escuela',
    'alternativa-confiscacion-celulares',
    'noufon-mario-pergolini',
    'noufon-vs-yondr',
    'politica-de-privacidad',
  ].map((slug) => ({
    url: `${SITE.url}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: slug === 'politica-de-privacidad' ? 0.3 : 0.8,
  }));

  return [...nextRoutes, ...legacy];
}
