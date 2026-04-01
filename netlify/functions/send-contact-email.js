const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const data = JSON.parse(event.body);

    if (!data.nombre || !data.email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Nombre y email son requeridos' }) };
    }

    // Sanitizar campos
    const nombre   = String(data.nombre   || '').slice(0, 200);
    const apellido = String(data.apellido || data.apellidos || '').slice(0, 200);
    const email    = String(data.email    || '').slice(0, 200);
    const colegio  = String(data.colegio  || '').slice(0, 300);
    const telefono = String(data.telefono || '').slice(0, 50);
    const cargo    = String(data.cargo    || '').slice(0, 100);
    const mensaje  = String(data.mensaje  || '').slice(0, 2000);

    const emailHTML = `
<!DOCTYPE html>
<html lang="es">
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
  <div style="background: #0F2D3D; padding: 20px 24px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #2DD4BF; margin: 0; font-size: 1.4rem;">Nuevo contacto desde NOUFON</h1>
  </div>
  <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0; border-top: none;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; width: 130px; color: #555;">Nombre:</td>
        <td style="padding: 8px 0;">${nombre} ${apellido}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
        <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2DD4BF;">${email}</a></td>
      </tr>
      ${colegio ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Colegio:</td><td style="padding: 8px 0;">${colegio}</td></tr>` : ''}
      ${telefono ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Teléfono:</td><td style="padding: 8px 0;">${telefono}</td></tr>` : ''}
      ${cargo ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Cargo:</td><td style="padding: 8px 0;">${cargo}</td></tr>` : ''}
      ${mensaje ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555; vertical-align: top;">Mensaje:</td><td style="padding: 8px 0;">${mensaje}</td></tr>` : ''}
    </table>
    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
    <p style="margin: 0; font-size: 0.9rem; color: #888;">
      Respondé directamente a: <a href="mailto:${email}" style="color: #2DD4BF;">${email}</a>
    </p>
  </div>
</body>
</html>`;

    const confirmacionHTML = `
<!DOCTYPE html>
<html lang="es">
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
  <div style="background: #0F2D3D; padding: 20px 24px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #2DD4BF; margin: 0; font-size: 1.4rem;">NOUFON</h1>
  </div>
  <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0; border-top: none;">
    <p>Hola ${nombre},</p>
    <p>Recibimos tu consulta. Te respondemos en menos de 24 horas hábiles.</p>
    <p>Si preferís, podés escribirnos directamente a <a href="mailto:info@noufon.com" style="color: #2DD4BF;">info@noufon.com</a>.</p>
    <p style="margin-top: 24px; color: #555;">El equipo de NOUFON</p>
  </div>
</body>
</html>`;

    // Email a Giuliano
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'info@noufon.com',
      to: 'info@noufon.com',
      replyTo: email,
      subject: `Nuevo contacto: ${nombre} ${apellido}${colegio ? ' — ' + colegio : ''}`,
      html: emailHTML
    });

    // Confirmación al usuario
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'info@noufon.com',
      to: email,
      subject: 'Recibimos tu consulta — NOUFON',
      html: confirmacionHTML
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('send-contact-email error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error interno al enviar el email' })
    };
  }
};
