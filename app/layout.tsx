import type { Metadata } from 'next';
import Script from 'next/script';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import GsapEffects from '@/components/GsapEffects';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: 'NOUFON — Espacios libres de celulares',
  description:
    'Sistema de fundas magnéticas con bloqueo de señal para crear espacios libres de celulares: colegios, eventos, exámenes, teatros, empresas y juzgados.',
  icons: { icon: [{ url: '/favicon.ico' }, { url: '/favicon-wa.svg', type: 'image/svg+xml' }] },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'NOUFON',
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: 'summary_large_image' },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: 'NOUFON',
      url: SITE.url,
      logo: `${SITE.url}/logo.png`,
      email: SITE.email,
      description:
        'Sistema de fundas magnéticas con forro Faraday para crear espacios libres de celulares.',
      sameAs: [SITE.instagram, SITE.linkedin],
    },
    {
      '@type': 'Product',
      '@id': `${SITE.url}/#product`,
      name: 'NOUFON',
      description:
        'Fundas magnéticas con bloqueo de señal (WiFi, Bluetooth, datos). El usuario conserva la posesión física de su dispositivo, sin poder usarlo dentro del espacio.',
      image: SITE.ogImage,
      brand: { '@type': 'Brand', name: 'NOUFON' },
      manufacturer: { '@id': `${SITE.url}/#organization` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: 'NOUFON',
      inLanguage: 'es',
      publisher: { '@id': `${SITE.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${SITE.gtmId}');`}
        </Script>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${SITE.ga4Id}');`}
        </Script>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${SITE.metaPixelId}');
fbq('track', 'PageView');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <GsapEffects />
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
