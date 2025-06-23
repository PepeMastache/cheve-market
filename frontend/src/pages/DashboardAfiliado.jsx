import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardAfiliado() {
  // Estado para la data del dashboard
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simula la llamada a /api/affiliate/:id/dashboard
  useEffect(() => {
    // Datos de ejemplo (pueden ser reemplazados por un fetch real)
    const mockResponse = {
      affiliate: {
        display_name: "juanito123",
        paypal_email: "juanito123@paypal.com",
        joined_at: "2025-06-19",
      },
      links: [
        {
          product_name: "Cerveza Aliquid 330 ml",
          slug: "cerveza-aliquid-330-ml",
          clicks: 4,
          commissions: 12.5,
        },
        {
          product_name: "Stout Imperial 500 ml",
          slug: "stout-imperial-500-ml",
          clicks: 18,
          commissions: 62.75,
        },
      ],
      totals: {
        clicks: 28,
        sales: 9,
        commissions: 124.3,
      },
    };

    // Simular retardo de red
    const timer = setTimeout(() => {
      setData(mockResponse);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (value) =>
    value.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });

  return (
    <>
      <Navbar />

      <main className="container py-5" style={{ minHeight: "70vh" }}>
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Cargando…</span>
            </div>
          </div>
        )}

        {!loading && data && (
          <>
            {/* Resumen del afiliado */}
            <div className="mb-4">
              <h1 className="h3 fw-bold mb-3">¡Hola, {data.affiliate.display_name}!</h1>
              <p className="mb-0">
                Afiliado desde: {new Date(data.affiliate.joined_at).toLocaleDateString()} |
                PayPal: <strong>{data.affiliate.paypal_email}</strong>
              </p>
            </div>

            {/* Métricas principales */}
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="card text-center shadow-sm h-100">
                  <div className="card-body">
                    <i className="fas fa-mouse-pointer fa-2x text-warning mb-2"></i>
                    <h2 className="h4 fw-semibold mb-0">{data.totals.clicks}</h2>
                    <p className="text-muted mb-0">Clics totales</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center shadow-sm h-100">
                  <div className="card-body">
                    <i className="fas fa-shopping-cart fa-2x text-warning mb-2"></i>
                    <h2 className="h4 fw-semibold mb-0">{data.totals.sales}</h2>
                    <p className="text-muted mb-0">Ventas atribuidas</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center shadow-sm h-100">
                  <div className="card-body">
                    <i className="fas fa-wallet fa-2x text-warning mb-2"></i>
                    <h2 className="h4 fw-semibold mb-0">
                      {formatCurrency(data.totals.commissions)}
                    </h2>
                    <p className="text-muted mb-0">Comisiones totales</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de enlaces */}
            <h2 className="h5 fw-bold mb-3">Tus enlaces generados</h2>

            {data.links.length === 0 ? (
              <div className="alert alert-info" role="alert">
                Aún no tienes enlaces ni clics registrados. ¡Comparte tu enlace de afiliado y
                empieza a ganar! 🚀
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Producto</th>
                      <th>Enlace</th>
                      <th className="text-center">Clics</th>
                      <th className="text-center">Comisiones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.links.map((link, idx) => (
                      <tr key={idx}>
                        <td>{link.product_name}</td>
                        <td>
                          <a
                            href={`https://chevemarket.com/p/${link.slug}?ref=${data.affiliate.display_name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            /p/{link.slug}
                          </a>
                        </td>
                        <td className="text-center">{link.clicks}</td>
                        <td className="text-center">
                          {formatCurrency(link.commissions)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
