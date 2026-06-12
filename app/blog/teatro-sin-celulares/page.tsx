import type { Metadata } from 'next';
import BlogArticle, { type ArticleMeta } from '@/components/BlogArticle';
import { SITE } from '@/lib/site';

const meta: ArticleMeta = {
  slug: 'teatro-sin-celulares',
  titulo: 'Teatro sin celulares: la tendencia que crece en las salas argentinas',
  bajada:
    'Pantallas que rompen la inmersión, grabaciones piratas de estrenos y un pedido cada vez más explícito de actores y directores. Así funcionan las funciones libres de celulares.',
  tag: 'Teatros',
  imagen: '/assets/verticales/teatros-hero.jpg',
  fecha: '2026-06-11',
  vertical: 'teatros',
  ctaLabel: 'Llevá NOUFON a tu sala',
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
        La inmersión es el activo central del teatro. Se construye escena por escena, con la sala a
        oscuras y cientos de personas respirando al mismo ritmo — y se destruye con un solo brillo de
        pantalla en la tercera fila. Cualquier actor lo confirma: desde el escenario, un celular
        encendido se ve como un faro.
      </p>

      <h2>Tres problemas, una causa</h2>
      <p>
        El celular en la sala genera tres daños distintos. El primero es la <strong>inmersión rota</strong>:
        la luz de una pantalla saca de la obra al espectador que la mira y a las diez personas que
        tiene alrededor. El segundo es la <strong>grabación pirata</strong>: escenas de estrenos que
        circulan por redes antes de la segunda función, arruinando sorpresas que la producción tardó
        meses en construir. El tercero es el <strong>respeto al intérprete</strong>: actuar frente a
        lentes en lugar de personas cambia la naturaleza del trabajo, y los elencos lo dicen cada vez
        más fuerte.
      </p>

      <h2>Por qué los anuncios no alcanzan</h2>
      <p>
        El "por favor apaguen sus teléfonos" antes de la función es un clásico — y un fracaso
        estadístico. Siempre hay alguien que lo deja en vibración, alguien que "solo mira la hora",
        alguien que graba el final. Acomodadores persiguiendo pantallas en la oscuridad es una mala
        experiencia para todos.
      </p>

      <h2>La función libre de celulares</h2>
      <p>
        Con NOUFON, el espectador desliza su celular en una funda magnética al cortar ticket y la
        guarda en su bolsillo o cartera. El dispositivo queda mudo y oscuro durante toda la función
        — sin señal, sin notificaciones, sin tentación — y se desbloquea en segundos en las estaciones
        del foyer a la salida, justo a tiempo para la foto con la marquesina.
      </p>
      <p>
        Las salas que lo adoptan lo comunican como un diferencial: la experiencia de una platea
        completamente oscura y en silencio se volvió tan rara que hoy se siente premium. Para
        estrenos, avant-premieres o temporadas completas, el formato convierte una molestia crónica en
        un argumento de venta.
      </p>
    </BlogArticle>
  );
}
