export const SITE = {
  url: 'https://noufon.com',
  name: 'NOUFON',
  tagline: 'Creamos espacios libres de celulares.',
  email: 'info@noufon.com',
  whatsapp: 'https://wa.me/+5491164518851',
  instagram: 'https://www.instagram.com/noufon.arg/',
  linkedin: 'https://www.linkedin.com/company/noufon',
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
