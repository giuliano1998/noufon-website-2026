# NOUFON — Architecture

This document describes the full technical architecture of the NOUFON website: a static HTML/JS site deployed on Netlify with serverless backend functions and third-party integrations for analytics, lead capture, email automation, and scheduling.

---

## High-Level Overview

```mermaid
graph TD
    subgraph Visitor["👤 Visitor"]
        B[Browser]
    end

    subgraph Frontend["🌐 Frontend — Static HTML/JS"]
        IDX[index.html]
        PAGES["/fundas-para-colegios\n/blog\n/contacto\n/ley-15534\n/como-implementar\n/politica-de-privacidad"]
        POPUP[popup-form.js]
        GSAP[GSAP Animations]
    end

    subgraph Netlify["☁️ Netlify"]
        CDN[Global CDN]
        FUNC[Netlify Functions\nsend-contact-email.js]
        REDIR[_redirects / netlify.toml]
    end

    subgraph Analytics["📊 Analytics Layer"]
        GTM[Google Tag Manager\nGTM-XXXXXXX]
        GA4[Google Analytics 4\nG-XXXXXXXXXX]
        GSC[Google Search Console]
    end

    subgraph LeadCapture["📋 Lead Capture"]
        BREVO_FORM[Brevo Embedded Forms]
        BREVO_CRM[Brevo CRM\nContact List]
    end

    subgraph EmailAuto["📧 Email Automation"]
        BREVO_SEQ[Brevo Automation\nSequences]
        SMTP[SMTP Relay\nvia nodemailer]
    end

    subgraph Scheduling["📅 Scheduling"]
        CAL[Calendly\nEmbedded Widget]
    end

    subgraph SEO["🔍 SEO Layer"]
        SCHEMA[JSON-LD Schemas\nFAQ / HowTo / BreadcrumbList]
        SITEMAP[sitemap.xml]
        ROBOTS[robots.txt]
        LLMS[llms.txt\nAI-crawler SEO]
    end

    B --> CDN
    CDN --> IDX
    CDN --> PAGES
    IDX --> POPUP
    IDX --> GSAP
    IDX --> GTM
    GTM --> GA4
    IDX --> BREVO_FORM
    BREVO_FORM --> BREVO_CRM
    BREVO_CRM --> BREVO_SEQ
    POPUP --> FUNC
    FUNC --> SMTP
    IDX --> CAL
    IDX --> SCHEMA
    SITEMAP --> GSC
    ROBOTS --> GSC
```

---

## Frontend Layer

The site is a **plain HTML/CSS/JavaScript** multi-page application. There is no build step or bundler — files are served directly from the repo root.

| File | Description |
|------|-------------|
| `index.html` | Home page — hero, value proposition, Brevo form, Calendly CTA |
| `fundas-para-colegios.html` | Product detail page |
| `blog.html` | Blog index |
| `como-implementar-politica-de-celulares-en-escuela.html` | Blog article |
| `ley-15534-celulares-escuela.html` | Legal information page |
| `contacto.html` | Contact form page |
| `politica-de-privacidad.html` | Privacy policy |
| `404.html` | Custom error page |
| `popup-form.js` | Handles popup contact form submission, validation, and POST to Netlify Function |

### Animations

