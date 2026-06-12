import type { Metadata } from 'next';
import BlogArticle, { type ArticleMeta } from '@/components/BlogArticle';
import { SITE } from '@/lib/site';

const meta: ArticleMeta = {
  slug: 'celulares-embajadas-diplomacia',
  titulo: 'Celulares en embajadas: el eslabón débil de la seguridad diplomática',
  bajada:
    'Reuniones bilaterales, visitas oficiales y negociaciones sensibles conviven con decenas de dispositivos conectados. Cómo sellar una sala sin incomodar a una delegación.',
  tag: 'Embajadas',
  imagen: '/assets/verticales/embajadas-hero.jpg',
  fecha: '2026-06-11',
  vertical: 'embajadas',
  ctaLabel: 'Consultá por tu embajada',
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
        En el ámbito diplomático, la información es el activo y la discreción es la regla. Sin
        embargo, la sala de reuniones de cualquier sede diplomática recibe a diario decenas de
        dispositivos conectados: los de la delegación visitante, los de los asesores, los del
        personal. Cada uno es un micrófono, una cámara y un canal de transmisión que ninguna política
        de papel puede apagar.
      </p>

      <h2>El problema del protocolo</h2>
      <p>
        La seguridad tradicional tiene una respuesta obvia — retener los dispositivos en recepción —
        y un problema igual de obvio: es incómodo pedírselo a una delegación extranjera. Custodiar el
        teléfono de un funcionario de otro Estado genera fricciones de cortesía, responsabilidad sobre
        equipos ajenos y la sensación de desconfianza que la diplomacia intenta evitar.
      </p>

      <h2>Bloquear sin retener</h2>
      <p>
        El enfoque estructural elimina la fricción: cada persona coloca su propio celular en una funda
        NOUFON al ingresar y la conserva consigo durante toda la visita. Nadie entrega nada, nadie
        registra nada. El forro Faraday corta WiFi, Bluetooth y datos, de modo que el dispositivo
        queda físicamente incapaz de grabar, fotografiar o transmitir mientras permanece en posesión
        de su dueño.
      </p>
      <p>
        A la salida, la estación de desbloqueo libera la funda en segundos. Para el anfitrión, el
        sistema convierte la política de seguridad en un mecanismo verificable; para el visitante, es
        una cortesía razonable — cada vez más habitual en reuniones sensibles — que protege a ambas
        partes por igual.
      </p>

      <h2>Dónde aplica</h2>
      <ul>
        <li>Reuniones bilaterales y negociaciones</li>
        <li>Visitas oficiales y recepciones de delegaciones</li>
        <li>Salas de comunicaciones y áreas restringidas</li>
        <li>Eventos consulares con información sensible</li>
      </ul>
    </BlogArticle>
  );
}
