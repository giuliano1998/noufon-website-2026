# 📚 DOCUMENTACIÓN NOUFON — GUÍA RÁPIDA

Esta carpeta contiene toda la documentación necesaria para desarrollar la web de Noufon de forma profesional, escalable y sin errores.

---

## 📖 ARCHIVOS INCLUIDOS

### 1. **CLAUDE.md** ⭐ [ARCHIVO PRINCIPAL]
   - **Qué es**: Instrucciones maestras para Claude Code
   - **Cuándo usarlo**: LEERLO UNA SOLA VEZ al iniciar sesión de desarrollo
   - **Contenido**:
     - Identidad del proyecto
     - Estructura de carpetas
     - Stack técnico completo
     - Integración Brevo (campos exactos)
     - SEO & GTM setup
     - Errores comunes a evitar
     - Workflow de desarrollo
     - Reporte diario
     - Checklist pre-producción
   - **Duración de lectura**: 20 minutos (1ª vez); NO releer después

### 2. **QUICK_REFERENCE.md** 🚀 [MÁS USADO]
   - **Qué es**: Snippets listos para copiar/pegar durante desarrollo
   - **Cuándo usarlo**: Constantemente durante desarrollo
   - **Contenido**:
     - 10 snippets HTML/CSS/JS listos
     - Estructura HTML mínima
     - Formulario Brevo completo
     - GSAP animaciones
     - WhatsApp button
     - Structured data (JSON-LD)
     - Checklist pre-push
     - Troubleshooting rápido
     - Atajos Git
   - **Duración de consulta**: 1-2 minutos por snippet

### 3. **BREVO_INTEGRATION_GUIDE.md** 📧 [INTEGRACIÓN]
   - **Qué es**: Guía paso a paso para conectar Brevo
   - **Cuándo usarlo**: Cuando necesites integrar formularios con Brevo
   - **Contenido**:
     - Obtener API Key
     - Mapeo completo de campos
     - HTML del formulario
     - Netlify Function (backend seguro)
     - Webhook & automatización
     - Testing completo
     - Troubleshooting
   - **Duración**: 30 minutos para implementación completa

### 4. **generate-report.sh** 🤖 [AUTOMATIZACIÓN]
   - **Qué es**: Script bash para generar reports diarios automáticamente
   - **Cuándo usarlo**: Al finalizar cada sesión de desarrollo
   - **Uso**: `./generate-report.sh`
   - **Output**: Crea `REPORT-YYYY-MM-DD.txt` con cambios Git, commits, métricas

---

## 🚀 WORKFLOW TÍPICO (Por sesión)

### Mañana (Inicio de sesión)
```
1. Leer CLAUDE.md (solo 1ª vez en la semana)
2. Ver últimos cambios: git log --oneline -5
3. Revisar REPORT del día anterior
4. Comenzar a trabajar
```

### Durante el día
```
1. Consultar QUICK_REFERENCE.md para snippets
2. Aplicar buenas prácticas de CLAUDE.md
3. Testear cambios localmente
4. Git commit descriptivos
```

### Fin de sesión
```
1. ./generate-report.sh (genera REPORT-YYYY-MM-DD.txt)
2. Editar reporte: agregar detalles de errores/testing
3. git add REPORT-YYYY-MM-DD.txt
4. git commit -m "Report: Daily build report"
5. git push
```

---

## 🎯 PRIORIDADES DEL PROYECTO

### URGENTE (Esta semana)
- [ ] Integración Brevo (formulario contacto.html)
- [ ] GSAP animations en hero section (mejorar)
- [ ] Configurar GTM + Google Search Console + Analytics

### IMPORTANTE (Este mes)
- [ ] SEO: Structured data en todos los HTML
- [ ] Responsive testing completo (320px, 480px, 768px, 1920px)
- [ ] WhatsApp flotante en todas las páginas
- [ ] Página nueva: casinos-menores-argentina.html

### CUANDO ESTÉ LISTA (Producción)
- [ ] Conectar GitHub ↔ Netlify (auto deploy)
- [ ] Full testing pre-lanzamiento
- [ ] Monitoreo GTM + Analytics

---

## 📋 CHECKLIST ANTES DE EMPEZAR DESARROLLO

