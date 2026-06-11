export interface Post {
  href: string;
  titulo: string;
  resumen: string;
  imagen: string;
  tag: string;
}

/** Notas existentes (HTML estático en /public, rutas preservadas). */
export const posts: Post[] = [
  {
    href: '/ley-15534-celulares-escuela',
    titulo: 'Cómo la Ley 15.534 transformará las aulas argentinas',
    resumen: 'La ley que restringe celulares en escuelas bonaerenses y cómo NOUFON facilita el cumplimiento.',
    imagen: '/ley15534.jpeg',
    tag: 'Legislación',
  },
  {
    href: '/noufon-mario-pergolini',
    titulo: 'La solución que Mario Pergolini destacó para eliminar el celular en clase',
    resumen: 'En Neura, Pergolini presentó a los fundadores de NOUFON y la tecnología Faraday detrás del sistema.',
    imagen: 'https://img.youtube.com/vi/c_B3utzCnyY/mqdefault.jpg',
    tag: 'Prensa',
  },
  {
    href: '/alternativa-confiscacion-celulares',
    titulo: '¿Seguís confiscando celulares? Existe una alternativa sin conflictos',
    resumen: 'La confiscación genera riesgos legales y conflictos con familias. El enfoque estructural los evita.',
    imagen: '/SinConfiscar-noufon.jpeg',
    tag: 'Colegios',
  },
  {
    href: '/como-implementar-politica-de-celulares-en-escuela',
    titulo: 'UNESCO y docentes confirman: menos celulares, mejores resultados',
    resumen: 'Informes de UNESCO y encuestas docentes respaldan las aulas libres de distracciones.',
    imagen: '/Unesco.jpeg',
    tag: 'Investigación',
  },
  {
    href: '/noufon-vs-yondr',
    titulo: 'NOUFON vs. Yondr: qué sistema conviene para tu espacio',
    resumen: 'Comparativa de los dos sistemas de fundas para espacios libres de celulares.',
    imagen: '/aula-noufon.jpeg',
    tag: 'Comparativa',
  },
];
