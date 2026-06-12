import type { Metadata } from 'next';
import BlogArticle, { type ArticleMeta } from '@/components/BlogArticle';
import { SITE } from '@/lib/site';

const meta: ArticleMeta = {
  slug: 'eventos-sin-celulares',
  titulo: 'Eventos sin celulares: por qué artistas y productoras los están exigiendo',
  bajada:
    'De los casamientos a los conciertos, crece el formato "phone-free". Qué gana el público, qué gana el artista y cómo implementarlo sin fricción.',
  tag: 'Eventos',
  imagen: '/assets/verticales/eventos-hero.jpg',
  fecha: '2026-06-11',
  vertical: 'eventos',
  ctaLabel: 'Hacé tu evento libre de celulares',
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
        Hay una imagen que se repite en cada show: el artista mira a la platea y, en lugar de caras,
        ve un mar de pantallas. La mitad del público está grabando un video que nunca va a volver a
        mirar, mientras se pierde el momento por el que pagó la entrada. Cada vez más artistas,
        productoras y organizadores de eventos privados decidieron cortar con eso — y los resultados
        explican por qué la tendencia crece.
      </p>

      <h2>Qué cambia cuando no hay pantallas</h2>
      <p>
        El cambio más evidente es la energía de la sala. Sin celulares en alto, el público canta,
        baila y reacciona — la conexión entre escenario y platea, esa que define un buen show, vuelve
        a funcionar. Para el artista hay un beneficio extra: lo que pasa en el show queda en el show.
        Los estrenos no se filtran, los bises sorpresa siguen siendo sorpresa, y la exclusividad de la
        experiencia en vivo se convierte en el mejor argumento de venta de la próxima fecha.
      </p>
      <p>
        En eventos privados el efecto es aún más directo. En un casamiento, los invitados que no
        están detrás de una pantalla bailan más, hablan más y aparecen en las fotos del fotógrafo
        profesional — no tapándolas. En un cumpleaños, la torta se sopla una vez y se vive una vez.
      </p>

      <h2>El problema de las soluciones a medias</h2>
      <p>
        Pedir "por favor no graben" no funciona: depende de la voluntad de cientos de personas a la
        vez. Retener los teléfonos en el acceso tampoco: genera filas interminables, reclamos y un
        problema de responsabilidad sobre bienes ajenos que ningún organizador quiere asumir.
      </p>

      <h2>Cómo lo resuelve un sistema de fundas</h2>
      <p>
        Con NOUFON, cada asistente coloca su celular en una funda con cierre magnético al ingresar
        — y se la lleva consigo. El forro Faraday bloquea toda señal y la funda solo se abre en las
        estaciones de desbloqueo de los accesos. El teléfono nunca cambia de manos: no hay depósito,
        no hay custodia, no hay fila de retiro. Quien necesita usar su celular durante el evento sale
        a la zona habilitada, desbloquea, usa y vuelve a entrar.
      </p>
      <p>
        El resultado es un evento donde la gente vive el momento en lugar de grabarlo — y donde el
        contenido del artista queda protegido sin que nadie tenga que vigilar a nadie.
      </p>
    </BlogArticle>
  );
}