Ejecuta esto UNA SOLA VEZ:

```bash
# 1. Leer CLAUDE.md
cat CLAUDE.md

# 2. Leer QUICK_REFERENCE.md para familiarizarte con snippets
cat QUICK_REFERENCE.md

# 3. Hacer backup del proyecto
git status

# 4. Comenzar a trabajar
# Ahora sí, empezar con los cambios
```

---

## 🔧 ESTRUCTURA TÉCNICA (RESUMEN EJECUTIVO)

### Stack
- **Frontend**: Vanilla HTML5 + CSS3 + JavaScript ES6+
- **Animaciones**: GSAP 3.x (CDN)
- **Email**: Brevo API v3
- **Analytics**: Google Tag Manager + GA4
- **Hosting**: Netlify
- **Versionado**: Git (GitHub)

### Archivos Principales
```
~/Desktop/noufon-web/
├── index.html           (HOME)
├── blog.html           (Blog posts)
├── contacto.html       (Form + Brevo)
├── fundas-para-colegios.html
├── como-implementar-politica-de-celulares-en-escuela.html
├── ley-15534-celulares-escuela.html
├── casinos-menores-argentina.html (NUEVO - SEO)
├── politica-de-privacidad.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── favicon.ico
└── /assets/images/ (bilinkis-foto.jpg, noufon-colegios-secundarios.jpeg)
```

### Colores
```css
--teal: #2DD4BF        /* Primario */
--dark: #0F2D3D        /* Background */
--white: #FFFFFF       /* Texto */
```

---

## 🎨 MEJORAS REQUERIDAS (PRIORITIZADAS)

### 1. GSAP Hero Animation
**Actual**: Fade simple  
**Requerido**: Parallax + gradiente animado  
**Referencia**: QUICK_REFERENCE.md → Sección "6. GSAP Hero Animación"

### 2. Blog CTA Buttons
**Problema**: Texto no se ve en mobile  
**Solución**: Redesign con padding/font-size correcto  
**Referencia**: QUICK_REFERENCE.md → "10. Snippets listos"

### 3. Formulario Brevo
**Actual**: No conectado  
**Requerido**: Full integration con API + webhook  
**Referencia**: BREVO_INTEGRATION_GUIDE.md

### 4. SEO Completo
**Falta**: Structured data, Open Graph, canonicals dinámicos  
**Referencia**: QUICK_REFERENCE.md → Snippets 8-10

---

## ❌ ERRORES A NO REPETIR

1. **GSAP no ejecuta**: Falta `DOMContentLoaded` listener
2. **CSS conflicts**: Selectores genéricos sin scope
3. **Mobile roto**: No testear en 320px/480px
4. **Imágenes rotas**: Paths absolutos en lugar de relativos
5. **Formulario no mapea**: Names no coinciden con Brevo

**Soluciones**: Ver sección en CLAUDE.md → "🐛 ERRORES COMUNES"

---

## 📊 REPORTE DIARIO

Después de cada sesión:

```bash
# Generar reporte automáticamente
./generate-report.sh

# Se creará: REPORT-2026-04-01.txt
# Editarlo con detalles de:
# - Errores encontrados & corregidos
# - Testing realizado
# - Próximas acciones
# - Tiempo dedicado

# Hacer commit
git add REPORT-2026-04-01.txt
git commit -m "Report: Daily build report"
git push
```

---

## 🔗 REFERENCIAS RÁPIDAS

| Recurso | URL |
|---------|-----|
| Repo GitHub | https://github.com/giuliano1998/noufon-web |
| Netlify | https://app.netlify.com |
| Brevo CRM | https://app.brevo.com |
| GTM | https://tagmanager.google.com |
| Google Search Console | https://search.google.com/search-console |
| GSAP Docs | https://gsap.com |
| Schema.org | https://schema.org |

---

## 👤 CONTACTO & PROPIETARIOS

- **Founder**: Giuliano Rascanu
- **Co-founder**: Ignacio
- **Email**: info@noufon.com
- **WhatsApp**: +5491164518851
- **Website**: https://noufon.com

---

## 📝 NOTAS IMPORTANTES

