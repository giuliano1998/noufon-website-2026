'use strict';

const nodemailer = require('nodemailer');

/* ────────────────────────────────────────────────────────────────────────────
 * send-contact-email — Netlify Function (versión endurecida)
 *
 * Este archivo es el ÚNICO código del sitio con acceso a credenciales.
 * Principios de seguridad aplicados:
 *
 *  1. NO se registran credenciales ni datos personales en los logs.
 *  2. Toda entrada se valida, se acota en longitud y se ESCAPA antes de
 *     construir el HTML del email (evita inyección de HTML/enlaces).
 *  3. El asunto se sanea contra inyección de cabeceras SMTP (CR/LF).
 *  4. Límite de tasa por IP: evita que el endpoint se use como relay de spam
 *     o que agote la cuota diaria de envío de la casilla.
 *  5. Campo trampa (honeypot) para descartar bots.
 *  6. Verificación de origen: solo se aceptan envíos desde dominios propios.
 *  7. Los errores NUNCA devuelven stack traces ni detalles internos.
 * ──────────────────────────────────────────────────────────────────────────── */

const DESTINATARIO = process.env.CONTACT_EMAIL_TO || 'hola@noufonarg.com';

/** Dominios propios autorizados a enviar el formulario. */
const ORIGENES_PERMITIDOS = ['https://noufon.com', 'https://www.noufon.com'];

/** Límite de tasa: 5 envíos por IP cada 10 minutos. */
const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_IP = 5;

/** Tamaño máximo del cuerpo de la petición (8 KB). */
const MAX_BODY_BYTES = 8 * 1024;

/** Longitud máxima por campo. */
const LIMITES = {
  nombre: 120,
  email: 160,
  telefono: 40,
  colegio: 160,
  cargo: 120,
  mensaje: 3000,
};

/* ── Límite de tasa en memoria ────────────────────────────────────────────────
 * Best-effort: vive mientras el contenedor esté caliente. Frena ráfagas
 * automatizadas, que es el vector de abuso realista para un sitio de este
 * tamaño. Para un límite estricto y distribuido habría que usar Netlify Blobs.
 * ──────────────────────────────────────────────────────────────────────────── */
const golpes = new Map();

function superaLimite(ip) {
  const ahora = Date.now();
  const previos = (golpes.get(ip) || []).filter((t) => ahora - t < VENTANA_MS);

  // Limpieza oportunista para que el Map no crezca sin control.
  if (golpes.size > 500) {
    for (const [clave, marcas] of golpes) {
      if (!marcas.some((t) => ahora - t < VENTANA_MS)) golpes.delete(clave);
    }
  }

  if (previos.length >= MAX_POR_IP) {
    golpes.set(ip, previos);
    return true;
  }
  previos.push(ahora);
  golpes.set(ip, previos);
  return false;
}

/* ── Utilidades de saneamiento ─────────────────────────────────────────────── */

/** Escapa HTML: neutraliza cualquier etiqueta o atributo inyectado. */
function escaparHtml(valor) {
  return String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Recorta, acota y limpia caracteres de control de un campo de texto. */
function limpiarCampo(valor, maximo) {
  if (typeof valor !== 'string') return '';
  return valor
    .replace(/[\u0000-\u001F\u007F]/g, ' ') // quita control chars (incl. CR/LF)
    .trim()
    .slice(0, maximo);
}

/** Valida email de forma estricta y conservadora. */
function emailValido(email) {
  return /^[^\s@<>"']+@[^\s@<>"']+\.[A-Za-z]{2,}$/.test(email) && email.length <= LIMITES.email;
}

/** Respuesta JSON con cabeceras seguras. */
function responder(statusCode, cuerpo) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
    body: JSON.stringify(cuerpo),
  };
}

