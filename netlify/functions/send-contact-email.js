const nodemailer = require('nodemailer');

console.log('Function iniciada');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_USER:', process.env.SMTP_USER);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

exports.handler = async (event) => {
  console.log('POST recibido');

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    console.log('Datos recibidos:', data);

    if (!data.nombre || !data.email) {
      console.log('Faltan campos requeridos');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Nombre y email requeridos' })
      };
    }

    const emailHTML = `
      <h2>Nuevo contacto desde Noufon</h2>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Teléfono:</strong> ${data.telefono || 'No indicado'}</p>
      <p><strong>Colegio:</strong> ${data.colegio || 'No indicado'}</p>
      <p><strong>Cargo:</strong> ${data.cargo || 'No indicado'}</p>
      <p><strong>Mensaje:</strong> ${data.mensaje || 'No incluido'}</p>
    `;

    console.log('Intentando enviar email a info@noufon.com');

    const infoResult = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'hola@noufonarg.com',
      subject: `Nuevo contacto: ${data.nombre}`,
      html: emailHTML
    });

    console.log('Email enviado a info@noufon.com:', infoResult.messageId);

    const userResult = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: 'Recibimos tu consulta - Noufon',
      html: '<p>Gracias por contactarnos. Te responderemos pronto.</p>'
    });

    console.log('Email de confirmación enviado:', userResult.messageId);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('ERROR:', error.message);
    console.error('Stack:', error.stack);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        details: error.stack
      })
    };
  }
};
