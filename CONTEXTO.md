# 🧭 NOUFON Website — Contexto del proyecto

> **Para quien lea esto (humano o Claude):** este documento describe el estado
> real del proyecto. Es la fuente de verdad para arrancar a trabajar sin tener
> que reconstruir el contexto desde cero.
>
> Última actualización: **2026-08-24** · Commit: `54c23c9`

---

## 1. Qué es NOUFON

Sistema de **fundas magnéticas con forro Faraday** que bloquea toda señal
(WiFi, Bluetooth, datos) mientras **el usuario conserva la posesión física de
su dispositivo**. No confisca: bloquea.

- **Posicionamiento:** "Creamos espacios libres de celulares."
- **Tesis transversal:** *No es un problema de disciplina ni de reglas. Es
  estructural. NOUFON cambia la estructura del espacio para que la atención
  vuelva sola.*
- **Fundadores:** Giuliano Raschetti e Ignacio Gianetto.
- **Tono:** español rioplatense, "vos", directo, orientado a resultados
  medibles. Nunca corporativo genérico.

El sitio fue **repositionado en 2026** de "solo colegios" a **multi-vertical**:
educación pasó a ser una vertical más, no la única.

---

## 2. Accesos y servicios

| Servicio | Dato | Dónde se administra |
|---|---|---|
| Web pública | https://noufon.com | — |
| Panel de contenido | https://noufon.com/admin | Login con GitHub |
| Repositorio | `giuliano1998/noufon-website-2026` (rama `main`) | GitHub |
| Hosting / CI | Proyecto `polite-faun-a9dba1` | Netlify |
| Carpeta local | `~/noufon-website-2026` | Mac de Giuliano |
| Email de contacto | hola@noufonarg.com | Se muestra en la web |

### Identificadores públicos (viajan al navegador por diseño, no son secretos)
- Google Tag Manager: `GTM-PHK2V9FW`
- Google Analytics 4: `G-F8M4H4579R`
- Meta Pixel: `1958970012160530`

### 🔴 Secretos — NUNCA en el repositorio
Viven **solo** en Netlify → *Project configuration* → *Environment variables*:
`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM` y
opcionalmente `CONTACT_EMAIL_TO`.
El *client secret* de OAuth vive en Netlify → *Access & security* → *OAuth*.

**Regla:** si alguna vez hace falta una credencial, se pide cargarla en Netlify.
Jamás se escribe en un archivo del proyecto. Ver `SEGURIDAD.md`.

---

## 3. Stack técnico

- **Next.js 15** (App Router) con `output: 'export'` → **sitio 100% estático**
- **React 19** · **TypeScript** · **GSAP 3** (ScrollTrigger)
- **gray-matter** + **marked** para el blog en markdown
- **Decap CMS 3.15.1** (versión fijada) como panel de contenido
- **Netlify**: build `npm run build`, publica la carpeta `out`
- **1 sola función de servidor**: `netlify/functions/send-contact-email.js`
- CSS propio en `app/globals.css` (sin Tailwind ni preprocesadores)

### Diseño (reglas no negociables)
- Paleta: `--teal #2DD4BF` (acento), `--dark #0F2D3D`, `--white`, `--text #1a1a1a`,
  `--gray #f5f5f5`, `--gray-mid #e0e0e0`. Teals profundos: `#1A9083`, `#22B5A3`.
- Tipografía: **Montserrat** (vía `next/font`).
- **CERO emojis en la interfaz.** Se usan los íconos SVG de línea de
  `components/Icons.tsx` (22 íconos, trazo 1.75, mismo tamaño).
- **Nada de "sopa de cards"**: las secciones alternan ritmo (bento asimétrico,
  editorial a una columna, split, full-bleed).
- Whitespace generoso, `max-width` de contenido ~1200px.
- Fondos: gradiente mesh teal→dark sutil + textura de grano. Respeta
  `prefers-reduced-motion`.

---

## 4. Arquitectura en capas

