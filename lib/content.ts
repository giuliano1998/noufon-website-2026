import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { HomeContent, Post, SiteContent, Vertical } from '@/lib/types';

/* ─────────────────────────────────────────────────────────────────────────────
 * lib/content.ts — Capa de acceso al contenido.
 *
 * Lee los archivos de /content EN TIEMPO DE BUILD. El sitio se exporta como
 * HTML estático, así que nada de esto se ejecuta en el navegador ni en el
 * servidor en producción: no hay superficie de ataque ni acceso a disco en vivo.
 *
 * SOLO puede importarse desde componentes de servidor. Un componente con
 * 'use client' debe recibir estos datos por props (ver Header y ContactForm).
 * ──────────────────────────────────────────────────────────────────────────── */

const RAIZ = path.join(process.cwd(), 'content');

function leerJson<T>(rutaRelativa: string): T {
  return JSON.parse(fs.readFileSync(path.join(RAIZ, rutaRelativa), 'utf8')) as T;
}

/* ── Ajustes generales ────────────────────────────────────────────────────── */

export function getSite(): SiteContent {
  return leerJson<SiteContent>('site.json');
}

export function getHome(): HomeContent {
  return leerJson<HomeContent>('home.json');
}

/* ── Verticales ───────────────────────────────────────────────────────────── */

type VerticalJson = Omit<Vertical, 'galeria' | 'ctaHref'> & {
  galeria: { src: string }[];
};

export function getAllVerticales(): Vertical[] {
  const dir = path.join(RAIZ, 'verticales');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const bruto = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) as VerticalJson;
      return {
        ...bruto,
        // El panel guarda la galería como lista de objetos; el sitio usa strings.
        galeria: (bruto.galeria || []).map((g) => g.src).filter(Boolean),
        ctaHref: `/contacto?vertical=${bruto.slug}`,
      } as Vertical;
    })
    .sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99));
}

export function getVertical(slug: string): Vertical | null {
  return getAllVerticales().find((v) => v.slug === slug) ?? null;
}

/** Datos mínimos para el nav: seguros de pasar a componentes cliente. */
export function getVerticalesNav() {
  return getAllVerticales().map(({ slug, nav }) => ({ slug, nav }));
}

/* ── Blog ─────────────────────────────────────────────────────────────────── */

/** Notas históricas: HTML estático en /public, se conservan por SEO. */
const POSTS_LEGACY: Post[] = [
  {
    slug: 'alternativa-confiscacion-celulares',
    href: '/alternativa-confiscacion-celulares.html',
    titulo: '¿Seguís confiscando celulares? Existe una alternativa sin conflictos',
    bajada: 'La confiscación genera riesgos legales y conflictos con familias. El enfoque estructural los evita.',
    imagen: '/SinConfiscar-noufon.jpeg',
    tag: 'Colegios',
    fecha: '2026-05-13',
    vertical: 'colegios',
    ctaLabel: 'Implementalo en tu colegio',
    externa: true,
  },
  {
    slug: 'ley-15534-celulares-escuela',
    href: '/ley-15534-celulares-escuela.html',
    titulo: 'Cómo la Ley 15.534 transformará las aulas argentinas',
    bajada: 'La ley que restringe celulares en escuelas bonaerenses y cómo NOUFON facilita el cumplimiento.',
    imagen: '/ley15534.jpeg',
    tag: 'Legislación',
    fecha: '2026-04-01',
    vertical: 'colegios',
    ctaLabel: 'Implementalo en tu colegio',
    externa: true,
  },
  {
    slug: 'noufon-mario-pergolini',
    href: '/noufon-mario-pergolini.html',
    titulo: 'La solución que Mario Pergolini destacó para eliminar el celular en clase',
    bajada: 'En Neura, Pergolini presentó a los fundadores de NOUFON y la tecnología Faraday detrás del sistema.',
    imagen: 'https://img.youtube.com/vi/c_B3utzCnyY/mqdefault.jpg',
    tag: 'Prensa',
    fecha: '2026-05-13',
    vertical: 'colegios',
    ctaLabel: 'Implementalo en tu colegio',
    externa: true,
  },
  {
    slug: 'como-implementar-politica-de-celulares-en-escuela',
    href: '/como-implementar-politica-de-celulares-en-escuela.html',
    titulo: 'UNESCO y docentes confirman: menos celulares, mejores resultados',
    bajada: 'Informes de UNESCO y encuestas docentes respaldan las aulas libres de distracciones.',
    imagen: '/Unesco.jpeg',
    tag: 'Investigación',
    fecha: '2026-04-01',
    vertical: 'colegios',
    ctaLabel: 'Implementalo en tu colegio',
    externa: true,
  },
  {
    slug: 'noufon-vs-yondr',
    href: '/noufon-vs-yondr.html',
    titulo: 'NOUFON vs. Yondr: qué sistema conviene para tu espacio',
    bajada: 'Comparativa de los dos sistemas de fundas para espacios libres de celulares.',
    imagen: '/aula-noufon.jpeg',
    tag: 'Comparativa',
    fecha: '2026-05-13',
    vertical: 'colegios',
    ctaLabel: 'Quiero NOUFON',
    externa: true,
  },
];

function leerNotasMarkdown(): Post[] {
  const dir = path.join(RAIZ, 'blog');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((archivo) => {
      const slug = archivo.replace(/\.md$/, '');
      const { data, content } = matter(fs.readFileSync(path.join(dir, archivo), 'utf8'));
      return {
        slug,
        href: `/blog/${slug}/`,
        titulo: String(data.titulo ?? slug),
        bajada: String(data.bajada ?? ''),
        tag: String(data.tag ?? 'Blog'),
        imagen: String(data.imagen ?? '/og-image.jpg'),
        fecha: String(data.fecha ?? ''),
        vertical: String(data.vertical ?? ''),
        ctaLabel: String(data.ctaLabel ?? 'Quiero NOUFON'),
        html: marked.parse(content, { async: false }) as string,
        externa: false,
      } satisfies Post;
    });
}

/** Notas gestionadas desde el panel (markdown). Solo estas tienen ruta propia. */
export function getPostsMarkdown(): Post[] {
  return leerNotasMarkdown().sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function getPost(slug: string): Post | null {
  return leerNotasMarkdown().find((p) => p.slug === slug) ?? null;
}

/**
 * Listado completo del blog: markdown + notas históricas.
 * "¿Seguís confiscando…?" va primera por decisión editorial.
 */
export function getAllPosts(): Post[] {
  const destacada = 'alternativa-confiscacion-celulares';
  const todas = [...POSTS_LEGACY, ...getPostsMarkdown()];
  const primera = todas.filter((p) => p.slug === destacada);
  const resto = todas
    .filter((p) => p.slug !== destacada)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
  return [...primera, ...resto];
}
