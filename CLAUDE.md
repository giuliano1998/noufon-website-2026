# 🏗️ CLAUDE.md — NOUFON Website 2026

## ⚠️ INSTRUCCIONES CRÍTICAS PARA CLAUDE CODE

Este archivo define CÓMO DEBE FUNCIONAR. **LEE ESTO PRIMERO**:

### 🎯 REGLA #1: LECTURA ÚNICA (Ahorra tokens)
- **LÉEME UNA SOLA VEZ** al inicio de cada sesión
- NO releer en cada acción (eso consume tokens innecesarios)
- Una vez leído, **MEMORIZA** el contenido usando tu memoria interna
- Aplica las instrucciones automáticamente sin volver a consultar este archivo

### 🎯 REGLA #2: MEMORIZAR ERRORES (Para no repetirlos)
- Mientras trabajas, si cometes un error → **MEMORÍZALO**
- Documenta en tu memoria interna: "En la sesión X cometí error Y"
- Los 5 errores comunes listados abajo deben estar en tu memoria PERMANENTEMENTE
- Antes de cada acción, verifica mentalmente: "¿He cometido este error antes?"

### 🎯 REGLA #3: REPORTE DIARIO (Es OBLIGATORIO)
- Al finalizar CADA sesión de desarrollo:
  1. Ejecuta: `./generate-report.sh` (esto crea REPORT-YYYY-MM-DD.txt)
  2. Edita el archivo con TODOS los detalles:
     - Qué cambios hiciste
     - Qué errores encontraste y corregiste
     - Qué fue testeado (desktop, tablet, mobile)
     - Cuánto tiempo dedicaste
     - Qué está pendiente
  3. Haz: `git add REPORT-YYYY-MM-DD.txt && git commit && git push`
  4. **SIN REPORTE = NO HUBO SESIÓN**

### 🎯 REGLA #4: MEMORIA INTERNA (Usa la tuya, no releas archivos)
- Usa tu sistema de memoria para guardar:
  - Errores cometidos en sesiones anteriores
  - Soluciones que funcionaron
  - Estructura del proyecto (no cambiar)
  - Stack técnico (fijo)
- Cuando Giuliano te diga: "¿Recuerdas el error X?" → responde desde memoria
- NO digas "déjame releer CLAUDE.md" - ya lo leíste una vez

---

> **INSTRUCCIÓN CRÍTICA ORIGINAL**: Este archivo debe ser **LEÍDO UNA SOLA VEZ** al inicio de cada sesión de desarrollo. No volver a leerlo a menos que se haya modificado explícitamente.

---

## 📋 IDENTIDAD DEL PROYECTO

**Nombre**: Noufon Website 2026  
**Tipo**: E-commerce / Landing page estática (vanilla HTML/CSS/JS)  
**Objetivo**: Sistema de fundas magnéticas para evitar uso de celulares en colegios secundarios de Argentina.  
**Repositorio**: `giuliano1998/noufon-web` (GitHub)  
**Hosting**: Netlify (`polite-faun-a9dba1`) — Conectado cuando web esté lista  
**Propietario**: Giuliano Rascanu & Ignacio (co-founders)

---

## 🗂️ ESTRUCTURA DEL PROYECTO

```
~/Desktop/noufon-web/
├── 404.html
├── index.html (HOME - principal)
├── blog.html
├── contacto.html
├── fundas-para-colegios.html
├── como-implementar-politica-de-celulares-en-escuela.html
├── ley-15534-celulares-escuela.html
├── casinos-menores-argentina.html (NUEVA - página SEO)
├── politica-de-privacidad.html
├── robots.txt
├── sitemap.xml
├── favicon.ico
├── favicon-wa.svg
├── /assets/
│   ├── /images/
│   │   ├── bilinkis-foto.jpg
│   │   ├── noufon-colegios-secundarios.jpeg
│   │   └── (otros assets)
│   └── /scripts/
│       └── main.js (si aplica)
└── README.md

```

**IMPORTANTE**: Mantener la estructura exacta. Paths relativos deben funcionar correctamente.

---

## 🎨 SISTEMA DE DISEÑO

