# 🏗️ CLAUDE.md — NOUFON Website

> **Reescrito el 2026-08-24.** La versión anterior describía el sitio viejo
> (HTML vanilla, Brevo, rutas de `~/Desktop/noufon-web`) y generaba contexto
> contradictorio. Ese contenido quedó en el historial de Git.

---

## ⚠️ CÓMO TRABAJAR (leer primero)

### 🎯 REGLA #1: LECTURA ÚNICA
Leé este archivo **una sola vez** al inicio de la sesión y memorizá su
contenido. No lo releas en cada acción: consume tokens al pedo.

### 🎯 REGLA #2: MEMORIZAR ERRORES
Los errores de la sección **"Trampas conocidas"** ya se cometieron una vez.
Antes de cada acción, verificá mentalmente que no estés por repetir uno.
Si cometés uno nuevo, documentalo ahí mismo para que no vuelva a pasar.

### 🎯 REGLA #3: REPORTE AL CIERRE
Cada sesión termina con un `REPORT-YYYY-MM-DD.txt`. Ejecutá
`./generate-report.sh` para generar la plantilla, completala con lo que
realmente pasó (cambios, errores, testing, pendientes) y commiteala.
**Sin reporte = no hubo sesión.**

### 🎯 REGLA #4: EL PUSH ES DE GIULIANO
Claude **no tiene credenciales de GitHub**. Puede editar, compilar y
commitear, pero el `git push origin main` lo corre Giuliano en su Terminal.
Cuando algo "no se ve en la web", **lo primero que hay que revisar es si el
commit se subió**:

```bash
git log --oneline origin/main..HEAD   # si lista algo, falta pushear
```

---

## 📋 IDENTIDAD

**NOUFON** — sistema de fundas magnéticas con **forro Faraday** que bloquea
toda señal (WiFi, Bluetooth, datos) mientras **el usuario conserva la posesión
física de su dispositivo**. No confisca: bloquea.

- **Posicionamiento:** "Creamos espacios libres de celulares."
- **Tesis transversal:** *No es un problema de disciplina ni de reglas. Es
  estructural. NOUFON cambia la estructura del espacio para que la atención
  vuelva sola.*
- **Multi-vertical:** colegios, eventos, exámenes internacionales, teatros,
  corporativo y embajadas. Educación es **una vertical más**, no la única.
- **Cada vertical comunica CONSECUENCIAS POSITIVAS** del espacio sin celular,
  nunca features del producto.
- **Tono:** español rioplatense, "vos", directo, orientado a resultados
  medibles. Nunca corporativo genérico.

| | |
|---|---|
| Web | https://noufon.com |
| Panel de contenido | https://noufon.com/admin |
| Repo | `giuliano1998/noufon-website-2026` (rama `main`) |
| Hosting | Netlify — proyecto `polite-faun-a9dba1` |
| Carpeta local | `~/noufon-website-2026` |
| Email | hola@noufonarg.com |
| WhatsApp | +54 9 11 6451-8851 |
| Socios | Giuliano Raschetti · Ignacio Gianetto |

---

## ⚙️ STACK

- **Next.js 15** (App Router) con `output: 'export'` → **sitio 100% estático**
- **React 19** · **TypeScript** · **GSAP 3** (ScrollTrigger)
- **gray-matter** + **marked** (blog en markdown)
- **Decap CMS 3.15.1** (versión fijada) como panel de contenido
- **Netlify**: build `npm run build`, publica `out`
- **Una sola función de servidor**: `netlify/functions/send-contact-email.js`
- CSS propio en `app/globals.css`. **Sin Tailwind, sin preprocesadores.**

**NO hay Brevo.** El formulario manda un email por SMTP. Si algún documento
viejo menciona Brevo, está obsoleto.

---

## 🗂️ ARQUITECTURA EN CAPAS

```
content/          ← CONTENIDO (editable desde /admin, sin tocar código)
  home.json           portada: textos, stats, marquee, video
  site.json           email, WhatsApp, redes
  verticales/*.json   6 soluciones, una por archivo
  blog/*.md           notas (frontmatter + markdown)

lib/
  types.ts          tipos compartidos — SIN acceso a disco (client-safe)
  content.ts        loaders que leen /content en build (usa fs)
  site.ts           config técnica + evento cta_vertical (client-safe)

components/       15 componentes reutilizables
app/              una carpeta por ruta
public/
  admin/            panel Decap (index.html + config.yml)
  uploads/          imágenes subidas desde el panel
  *.html            6 páginas SEO históricas
```

