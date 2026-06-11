'use client';

import { useMemo, useState } from 'react';
import CtaLink from '@/components/CtaLink';

/*
 * <CalculadoraROI> — interactiva, no estática (diferencial vs. Yondr).
 * Estima minutos de atención recuperados según cantidad de personas y
 * contexto. Base: estudios de interrupción digital (una interrupción
 * cuesta ~3 min de refocalización; promedio 6-10 chequeos/hora).
 */

const CONTEXTOS = {
  clase: { label: 'Clase (colegio)', interrupcionesHora: 8, costoRefoco: 3, unidad: 'de clase efectiva' },
  reunion: { label: 'Reunión de trabajo', interrupcionesHora: 6, costoRefoco: 3, unidad: 'de reunión productiva' },
  evento: { label: 'Evento / función', interrupcionesHora: 10, costoRefoco: 2, unidad: 'de atención al escenario' },
} as const;

type ContextoKey = keyof typeof CONTEXTOS;

export default function CalculadoraROI() {
  const [contexto, setContexto] = useState<ContextoKey>('clase');
  const [personas, setPersonas] = useState(30);
  const [horas, setHoras] = useState(5);

  const r = useMemo(() => {
    const c = CONTEXTOS[contexto];
    // Minutos perdidos por persona por hora (interrupciones × costo de refoco, cap 60')
    const perdidaPorHora = Math.min(c.interrupcionesHora * c.costoRefoco, 30);
    const minutosDia = personas * horas * perdidaPorHora;
    const horasDia = minutosDia / 60;
    const horasSemana = horasDia * 5;
    const diasAnio = (horasSemana * 40) / 24; // 40 semanas activas
    return { perdidaPorHora, horasDia, horasSemana, diasAnio };
  }, [contexto, personas, horas]);

  const fmt = (n: number) =>
    n >= 100 ? Math.round(n).toLocaleString('es-AR') : (Math.round(n * 10) / 10).toLocaleString('es-AR');

  return (
    <div className="roi" data-reveal>
      <span className="kicker" style={{ color: 'var(--teal)' }}>Calculadora</span>
      <h2 className="h2">¿Cuánta atención está perdiendo tu espacio?</h2>

      <div className="roi-grid">
        <div>
          <div className="roi-field">
            <label htmlFor="roi-contexto">Tipo de espacio</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {(Object.keys(CONTEXTOS) as ContextoKey[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setContexto(k)}
                  className="btn"
                  style={{
                    padding: '0.5rem 1.1rem',
                    fontSize: '0.74rem',
                    background: contexto === k ? 'var(--teal)' : 'transparent',
                    color: contexto === k ? 'var(--dark)' : 'rgba(255,255,255,0.75)',
                    border: contexto === k ? '1.5px solid var(--teal)' : '1.5px solid rgba(255,255,255,0.25)',
                  }}
                >
                  {CONTEXTOS[k].label}
                </button>
              ))}
            </div>
          </div>

          <div className="roi-field">
            <label htmlFor="roi-personas">
              Personas en el espacio <output>{personas}</output>
            </label>
            <input
              id="roi-personas"
              type="range"
              min={10}
              max={500}
              step={5}
              value={personas}
              onChange={(e) => setPersonas(+e.target.value)}
            />
          </div>

          <div className="roi-field">
            <label htmlFor="roi-horas">
              Horas por día <output>{horas} h</output>
            </label>
            <input
              id="roi-horas"
              type="range"
              min={1}
              max={10}
              value={horas}
              onChange={(e) => setHoras(+e.target.value)}
            />
          </div>
        </div>

        <div className="roi-result" aria-live="polite">
          <div className="roi-big">
            {fmt(r.horasDia)} <small>horas / día</small>
          </div>
          <p className="roi-sub">
            de atención colectiva que se pierden hoy entre interrupciones y refocalización — y que un
            espacio libre de celulares recupera.
          </p>
          <div className="roi-extra">
            <div><strong>{fmt(r.horasSemana)} h</strong> recuperadas por semana</div>
            <div><strong>{fmt(r.diasAnio)} días completos</strong> {CONTEXTOS[contexto].unidad} por año</div>
          </div>
          <div style={{ marginTop: '1.8rem' }}>
            <CtaLink
              href={`/contacto/?vertical=${contexto === 'clase' ? 'colegios' : contexto === 'reunion' ? 'corporativo' : 'eventos'}`}
              vertical="calculadora"
              label="Recuperar esa atención"
            >
              Recuperar esa atención
            </CtaLink>
          </div>
        </div>
      </div>

      <p style={{ marginTop: '1.6rem', fontSize: '0.74rem', color: 'rgba(255,255,255,0.4)', position: 'relative', zIndex: 1 }}>
        Estimación basada en investigación sobre interrupciones digitales (~3 min de refocalización por
        interrupción). Valores orientativos, no una promesa de resultados.
      </p>
    </div>
  );
}