[GSAP](https://gsap.com) is loaded from CDN and used for scroll-triggered entrance animations and interactive UI elements.

---

## Netlify Deployment

```mermaid
graph LR
    PUSH[git push → main] --> NETLIFY[Netlify Build]
    NETLIFY --> STATIC[Static files\nserved from CDN]
    NETLIFY --> FUNC[Netlify Functions\nNode.js runtime]
    FUNC --> EMAIL[nodemailer\nSMTP send]
```

| Config | Value |
|--------|-------|
| Publish directory | `.` (repo root) |
| Build command | _(none — static site)_ |
| Functions directory | `netlify/functions/` |
| Pretty URLs | Enabled |

**Security headers** set globally via `netlify.toml`:
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## Analytics Layer

```mermaid
graph LR
    PAGE[Page Load] --> GTM[GTM fires]
    GTM --> GA4[GA4 — pageview / events]
    GTM --> CUSTOM[Custom triggers\nform submit, CTA clicks]
    GA4 --> REPORTS[GA4 Reports]
```

All analytics are orchestrated through **Google Tag Manager** to keep tracking logic out of the HTML source. GTM manages:
- GA4 pageview and event tracking
- Conversion events (form submissions, Calendly bookings)
- Custom trigger rules

---

## Lead Capture & Email Automation

```mermaid
sequenceDiagram
    participant V as Visitor
    participant F as Brevo Form
    participant C as Brevo CRM
    participant A as Brevo Automation

    V->>F: Fills in form (nombre, colegio, email, teléfono)
    F->>C: Contact created / updated in list
    C->>A: Triggers automation sequence
    A-->>V: Welcome email → follow-up sequence
```

Forms are embedded via **Brevo's hosted form widget**. On submission:
1. The contact is added to the designated Brevo list
2. A Brevo Automation sequence fires (welcome email + nurture follow-ups)

---

## Contact Form → Serverless Email

```mermaid
sequenceDiagram
    participant V as Visitor
    participant P as popup-form.js
    participant F as Netlify Function
    participant S as SMTP Server

    V->>P: Submits popup contact form
    P->>P: Client-side validation
    P->>F: POST /.netlify/functions/send-contact-email
    F->>S: nodemailer sends email
    S-->>F: 200 OK
    F-->>P: { success: true }
    P-->>V: Success message shown
```

The Netlify Function reads SMTP credentials from **Netlify Environment Variables** (never from committed files).

---

## Scheduling

A **Calendly** embed is placed on the home page and product page as the primary call-to-action for school decision-makers to book a demo call.

---

## SEO Architecture

```mermaid
graph TD
    HTML[HTML pages] --> META[Meta tags\nOG / Twitter cards]
    HTML --> SCHEMA[JSON-LD Schemas]
    SCHEMA --> FAQ[FAQPage schema]
    SCHEMA --> HOWTO[HowTo schema]
    SCHEMA --> BREAD[BreadcrumbList]
    SCHEMA --> BLOG[BlogPosting schema]
    SITEMAP[sitemap.xml] --> GSC[Google Search Console]
    ROBOTS[robots.txt] --> CRAWLERS[Search engine crawlers]
    LLMS[llms.txt] --> AI[AI crawlers\nChatGPT / Perplexity / Claude]
```

| Asset | Purpose |
|-------|---------|
| `sitemap.xml` | Submitted to Google Search Console for indexing |
| `robots.txt` | Explicit allow/disallow rules for crawlers + AI bots |
| `llms.txt` | AI-crawler-friendly summary of site content |
| JSON-LD schemas | Rich results eligibility (FAQ, HowTo, BreadcrumbList, BlogPosting) |

---

## Environment Variables

All secrets are stored in **Netlify's dashboard** (never committed). See [`.env.example`](.env.example) for the full list of required variables.

| Variable | Used By |
|----------|---------|
| `SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS` | `send-contact-email.js` (nodemailer) |
| `CONTACT_EMAIL_TO` | Notification destination |
| `BREVO_API_KEY` | Brevo server-side calls |
| `GTM_CONTAINER_ID` | Google Tag Manager container |
| `GA4_MEASUREMENT_ID` | GA4 data stream |
| `CALENDLY_URL` | Calendly embed link |

---

## Repository Structure

```
noufon-website-2026/
├── netlify/
│   └── functions/
│       └── send-contact-email.js   # Serverless email handler
├── .agents/
│   └── skills/                     # Cowork AI skills
├── index.html                      # Home page
├── fundas-para-colegios.html       # Product page
├── blog.html                       # Blog index
├── como-implementar-...html        # Blog article
├── ley-15534-celulares-...html     # Legal info page
├── contacto.html                   # Contact page
├── politica-de-privacidad.html     # Privacy policy
├── 404.html                        # Error page
├── popup-form.js                   # Contact form logic
├── netlify.toml                    # Netlify config + security headers
├── _redirects                      # URL redirect rules
├── package.json                    # Node deps (nodemailer)
├── sitemap.xml                     # XML sitemap
├── robots.txt                      # Crawler rules
├── llms.txt                        # AI SEO
├── .env.example                    # Environment variable reference
└── CLAUDE.md                       # AI assistant context
```
