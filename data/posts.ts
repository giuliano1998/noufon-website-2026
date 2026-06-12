export interface Post {
  href: string;
  titulo: string;
  resumen: string;
  imagen: string;
  tag: string;
}

/*
 * Notas del blog.
 * - Las legacy viven como HTML estático en /public y se linkean con .html
 *   (en Netlify la URL limpia funciona vía pretty_urls + 301; el .html
 *   garantiza que también funcionen en `next dev`).
 * - Las nuevas son rutas Next en /blog/<slug>/.
 */
export const posts: Post[] = [
  {
    href: '/alternativa-confiscacion-celulares.html',
    titulo: '¿Seguís confiscando celulares? Existe una alternativa sin conflictos',
    resumen: 'La confiscación genera riesgos legales y conflictos con familias. El enfoque estructural los evita.',
    imagen: '/SinConfiscar-noufon.jpeg',
    tag: 'Colegios',
  },
  {
    href: '/blog/eventos-sin-celulares/',
    titulo: 'Eventos sin celulares: por qué artistas y productoras los están exigiendo',
    resumen: 'De los casamientos a los conciertos, crece el formato phone-free. Qué gana el público y qué gana el artista.',
    imagen: '/assets/verticales/eventos-hero.jpg',
    tag: 'Eventos',
  },
  {
    href: '/blog/celulares-examenes-internacionales/',
    titulo: 'Celulares en exámenes internacionales: qué exigen Cambridge, IELTS y SAT',
    resumen: 'Los boards endurecieron sus protocolos anti-fraude. Cómo cumplir sin custodiar dispositivos.',
    imagen: '/assets/verticales/examenes-hero.jpg',
    tag: 'Exámenes',
  },
  {
    href: '/ley-15534-celulares-escuela.html',
    titulo: 'Cómo la Ley 15.534 transformará las aulas argentinas',
    resumen: 'La ley que restringe celulares en escuelas bonaerenses y cómo NOUFON facilita el cumplimiento.',
    imagen: '/ley15534.jpeg',
    tag: 'Legislación',
  },
  {
    href: '/blog/teatro-sin-celulares/',
    titulo: 'Teatro sin celulares: la tendencia que crece en las salas argentinas',
    resumen: 'Pantallas que rompen la inmersión y grabaciones piratas de estrenos: así funcionan las funciones libres de celulares.',
    imagen: '/assets/verticales/teatros-hero.jpg',
    tag: 'Teatros',
  },
  {
    href: '/blog/confidencialidad-reuniones-directorio/',
    titulo: 'Confidencialidad en reuniones de directorio: el riesgo que entra por el bolsillo',
    resumen: 'La mayoría de las filtraciones no son hackeos: son una foto a una pantalla. Cómo sellar digitalmente una sala.',
    imagen: '/assets/verticales/corporativo-hero.jpg',
    tag: 'Corporativo',
  },
  {
    href: '/blog/celulares-embajadas-diplomacia/',
    titulo: 'Celulares en embajadas: el eslabón débil de la seguridad diplomática',
    resumen: 'Cómo sellar una sala de reuniones diplomáticas sin incomodar a una delegación extranjera.',
    imagen: '/assets/verticales/embajadas-hero.jpg',
    tag: 'Embajadas',
  },
  {
    href: '/noufon-mario-pergolini.html',
    titulo: 'La solución que Mario Pergolini destacó para eliminar el celular en clase',
    resumen: 'En Neura, Pergolini presentó a los fundadores de NOUFON y la tecnología Faraday detrás del sistema.',
    imagen: 'https://img.youtube.com/vi/c_B3utzCnyY/mqdefault.jpg',
    tag: 'Prensa',
  },
  {
    href: '/como-implementar-politica-de-celulares-en-escuela.html',
    titulo: 'UNESCO y docentes confirman: menos celulares, mejores resultados',
    resumen: 'Informes de UNESCO y encuestas docentes respaldan las aulas libres de distracciones.',
    imagen: '/Unesco.jpeg',
    tag: 'Investigación',
  },
  {
    href: '/noufon-vs-yondr.html',
    titulo: 'NOUFON vs. Yondr: qué sistema conviene para tu espacio',
    resumen: 'Comparativa de los dos sistemas de fundas para espacios libres de celulares.',
    imagen: '/aula-noufon.jpeg',
    tag: 'Comparativa',
  },
];