/** Acepta dominios propios y previews de Netlify; rechaza el resto. */
function origenPermitido(headers) {
  const origen = headers.origin || '';
  if (!origen) {
    // Sin cabecera Origin no se puede verificar. Los navegadores siempre la
    // envían en un POST con Content-Type: application/json, así que lo tratamos
    // como petición no-navegador y la rechazamos.
    return false;
  }
  if (ORIGENES_PERMITIDOS.includes(origen)) return true;
  // Deploy previews y rama de staging en Netlify.
  return /^https:\/\/[a-z0-9-]+\.netlify\.app$/.test(origen);
}

/* ── Transporte SMTP ──────────────────────────────────────────────────────── */

const puerto = parseInt(process.env.SMTP_PORT, 10) || 465;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: puerto,
  secure: puerto === 465, // 465 = TLS implícito; 587 = STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/* ── Handler ──────────────────────────────────────────────────────────────── */

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return responder(405, { error: 'Método no permitido' });
  }

  const headers = event.headers || {};

  if (!origenPermitido(headers)) {
    return responder(403, { error: 'Origen no autorizado' });
  }

  if (typeof event.body !== 'string' || Buffer.byteLength(event.body, 'utf8') > MAX_BODY_BYTES) {
    return responder(413, { error: 'Solicitud demasiado grande' });
  }

  const ip =
    headers['x-nf-client-connection-ip'] ||
    (headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    'desconocida';

  if (superaLimite(ip)) {
    return responder(429, { error: 'Demasiados envíos. Probá de nuevo en unos minutos.' });
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return responder(400, { error: 'Formato inválido' });
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return responder(400, { error: 'Formato inválido' });
  }

  // Campo trampa: invisible para personas, lo completan los bots.
  if (typeof data.website === 'string' && data.website.trim() !== '') {
    // Respondemos 200 para no darle información útil al bot.
    return responder(200, { success: true });
  }

  const campos = {
    nombre: limpiarCampo(data.nombre, LIMITES.nombre),
    email: limpiarCampo(data.email, LIMITES.email),
    telefono: limpiarCampo(data.telefono, LIMITES.telefono),
    colegio: limpiarCampo(data.colegio, LIMITES.colegio),
    cargo: limpiarCampo(data.cargo, LIMITES.cargo),
    mensaje: limpiarCampo(data.mensaje, LIMITES.mensaje),
  };

  if (campos.nombre.length < 2 || !emailValido(campos.email)) {
    return responder(400, { error: 'Revisá tu nombre y tu email.' });
  }

  const fila = (etiqueta, valor) =>
    `<p><strong>${etiqueta}:</strong> ${escaparHtml(valor || 'No indicado')}</p>`;

  const emailHTML = [
    '<h2>Nuevo contacto desde noufon.com</h2>',
    fila('Nombre', campos.nombre),
    fila('Email', campos.email),
    fila('Teléfono', campos.telefono),
    fila('Organización', campos.colegio),
    fila('Cargo', campos.cargo),
    fila('Mensaje', campos.mensaje),
    '<hr />',
    `<p style="color:#666;font-size:12px">Respondé directamente a ${escaparHtml(campos.email)}</p>`,
  ].join('\n');

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: DESTINATARIO,
      replyTo: campos.email,
      // El asunto ya viene sin CR/LF por limpiarCampo(): sin inyección de cabeceras.
      subject: `Nuevo contacto: ${campos.nombre}`,
      html: emailHTML,
    });

    // Confirmación al visitante. Contenido fijo: aunque alguien fuerce la
    // dirección, no puede usar el endpoint para enviar mensajes arbitrarios.
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: campos.email,
      subject: 'Recibimos tu consulta — NOUFON',
      html:
        '<p>¡Gracias por escribirnos! Recibimos tu consulta y te respondemos ' +
        'en menos de 24 horas hábiles.</p><p>— Equipo NOUFON</p>',
    });

    return responder(200, { success: true });
  } catch (error) {
    // El detalle queda solo en los logs de Netlify, nunca viaja al cliente.
    console.error('Fallo al enviar el formulario:', error.message);
    return responder(502, { error: 'No pudimos enviar tu consulta. Probá de nuevo en unos minutos.' });
  }
};
