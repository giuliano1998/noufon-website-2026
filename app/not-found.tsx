import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <section className="hero" style={{ minHeight: '70vh' }}>
        <div className="hero-mesh" />
        <div className="hero-inner container on-dark" style={{ textAlign: 'center' }}>
          <span className="kicker">Error 404</span>
          <h1 className="display">Esta página se quedó sin señal.</h1>
          <p className="hero-sub" style={{ margin: '1.4rem auto 2.2rem' }}>
            La página que buscás no existe o cambió de lugar. Probá desde el inicio o explorá los
            espacios NOUFON.
          </p>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary">Ir al inicio</Link>
            <Link href="/espacios-libres-de-celulares/" className="btn btn-outline">Ver los espacios</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