```
content/          ← CONTENIDO (editable desde /admin, sin tocar código)
  home.json           textos de la portada, stats, marquee, video
  site.json           email, WhatsApp, redes
  verticales/*.json   6 soluciones, una por archivo
  blog/*.md           notas nuevas (frontmatter + markdown)

lib/
  types.ts          tipos compartidos — SIN acceso a disco (client-safe)
  content.ts        loaders que leen /content en tiempo de build (usa fs)
  site.ts           config técnica + evento cta_vertical (client-safe)

components/       15 piezas reutilizables
app/              una carpeta por ruta
public/
  admin/            panel Decap (index.html + config.yml)
  uploads/          imágenes subidas desde el panel
  *.html            6 páginas SEO históricas (ver §6)
```

**Regla de oro de la arquitectura:** el contenido no vive en el código. Para
cambiar un texto se edita `/content`, no un `.tsx`.

---

## 5. Rutas (20 páginas estáticas)

| Ruta | Origen |
|---|---|
| `/` | `app/page.tsx` + `content/home.json` |
| `/espacios-libres-de-celulares/` | hub con las 6 verticales |
| `/colegios/` `/eventos/` `/examenes-internacionales/` `/teatros/` `/corporativo/` `/embajadas/` | `app/[vertical]/page.tsx` + `content/verticales/*.json` |
| `/blog/` | listado (markdown + históricas) |
| `/blog/<slug>/` | `app/blog/[slug]/page.tsx` + `content/blog/*.md` |
| `/contacto/` | acepta `?vertical=<slug>` y `?piloto=1` |
| `/leyes-celulares-argentina/` | tracker legislativo por provincia |
| `/admin/` | panel de contenido |

**Todo es data-driven:** agregar un `.json` en `content/verticales/` crea la
página, y aparece **sola** en el menú, el pie, el hub y el sitemap. Agregar un
`.md` en `content/blog/` crea la nota y la publica en el listado y el sitemap.

---

## 6. Páginas históricas (no tocar a la ligera)

Seis páginas viven como **HTML estático** en `public/` porque ya tienen
posicionamiento en Google. **No se editan desde el panel** y conservan su URL:

`ley-15534-celulares-escuela` · `como-implementar-politica-de-celulares-en-escuela` ·
`alternativa-confiscacion-celulares` · `noufon-mario-pergolini` ·
`noufon-vs-yondr` · `politica-de-privacidad`

⚠️ **Se enlazan con `.html` al final** (ej. `/ley-15534-celulares-escuela.html`).
En producción Netlify redirige a la URL limpia; el `.html` es lo único que
funciona además en `npm run dev`. No sacar la extensión.

También hay un **301 de `/fundas-para-colegios` → `/colegios/`** en
`public/_redirects`. No romperlo.

---

## 7. Flujo de trabajo

```
Editar (panel o código) → commit → push a GitHub → Netlify buildea → live (1-3 min)
```

```bash
cd ~/noufon-website-2026
npm install          # solo la primera vez
npm run dev          # http://localhost:3000
npm run build        # verifica que compile antes de commitear
git push origin main # dispara el deploy
```

### ⚠️ El push es SIEMPRE manual
Claude **no tiene credenciales de GitHub** y no puede pushear. Puede editar,
compilar y commitear; el `git push origin main` lo corre Giuliano en su Terminal.
Si algo "no se ve en la web", **lo primero a revisar es si el commit se subió**:

```bash
git log --oneline origin/main..HEAD   # si lista algo, falta pushear
```

Otro detalle: el push no se puede correr en la misma ventana de Terminal donde
está `npm run dev` — hay que abrir una pestaña nueva (`Cmd+T`).

### Si algo sale mal
Netlify → *Deploys* → elegir el último deploy que funcionaba → *Publish deploy*.

---

## 8. Trampas conocidas (aprendidas a los golpes)

1. **El script de Decap va al FINAL DEL BODY, nunca en el head.** En el head se
   ejecuta antes de que exista el body, Decap no encuentra dónde montarse y la
   página queda **en blanco sin ningún error en consola**. Costó un rato
   diagnosticarlo.
2. **Los componentes con `'use client'` NO pueden importar `lib/content.ts`**
   (usa `fs`). Deben recibir los datos por props desde un componente de
   servidor. Así funcionan `Header` (recibe las verticales desde `layout.tsx`)
   y `ContactForm` (recibe las etiquetas desde `app/contacto/page.tsx`).
   Para tipos, importar de `lib/types.ts`, que es client-safe.