### Paleta de Colores (CSS Variables)
```css
--teal: #2DD4BF          /* Color primario */
--dark: #0F2D3D          /* Background oscuro */
--white: #FFFFFF         /* Texto principal */
--text: #1a1a1a          /* Texto neutral */
--gray: #f5f5f5          /* Fondo gris claro */
--gray-mid: #e0e0e0      /* Gris medio */
--font: 'Montserrat', sans-serif
```

### Breakpoints (Mobile-First)
- **Mobile**: 0px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px+

### Tipografía
- **Font Family**: Montserrat (via Google Fonts)
- **Pesos**: 400, 500, 600, 700, 800, 900
- **Mobile-First**: Comenzar estilos en mobile, luego usar `@media (min-width: ...)`

---

## ⚙️ STACK TÉCNICO

### Frontend
- **HTML5** (vanilla, sin bundler)
- **CSS3** (vanilla, sin SCSS/LESS — mantener simple)
- **JavaScript Vanilla** (ES6+, sin framework)
- **GSAP 3.x** (Greensock Animation Platform)
  - **Importación**: CDN (búscar en cualquier HTML para confirmar la URL exacta)
  - **Animaciones críticas**: Hero section, botones CTA, scroll triggers
  - **Errores pasados**: GSAP animations no se ejecutan en estáticas — usar `window.addEventListener('DOMContentLoaded', ...)` siempre

### Servicios de Terceros
- **GTM (Google Tag Manager)**: `GTM-PHK2V9FW`
  - Script debe estar en `<head>` de TODOS los HTML
  - Noscript fallback en `<body>` justo después de `<body>`
- **Google Analytics 4**: Integrado via GTM
- **Google Search Console**: Pendiente configuración
- **Brevo (Email Marketing + CRM)**:
  - Formulario de contacto debe conectarse via API/Webhook
  - Mapeo de campos exacto (ver sección BREVO)
- **Netlify**: Deploy automático desde Git (cuando esté lista la web)

---

## 📧 INTEGRACIÓN FORMULARIOS (EMAIL - NO BREVO)

### Cómo Funciona
Los formularios **NO envían a Brevo**. Envían EMAIL directamente a `info@noufon.com`:

```
Usuario llena formulario
    ↓
Netlify Function recibe datos
    ↓
Función envía EMAIL a info@noufon.com
    ↓
Usuario recibe confirmación en su email
    ↓
TÚ responde manualmente
```

### Campos del Formulario (contacto.html)
```
nombre           → texto, REQUERIDO
apellidos        → texto, opcional
email            → email, REQUERIDO
colegio          → texto, opcional
telefono         → tel, opcional
cargo            → texto, opcional
mensaje          → textarea, opcional
```

### Variables SMTP (Netlify Environment)
```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 465
SMTP_USER = tu-email@gmail.com
SMTP_PASSWORD = contraseña-app (NO contraseña normal)
SMTP_FROM = info@noufon.com
```

### Arquitectura Backend
- **Archivo**: `netlify/functions/send-contact-email.js`
- **Dependencia**: `npm install nodemailer`
- **Acción**: Recibe POST, valida, envía EMAIL a info@noufon.com
- **Confirmación**: Usuario recibe EMAIL de confirmación en su email

### Email que recibe TÚ
Asunto: `Nuevo contacto: [Nombre del usuario]`

Contenido:
```
Nuevo contacto desde formulario Noufon

Datos del contacto:
Nombre: [nombre]
Apellidos: [apellidos]
Email: [email]
Colegio: [colegio]
Teléfono: [telefono]
Cargo: [cargo]
Mensaje: [mensaje]

─────────────────────────────
Respondé directamente al email: [email del usuario]
```

### Validaciones
- [ ] Email es REQUERIDO y válido (regex)
- [ ] Nombre es REQUERIDO
- [ ] HTML sanitizado (no scripts en campos)
- [ ] Límite de caracteres razonable

### Ventajas de este sistema
✅ Sin costos (no hay Brevo)  
✅ Contacto personal (tu responda directamente)  
✅ Control total (datos en tu email)  
✅ Escalable (migra a Brevo cuando crezca)  
✅ Simple (sin CRM complejo)

**REFERENCIA**: Ver **FORMULARIOS_EMAIL_GUIDE.md** para implementación completa