### 🔑 Regla de oro
**El contenido no vive en el código.** Para cambiar un texto se edita
`/content`, nunca un `.tsx`. Todo es data-driven: agregar un `.json` en
`content/verticales/` crea la página y la suma **sola** al menú, al pie, al hub
y al sitemap. Agregar un `.md` en `content/blog/` publica la nota.

### Rutas (20 páginas estáticas)
`/` · `/espacios-libres-de-celulares/` · `/colegios/` `/eventos/`
`/examenes-internacionales/` `/teatros/` `/corporativo/` `/embajadas/` ·
`/blog/` · `/blog/<slug>/` · `/contacto/` (acepta `?vertical=` y `?piloto=1`) ·
`/leyes-celulares-argentina/` · `/admin/`

### Páginas históricas — NO TOCAR A LA LIGERA
Seis páginas viven como HTML estático en `public/` porque ya posicionan en
Google: `ley-15534-celulares-escuela`, `como-implementar-politica-de-celulares-en-escuela`,
`alternativa-confiscacion-celulares`, `noufon-mario-pergolini`,
`noufon-vs-yondr`, `politica-de-privacidad`.
Se enlazan **con `.html` al final**. Además hay un **301 de
`/fundas-para-colegios` → `/colegios/`** en `public/_redirects`. No romperlo.

---

## 🎨 DISEÑO (reglas no negociables)

### Paleta
```css
--teal: #2DD4BF;      /* acento de marca, con moderación */
--dark: #0F2D3D;      /* fondos profundos */
--white: #FFFFFF;
--text: #1a1a1a;
--gray: #f5f5f5;
--gray-mid: #e0e0e0;
/* teals profundos admitidos: #1A9083 · #22B5A3 */
```
Tipografía **Montserrat** vía `next/font`.

### PROHIBIDO (delata que lo hizo una IA)
- ❌ **Emojis en la interfaz.** Se usan los íconos SVG de línea de
  `components/Icons.tsx` (22 íconos, trazo 1.75, mismo tamaño). Cero excepciones.
  *(En documentación como este archivo sí se pueden usar.)*
- ❌ **Sopa de cards**: grillas de 3-4 cards idénticas con sombra y borde
  redondeado como recurso por defecto. Si hay cards, que tengan jerarquía real
  (bento asimétrico, tamaños distintos, patrón editorial).
- ❌ Gradientes morado/azul genéricos, glassmorphism gratuito, sombras exageradas.
- ❌ Secciones todas con el mismo ritmo. Alternar full-bleed, split 50/50,
  editorial a una columna, showcase.

### OBLIGATORIO
- Whitespace generoso, `max-width` de contenido ~1200px.
- Jerarquía tipográfica fuerte: titulares display grandes, mucho aire.
- Fondos: mesh teal→dark sutil + textura de grano sobre los fondos oscuros.
- GSAP + ScrollTrigger para reveals, siempre respetando `prefers-reduced-motion`.
- Imágenes con tratamiento consistente y overlay `--dark` para legibilidad.

**Referencias de calidad:** apple.com, linear.app, stripe.com, vercel.com.
**Test del olfato:** si una sección parece plantilla de IA, rehacela.

---

## 🔐 SEGURIDAD (leer antes de tocar la función de contacto)

Auditoría completa el 2026-08-24 → ver `SEGURIDAD.md`.

### Reglas absolutas
1. **NUNCA escribir una credencial en un archivo del proyecto.** Van en
   Netlify → *Environment variables*. Un secreto que entra al historial de Git
   queda ahí para siempre.
2. **No desarmar las protecciones** de `send-contact-email.js`: límite por IP,
   campo trampa anti-bots, verificación de origen, escapado de HTML,
   validación estricta, errores genéricos.
3. **Nunca loguear credenciales ni datos personales** en las funciones.
4. **Nunca devolver stack traces al cliente.**

### Por qué importa
El endpoint tenía una vulnerabilidad **crítica**: se podía usar como **relay de
spam**, lo que llevaría la casilla a listas negras y haría que **dejen de
llegar los leads reales**. Ya está corregido. No reintroducirlo.

### Variables de entorno (nombres, nunca valores)
`SMTP_HOST` · `SMTP_PORT` · `SMTP_USER` · `SMTP_PASSWORD` · `SMTP_FROM` ·
`CONTACT_EMAIL_TO`

### IDs públicos (viajan al navegador por diseño, no son secretos)
GTM `GTM-PHK2V9FW` · GA4 `G-F8M4H4579R` · Meta Pixel `1958970012160530`

---

