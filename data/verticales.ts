// ─────────────────────────────────────────────────────────────────────────────
// data/verticales.ts — Fuente única de verdad de las verticales NOUFON
// i18n-ready: el copy vive bajo `locales.es`; para sumar inglés, agregar
// `locales.en` con el mismo shape y resolver con getVertical(slug, locale).
// ─────────────────────────────────────────────────────────────────────────────

export type IconName =
  | 'focus' | 'users' | 'teacher' | 'shield' | 'spark' | 'eye'
  | 'lock' | 'clock' | 'fileCheck' | 'globe' | 'hand' | 'badge'
  | 'mask' | 'moon' | 'mic' | 'scale' | 'gavel' | 'briefcase'
  | 'signalOff' | 'doc' | 'heart' | 'building';

export interface Beneficio {
  icon: IconName;
  titulo: string;
  texto: string;
}

export interface Paso {
  titulo: string;
  texto: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface VerticalCopy {
  nav: string;
  h1: string;
  kicker: string;            // label corto sobre el h1
  valueProp: string;
  ctaLabel: string;
  ctaSecundario: string;     // CTA de baja fricción ("Pedí un piloto")
  problemaTitulo: string;
  problema: string;
  beneficios: Beneficio[];   // CONSECUENCIAS POSITIVAS, no features
  comoFunciona: Paso[];
  testimonial?: { quote: string; autor: string; rol: string };
  faqs?: Faq[];
  seo: { title: string; description: string; keywords: string[] };
}

export interface Vertical {
  slug: string;
  heroImage: string;
  heroVideo?: string;        // Cloudinary mp4/hls opcional
  demoVideo?: string;        // demo 9:16 (YouTube embed o mp4)
  galeria: string[];
  ctaHref: string;
  locales: { es: VerticalCopy };
}

// Imágenes existentes de NOUFON en Cloudinary (colegios)
const CLOUDINARY = {
  aulaAlumno: 'https://res.cloudinary.com/dubsnpevb/image/upload/v1773091714/WhatsApp_Image_2026-03-09_at_6.09.35_PM_smbkuz.jpg',
  aulaSistema: 'https://res.cloudinary.com/dubsnpevb/image/upload/v1773092171/ChatGPT_Image_9_mar_2026_21_53_56_tr8st2.png',
  docente: 'https://res.cloudinary.com/dubsnpevb/image/upload/v1773091734/output-assetsV2_KRSnQLbBS0R2pc0llY4W_asset_jfewoy.png',
  aulaLibre: 'https://res.cloudinary.com/dubsnpevb/image/upload/v1773091686/output-assetsV2_NAZDNPHlZ4pNhsbWE413_asset_zqocyg.png',
};

export const verticales: Vertical[] = [
  // ── COLEGIOS ───────────────────────────────────────────────────────────────
  {
    slug: 'colegios',
    heroImage: CLOUDINARY.aulaAlumno,
    demoVideo: 'https://www.youtube.com/embed/BU4OpfYtV3k',
    galeria: [
      '/assets/verticales/colegios-recreo.jpg',
      '/assets/verticales/colegios-aula.jpg',
      '/assets/verticales/colegios-pasillo.jpg',
      CLOUDINARY.aulaAlumno,
    ],
    ctaHref: '/contacto?vertical=colegios',
    locales: {
      es: {
        nav: 'Colegios',
        h1: 'COLEGIOS Y AULAS',
        kicker: 'Educación',
        valueProp: 'Aulas donde los docentes enseñan y los alumnos participan.',
        ctaLabel: 'Implementalo en tu colegio',
        ctaSecundario: 'Pedí un piloto',
        problemaTitulo: 'No es falta de voluntad. Es estructura.',
        problema:
          'Pedirle a un adolescente que ignore su celular es como pedirle que ignore una televisión encendida al lado de su escritorio. Las soluciones que dependen de la buena voluntad del alumno fallan; las que generan confrontación, también. Los docentes pierden hasta un 20% de cada clase gestionando dispositivos, y el 72% de las sanciones disciplinarias en secundaria involucra un teléfono. La única solución que funciona es la que cambia la estructura del aula.',
        beneficios: [
          {
            icon: 'focus',
            titulo: 'Concentración real',
            texto: 'Sin celular a la vista, la atención vuelve sola. Menos interrupciones, más aprendizaje efectivo en cada clase — los colegios reportan 84% más participación.',
          },
          {
            icon: 'users',
            titulo: 'Vínculos en el recreo',
            texto: 'El recreo vuelve a ser un espacio de encuentro real. Los chicos charlan, juegan y se relacionan sin una pantalla de por medio.',
          },
          {
            icon: 'teacher',
            titulo: 'Docentes enfocados en enseñar',
            texto: 'Se termina el "guardá el teléfono". El sistema hace el trabajo y el docente recupera el 100% de su energía para la clase.',
          },
          {
            icon: 'shield',
            titulo: 'Fin del ciberbullying en clase',
            texto: 'Sin celulares activos desaparecen los espacios donde sucede: los chats, las grabaciones y las publicaciones en tiempo real.',
          },
        ],
        comoFunciona: [
          { titulo: 'El alumno llega al aula', texto: 'Coloca su celular en la funda magnética NOUFON. El dispositivo sigue siendo suyo — queda fuera de alcance, no fuera de su posesión.' },
          { titulo: 'El docente enseña sin interrupciones', texto: 'No hay negociación ni vigilancia. El forro Faraday bloquea toda señal y el diseño del espacio hace el trabajo.' },
          { titulo: 'Suena el timbre', texto: 'El alumno retira su celular. Sin conflictos, sin registros, sin burocracia.' },
        ],
        testimonial: {
          quote: 'La diferencia entre una política y un sistema: una política dice "no usar el celular". Un sistema lo hace innecesario.',
          autor: 'Equipo NOUFON',
          rol: 'Tesis de diseño del producto',
        },
        faqs: [
          { q: '¿NOUFON cumple con la Ley N° 15.534?', a: 'Sí. NOUFON fue diseñado en línea con los requerimientos de la Ley N° 15.534, que restringe el uso de dispositivos móviles en instituciones educativas de la Provincia de Buenos Aires. Provee el mecanismo estructural para implementar la restricción sin conflictos disciplinarios.' },
          { q: '¿Cuánto tarda en implementarse?', a: 'Entre 3 y 4 semanas desde el pedido hasta el primer día de uso. No requiere obras, software ni capacitación docente: el sistema es físico y autoexplicativo.' },
          { q: '¿El colegio custodia los celulares?', a: 'No. A diferencia de la confiscación, con NOUFON el alumno conserva la posesión física de su dispositivo en todo momento. El colegio no asume responsabilidad sobre bienes ajenos.' },
          { q: '¿Qué resultados reportan los colegios?', a: '84% de aumento en participación estudiantil, 72% de reducción en sanciones disciplinarias y 68% de mejora en rendimiento académico, medibles desde las primeras semanas.' },
        ],
        seo: {
          title: 'Aulas libres de celulares para colegios | NOUFON',
          description: 'Sistema de fundas magnéticas para colegios secundarios. Sin apps, sin confiscaciones, sin conflictos. Cumplí la Ley 15.534 desde el primer día.',
          keywords: ['celulares en colegios', 'ley 15534', 'fundas magnéticas colegios'],
        },
      },
    },
  },

  // ── EVENTOS Y CONCIERTOS ──────────────────────────────────────────────────
  {
    slug: 'eventos',
    heroImage: '/assets/verticales/eventos-hero.jpg',
    galeria: [
      '/assets/verticales/eventos-casamiento.jpg',
      '/assets/verticales/eventos-cumple.jpg',
      '/assets/verticales/eventos-concierto.jpg',
      '/assets/verticales/eventos-hero.jpg',
    ],
    ctaHref: '/contacto?vertical=eventos',
    locales: {
      es: {
        nav: 'Eventos',
        h1: 'EVENTOS Y CONCIERTOS',
        kicker: 'Música y eventos en vivo',
        valueProp: 'Que la gente viva el momento, no lo grabe.',
        ctaLabel: 'Hacé tu evento libre de celulares',
        ctaSecundario: 'Pedí un piloto',
        problemaTitulo: 'Un mar de pantallas entre el artista y su público.',
        problema:
          'El show sucede una sola vez, y la mitad de la sala lo mira a través de un celular. Las pantallas levantadas rompen la conexión con el escenario, las filtraciones arruinan estrenos y sorpresas, y la experiencia colectiva — esa por la que la gente pagó una entrada — se diluye en miles de grabaciones verticales que nadie va a volver a ver.',
        beneficios: [
          {
            icon: 'heart',
            titulo: 'Presencia total del público',
            texto: 'Sin pantallas en alto, la energía vuelve a la sala. El público canta, baila y mira el escenario — no una previsualización de cámara.',
          },
          {
            icon: 'spark',
            titulo: 'Una experiencia irrepetible',
            texto: 'Lo que pasa en el show queda en el show. La exclusividad de la experiencia en vivo se convierte en el mejor argumento de venta de la próxima fecha.',
          },
          {
            icon: 'lock',
            titulo: 'El contenido del artista, protegido',
            texto: 'Sin grabaciones no autorizadas ni spoilers: estrenos, bises y momentos especiales no se filtran a redes antes de tiempo.',
          },
          {
            icon: 'shield',
            titulo: 'Más seguridad, menos distracción',
            texto: 'Un público presente es un público más atento a su entorno. Menos incidentes, menos fricción con seguridad, mejor experiencia para todos.',
          },
        ],
        comoFunciona: [
          { titulo: 'En el acceso', texto: 'Cada asistente coloca su celular en una funda NOUFON al ingresar. Tarda segundos y el teléfono nunca cambia de manos.' },
          { titulo: 'Durante el show', texto: 'El forro Faraday bloquea señal y la funda magnética permanece cerrada. El público conserva su dispositivo, sin poder usarlo.' },
          { titulo: 'A la salida', texto: 'Estaciones de desbloqueo en los accesos liberan la funda al instante. Sin filas de retiro ni custodia de objetos.' },
        ],
        faqs: [
          { q: '¿Y si alguien necesita usar su teléfono durante el evento?', a: 'Se definen zonas de uso (foyer, barras o accesos) con estaciones de desbloqueo. Cualquier asistente puede salir, desbloquear su funda, usar el teléfono y volver a entrar.' },
          { q: '¿Cuánto demora el ingreso?', a: 'El enfundado tarda menos que un control de tickets: el asistente guarda su propio teléfono y sigue caminando. No hay registro ni depósito.' },
          { q: '¿Funciona para eventos de cualquier tamaño?', a: 'Sí. El sistema escala desde eventos privados de 50 personas hasta conciertos. Cotizamos por volumen y duración.' },
        ],
        seo: {
          title: 'Eventos y conciertos libres de celulares | NOUFON',
          description: 'Fundas magnéticas con bloqueo de señal para shows en vivo: público presente, contenido protegido y una experiencia que solo pasa ahí.',
          keywords: ['eventos sin celulares', 'conciertos sin celulares', 'fundas para eventos'],
        },
      },
    },
  },

  // ── EXÁMENES INTERNACIONALES ──────────────────────────────────────────────
  {
    slug: 'examenes-internacionales',
    heroImage: '/assets/verticales/examenes-hero.jpg',
    galeria: [
      '/assets/verticales/examenes-hojas.jpg',
      '/assets/verticales/examenes-ingreso.jpg',
      '/assets/verticales/examenes-supervisor.jpg',
    ],
    ctaHref: '/contacto?vertical=examenes-internacionales',
    locales: {
      es: {
        nav: 'Exámenes internacionales',
        h1: 'EXÁMENES INTERNACIONALES',
        kicker: 'IELTS · TOEFL · Cambridge · SAT · GMAT',
        valueProp: 'Integridad del examen garantizada, certificación que vale.',
        ctaLabel: 'Asegurá la integridad de tu examen',
        ctaSecundario: 'Pedí un piloto',
        problemaTitulo: 'Un solo dispositivo puede costar la acreditación del centro.',
        problema:
          'Los boards internacionales — Cambridge, IELTS, College Board — exigen protocolos anti-fraude cada vez más estrictos. Un celular que entra a la sala es un riesgo doble: para la validez del examen de todos los candidatos y para la acreditación del centro. Y la alternativa tradicional, retener dispositivos, convierte al centro en custodio de cientos de equipos ajenos de alto valor.',
        beneficios: [
          {
            icon: 'signalOff',
            titulo: 'Cero posibilidad de fraude digital',
            texto: 'El forro Faraday bloquea WiFi, Bluetooth y datos. No hay forma de consultar, transmitir ni recibir información durante el examen.',
          },
          {
            icon: 'fileCheck',
            titulo: 'Protocolos de los boards, cumplidos',
            texto: 'El sistema documenta una política de dispositivos verificable, alineada con los requerimientos de Cambridge, IELTS, SAT y GMAT.',
          },
          {
            icon: 'hand',
            titulo: 'La posesión la conserva el candidato',
            texto: 'Sin custodia de bienes ajenos ni mesas llenas de teléfonos: cada candidato mantiene su dispositivo enfundado consigo.',
          },
          {
            icon: 'badge',
            titulo: 'La certificación, protegida',
            texto: 'Una sesión sin incidentes protege lo que más vale: la validez del resultado de cada candidato y la reputación del centro.',
          },
        ],
        comoFunciona: [
          { titulo: 'En el check-in', texto: 'Junto con la verificación de identidad, cada candidato coloca su celular en una funda NOUFON y la conserva consigo o bajo su asiento.' },
          { titulo: 'Durante el examen', texto: 'Los dispositivos quedan inertes: sin señal, sin notificaciones, sin acceso. Los supervisores se concentran en el examen, no en vigilar bolsillos.' },
          { titulo: 'Al finalizar', texto: 'Los candidatos desbloquean su funda en la estación de salida y se retiran con su teléfono. Sin filas de devolución ni reclamos.' },
        ],
        faqs: [
          { q: '¿El sistema cumple con los requisitos de Cambridge / IELTS?', a: 'NOUFON implementa el principio que exigen los boards: ningún dispositivo accesible ni conectado durante la sesión. Entregamos documentación del protocolo para presentar ante el board correspondiente.' },
          { q: '¿Qué pasa con relojes inteligentes y otros dispositivos?', a: 'Las fundas admiten smartwatches, auriculares y dispositivos pequeños. Todo lo que emite señal entra en la funda.' },
          { q: '¿El centro asume responsabilidad por los equipos?', a: 'No. Esa es la diferencia clave con la retención: el candidato nunca entrega su dispositivo, por lo que el centro no custodia bienes ajenos.' },
        ],
        seo: {
          title: 'Integridad en exámenes internacionales | NOUFON',
          description: 'Fundas con bloqueo de señal para centros de examen IELTS, TOEFL, Cambridge, SAT y GMAT: cero fraude digital sin custodiar dispositivos.',
          keywords: ['seguridad examen internacional', 'celulares examen', 'protocolo anti fraude examen'],
        },
      },
    },
  },

  // ── TEATROS Y ESPECTÁCULOS ────────────────────────────────────────────────
  {
    slug: 'teatros',
    heroImage: '/assets/verticales/teatros-hero.jpg',
    galeria: [
      '/assets/verticales/teatros-publico.jpg',
      '/assets/verticales/teatros-actores.jpg',
      '/assets/verticales/teatros-foyer.jpg',
    ],
    ctaHref: '/contacto?vertical=teatros',
    locales: {
      es: {
        nav: 'Teatros',
        h1: 'TEATROS Y ESPECTÁCULOS',
        kicker: 'Artes escénicas en vivo',
        valueProp: 'Que la obra se respete y el público se sumerja.',
        ctaLabel: 'Llevá NOUFON a tu sala',
        ctaSecundario: 'Pedí un piloto',
        problemaTitulo: 'Una pantalla encendida rompe lo que el teatro tarda una hora en construir.',
        problema:
          'La inmersión es el activo central del teatro: se construye escena por escena y se destruye con un solo brillo de pantalla en la tercera fila. A eso se suman las grabaciones no autorizadas de estrenos que circulan antes de la segunda función, y un reclamo cada vez más explícito de directores e intérpretes: queremos funciones sin celulares.',
        beneficios: [
          {
            icon: 'moon',
            titulo: 'Sala sin luces de pantalla',
            texto: 'La oscuridad de la sala vuelve a ser total. La luz pertenece al escenario y la atención del público también.',
          },
          {
            icon: 'eye',
            titulo: 'Inmersión total del público',
            texto: 'Sin la tentación del bolsillo vibrando, el espectador entra en la obra y se queda ahí hasta el aplauso final.',
          },
          {
            icon: 'mic',
            titulo: 'Respeto a los intérpretes',
            texto: 'Los actores trabajan frente a personas, no frente a lentes. El pedido expreso de artistas y directores, cumplido de forma estructural.',
          },
          {
            icon: 'lock',
            titulo: 'Material de estreno protegido',
            texto: 'Sin grabaciones piratas: el texto, la puesta y las sorpresas de la obra llegan al público como el director quiso.',
          },
        ],
        comoFunciona: [
          { titulo: 'En el foyer', texto: 'Al cortar ticket, cada espectador desliza su celular en una funda NOUFON y la guarda en su bolsillo o cartera.' },
          { titulo: 'Durante la función', texto: 'El dispositivo queda mudo y oscuro: sin señal, sin notificaciones, sin tentación. La sala completa, en la obra.' },
          { titulo: 'Al salir', texto: 'Estaciones de desbloqueo en el foyer liberan las fundas a la salida — justo a tiempo para la foto con la marquesina.' },
        ],
        faqs: [
          { q: '¿Cómo reacciona el público?', a: 'Con sorpresa al principio y agradecimiento al final: la experiencia de una sala completamente oscura y en silencio se volvió tan rara que se siente premium. Muchas salas lo comunican como un diferencial de la función.' },
          { q: '¿Sirve para funciones puntuales o solo por temporada?', a: 'Ambas. Hay producciones que lo usan solo en estrenos y avant-premieres, y salas que lo adoptan para toda la temporada.' },
        ],
        seo: {
          title: 'Teatros y espectáculos libres de celulares | NOUFON',
          description: 'Funciones sin pantallas ni grabaciones piratas: fundas magnéticas con bloqueo de señal para salas de teatro y espectáculos en vivo.',
          keywords: ['teatro sin celulares', 'funciones sin celulares', 'grabaciones no autorizadas teatro'],
        },
      },
    },
  },

  // ── CORPORATIVO ───────────────────────────────────────────────────────────
  {
    slug: 'corporativo',
    heroImage: '/assets/verticales/corporativo-hero.jpg',
    galeria: [
      '/assets/verticales/corporativo-workshop.jpg',
      '/assets/verticales/corporativo-directorio.jpg',
      '/assets/verticales/corporativo-oficina.jpg',
    ],
    ctaHref: '/contacto?vertical=corporativo',
    locales: {
      es: {
        nav: 'Corporativo',
        h1: 'REUNIONES CORPORATIVAS',
        kicker: 'Profesional · Oficinas',
        valueProp: 'Reuniones confidenciales y con foco real.',
        ctaLabel: 'Protegé tus reuniones',
        ctaSecundario: 'Pedí un piloto',
        problemaTitulo: 'La información más sensible de tu empresa viaja en los bolsillos de la sala.',
        problema:
          'Cada celular en una reunión de directorio es un micrófono, una cámara y un canal de salida. Las filtraciones de información sensible rara vez son sofisticadas: una foto a una pantalla, una grabación discreta, un mensaje en el momento equivocado. Y aun sin mala intención, una sala donde todos miran su teléfono es una sala donde nadie está presente — y la reunión dura el doble.',
        beneficios: [
          {
            icon: 'lock',
            titulo: 'Confidencialidad asegurada',
            texto: 'Sin cámaras, micrófonos ni canales de salida activos en la sala. Lo que se discute en la reunión queda en la reunión.',
          },
          {
            icon: 'clock',
            titulo: 'Reuniones más cortas y productivas',
            texto: 'Sin el ping-pong de notificaciones, las decisiones se toman antes. Equipos que usan espacios sin celulares reportan reuniones notablemente más breves.',
          },
          {
            icon: 'fileCheck',
            titulo: 'Cumplimiento de políticas de seguridad',
            texto: 'NOUFON convierte la política de "no dispositivos" de tu área de seguridad de la información en un mecanismo físico verificable.',
          },
          {
            icon: 'users',
            titulo: 'Equipos presentes',
            texto: 'La señal cultural es clara: este tiempo es para pensar juntos. La calidad de la conversación cambia desde la primera reunión.',
          },
        ],
        comoFunciona: [
          { titulo: 'Al entrar a la sala', texto: 'Cada participante coloca su celular en una funda NOUFON y la conserva consigo. Nadie entrega su dispositivo.' },
          { titulo: 'Durante la reunión', texto: 'El forro Faraday corta toda señal: sin grabaciones, sin fotos, sin mensajes salientes. La sala queda sellada digitalmente.' },
          { titulo: 'Al terminar', texto: 'La estación de desbloqueo en la puerta libera las fundas en segundos. El protocolo completo agrega menos de un minuto.' },
        ],
        faqs: [
          { q: '¿Y si alguien espera una llamada urgente?', a: 'La recepción o asistente de la sala puede mantener un canal de contacto de emergencia. El participante sale, desbloquea su funda en la estación y atiende afuera.' },
          { q: '¿Sirve para off-sites y town halls?', a: 'Sí. Además de salas de directorio, el sistema se usa en off-sites, capacitaciones y eventos internos donde el foco o la confidencialidad importan.' },
        ],
        seo: {
          title: 'Reuniones corporativas sin celulares | NOUFON',
          description: 'Confidencialidad y foco para reuniones de directorio y oficinas: fundas con bloqueo de señal, sin custodia de dispositivos.',
          keywords: ['reuniones confidenciales', 'seguridad de la información reuniones', 'oficina sin celulares'],
        },
      },
    },
  },

  // ── EMBAJADAS / DIPLOMACIA ────────────────────────────────────────────────
  {
    slug: 'embajadas',
    heroImage: '/assets/verticales/embajadas-hero.jpg',
    galeria: [
      '/assets/verticales/embajadas-bilateral.jpg',
      '/assets/verticales/embajadas-delegacion.jpg',
      '/assets/verticales/embajadas-hero.jpg',
    ],
    ctaHref: '/contacto?vertical=embajadas',
    locales: {
      es: {
        nav: 'Embajadas',
        h1: 'EMBAJADAS Y DIPLOMACIA',
        kicker: 'Profesional · Diplomacia',
        valueProp: 'Reuniones diplomáticas con confidencialidad absoluta.',
        ctaLabel: 'Consultá por tu embajada',
        ctaSecundario: 'Pedí un piloto',
        problemaTitulo: 'En diplomacia, un celular activo es un canal abierto.',
        problema:
          'Cada teléfono que entra a una reunión de alto nivel es un micrófono, una cámara y una vía de salida de información. Las filtraciones diplomáticas rara vez requieren sofisticación: una foto a un documento, una grabación discreta, una notificación leída por la persona equivocada. Y la alternativa de retener dispositivos en recepción es delicada cuando se trata de delegaciones extranjeras, funcionarios y visitas oficiales.',
        beneficios: [
          {
            icon: 'lock',
            titulo: 'Confidencialidad de nivel de Estado',
            texto: 'Sin cámaras, micrófonos ni canales de salida activos en la sala. Lo que se conversa en la reunión queda en la reunión.',
          },
          {
            icon: 'globe',
            titulo: 'Protocolo respetado',
            texto: 'Nadie entrega su dispositivo: cada diplomático o visita conserva su teléfono enfundado. Sin fricciones de cortesía ni custodia de equipos de terceros.',
          },
          {
            icon: 'fileCheck',
            titulo: 'Cumplimiento de protocolos de seguridad',
            texto: 'El sistema convierte la política de "sin dispositivos" en un mecanismo físico verificable, exigible también a visitas y proveedores.',
          },
          {
            icon: 'users',
            titulo: 'Reuniones presentes y ágiles',
            texto: 'Sin pantallas sobre la mesa, las conversaciones sensibles avanzan más rápido y con la atención completa de todas las partes.',
          },
        ],
        comoFunciona: [
          { titulo: 'En la recepción', texto: 'Junto al control de acceso existente, cada persona coloca su celular en una funda NOUFON y la lleva consigo durante toda la visita.' },
          { titulo: 'Durante la reunión', texto: 'El forro Faraday corta WiFi, Bluetooth y datos: sin grabaciones, sin fotos, sin transmisiones. La sala queda sellada digitalmente.' },
          { titulo: 'A la salida', texto: 'La estación de desbloqueo libera la funda en segundos. Sin depósitos, sin tickets, sin demoras protocolares.' },
        ],
        faqs: [
          { q: '¿Cómo se manejan las excepciones (seguridad, personal autorizado)?', a: 'El protocolo admite excepciones definidas por la sede: el personal autorizado se identifica en el acceso y conserva sus dispositivos operativos.' },
          { q: '¿Es apropiado pedirle esto a una delegación extranjera?', a: 'Esa es la ventaja frente a la retención: nadie entrega su teléfono ni queda registrado. Conservar el dispositivo enfundado es una cortesía aceptable y cada vez más habitual en reuniones sensibles.' },
          { q: '¿Requiere obras o instalación en el edificio?', a: 'No. El sistema es portátil: fundas y estaciones de desbloqueo se despliegan en los accesos existentes sin intervención edilicia.' },
        ],
        seo: {
          title: 'Embajadas y diplomacia sin celulares | NOUFON',
          description: 'Reuniones diplomáticas con confidencialidad absoluta: fundas con bloqueo de señal, sin custodiar dispositivos de delegaciones ni visitas.',
          keywords: ['seguridad embajadas', 'reuniones diplomáticas confidenciales', 'celulares en embajadas'],
        },
      },
    },
  },
];

export type Locale = 'es';

export function getVertical(slug: string, locale: Locale = 'es') {
  const v = verticales.find((x) => x.slug === slug);
  if (!v) return null;
  return { ...v, copy: v.locales[locale] };
}

export function getAllVerticales(locale: Locale = 'es') {
  return verticales.map((v) => ({ ...v, copy: v.locales[locale] }));
}