---

## 🔍 SEO & METADATA

### Estándares Obligatorios (TODOS los HTML)

#### 1. **Head Meta Tags**
```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Título único - 60 carácteres max | NOUFON</title>
<meta name="description" content="Descripción única - 160 carácteres max" />
<meta name="robots" content="index, follow" /> <!-- o noindex si aplica -->
<link rel="canonical" href="https://noufon.com/page.html" />
<link rel="icon" href="favicon.ico" type="image/x-icon" />
```

#### 2. **Structured Data (schema.org)**
Todas las páginas deben tener:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://noufon.com/page.html#webpage",
  "url": "https://noufon.com/page.html",
  "name": "Título de la página",
  "inLanguage": "es",
  "isPartOf": { "@id": "https://noufon.com/#website" }
}
</script>
```

La home (`index.html`) adicional debe tener:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://noufon.com/#organization",
  "name": "NOUFON",
  "url": "https://noufon.com",
  "logo": "https://noufon.com/logo.svg",
  "description": "Sistema de fundas magnéticas para evitar uso de celulares en colegios.",
  "sameAs": [
    "https://www.instagram.com/_noufon/",
    "https://www.linkedin.com/company/noufon"
  ]
}
</script>
```

#### 3. **Open Graph (Redes Sociales)**
```html
<meta property="og:title" content="NOUFON - Fundas Magnéticas para Colegios" />
<meta property="og:description" content="Sistema innovador para evitar el uso de celulares en clase." />
<meta property="og:image" content="https://noufon.com/og-image.jpg" />
<meta property="og:url" content="https://noufon.com/page.html" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

#### 4. **Google Tag Manager & Analytics**
```html
<!-- HEAD (antes de cierre) -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PHK2V9FW');</script>

<!-- BODY (justo después de apertura) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PHK2V9FW"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

---

## 🐛 ERRORES COMUNES (MEMORIZAR Y NO REPETIR)

⚠️ **IMPORTANTE**: Estos 5 errores DEBEN estar en tu MEMORIA INTERNA.  
Antes de hacer cualquier acción, verifica: "¿Estoy a punto de cometer uno de estos?"

### ❌ ERROR 1: GSAP Animations No Se Ejecutan
**Síntoma**: Animaciones no funcionan en produción aunque funcionen localmente.  
**Causa**: Script GSAP se carga pero no se ejecuta porque el DOM no está listo.  
**MEMORIZAR**: SIEMPRE envolver GSAP en `DOMContentLoaded` listener.

**Solución**:
```javascript
// ✅ CORRECTO - SIEMPRE HACER ESTO
document.addEventListener('DOMContentLoaded', () => {
  gsap.to('.hero', { opacity: 1, duration: 1 });
});

// O usar async + defer en script tag
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script defer src="main.js"></script>
```
**Checklist antes de cada animación GSAP**:
- [ ] ¿Estoy dentro de DOMContentLoaded?
- [ ] ¿Los elementos existen en HTML?
- [ ] ¿El script carga DESPUÉS del HTML?

---

### ❌ ERROR 2: CSS Conflicts (Cascada)
**Síntoma**: Estilos de una sección afectan otras secciones inesperadamente.  
**Causa**: Selectores genéricos sin scope (ej: `button { }` sin clase).  
**MEMORIZAR**: NUNCA usar selectores genéricos. SIEMPRE usar clases específicas.

**Solución**:
```css
/* ❌ INCORRECTO - NUNCA HACER */
button { background: teal; }
h1 { color: blue; }

/* ✅ CORRECTO - SIEMPRE HACER ESTO */
.btn { background: var(--teal); }
.btn-primary { background: var(--teal); }
.btn-secondary { background: var(--dark); }
.hero-title { color: var(--white); }
```
**Checklist antes de cada CSS**:
- [ ] ¿Estoy usando una clase específica?
- [ ] ¿No estoy usando selectores HTML genéricos?
- [ ] ¿El scope es correcto y no afecta otras secciones?

---

### ❌ ERROR 3: Responsive Roto en Mobile
**Síntoma**: Layout se rompe en pantallas < 480px.  
**Causa**: No testear en mobile-first; usar media queries incorrectamente (max-width en vez de min-width).  
**MEMORIZAR**: SIEMPRE mobile-first. Media queries con `min-width`, NUNCA `max-width`.

