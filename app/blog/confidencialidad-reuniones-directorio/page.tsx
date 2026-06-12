import type { Metadata } from 'next';
import BlogArticle, { type ArticleMeta } from '@/components/BlogArticle';
import { SITE } from '@/lib/site';

const meta: ArticleMeta = {
  slug: 'confidencialidad-reuniones-directorio',
  titulo: 'Confidencialidad en reuniones de directorio: el riesgo que entra por el bolsillo',
  bajada:
    'La mayoría de las filtraciones corporativas no son hackeos sofisticados: son una foto a una pantalla o una grabación discreta. Cómo sellar digitalmente una sala de reuniones.',
  tag: 'Corporativo',
  imagen: '/assets/verticales/corporativo-hero.jpg',
  fecha: '2026-06-11',
  vertical: 'corporativo',
  ctaLabel: 'Protegé tus reuniones',
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
        Las empresas invierten en firewalls, cifrado y políticas de acceso — y después discuten la
        fusión, el despido masivo o el lanzamiento del año en una sala donde cada participante tiene
        un micrófono, una cámara y un canal de salida en el bolsillo. La asimetría es evidente: la
        información más sensible de la organización circula en el ambiente menos controlado.
      </p>

      <h2>Anatomía de una filtración</h2>
      <p>
        Las filtraciones corporativas rara vez son sofisticadas. Una foto a una diapositiva
        confidencial, un audio grabado "por las dudas", un mensaje enviado en el momento equivocado a
        la persona equivocada. No hacen falta intenciones maliciosas: basta un descuido en una reunión
        de veinte personas. Y una vez que la información salió, no hay política interna que la traiga
        de vuelta.
      </p>

      <h2>El costo invisible: reuniones donde nadie está</h2>
      <p>
        Aun sin filtraciones, el celular tiene un costo diario: reuniones donde la mitad de la mesa
        mira su pantalla. Cada notificación atendida son minutos de refocalización perdidos, decisiones
        que se estiran y conversaciones que hay que repetir. Los equipos que adoptaron espacios sin
        celulares reportan reuniones notablemente más cortas — no por apuro, sino por atención.
      </p>

      <h2>De la política al mecanismo</h2>
      <p>
        Muchas empresas ya tienen una política de "sin dispositivos" para reuniones sensibles. El
        problema es que una política depende de que todos la cumplan, siempre. NOUFON la convierte en
        un mecanismo físico: al entrar a la sala, cada participante coloca su celular en una funda con
        forro Faraday y la conserva consigo. Sin señal, sin grabaciones, sin fotos — y sin que nadie
        entregue su teléfono ni quede registrado.
      </p>
      <p>
        Al terminar, la estación de desbloqueo libera las fundas en segundos. El protocolo completo
        agrega menos de un minuto a la reunión y le quita semanas de potencial control de daños.
      </p>
    </BlogArticle>
  );
}
