// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand text-success logo h1 align-self-center" to="/">Cheve Market</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
          <div className="flex-fill">
            <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">Tienda</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">Afiliados</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
