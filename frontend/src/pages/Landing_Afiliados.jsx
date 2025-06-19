// src/pages/Landing_Afiliados.jsx
import React from 'react';

export default function LandingAfiliados() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Únete como afiliado</h1>
      <p className="lead text-center">
        Conviértete en parte de Cheve Market y gana comisiones por cada venta que generes.
      </p>
      <div className="text-center mt-4">
        <a href="/registro" className="btn btn-primary btn-lg">
          Registrarme como afiliado
        </a>
      </div>
    </div>
  );
}
