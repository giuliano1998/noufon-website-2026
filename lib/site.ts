/* ─────────────────────────────────────────────────────────────────────────────
 * lib/site.ts — Configuración TÉCNICA del sitio.
 *
 * Client-safe: no lee archivos del disco, así que puede importarse desde
 * componentes con 'use client'. Los datos de CONTENIDO (email, redes, tagline)
 * viven en content/site.json y se leen con getSite() de lib/content.ts.
 *
 * NOTA DE SEGURIDAD: acá solo hay identificadores públicos. Los IDs de GTM,
 * GA4 y Meta Pixel viajan al navegador por definición y no son secretos.
 * Ninguna credencial (SMTP, tokens) debe escribirse nunca en este archivo:
 * esas viven exclusivamente en las variables de entorno de Netlify.
 * ──────────────────────────────────────────────────────────────────────────── */

export const SITE = {
  url: 'https://noufon.com',
  name: 'NOUFON',
  gtmId: 'GTM-PHK2V9FW',
  ga4Id: 'G-F8M4H4579R',
  metaPixelId: '1958970012160530',
  ogImage: 'https://noufon.com/og-image.jpg',
};

/** Push del evento cta_vertical a dataLayer (GTM/GA4) y Meta Pixel. */
export function trackCtaVertical(vertical: string, label: string) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[]; fbq?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'cta_vertical', vertical, cta_label: label });
  if (typeof w.fbq === 'function') w.fbq('trackCustom', 'CtaVertical', { vertical, cta_label: label });
}