**Solución**:
```css
/* ✅ CORRECTO - MOBILE FIRST */
.container { width: 100%; padding: 20px; }  /* Mobile: 0-480px */

@media (min-width: 480px) {
  .container { padding: 30px; }  /* Tablet small: 480px+ */
}

@media (min-width: 768px) {
  .container { width: 90%; padding: 40px; }  /* Tablet: 768px+ */
}

@media (min-width: 1024px) {
  .container { width: 80%; }  /* Desktop: 1024px+ */
}
```
**Checklist antes de responsive**:
- [ ] ¿Empecé con estilos MOBILE?
- [ ] ¿Uso SOLO min-width en media queries?
- [ ] ¿Testeé en 320px, 480px, 768px, 1920px?

---

### ❌ ERROR 4: Imágenes con Paths Rotos
**Síntoma**: Imágenes no cargan en producción.  
**Causa**: Usar paths absolutos (`/assets/...`) en lugar de relativos.  
**MEMORIZAR**: SIEMPRE paths RELATIVOS. NUNCA paths absolutos que comiencen con `/`.

**Solución**:
```html
<!-- ❌ INCORRECTO - NUNCA HACER -->
<img src="/assets/images/foto.jpg" />

<!-- ✅ CORRECTO - SIEMPRE HACER ESTO -->
<img src="assets/images/noufon-colegios-secundarios.jpeg" alt="..." />

<!-- En subcarpetas (subir nivel) -->
<img src="../assets/images/bilinkis-foto.jpg" alt="..." />

<!-- En carpeta profunda -->
<img src="../../assets/images/foto.jpg" alt="..." />
```
**Checklist antes de cada imagen**:
- [ ] ¿Mi path es RELATIVO (sin / inicial)?
- [ ] ¿El archivo realmente existe en esa ubicación?
- [ ] ¿Tengo alt text descriptivo?

---

### ❌ ERROR 5: Formulario No Mapea Campos Brevo
**Síntoma**: Formulario se envía pero no crea contacto en Brevo.  
**Causa**: Nombres de inputs no coinciden EXACTAMENTE con atributos Brevo (case-sensitive).  
**MEMORIZAR**: Los nombres DEBEN coincidir EXACTAMENTE. EMAIL ≠ email ≠ Email.

**Campos Brevo (EXACTO - mayúsculas)**:
- EMAIL
- NOMBRE
- APELLIDOS
- COLEGIO
- TELEFONO
- JOB_TITLE
- LINKEDIN

**Solución**:
```html
<!-- ❌ INCORRECTO -->
<input type="email" name="email" />        <!-- lowercase = MAL -->
<input type="text" name="Nombre" />        <!-- capital inicial = MAL -->
<input type="text" name="colegio" />       <!-- lowercase = MAL -->

<!-- ✅ CORRECTO - EXACTO COMO EN BREVO -->
<input type="email" name="EMAIL" required />
<input type="text" name="NOMBRE" required />
<input type="text" name="APELLIDOS" />
<input type="text" name="COLEGIO" />
<input type="tel" name="TELEFONO" />
<input type="text" name="JOB_TITLE" />
<input type="url" name="LINKEDIN" />
```
**Checklist antes de cada formulario**:
- [ ] ¿Los names coinciden EXACTAMENTE con Brevo?
- [ ] ¿Están en MAYÚSCULAS?
- [ ] ¿Validé con la lista de atributos en Brevo?

---

## 🧠 CÓMO MEMORIZAR Y NO REPETIR ERRORES

**Sistema de memoria para Claude**:
1. Después de leer CLAUDE.md la primera vez, memoriza estos 5 errores
2. Durante sesión, si cometes uno → documenta mentalmente: "ERROR X cometido hoy en acción Y"
3. Antes de CADA acción futura, pregúntate: "¿Podría estar cometiendo alguno de estos 5 errores?"
4. Si algo falla, revisa primero esta lista antes de debuggear
5. Al escribir reportes, documenta: "ERROR X ocurrió. Solución: Y. No volveré a hacer."

