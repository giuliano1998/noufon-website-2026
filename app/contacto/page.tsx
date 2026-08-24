import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForm from '@/components/ContactForm';
import { SITE } from '@/lib/site';
import { getSite, getVerticalesNav } from '@/lib/content';
import { Icon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Contacto | NOUFON',
  description:
    'Contanos sobre tu espacio — colegio, evento, teatro, empresa o embajada — y te respondemos en menos de 24 horas hábiles.',
  alternates: { canonical: `${SITE.url}/contacto/` },
};

export default function Contacto() {
  const site = getSite();
  // Mapa slug → nombre, para que el formulario (cliente) no lea archivos.
  const verticalLabels = Object.fromEntries(getVerticalesNav().map((v) => [v.slug, v.nav]));

  return (
    <main>
      <section className="section" style={{ paddingTop: 150 }}>
        <div className="container split" style={{ alignItems: 'start' }}>
          <div data-reveal>
            <Suspense fallback={null}>
              <ContactForm verticalLabels={verticalLabels} />
            </Suspense>
          </div>

          <aside style={{ position: 'sticky', top: 110 }} data-reveal>
            <div className="roi" style={{ padding: '2.4rem' }}>
              <h2 className="h3" style={{ fontSize: '1.3rem', marginBottom: '1.2rem' }}>
                Qué podés esperar
              </h2>
              <div className="roi-extra">
                <div>
                  <Icon name="clock" size={18} />
                  <span>Respuesta en menos de <strong>24 hs hábiles</strong></span>
                </div>
                <div>
                  <Icon name="fileCheck" size={18} />
                  <span>Propuesta a medida de tu espacio, <strong>sin compromiso</strong></span>
                </div>
                <div>
                  <Icon name="spark" size={18} />
                  <span>Implementación en <strong>3 a 4 semanas</strong></span>
                </div>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <a href={site.whatsapp} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Hablar por WhatsApp
                </a>
              </div>
              <p style={{ marginTop: '1.4rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', position: 'relative', zIndex: 1 }}>
                O escribinos a{' '}
                <a href={`mailto:${site.email}`} style={{ color: 'var(--teal)' }}>{site.email}</a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
