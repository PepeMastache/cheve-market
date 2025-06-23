// src/pages/Landing_Afiliados.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LandingAfiliados() {
  return (
    <>
      <Navbar />

      {/* Hero / Encabezado */}
      <header className="bg-dark text-white py-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">
            Gana dinero recomendando cervezas increíbles 🍻
          </h1>
          <p className="lead mb-4">
            Únete al programa de afiliados de <span className="text-warning fw-semibold">Cheve
            Market</span> y recibe comisiones por cada venta generada con tu
            enlace personalizado.
          </p>
          <a href="/afiliados#registro" className="btn btn-warning btn-lg px-4">
            ¡Quiero registrarme!
          </a>
        </div>
      </header>

      {/* Beneficios */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">¿Por qué unirte a Cheve Market?</h2>
          <div className="row g-4">
            <div className="col-md-3 col-6 text-center">
              <i className="fas fa-coins fa-3x text-warning mb-3"></i>
              <h3 className="h5 fw-semibold">Comisiones competitivas</h3>
              <p>Hasta <strong>15 %</strong> por cada venta que generes.</p>
            </div>
            <div className="col-md-3 col-6 text-center">
              <i className="fas fa-box-open fa-3x text-warning mb-3"></i>
              <h3 className="h5 fw-semibold">Catálogo premium</h3>
              <p>Más de 200 cervezas artesanales y de importación.</p>
            </div>
            <div className="col-md-3 col-6 text-center">
              <i className="fas fa-chart-line fa-3x text-warning mb-3"></i>
              <h3 className="h5 fw-semibold">Herramientas de seguimiento</h3>
              <p>Panel en tiempo real para ver tus clics y ventas.</p>
            </div>
            <div className="col-md-3 col-6 text-center">
              <i className="fas fa-users fa-3x text-warning mb-3"></i>
              <h3 className="h5 fw-semibold">Comunidad cervecera</h3>
              <p>Aprende estrategias con otros creadores y entusiastas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">Historias con sabor a éxito</h2>
          <div className="row g-4">
            {[
              {
                name: "Luis P.",
                quote:
                  "¡Ya cubrí mis gastos del semestre gracias a las comisiones de Cheve Market!",
              },
              {
                name: "Ana G.",
                quote:
                  "Promociono mis cervezas favoritas en Instagram y gano mientras me divierto.",
              },
              {
                name: "Carlos R.",
                quote:
                  "La plataforma es súper clara: veo mis clics y dinero crecer en tiempo real.",
              },
            ].map((t, i) => (
              <div className="col-md-4" key={i}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <img
                      src={`https://i.pravatar.cc/100?img=${30 + i}`}
                      alt={t.name}
                      className="rounded-circle mb-3"
                    />
                    <p className="fw-light fst-italic">“{t.quote}”</p>
                    <h3 className="h6 mt-3 fw-bold">{t.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">¿Cómo funciona?</h2>
          <div className="row g-4 align-items-start">
            <div className="col-md-4 text-center">
              <div className="p-4 border rounded h-100">
                <span className="badge bg-warning text-dark mb-2 fs-6">Paso 1</span>
                <h3 className="h5 fw-semibold">Te registras</h3>
                <p>Crea tu cuenta de afiliado en minutos. ¡Sin costos!</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="p-4 border rounded h-100">
                <span className="badge bg-warning text-dark mb-2 fs-6">Paso 2</span>
                <h3 className="h5 fw-semibold">Obtienes tu enlace</h3>
                <p>Comparte tu URL única donde quieras: redes, blog, WhatsApp…</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="p-4 border rounded h-100">
                <span className="badge bg-warning text-dark mb-2 fs-6">Paso 3</span>
                <h3 className="h5 fw-semibold">Ganas dinero</h3>
                <p>Cada venta realizada a través de tu enlace suma comisiones a tu bolsillo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la acción principal */}
      <section className="bg-warning text-dark py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">¡Conviértete en afiliado hoy mismo!</h2>
          <p className="lead mb-4">
            No dejes pasar la oportunidad de monetizar tu pasión por la cerveza.
          </p>
          <a href="/afiliados#registro" className="btn btn-dark btn-lg px-4">
            Empezar ahora
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">Preguntas frecuentes</h2>
          <div className="accordion mx-auto" id="faqAccordion" style={{ maxWidth: "720px" }}>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq1">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faqCollapse1"
                  aria-expanded="true"
                  aria-controls="faqCollapse1"
                >
                  ¿Cuánto y cuándo me pagan mis comisiones?
                </button>
              </h2>
              <div
                id="faqCollapse1"
                className="accordion-collapse collapse show"
                aria-labelledby="faq1"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Pagamos mensualmente vía transferencia bancaria o PayPal cuando alcances un mínimo de $500&nbsp;MXN en comisiones.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq2">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faqCollapse2"
                  aria-expanded="false"
                  aria-controls="faqCollapse2"
                >
                  ¿Necesito ser creador de contenido para aplicar?
                </button>
              </h2>
              <div
                id="faqCollapse2"
                className="accordion-collapse collapse"
                aria-labelledby="faq2"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  No. Cualquiera puede participar: estudiantes, amigos, blogs, grupos de Facebook o foros. ¡Mientras ames la buena cerveza, eres bienvenido!
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq3">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faqCollapse3"
                  aria-expanded="false"
                  aria-controls="faqCollapse3"
                >
                  ¿Hay algún costo para unirme al programa?
                </button>
              </h2>
              <div
                id="faqCollapse3"
                className="accordion-collapse collapse"
                aria-labelledby="faq3"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  ¡Ninguno! Registrarte y usar nuestras herramientas es 100 % gratis. Solo ganas, nunca pagas.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