**Meta**: Al terminar esta semana, estos 5 errores deben ser IMPOSIBLES de cometer.

---

## 🚀 ANIMACIONES GSAP (Mejoras Requeridas)

### Hero Section
**Actual**: Fade simple.  
**Requerido**: Animación más llamativa con parallax y gradiente animado.
```javascript
// MEJORA REQUERIDA
gsap.timeline()
  .from('.hero-title', { opacity: 0, y: 30, duration: 0.8 })
  .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
  .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3');

// Parallax en background
gsap.to('.hero-bg', {
  yPercent: 20,
  scrollTrigger: { trigger: '.hero', start: 'top top', scrub: 1 }
});
```

### Botones CTA (Blog)
**Problema**: Texto no se ve, diseño roto.  
**Requerido**: Rediseñar con hover state claro.
```css
/* CORRECTO */
.blog-cta {
  display: inline-block;
  padding: 12px 24px;
  background: var(--teal);
  color: var(--dark);
  text-decoration: none;
  font-weight: 700;
  border-radius: 50px;
  transition: all 0.3s;
}

.blog-cta:hover {
  background: #22b5a3;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(45, 212, 191, 0.3);
}
```

---

## 📱 WhatsApp Flotante

### Versión 1.0 (Actual - Funcional)
```html
<!-- Button simple flotante -->
<a href="https://wa.me/5491164518851?text=Hola%20NOUFON%2C%20quiero%20info%20sobre%20las%20fundas" 
   target="_blank" 
   rel="noopener noreferrer"
   class="whatsapp-btn"
   title="Hablamos por WhatsApp">
  📱 Hablemos por WhatsApp
</a>

<style>
  .whatsapp-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #25D366;
    color: white;
    padding: 12px 20px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 700;
    z-index: 99;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
    transition: all 0.3s;
  }
  
  .whatsapp-btn:hover {
    background: #20ba5a;
    transform: scale(1.1);
  }
  
  @media (max-width: 480px) {
    .whatsapp-btn { padding: 10px 16px; font-size: 0.9rem; }
  }
</style>
```

**UPGRADE A CHATBOT**: Será implementado post-lanzamiento usando libería tipo `Tawk.to` o `Zendesk Chat`.

---

## 📄 NUEVA PÁGINA: Casinos Ilegales & Menores

**Archivo**: `casinos-menores-argentina.html`  
**URL**: `https://noufon.com/casinos-menores-argentina.html`  
**Propósito**: SEO + Lead gen educativo sobre riesgos legales de casinos para menores.

**Estructura**:
1. Hero con CTA
2. Secciones informativas (Ley 25.188, riesgos, casos)
3. Relación con NOUFON (control de celulares = prevención)
4. CTAs para descargar guía + contacto

**Button en home**: Agregar en sección de Blog o pie de página.

---

## 🔄 WORKFLOW DE DESARROLLO

### Sesión Típica (OBLIGATORIO)
1. **Leer CLAUDE.md** (solo la 1ª vez de la sesión)
   - No releerlo durante la sesión (ahorra tokens)
   - Usa memoria interna después de primera lectura
   
2. **Revisar cambios pending** (si existen de sesiones anteriores)
   - Ver REPORT anterior
   - Verificar items sin completar
   
3. **Hacer cambios** en archivos
   - Siempre mantener estructura exacta
   - Aplicar reglas de 5 errores comunes
   - Testear cada cambio ANTES de siguiente
   
4. **Testear localmente** después de CADA cambio
   - Desktop (1920px): ¿Funciona bien?
   - Tablet (768px): ¿Se ve bien?
   - Mobile (480px): ¿No se rompe?
   - Console (F12): ¿Sin errores rojos?
   - GSAP (si aplica): ¿Anima correctamente?
   
5. **Git commit automático** con cada cambio
   - Usar mensajes descriptivos
   - No acumular cambios sin commitear
   
6. **Generar REPORT.txt OBLIGATORIAMENTE** (Al finalizar sesión)
   - Ver sección siguiente
   - SIN EXCEPCIÓN

7. **Finalizar sesión**

---

## 📊 REPORTE DIARIO (REPORT-YYYY-MM-DD.txt) — OBLIGATORIO

