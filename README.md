# NOUFON — noufon.com

Sitio de **NOUFON**: fundas magnéticas con forro Faraday para crear
**espacios libres de celulares** en colegios, eventos, exámenes
internacionales, teatros, empresas y embajadas.

## Arranque rápido

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera /out (lo que publica Netlify)
```

## Stack

Next.js 15 (App Router, export estático) · React 19 · TypeScript · GSAP ·
Decap CMS · Netlify.

## Editar contenido

El contenido vive en `content/` y se edita desde el panel en
**https://noufon.com/admin** (login con GitHub). No hace falta tocar código
para cambiar textos, imágenes o publicar notas del blog.

## Deploy

`git push origin main` → Netlify buildea y publica (1-3 min).

## Documentación

| Archivo | Contenido |
|---|---|
| [`CONTEXTO.md`](CONTEXTO.md) | Estado del proyecto. **Empezar por acá.** |
| [`PANEL-ADMIN.md`](PANEL-ADMIN.md) | Cómo usar el panel de contenido. |
| [`SEGURIDAD.md`](SEGURIDAD.md) | Auditoría y prácticas de seguridad. |
| [`CLAUDE.md`](CLAUDE.md) | Guía de trabajo para desarrollo asistido. |

> ⚠️ Nunca escribas credenciales en el repositorio. Van en las variables de
> entorno de Netlify. Ver `SEGURIDAD.md`.
