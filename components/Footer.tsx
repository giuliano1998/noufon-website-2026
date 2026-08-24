import Link from 'next/link';
import { getAllVerticales, getSite } from '@/lib/content';

export default function Footer() {
  const verticales = getAllVerticales();
  const site = getSite();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              NOUFON<span style={{ color: 'var(--teal)' }}>.</span>
            </Link>
            <p className="footer-tag">{site.tagline} Conectando con el ahora.</p>
          </div>

          <div className="footer-col">
            <h4>Espacios</h4>
            <ul>
              {verticales.map((v) => (
                <li key={v.slug}>
                  <Link href={`/${v.slug}/`}>{v.nav}</Link>
                </li>
              ))}
              <li>
                <Link href="/espacios-libres-de-celulares/">Ver todos →</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Recursos</h4>
            <ul>
              <li><Link href="/blog/">Blog</Link></li>
              <li><Link href="/leyes-celulares-argentina/">Leyes por provincia</Link></li>
              <li><a href="/ley-15534-celulares-escuela.html">Ley 15.534</a></li>
              <li><a href="/noufon-vs-yondr.html">NOUFON vs. Yondr</a></li>
              <li><a href="/noufon-mario-pergolini.html">NOUFON en los medios</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li><Link href="/contacto/">Formulario de contacto</Link></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="/politica-de-privacidad.html">Política de privacidad</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NOUFON. Todos los derechos reservados.</p>
          <p>Hecho con presencia.</p>
        </div>
      </div>
    </footer>
  );
}
