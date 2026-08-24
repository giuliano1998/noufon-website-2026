# 🔐 Seguridad — NOUFON Website

Documento para Giuliano. Explica **por qué el sitio es difícil de hackear**,
**qué se arregló** y **qué depende de vos**.

Última revisión: 2026-08-24

---

## 1. Por qué este sitio es difícil de atacar

La mayoría de las webs se hackean por tres vías: la base de datos, el panel de
administración con usuario y contraseña, o un plugin desactualizado
(el clásico caso de WordPress). **Este sitio no tiene ninguna de las tres.**

| Vector de ataque habitual | ¿Aplica acá? | Por qué |
|---|---|---|
| Inyección SQL | ❌ No | No hay base de datos. |
| Robo de contraseñas de admin | ❌ No | No existe usuario/contraseña propio: la identidad la maneja GitHub. |
| Plugins vulnerables | ❌ No | No hay plugins ni WordPress. |
| Subida de archivos maliciosos | ❌ No | Las imágenes se suben vía GitHub, no a un servidor propio. |
| Defacement (cambiar la web) | ⚠️ Solo con acceso a GitHub | Todo cambio queda versionado y es reversible en un clic. |

El sitio es **HTML estático**: se genera durante el build y se sirve como
archivos. No hay código ejecutándose en un servidor esperando peticiones,
salvo **una sola función** (el formulario de contacto), que es la que se
revisó y endureció.

---

## 2. Vulnerabilidades encontradas y corregidas

Auditoría del 2026-08-24 sobre `netlify/functions/send-contact-email.js`.

### 🔴 CRÍTICA — El formulario servía como relay de spam

**El problema:** el endpoint enviaba un email de confirmación a la dirección
que le pasaran, sin ningún límite. Cualquiera podía escribir un script y hacer
que **tu casilla de Gmail enviara miles de correos** a direcciones arbitrarias.

**Las consecuencias reales:** Gmail te marca como fuente de spam, tu dominio
entra en listas negras y **los emails de tus clientes reales dejan de llegar**.
En el peor caso, Google suspende la cuenta.

**Corregido con:** límite de 5 envíos por IP cada 10 minutos, campo trampa
anti-bots, verificación de que el envío venga realmente de noufon.com, y
contenido del email de confirmación fijo (no manipulable).

### 🟠 ALTA — Se filtraban detalles internos del servidor

**El problema:** cuando algo fallaba, la respuesta al navegador incluía el
*stack trace* completo: rutas de archivos del servidor, versiones de librerías
y estructura interna. Es la información que un atacante usa para encontrar el
siguiente agujero.

**Corregido con:** el detalle queda solo en los logs privados de Netlify; al
visitante se le devuelve un mensaje genérico.

### 🟠 ALTA — Sin límite de tamaño ni de frecuencia

**El problema:** se podía enviar un mensaje de varios megabytes o golpear el
endpoint miles de veces, agotando la cuota de envío y el presupuesto de
funciones de Netlify.

**Corregido con:** cuerpo máximo de 8 KB y límite por campo (el mensaje tope
3.000 caracteres).

### 🟡 MEDIA — Inyección de HTML en los emails

**El problema:** lo que escribía el visitante se insertaba tal cual en el HTML
del email que vos recibís. Alguien podía inyectar enlaces falsos o contenido
engañoso en un correo que parece venir de tu propio formulario.

**Corregido con:** todo el texto se escapa antes de armar el email. También se
eliminan los saltos de línea del asunto, que permitían *inyección de cabeceras
SMTP* (una técnica para agregar destinatarios ocultos).

### 🟡 MEDIA — Credenciales y datos personales en los logs

**El problema:** la función registraba `SMTP_USER` y el contenido completo de
cada formulario (nombre, email, teléfono) en los logs de Netlify.

**Corregido con:** no se registra ninguna credencial ni dato personal. Además
de seguridad, es coherente con tu Política de Privacidad.

---

## 3. Cómo se protege el panel `/admin`

El panel es una página pública, pero **no contiene ni un solo secreto**.

1. **No hay contraseña que robar.** El panel no guarda usuarios. Para grabar
   cambios te pide iniciar sesión **con GitHub**. Si alguien entra a
   `noufon.com/admin`, ve una pantalla de login y nada más.
2. **El permiso lo da GitHub.** Solo las cuentas con acceso de escritura al
   repositorio `giuliano1998/noufon-website-2026` pueden guardar.
