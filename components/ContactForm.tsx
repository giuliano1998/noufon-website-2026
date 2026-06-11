'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getVertical } from '@/data/verticales';

const orgLabel: Record<string, string> = {
  colegios: 'Nombre del colegio',
  eventos: 'Productora / evento',
  'examenes-internacionales': 'Centro de examen / institución',
  teatros: 'Teatro / sala',
  corporativo: 'Empresa',
  juzgados: 'Juzgado / organismo',
};

export default function ContactForm() {
  const params = useSearchParams();
  const vertical = params.get('vertical') ?? '';
  const piloto = params.get('piloto') === '1';
  const v = getVertical(vertical);

  const [enviando, setEnviando] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState('');

  const labelOrg = orgLabel[vertical] ?? 'Institución / organización';

  const titulo = useMemo(() => {
    if (piloto) return 'Pedí un piloto';
    if (v) return `Hablemos sobre ${v.copy.nav.toLowerCase() === 'colegios' ? 'tu colegio' : v.copy.nav.toLowerCase()}`;
    return 'Hablemos sobre tu espacio';
  }, [piloto, v]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const fd = new FormData(e.currentTarget);
    const nombre = `${fd.get('nombre') ?? ''} ${fd.get('apellido') ?? ''}`.trim();
    const email = String(fd.get('email') ?? '').trim();

    if (nombre.length < 4 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Revisá tu nombre y email antes de enviar.');
      return;
    }

    const etiquetas = [
      vertical ? `[Vertical: ${vertical}]` : '',
      piloto ? '[Pide PILOTO]' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const payload = {
      nombre,
      email,
      telefono: String(fd.get('telefono') ?? '').trim(),
      colegio: String(fd.get('organizacion') ?? '').trim(),
      cargo: String(fd.get('cargo') ?? '').trim(),
      mensaje: `${etiquetas} ${String(fd.get('mensaje') ?? '').trim()}`.trim(),
    };

    setEnviando(true);
    try {
      const res = await fetch('/.netlify/functions/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('send failed');
      setOk(true);
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: 'contact_form_submit', vertical: vertical || 'general', piloto });
    } catch {
      setError('No pudimos enviar el formulario. Probá de nuevo o escribinos por WhatsApp.');
    } finally {
      setEnviando(false);
    }
  }

  if (ok) {
    return (
      <div className="form-ok" role="status">
        ¡Gracias! Recibimos tu consulta{vertical ? ` sobre ${v?.copy.nav.toLowerCase() ?? vertical}` : ''} y
        te respondemos en menos de 24 horas hábiles.
      </div>
    );
  }

  return (
    <>
      <h1 className="h2" style={{ marginBottom: '0.8rem' }}>{titulo}</h1>
      <p className="lead" style={{ marginBottom: '2.4rem' }}>
        {piloto
          ? 'Probá NOUFON en tu espacio con un piloto acotado, sin compromiso de continuidad.'
          : 'Dejanos tus datos y te respondemos en menos de 24 horas hábiles, con información concreta.'}
      </p>
      <form onSubmit={onSubmit} noValidate>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="f-nombre">Nombre *</label>
            <input id="f-nombre" name="nombre" type="text" required autoComplete="given-name" placeholder="Tu nombre" />
          </div>
          <div className="form-field">
            <label htmlFor="f-apellido">Apellido *</label>
            <input id="f-apellido" name="apellido" type="text" required autoComplete="family-name" placeholder="Tu apellido" />
          </div>
          <div className="form-field full">
            <label htmlFor="f-email">Email *</label>
            <input id="f-email" name="email" type="email" required autoComplete="email" placeholder="vos@organizacion.com" />
          </div>
          <div className="form-field">
            <label htmlFor="f-org">{labelOrg} *</label>
            <input id="f-org" name="organizacion" type="text" required placeholder={labelOrg} />
          </div>
          <div className="form-field">
            <label htmlFor="f-tel">Número de contacto *</label>
            <input id="f-tel" name="telefono" type="tel" required autoComplete="tel" placeholder="+54 9 11 1234 5678" />
          </div>
          <div className="form-field full">
            <label htmlFor="f-cargo">Tu rol</label>
            <input id="f-cargo" name="cargo" type="text" placeholder="Director/a, productor/a, gerente…" />
          </div>
          <div className="form-field full">
            <label htmlFor="f-mensaje">¿Qué querés saber?</label>
            <textarea id="f-mensaje" name="mensaje" placeholder="Contanos sobre tu espacio o hacé tu consulta…" />
          </div>
        </div>

        {error && (
          <p style={{ color: '#d04b3e', fontSize: '0.88rem', marginTop: '1rem' }} role="alert">
            {error}
          </p>
        )}

        <p className="form-consent" style={{ margin: '1.4rem 0' }}>
          Al enviar este formulario aceptás nuestra{' '}
          <a href="/politica-de-privacidad">Política de Privacidad</a>. Tus datos se usan
          exclusivamente para responder tu consulta.
        </p>

        <button type="submit" className="btn btn-primary" disabled={enviando} style={{ width: '100%', justifyContent: 'center' }}>
          {enviando ? 'Enviando…' : 'Enviar consulta'}
        </button>
      </form>
    </>
  );
}
