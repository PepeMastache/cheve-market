// src/pages/ProductPage.jsx
import { useParams, useSearchParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProductPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get('ref');

  const { data: product, isLoading, error } = useProduct(slug);
  const [affiliateLink, setAffiliateLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [linkExisted, setLinkExisted] = useState(false);

  // Tracking de clics por afiliado
  useEffect(() => {
    if (refCode && product?.slug) {
      const sessionId = sessionStorage.getItem('session_id') || crypto.randomUUID();
      sessionStorage.setItem('session_id', sessionId);

      fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: product.slug,
          ref: refCode,
          sessionId,
        }),
      });
    }
  }, [refCode, product]);

  const handleAffiliateLink = async () => {
    const affiliateId = '1a20665f-8dc4-4412-90a1-21f7555d7e37'; // temporal

    try {
      const res = await fetch('/api/affiliate-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          affiliate_id: affiliateId,
          product_id: product.id,
        }),
      });

      if (!res.ok) throw new Error('No se pudo generar el enlace');

      const data = await res.json();
      setAffiliateLink(data.link);
      setLinkExisted(data.existing ?? false);
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al generar el enlace');
    }
  };

  if (isLoading) return <p className="text-center py-5">Cargando producto...</p>;
  if (error) return <p className="text-center text-danger py-5">Error al cargar producto.</p>;

  return (
    <>
      <Navbar />
      <section className="bg-light">
        <div className="container pb-5">
          <div className="row">
            <div className="col-lg-5 mt-5">
              <img
                className="card-img img-fluid"
                src={product.images[0] || 'https://via.placeholder.com/600x400?text=Sin+imagen'}
                alt={product.name}
              />
            </div>
            <div className="col-lg-7 mt-5">
              <h1 className="h2">{product.name}</h1>
              <p>{product.brand} — {product.style}</p>
              <p className="h3">${Number(product.final_price).toFixed(2)}</p>
              <ul className="list-inline">
                <li className="list-inline-item"><strong>Volumen:</strong> {product.volume_ml} ml</li>
                <li className="list-inline-item"><strong>ABV:</strong> {product.abv}%</li>
                <li className="list-inline-item"><strong>Rating:</strong> {product.rating_avg}</li>
              </ul>
              <hr />

              <div className="d-flex gap-2 mb-3">
                <button className="btn btn-success">Comprar</button>
                <button className="btn btn-outline-dark">Agregar al carrito</button>
                <button className="btn btn-warning" onClick={handleAffiliateLink}>
                  Obtener enlace de afiliado
                </button>
              </div>

              {affiliateLink && (
                <div className="mt-3">
                  <p>Tu enlace de afiliado:</p>
                  {linkExisted && (
                    <p className="text-muted small">
                      🔁 Este enlace ya había sido creado anteriormente.
                    </p>
                  )}
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={affiliateLink}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(affiliateLink);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                    >
                      {copied ? '✅ Copiado' : '📋 Copiar'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
