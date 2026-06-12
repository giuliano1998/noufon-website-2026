import type { Metadata } from 'next';
import BlogArticle, { type ArticleMeta } from '@/components/BlogArticle';
import { SITE } from '@/lib/site';

const meta: ArticleMeta = {
  slug: 'celulares-examenes-internacionales',
  titulo: 'Celulares en exámenes internacionales: qué exigen Cambridge, IELTS y SAT',
  bajada:
    'Los boards internacionales endurecieron sus protocolos anti-fraude. Qué piden, qué riesgos corre un centro de examen y cómo cumplir sin custodiar dispositivos.',
  tag: 'Exámenes',
  imagen: '/assets/verticales/examenes-hero.jpg',
  fecha: '2026-06-11',
  vertical: 'examenes-internacionales',
  ctaLabel: 'Asegurá la integridad de tu examen',
};

export const metadata: Metadata = {
  title: `${meta.titulo} | NOUFON`,
  description: meta.bajada,
  alternates: { canonical: `${SITE.url}/blog/${meta.slug}/` },
  openGraph: { title: meta.titulo, description: meta.bajada, url: `${SITE.url}/blog/${meta.slug}/` },
};

export default function Page() {
  return (
    <BlogArticle meta={meta}>
      <p>
        Para un centro de examen, un celular dentro de la sala no es una distracción: es una amenaza
        directa a su acreditación. Los boards internacionales — Cambridge Assessment, IDP/British
        Council para IELTS, College Board para SAT, GMAC para GMAT — exigen protocolos de dispositivos
        cada vez más estrictos, y un solo incidente puede invalidar la sesión completa de todos los
        candidatos.
      </p>

      <h2>Qué exigen los boards</h2>
      <p>
        Aunque cada organización tiene su reglamento, el principio es el mismo en todas: ningún
        candidato puede tener acceso a un dispositivo conectado durante la sesión. Eso incluye
        teléfonos, smartwatches y auriculares inalámbricos. El centro debe poder demostrar que aplica
        un procedimiento sistemático — no alcanza con pedir que los apaguen.
      </p>
      <ul>
        <li><strong>Cambridge / IELTS:</strong> dispositivos fuera del alcance del candidato durante toda la sesión, bajo un procedimiento documentado.</li>
        <li><strong>SAT:</strong> la detección de un teléfono activo durante el examen puede anular el resultado del candidato y comprometer al centro.</li>
        <li><strong>GMAT y exámenes por computadora:</strong> políticas de "cero dispositivos" en sala, con controles de acceso.</li>
      </ul>

      <h2>El dilema de la retención</h2>
      <p>
        La respuesta tradicional — retener los teléfonos en la entrada — crea un problema nuevo: el
        centro pasa a custodiar cientos de equipos de alto valor, con la logística de etiquetado,
        depósito y devolución, y la responsabilidad legal si algo se daña o se pierde. En sesiones
        grandes, la devolución puede demorar más que el propio examen.
      </p>

      <h2>Bloquear sin custodiar</h2>
      <p>
        El enfoque estructural invierte el problema: en el check-in, cada candidato coloca su celular
        en una funda NOUFON con forro Faraday y la conserva consigo. El dispositivo queda inerte — sin
        WiFi, sin Bluetooth, sin datos — pero nunca cambia de manos. Los supervisores se concentran en
        el examen en lugar de vigilar bolsillos, y al finalizar cada candidato desbloquea su funda en
        la estación de salida y se retira.
      </p>
      <p>
        Para el centro, el sistema aporta lo que los boards quieren ver: un procedimiento físico,
        verificable y documentado que hace imposible el fraude digital — sin asumir la custodia de
        bienes ajenos.
      </p>
    </BlogArticle>
  );
}
