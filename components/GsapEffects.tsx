'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/*
 * Reveals y parallax globales con GSAP + ScrollTrigger.
 * - [data-reveal]            → fade/slide al entrar al viewport
 * - [data-reveal="stagger"]  → hijos directos en cascada
 * - [data-parallax]          → leve parallax vertical (heroes, imágenes)
 * Respeta prefers-reduced-motion (los estados iniciales viven en CSS
 * detrás del mismo media query, así no hay layout shift ni FOUC).
 */
export default function GsapEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        const isStagger = el.dataset.reveal === 'stagger';
        const targets = isStagger ? Array.from(el.children) : el;
        if (isStagger) gsap.set(el, { opacity: 1, y: 0 });
        gsap.fromTo(
          targets,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: isStagger ? 0.12 : 0,
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          }
        );
      });

      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.to(el, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      });
    });

    // Recalcular al cargar imágenes
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      clearTimeout(t);
      ctx.revert();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, [pathname]);

  return null;
}