⚠️ **CRÍTICO**: Cada sesión DEBE terminar con un reporte. SIN REPORTE = SIN SESIÓN.

### Proceso de Reporte (Al finalizar)
1. Ejecuta: `./generate-report.sh`
   - Crea automáticamente: REPORT-YYYY-MM-DD.txt
   - Inserta cambios de Git automáticamente
   
2. EDITA el archivo generado MANUALMENTE
   - Abre: REPORT-YYYY-MM-DD.txt
   - Completa TODAS las secciones:
     * Errores encontrados & corregidos HOY
     * Testing realizado (qué testeaste exactamente)
     * Tiempo total dedicado
     * Próximas acciones pendientes
   
3. Guarda el archivo editado
   
4. Haz commit:
   ```bash
   git add REPORT-YYYY-MM-DD.txt
   git commit -m "Report: Daily build report for $(date +%Y-%m-%d)"
   git push
   ```

### Información OBLIGATORIA en cada reporte
**DEBES incluir**:
- [ ] Fecha exacta (YYYY-MM-DD)
- [ ] Hora inicio + hora cierre
- [ ] Branch (main / develop)
- [ ] TODOS los archivos modificados (con cambios específicos)
- [ ] TODOS los errores encontrados Y CÓMO LOS CORREGISTE
- [ ] Testing realizado: desktop/tablet/mobile/console/GSAP
- [ ] Commits realizados (auto-generados)
- [ ] Tiempo total dedicado (en horas/minutos)
- [ ] Próximas 3 acciones para próxima sesión
- [ ] Status: "READY FOR REVIEW" o "BLOCKED" (con razón)
```
════════════════════════════════════════════════════════════
  NOUFON BUILD REPORT
════════════════════════════════════════════════════════════

📅 Fecha: 2026-04-01
⏰ Hora de inicio: 10:00 AM ART
⏰ Hora de cierre: 12:30 PM ART
🌿 Branch: main
✅ Status: READY FOR REVIEW

────────────────────────────────────────────────────────────
📝 CAMBIOS REALIZADOS
────────────────────────────────────────────────────────────

[MODIFICADOS]
✏️  index.html
   - Mejorada animación hero section con GSAP parallax
   - Agregado structured data JSON-LD
   - Botón WhatsApp flotante implementado
   
✏️  contacto.html
   - Integración Brevo API iniciada
   - Mapeo campos: EMAIL, NOMBRE, COLEGIO, TELEFONO
   - Validación client-side agregada
   
✏️  blog.html
   - Rediseñados botones CTA con mejor visibilidad
   - Fix hover states
   - Mobile spacing corregido

✏️  css (inline en index.html)
   - Actualizado --teal color (verificación)
   - Media queries mobile-first revisadas
   - Z-index layering optimizado

[CREADOS]
✨ casinos-menores-argentina.html (NUEVO)
   - Página SEO sobre casinos ilegales & menores
   - Hero + 3 secciones informativas
   - CTA a descarga de guía + contacto
   - Structured data implementado

[NO MODIFICADOS]
➖ 404.html
➖ politica-de-privacidad.html
➖ robots.txt
➖ sitemap.xml

────────────────────────────────────────────────────────────
🐛 ERRORES ENCONTRADOS & CORREGIDOS
────────────────────────────────────────────────────────────

❌ GSAP animations no ejecutarse en index.html
✅ FIX: Envuelto en DOMContentLoaded listener
✅ Verificado en Firefox + Chrome + Safari

❌ Botones blog roto en mobile
✅ FIX: Padding + font-size ajustado con media query
✅ Testeo: 320px, 480px, 768px

❌ Formulario Brevo no validaba emails
✅ FIX: Agregado required + pattern HTML5
✅ Pendiente: Testing post-integración

────────────────────────────────────────────────────────────
🔍 TESTING REALIZADO
────────────────────────────────────────────────────────────

✅ Desktop (1920x1080): OK
✅ Tablet (768x1024): OK
✅ Mobile (320x568): OK
✅ GTM Script: Verificado en head
✅ Canonical URLs: Correctas
✅ Imágenes paths: Relativos OK
✅ GSAP CDN: Cargando correctamente
⚠️  PENDIENTE: Integración Brevo webhook (no testeado)
⚠️  PENDIENTE: Google Search Console validation

────────────────────────────────────────────────────────────
📦 COMMITS REALIZADOS
────────────────────────────────────────────────────────────

1️⃣  "Feat: GSAP hero animations & WhatsApp button"
2️⃣  "Feat: New SEO page - casinos-menores-argentina.html"
3️⃣  "Fix: Blog CTA buttons styling for mobile"
4️⃣  "Feat: Brevo form validation (partial)"

────────────────────────────────────────────────────────────
⚙️  PRÓXIMAS ACCIONES (Para próxima sesión)
────────────────────────────────────────────────────────────

[ ] Completar integración Brevo API (webhook)
[ ] Testear formulario contacto end-to-end
[ ] Conectar Google Search Console + Analytics
[ ] Mejorar animación parallax hero (más dramático)
[ ] Review de canonicals en todas las páginas
[ ] Implementar Open Graph tags (OG:image, etc)
[ ] Crear Google Data Studio dashboard para GTM

────────────────────────────────────────────────────────────
📊 MÉTRICAS
────────────────────────────────────────────────────────────

Files modified: 4
Files created: 1
Lines added: ~280
Lines removed: ~45
Commits: 4
⏱️  Time spent: 2h 30min
🎯 Priority items closed: 2/3

════════════════════════════════════════════════════════════
```