## 🐛 TRAMPAS CONOCIDAS (memorizar — ya nos costaron tiempo)

### ❌ 1. El script de Decap va al FINAL DEL BODY, nunca en el head
En el head se ejecuta antes de que exista el body, Decap no encuentra dónde
montarse y **la página queda en blanco sin ningún error en consola**.
Síntoma: `window.CMS` es `undefined` y no existe el nodo `#nc-root`.

### ❌ 2. Los componentes `'use client'` NO pueden importar `lib/content.ts`
Usa `fs`. Deben recibir los datos **por props** desde un componente de
servidor. Así funcionan `Header` (recibe las verticales desde `layout.tsx`) y
`ContactForm` (recibe las etiquetas desde `app/contacto/page.tsx`).
Para tipos, importar de `lib/types.ts`, que es client-safe.

### ❌ 3. `public/admin/config.yml` debe declarar TODOS los campos
Un campo no declarado **se borra al guardar** desde el panel. Al agregar un
campo a un JSON de `/content`, agregarlo también al config.

### ❌ 4. El frontmatter YAML necesita comillas escapadas
Una bajada con `"` adentro rompe el build entero. Escribir `\"`.

### ❌ 5. En `npm run dev` el panel está en `/admin/index.html`
Next dev no sirve el `index.html` de subcarpetas de `public/` en `/admin/`.
En producción `/admin` funciona normal. Lo mismo aplica a las páginas
históricas: en dev hay que enlazarlas con `.html`.

### ❌ 6. La galería de las verticales es `[{src: "..."}]`
Objetos, no strings, porque lo requiere el widget `list` de Decap.
`lib/content.ts` la aplana a strings para el sitio.

### ❌ 8. Los slugs NO pueden tener tildes ni eñes
Un título con tildes generaba un archivo con tildes (`...la-lección-de-límites...`)
y **la nota aparecía en el listado pero su página daba 404**: el navegador pide
la URL codificada (`lecci%C3%B3n`) y Netlify no la hace coincidir con el archivo.
Corregido en `public/admin/config.yml` con `slug: {encoding: ascii,
clean_accents: true}`. Si se crea otra colección, verificar que herede esa config.

### ❌ 7. No correr `git push` en la ventana donde corre `npm run dev`
Esa terminal está ocupada por el servidor. Abrir una pestaña nueva.

---

## 🔄 WORKFLOW

```bash
cd ~/noufon-website-2026
npm install          # solo la primera vez
npm run dev          # http://localhost:3000
npm run build        # SIEMPRE verificar que compile antes de commitear
git push origin main # lo corre Giuliano → dispara el deploy
```

```
Editar → npm run build → commit → push → Netlify buildea → live (1-3 min)
```

### Al cerrar la sesión
1. `npm run build` en verde.
2. Verificar que no se rompió ninguna ruta existente.
3. Commit con mensaje descriptivo.
4. `./generate-report.sh` + completar el reporte + commitear.
5. Recordarle a Giuliano que haga el push.

### Si algo sale mal en producción
Netlify → *Deploys* → último deploy que funcionaba → *Publish deploy*.

---

## ✅ CHECKLIST ANTES DE DAR ALGO POR TERMINADO

- [ ] `npm run build` pasa sin errores ni warnings de tipos
- [ ] Ninguna ruta existente se rompió (incluidas las 6 históricas `.html`)
- [ ] El 301 de `/fundas-para-colegios` sigue vivo
- [ ] GTM + GA4 + Meta Pixel intactos
- [ ] Cero emojis en la interfaz
- [ ] Responsive verificado en 320px, 480px, 768px y 1920px
- [ ] Canonical y sitemap correctos
- [ ] Imágenes optimizadas (<300 KB, máx. 1920px de ancho)
- [ ] Ninguna credencial en el código
- [ ] Reporte del día generado y commiteado

---

## 📚 DOCUMENTACIÓN DEL PROYECTO

| Archivo | Para qué |
|---|---|
| `CONTEXTO.md` | Estado general del proyecto. **Empezar por acá.** |
| `SEGURIDAD.md` | Auditoría, vulnerabilidades corregidas, pendientes de Giuliano. |
| `PANEL-ADMIN.md` | Guía de uso del panel `/admin`. |
| `CLAUDE.md` | Este archivo: cómo trabajar en el proyecto. |
| `REPORT-*.txt` | Reporte de cada sesión. |

---

## 📌 VERSIÓN

- **Reescrito:** 2026-08-24 · **Versión:** 2.0
- **Reemplaza:** la v1.0 (sitio HTML vanilla, Brevo, estructura anterior)
