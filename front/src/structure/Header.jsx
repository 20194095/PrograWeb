import React from 'react';
import logo from '../images/Logo.png';
import carrito from '../images/carrito.png';
import login from '../images/login.png';
import lupa from '../images/lupa.png';
import bannerHeader from '../images/bannerheader.png';
import ubicacion from '../images/ubicacion.png';
import categorias from '../images/barrasrojas.png';
import cohete from '../images/cohete.png';
import jbl from '../images/jbl.png';
import apple from '../images/apple.png';
import './Header.css';

function Header() {
  return (
    <>
      {/* Banner superior */}
      <div className="banner-header">
        <img src={bannerHeader} alt="Banner Header" />
      </div>

      {/* Header principal */}
      <header className="header">
        <div className="header-top">
          {/* Logo */}
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>

          {/* Botón de Categorías */}
          <div className="categorias">
            <img src={categorias} alt="Categorías" />
            <span>Categorías</span>
          </div>

          {/* Barra de Búsqueda */}
          <div className="search-bar">
            <input type="text" placeholder="¿Qué estás buscando?" />
            <button type="submit" className="search-button">
              <img src={lupa} alt="Buscar" />
            </button>
          </div>

          {/* Links de Usuario */}
          <div className="user-links">
            <a href="/login">
              <div className="user-link-container">
                <img src={login} alt="Login" />
                <span>Iniciar sesión</span>
              </div>
            </a>
            <a href="/cart">
              <div className="user-link-container">
                <img src={carrito} alt="Carrito" />
                <span>Mi carrito</span>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* Parte baja del Header */}
      <div className="header-bottom">
        <div className="location">
          <img src={ubicacion} alt="Ubicación" />
          <span>Ingresa tu ubicación</span>
        </div>
        <nav className="nav-links">
          <img src={cohete} alt="Cohete" />
          <a href="/">¡Descubre lo nuevo!</a>
          <img src={jbl} alt="JBL" />
          <a href="/">Mundo JBL</a>
          <img src={apple} alt="Apple" />
          <a href="/">Mundo Apple</a>
          <a href="/">¿Necesitas ayuda?</a>
        </nav>
      </div>
    </>
  );
}

export default Header;