3. **El secreto vive en el servidor.** La clave del OAuth queda guardada en la
   configuración de Netlify, nunca viaja al navegador.
4. **Todo queda auditado.** Cada cambio es un commit de Git: se ve quién lo
   hizo, cuándo y qué tocó. Y se revierte en un clic.
5. **Versión fijada.** El panel carga Decap CMS `3.15.1` exacto, no `latest`.
   Si mañana alguien comprometiera esa librería, tu sitio no adoptaría el
   código nuevo automáticamente.
6. **Cabeceras de blindaje** (en `netlify.toml`): `noindex` para que no
   aparezca en Google, `X-Frame-Options: DENY` para impedir *clickjacking*
   (que un sitio malicioso incruste tu panel invisible y te robe los clics), y
   `no-store` para que no quede cacheado.

> **La llave del reino es tu cuenta de GitHub.** Todo lo anterior se apoya en
> eso. Ver punto 5.

---

## 4. Dónde viven los secretos

| Secreto | Dónde está | ¿Lo ve el público? |
|---|---|---|
| Contraseña SMTP | Variables de entorno de Netlify | ❌ Nunca |
| Usuario SMTP | Variables de entorno de Netlify | ❌ Nunca |
| Secreto de OAuth | Configuración de Netlify | ❌ Nunca |
| IDs de GTM / GA4 / Meta Pixel | En el HTML | ✅ Sí, y está bien: son públicos por diseño |

**Auditoría realizada:** se revisó el repositorio completo y **todo el historial
de Git** buscando claves, tokens y archivos `.env`. **No hay ningún secreto
filtrado.** El archivo `.env.example` solo contiene valores de ejemplo.

⚠️ **Regla de oro:** nunca pegues una contraseña, token o clave en un archivo
del proyecto. Van siempre en Netlify → *Environment variables*. Una vez que un
secreto entra en el historial de Git, queda ahí para siempre aunque lo borres.

---

## 5. Lo que depende de vos (importante)

Toda la seguridad del panel se apoya en tu cuenta de GitHub. Tres cosas:

- [ ] **Activá 2FA en GitHub.** Es lo más importante de esta lista.
      GitHub → Settings → Password and authentication → Two-factor.
      Sin esto, quien tenga tu contraseña puede editar la web.
- [ ] **Activá 2FA en Netlify.** Ahí viven las credenciales SMTP.
- [ ] **No compartas tu usuario.** Si Ignacio necesita editar, agregalo como
      colaborador del repositorio con su propia cuenta. Así cada cambio queda
      registrado a nombre de quien lo hizo.

Y una recomendación sobre el email: la contraseña SMTP debería ser una
**contraseña de aplicación** de Google, no la de tu cuenta. Si se filtrara,
solo sirve para enviar mails y la revocás sin cambiar tu contraseña principal.

---

## 6. Qué hacer si algo sale mal

**Si la web muestra algo raro o rompida:**
Netlify → Deploys → buscá el último deploy que funcionaba → *Publish deploy*.
La web vuelve a ese estado en segundos.

**Si se publicó un texto equivocado desde el panel:**
Entrá al panel y corregilo, o revertí el commit en GitHub.

**Si sospechás que alguien accedió a tu GitHub:**
1. Cambiá la contraseña de GitHub y activá 2FA.
2. GitHub → Settings → Sessions → cerrá todas las sesiones.
3. Revisá el historial de commits del repositorio buscando cambios que no hiciste.
4. Netlify → rotá las variables SMTP (generá una contraseña de aplicación nueva).

---

## 7. Mejoras opcionales a futuro

Ninguna es urgente; quedan anotadas por si el sitio crece.

- **Content-Security-Policy global.** Blindaría contra XSS, pero hay que
  configurarla con cuidado para no romper GTM, GA4, Meta Pixel y YouTube.
- **Límite de envíos distribuido.** El actual funciona por instancia de la
  función. Con Netlify Blobs sería exacto. El actual alcanza para este volumen.
- **Flujo editorial en el panel.** Se puede activar para que los cambios pasen
  por una revisión antes de publicarse, en vez de ir directo a producción.
- **Self-hosting del panel.** Descargar Decap CMS al repositorio en vez de
  cargarlo desde un CDN externo elimina la dependencia de terceros.