### Guardar automáticamente al cierre:
```bash
TIMESTAMP=$(date +%Y-%m-%d)
mv REPORT.txt REPORT-$TIMESTAMP.txt
git add REPORT-$TIMESTAMP.txt
git commit -m "Report: Daily build report for $TIMESTAMP"
```

---

## 🎯 CHECKLIST PRE-PRODUCCIÓN

Antes de conectar Netlify, **TODAS** estas cosas deben estar ✅:

- [ ] **GTM**: Implementado en todos los HTML
- [ ] **GA4**: Configurado en GTM + verificación
- [ ] **Search Console**: Propiedad verificada
- [ ] **Brevo**: Formulario conectado + webhook activo
- [ ] **GSAP**: Todas las animaciones funcionando
- [ ] **Responsive**: Testeado 320px, 480px, 768px, 1920px
- [ ] **SEO**: Canonical URLs + Structured Data en todos
- [ ] **Imágenes**: Todos los paths relativos funcionales
- [ ] **Links internos**: Todos funcionan
- [ ] **WhatsApp**: Botón flotante en todas las páginas
- [ ] **404 page**: Funciona y brinda opciones
- [ ] **Página Casinos**: Creada y linkeada desde home
- [ ] **robots.txt**: Actualizado correctamente
- [ ] **sitemap.xml**: Actualizado con todas las URLs

---

## 🚨 PRIORIDADES CRÍTICAS

1. **Brevo Integration** (URGENTE): Sin esto no funciona lead gen
2. **GSAP Animations** (URGENTE): Experiencia de usuario depende de esto
3. **SEO Setup Completo** (IMPORTANTE): GTM + GA4 + Search Console
4. **Responsive Testing** (IMPORTANTE): Mobile-first funcional
5. **WhatsApp Button** (IMPORTANTE): Conversión a ventas

---

## 📞 CONTACTO & REFERENCIAS

**Propietario**: Giuliano Raschetti 
**Socio**: Ignacio Gianetto
**WhatsApp**: +5491164518851  
**Email**: info@noufon.com  
**Dominio**: https://noufon.com  
**Repo GitHub**: giuliano1998/noufon-web

**Recursos Útiles**:
- GSAP Docs: https://gsap.com/
- Schema.org: https://schema.org/
- Google GTM Docs: https://support.google.com/tagmanager
- Brevo API: https://developers.brevo.com/

---

## 📌 VERSIÓN DEL DOCUMENTO

- **Creado**: 2026-04-01
- **Última actualización**: 2026-04-01
- **Versión**: 1.0 (Producción)
- **Estado**: ✅ Listo para usar

---

**⚠️ RECORDATORIO FINAL**: Este archivo debe ser **LEÍDO UNA SOLA VEZ** por sesión. No releer a menos que se haya modificado explícitamente. Memorizar los errores comunes y aplicarlos automaticamente.

