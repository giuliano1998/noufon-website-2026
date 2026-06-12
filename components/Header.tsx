'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getAllVerticales } from '@/data/verticales';
import { Icon } from '@/components/Icons';
import type { IconName } from '@/data/verticales';

const navIcons: Record<string, IconName> = {
  colegios: 'teacher',
  eventos: 'mic',
  'examenes-internacionales': 'fileCheck',
  teatros: 'mask',
  corporativo: 'briefcase',
  embajadas: 'building',
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const verticales = getAllVerticales();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setDropOpen(false);
  };

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <Link href="/" className="logo" onClick={closeAll}>
          NOUFON<span>.</span>
        </Link>

        <nav className={`nav${menuOpen ? ' open' : ''}`} aria-label="Principal">
          <Link href="/" onClick={closeAll}>Inicio</Link>

          <div ref={dropRef} className={`nav-drop${dropOpen ? ' open' : ''}`}>
            <button
              className="nav-drop-btn"
              aria-expanded={dropOpen}
              aria-haspopup="true"
              onClick={() => setDropOpen((v) => !v)}
            >
              Soluciones
              <svg className="caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            <div className="drop-panel" role="menu">
              {verticales.map((v) => (
                <Link key={v.slug} href={`/${v.slug}/`} onClick={closeAll} role="menuitem">
                  <Icon name={navIcons[v.slug] ?? 'focus'} size={19} />
                  {v.copy.nav}
                </Link>
              ))}
              <div className="drop-all">
                <Link href="/espacios-libres-de-celulares/" onClick={closeAll} role="menuitem">
                  Ver todos los espacios →
                </Link>
              </div>
            </div>
          </div>

          <Link href="/#noufon-en-accion" onClick={closeAll}>Cómo funciona</Link>
          <Link href="/blog/" onClick={closeAll}>Blog</Link>
          <Link href="/contacto/" onClick={closeAll}>Contacto</Link>
          <Link href="/contacto/" className="nav-cta" onClick={closeAll}>
            Quiero NOUFON
          </Link>
        </nav>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