### 1. CLAUDE.md debe leerse UNA SOLA VEZ
No releer el archivo completo en cada sesión. Los puntos clave son:
- Errores comunes (memorizados)
- Workflow (ya entendido)
- Stack técnico (invariable)

### 2. QUICK_REFERENCE.md es tu mejor amigo
Consúltalo constantemente. Tiene todos los snippets listos para copiar.

### 3. Reportes son críticos
Sin reportes no sabemos qué se hizo. Generarlos **siempre** al finalizar.

### 4. Git commits deben ser descriptivos
```bash
# ✅ BIEN
git commit -m "Feat: Add GSAP animations to hero section
- Parallax effect added
- Fade-in animations for h1, p, button
- Mobile optimized"

# ❌ MAL
git commit -m "updates"
```

### 5. Testing ANTES de push
Siempre testear:
- Desktop (1920px)
- Tablet (768px)
- Mobile (320px, 480px)
- GSAP animations ejecutándose
- Links funcionando
- Imágenes cargando

---

## 🚨 SOS — PROBLEMAS COMUNES

### "Las animaciones no funcionan en producción"
→ Ver CLAUDE.md → "❌ ERROR 1: GSAP Animations"

### "CSS se superpone entre secciones"
→ Ver CLAUDE.md → "❌ ERROR 2: CSS Conflicts"

### "Mobile se ve roto"
→ Ver QUICK_REFERENCE.md → "Troubleshooting Rápido"

### "No sé qué snippet usar"
→ Ver QUICK_REFERENCE.md → "Snippets Listos para Copiar"

### "¿Cómo integro Brevo?"
→ Leer BREVO_INTEGRATION_GUIDE.md (paso a paso)

---

## ✅ WORKFLOW RECOMENDADO

```
09:00 AM - Lee CLAUDE.md (1ª vez de la semana)
09:20 AM - Revisa git log y últimos reports
09:30 AM - Comienza desarrollo
         - Consulta QUICK_REFERENCE.md según necesites
         - Aplica buenas prácticas de CLAUDE.md
         - Testea cambios antes de push
12:30 PM - Pausa
02:00 PM - Continúa desarrollo
05:00 PM - Finaliza sesión
         - Ejecuta: ./generate-report.sh
         - Edita reporte con detalles
         - Git push
```

---

## 📚 ORDEN DE LECTURA RECOMENDADO

**1ª semana**:
1. CLAUDE.md (lectura completa)
2. QUICK_REFERENCE.md (lectura diagonal, para familiarizarte)
3. BREVO_INTEGRATION_GUIDE.md (cuando hagas integración)
4. Comenzar desarrollo

**Semanas siguientes**:
- CLAUDE.md: NO releer (salvo cambios)
- QUICK_REFERENCE.md: Consultar según necesites
- BREVO_INTEGRATION_GUIDE.md: Si necesitas refresh

---

## 🎯 OBJETIVO FINAL

Al terminar esta documentación deberías poder:

✅ Desarrollar cualquier página HTML sin bugs  
✅ Integrar formularios con Brevo  
✅ Implementar GSAP animations  
✅ Cumplir SEO best practices  
✅ Hacer reports consistentes  
✅ Evitar los 5 errores más comunes  
✅ Testear antes de producción  

---

## 📞 SOPORTE

Si algo no queda claro:

1. Busca en QUICK_REFERENCE.md → "Troubleshooting Rápido"
2. Lee la sección correspondiente en CLAUDE.md
3. Consult el archivo específico (BREVO_INTEGRATION_GUIDE.md, etc.)
4. Si no está documentado: agrega al reporte como "Question"

---

## 🚀 ¡LISTO PARA COMENZAR!

Ahora sí, tienes todo lo necesario para desarrollar Noufon como un **Senior Full Stack Developer**.

- **CLAUDE.md**: Tu guía maestro (léelo 1 sola vez)
- **QUICK_REFERENCE.md**: Tu companion durante desarrollo
- **BREVO_INTEGRATION_GUIDE.md**: Para integraciones
- **generate-report.sh**: Para reporting automático

**Próximo paso**: Leer CLAUDE.md completamente y comenzar desarrollo.

---

**Versión**: 1.0  
**Creado**: 2026-04-01  
**Estado**: ✅ Listo para producción

