# 🎛️ Panel de contenido — Guía de uso

Cómo editar la web desde `noufon.com/admin` sin tocar código.

---

## 1. Activarlo (una sola vez, ~5 minutos)

El panel ya está instalado, pero necesita que le des permiso para hablar con
GitHub. Son dos pasos.

### Paso A — Crear la aplicación OAuth en GitHub

1. Entrá a **https://github.com/settings/developers** → *OAuth Apps* →
   **New OAuth App**.
2. Completá:
   - **Application name:** `NOUFON Panel`
   - **Homepage URL:** `https://noufon.com`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
     ⚠️ Este valor va exactamente así.
3. **Register application**.
4. Guardá el **Client ID**. Hacé clic en *Generate a new client secret* y
   guardá también el **Client Secret** (se muestra una sola vez).

### Paso B — Cargarlos en Netlify

1. Netlify → tu sitio → **Project configuration** → **Access & security** →
   **OAuth**.
2. **Install provider** → elegí **GitHub**.
3. Pegá el *Client ID* y el *Client Secret* del paso A. Guardá.

Listo. Entrá a **https://noufon.com/admin** → *Login with GitHub* → autorizá.

> Mientras no completes estos pasos, el panel abre pero el botón de login da
> error. No es un problema del sitio.

---

## 2. Cómo funciona (el concepto)

Esto es lo importante para entender por qué es seguro y por qué a veces los
cambios tardan un par de minutos:

```
Vos editás en /admin
        ↓
El panel guarda el cambio como un commit en GitHub
        ↓
Netlify detecta el commit y reconstruye la web
        ↓
La web live se actualiza (1 a 3 minutos)
```

**El panel no toca la web directamente.** Escribe en GitHub, que es la fuente
de verdad. Por eso:

- ✅ Todo cambio queda registrado y es **reversible**.
- ✅ Si algo sale mal, volvés al deploy anterior en un clic.
- ✅ No hay base de datos que se pueda corromper o hackear.
- ⏱️ Los cambios **no son instantáneos**: tardan lo que tarda el build.

Si guardás y no ves el cambio, esperá 2 minutos y refrescá con `Cmd+Shift+R`.
En Netlify → *Deploys* podés ver el progreso en vivo.

---

## 3. Qué podés editar

### 📄 Inicio
Todos los textos de la portada: el título grande, la tesis, la cinta
deslizante de atributos, los **porcentajes** (84% / 72% / 68%), los 3 pasos de
"Cómo funciona", las imágenes del comparador antes/después y el video.

> Para el video: tiene que ser un enlace **de tipo embed**, así:
> `https://www.youtube.com/embed/BU4OpfYtV3k`
> Si copiás el enlace normal de YouTube (`watch?v=...`) no va a funcionar. El
> código es el mismo, solo cambia el formato.

### 🏢 Soluciones
Las 6 páginas de espacios (Colegios, Eventos, Exámenes, Teatros, Corporativo,
Embajadas). De cada una podés cambiar títulos, el problema, los 4 beneficios,
los 3 pasos, la galería de fotos, las preguntas frecuentes y el SEO.

**Podés crear soluciones nuevas.** Al crear una, el campo *Identificador*
define la dirección (ej. `hospitales` → `noufon.com/hospitales`) y la solución
aparece **sola** en el menú "Soluciones", en el pie de página, en el hub y en
el mapa del sitio. No hay que tocar nada más.

### ✍️ Blog
Crear y editar notas. Al publicar una nota nueva se genera su página, aparece
en el listado y entra al mapa del sitio automáticamente.

Las 5 notas antiguas (Ley 15.534, Pergolini, UNESCO, Yondr, confiscación) son
páginas históricas y **no** se editan desde el panel: se conservan intactas
porque ya tienen posicionamiento en Google.

### ⚙️ Ajustes
Email de contacto que se muestra, WhatsApp y redes sociales.

> ⚠️ Cambiar el email acá cambia el que **se muestra** en la web. El email al
> que **llegan** los formularios se configura en Netlify (variable
> `CONTACT_EMAIL_TO`), por seguridad.

---

## 4. Subir imágenes

En cualquier campo de imagen: *Choose an image* → *Upload*. Se guardan en
`/uploads` y quedan disponibles para reutilizar.

**Antes de subir, comprimí las fotos.** Una foto de cámara pesa 5 MB y hace
lenta la web. Ideal: máximo 1920px de ancho y menos de 300 KB.
[Squoosh](https://squoosh.app) lo hace gratis en el navegador.

---

## 5. Probar cambios sin publicar

Para editar en tu compu sin que se publique nada, en dos terminales:

```bash
# Terminal 1
cd ~/noufon-website-2026 && npx decap-server

# Terminal 2
cd ~/noufon-website-2026 && npm run dev
```

Entrá a `http://localhost:3000/admin/index.html`. Los cambios se guardan en tu
disco, **no** en GitHub, y no afectan la web live.

> En `npm run dev` la dirección es `/admin/index.html` (con el archivo al
> final). En la web publicada alcanza con `/admin`.

---

## 6. Dudas frecuentes

**¿Puedo romper la web editando?**
Es muy difícil. El panel solo te deja cambiar textos e imágenes, no código. Y
si algo se ve mal, Netlify → *Deploys* → *Publish deploy* del anterior.

**¿Alguien más puede entrar a /admin?**
Puede abrir la página, pero no puede guardar nada sin una cuenta de GitHub con
acceso al repositorio. Ver `SEGURIDAD.md`.

**¿Cómo le doy acceso a Ignacio?**
GitHub → repositorio → Settings → Collaborators → agregalo con su cuenta.
Entra a `/admin` con su propio GitHub y cada cambio queda a su nombre.

**Edité pero no veo el cambio.**
Esperá 2 minutos (el build) y refrescá con `Cmd+Shift+R`. Si sigue igual,
revisá en Netlify → *Deploys* si el build falló.
