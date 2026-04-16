# NOUFON — Website

Marketing website for **NOUFON**, a magnetic phone-pouch system that helps Argentine schools enforce cell-phone-free classrooms in compliance with Ley 15534.

🌐 **Live site:** [noufon.com](https://noufon.com)

---

## Overview

NOUFON sells a physical product (magnetic fabric pouches) directly to school administrators. This site serves as the company's primary digital touchpoint: it educates decision-makers about the legal framework, captures leads via embedded forms, and converts them into demo calls.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Plain HTML5 / CSS3 / JavaScript |
| Animations | [GSAP](https://gsap.com) (CDN) |
| Hosting | [Netlify](https://netlify.com) (static CDN + Functions) |
| Serverless | Netlify Functions (Node.js) |
| Email delivery | [nodemailer](https://nodemailer.com) via SMTP |
| Lead capture | [Brevo](https://brevo.com) embedded forms |
| Email automation | Brevo Automation sequences |
| Analytics | Google Analytics 4 + Google Tag Manager |
| Scheduling | [Calendly](https://calendly.com) embedded widget |
| SEO | Schema.org JSON-LD, sitemap.xml, robots.txt, llms.txt |

---

## Features

**Pages**
- Home page with hero, value proposition, Brevo lead form, and Calendly CTA
- Product page (`/fundas-para-colegios`) with specs and pricing inquiry
- Blog with SEO-optimised articles on school phone policy
- Legal info page covering Ley 15534
- Contact page with validated form
- Privacy policy

**Lead flow**
- Visitors fill out a Brevo-powered popup or inline form
- Contact is automatically added to a Brevo list
- A welcome + nurture email sequence fires immediately

**Contact form**
- `popup-form.js` validates inputs client-side then POSTs to a Netlify Function
- The function sends a notification email via nodemailer (SMTP)

**SEO**
- Structured data: `FAQPage`, `HowTo`, `BreadcrumbList`, `BlogPosting` schemas
- `llms.txt` for AI-crawler discoverability (ChatGPT, Perplexity, Claude)
- XML sitemap submitted to Google Search Console

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 18 (only needed for the Netlify Function locally)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) for local function development

### Local development

```bash
# 1. Clone the repo
git clone https://github.com/giuliano1998/noufon-website-2026.git
cd noufon-website-2026

# 2. Install dependencies (nodemailer for the serverless function)
npm install

# 3. Copy the environment variable reference and fill in your values
cp .env.example .env
# Edit .env with your SMTP credentials, Brevo API key, etc.

# 4. Start a local dev server with Netlify Functions support
npx netlify dev
```

Open `http://localhost:8888` in your browser.

> **Static-only preview:** you can also open `index.html` directly in a browser, but Netlify Functions (the contact form email) won't work without `netlify dev`.

### Deployment

The site auto-deploys on every push to `main` via Netlify's GitHub integration.

```bash
git add .
git commit -m "your message"
git push origin main
```

Environment variables must be configured in the **Netlify dashboard** before deploying:  
`Site → Site configuration → Environment variables`  
See [`.env.example`](.env.example) for the full list.

---

## Project Structure

```
noufon-website-2026/
├── netlify/
│   └── functions/
│       └── send-contact-email.js   # Serverless email handler (nodemailer)
├── index.html                      # Home page
├── fundas-para-colegios.html       # Product page
├── blog.html                       # Blog index
├── contacto.html                   # Contact form page
├── politica-de-privacidad.html     # Privacy policy
├── 404.html                        # Custom error page
├── popup-form.js                   # Contact popup logic & validation
├── netlify.toml                    # Netlify config, pretty URLs, security headers
├── _redirects                      # URL redirect / rewrite rules
├── package.json                    # Node.js dependencies
├── sitemap.xml                     # XML sitemap
├── robots.txt                      # Search engine crawler rules
├── llms.txt                        # AI-crawler summary
├── .env.example                    # Environment variable reference
├── ARCHITECTURE.md                 # Full system architecture + diagrams
└── CLAUDE.md                       # AI assistant context & development guide
```

---

## Architecture

For a full breakdown of how all layers fit together — including Mermaid diagrams for the analytics pipeline, lead capture sequence, contact form flow, and SEO layer — see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## Environment Variables

All secrets are set in Netlify's dashboard and **never committed to the repo**. See [`.env.example`](.env.example) for the complete reference with descriptions.

Key variables:

| Variable | Purpose |
|----------|---------|
| `SMTP_USER` / `SMTP_PASS` | Email delivery credentials |
| `CONTACT_EMAIL_TO` | Notification recipient |
| `BREVO_API_KEY` | Brevo CRM & automation |
| `GTM_CONTAINER_ID` | Google Tag Manager |
| `GA4_MEASUREMENT_ID` | Google Analytics 4 |
| `CALENDLY_URL` | Scheduling embed link |

---

## Contact

**Founder:** Giuliano Raschetti — [giuliano.raschetti@gmail.com](mailto:giuliano.raschetti@gmail.com)  
**WhatsApp:** +54 9 11 6451 8851  
**Website:** [noufon.com](https://noufon.com)