3. **`public/admin/config.yml` debe declarar TODOS los campos** de cada archivo
   JSON que administra. Un campo no declarado **se borra al guardar** desde el
   panel.
4. **El frontmatter YAML necesita las comillas escapadas.** Una bajada con `"`
   adentro rompe el build entero. Escribir `\"`.
5. **En `npm run dev` el panel está en `/admin/index.html`**, no en `/admin/`
   (Next dev no sirve `index.html` de subcarpetas de `public/`). En producción
   `/admin` funciona normal.
6. **La galería en los JSON de verticales es `[{src: "..."}]`** (objetos, no
   strings) porque el widget `list` de Decap lo requiere. `lib/content.ts` la
   aplana a strings.

---

## 9. Estado de seguridad

Auditoría completa el 2026-08-24. Ver **`SEGURIDAD.md`** para el detalle.

- ✅ Sin secretos en el repositorio ni en el historial de Git (verificado).
- ✅ Se corrigieron **5 vulnerabilidades** en la función de contacto. La más
  grave: el endpoint permitía usarse como **relay de spam** (sin límite de
  envíos ni verificación de origen), con riesgo de que la casilla entrara en
  listas negras y dejaran de llegar los leads reales.
- ✅ Protecciones actuales del formulario: límite por IP, campo trampa
  anti-bots, verificación de origen, escapado de HTML, validación estricta,
  errores genéricos (sin stack traces), sin logs de credenciales ni datos
  personales.
- ✅ `/admin` con `noindex`, `X-Frame-Options: DENY` y `no-store`.
- ⚠️ **Pendiente de Giuliano:** activar 2FA en GitHub y en Netlify. Toda la
  seguridad del panel se apoya en la cuenta de GitHub.

**Al tocar la función de contacto, no desarmar estas protecciones.**

---

## 10. Pendientes

- [ ] 2FA en GitHub y Netlify *(prioridad alta)*
- [ ] Verificar que llegue un formulario de prueba a hola@noufonarg.com
- [ ] **Casos de éxito**: tipo de contenido nuevo (pedido, no implementado)
- [ ] **Video en el hero**: soporte de video de fondo en portada y verticales
      (el campo `heroVideo` ya existe en el schema pero no está conectado)
- [ ] Reemplazar las imágenes generadas con IA por fotos reales
- [ ] Subir las imágenes a Cloudinary (hoy viven en `public/assets/`)
- [ ] Video demo propio por vertical (todas reusan el de colegios)
- [ ] Ampliar el tracker legislativo con más provincias
- [ ] Versión en inglés (la capa de contenido ya está preparada)

---

## 11. Documentos del proyecto

| Archivo | Para qué sirve |
|---|---|
| `CONTEXTO.md` | Este documento. Estado general del proyecto. |
| `SEGURIDAD.md` | Auditoría, vulnerabilidades corregidas, qué depende de Giuliano. |
| `PANEL-ADMIN.md` | Guía de uso del panel `/admin`, paso a paso. |
| `REPORT-*.txt` | Reportes de cada sesión de desarrollo. |

> ⚠️ **`CLAUDE.md` está DESACTUALIZADO.** Describe el sitio anterior (HTML
> vanilla, Brevo, rutas y estructura viejas, emojis como íconos). Sus reglas de
> proceso siguen valiendo, pero **su información técnica ya no aplica**: para
> eso mandan este documento y el código. Conviene reescribirlo.

---

## 12. Historial

| Fecha | Hito |
|---|---|
| 2026-06-11 | Reposicionamiento multi-vertical. Migración de HTML vanilla → Next.js 15. 6 verticales, hub, calculadora ROI, tracker legislativo. |
| 2026-06-12 | Video grande en portada. Juzgados → **Embajadas**. Galerías por nicho. Blog ampliado a 10 notas. Fix del menú mobile. |
| 2026-08-24 | Contenido migrado a `/content`. Panel `/admin` con Decap CMS. Auditoría de seguridad y endurecimiento del formulario. |
