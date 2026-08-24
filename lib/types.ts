/* ─────────────────────────────────────────────────────────────────────────────
 * lib/types.ts — Tipos compartidos del contenido.
 *
 * IMPORTANTE: este archivo NO lee archivos del disco, así que es seguro
 * importarlo tanto desde componentes de servidor como desde componentes
 * cliente ('use client'). Los que sí leen disco viven en lib/content.ts.
 * ──────────────────────────────────────────────────────────────────────────── */

export type IconName =
  | 'focus' | 'users' | 'teacher' | 'shield' | 'spark' | 'eye'
  | 'lock' | 'clock' | 'fileCheck' | 'globe' | 'hand' | 'badge'
  | 'mask' | 'moon' | 'mic' | 'scale' | 'gavel' | 'briefcase'
  | 'signalOff' | 'doc' | 'heart' | 'building';

export interface Beneficio {
  icon: IconName;
  titulo: string;
  texto: string;
}

export interface Paso {
  titulo: string;
  texto: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Testimonial {
  quote: string;
  autor: string;
  rol: string;
}

/** Una vertical tal como la edita el panel y la consume el sitio. */
export interface Vertical {
  slug: string;
  orden: number;
  heroImage: string;
  heroVideo?: string;
  demoVideo?: string;
  galeria: string[];
  ctaHref: string;
  nav: string;
  h1: string;
  kicker: string;
  valueProp: string;
  ctaLabel: string;
  ctaSecundario: string;
  problemaTitulo: string;
  problema: string;
  beneficios: Beneficio[];
  comoFunciona: Paso[];
  testimonial?: Testimonial | null;
  faqs: Faq[];
  seo: { title: string; description: string; keywords: string[] };
}

/** Datos mínimos de navegación: seguros para pasar a componentes cliente. */
export interface VerticalNav {
  slug: string;
  nav: string;
}

export interface Post {
  slug: string;
  href: string;
  titulo: string;
  bajada: string;
  tag: string;
  imagen: string;
  fecha: string;
  vertical: string;
  ctaLabel: string;
  /** Cuerpo en HTML ya renderizado desde markdown. Vacío en los listados. */
  html?: string;
  /** Las notas antiguas son HTML estático en /public y no se editan aquí. */
  externa?: boolean;
}

export interface HomeContent {
  heroKicker: string;
  heroTituloA: string;
  heroTituloDestacado: string;
  heroSubtitulo: string;
  heroCtaPrimario: string;
  heroCtaSecundario: string;
  marquee: { texto: string; icono: IconName }[];
  tesisKicker: string;
  tesisTitulo: string;
  tesisParrafo1: string;
  tesisParrafo2: string;
  videoKicker: string;
  videoTitulo: string;
  videoUrl: string;
  videoCta: string;
  verticalesKicker: string;
  verticalesTitulo: string;
  comoFuncionaKicker: string;
  comoFuncionaTitulo: string;
  comoFuncionaBajada: string;
  pasos: Paso[];
  stats: { numero: string; texto: string }[];
  comparativaKicker: string;
  comparativaTitulo: string;
  comparativaBajada: string;
  comparativaAntes: string;
  comparativaDespues: string;
  blogKicker: string;
  blogTitulo: string;
  ctaKicker: string;
  ctaTitulo: string;
  ctaBajada: string;
  ctaPrimario: string;
  ctaSecundario: string;
}

export interface SiteContent {
  tagline: string;
  email: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
}
