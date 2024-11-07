import React, { useState } from 'react';
import logo from '../imagesCabecera/Logo.png';
import carrito from '../imagesCabecera/carrito.png';
import login from '../imagesCabecera/login.png';
import lupa from '../imagesCabecera/lupa.png';
import bannerHeader from '../imagesCabecera/bannerheader.png';
import ubicacion from '../imagesCabecera/ubicacion.png';
import categorias from '../imagesCabecera/barrasrojas.png';
import cohete from '../imagesCabecera/cohete.png';
import jbl from '../imagesCabecera/jbl.png';
import apple from '../imagesCabecera/apple.png';
import DropdownMenu from './window'; // Asegúrate de que esta ruta sea correcta
import CarritoEmergente from './Carrito'; // Importa el componente del carrito
import './Header.css';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCarrito, setShowCarrito] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  const handleToggleCarrito = () => {
    setShowCarrito(!showCarrito);
  };

  const handleCloseCarrito = () => {
    setShowCarrito(false);
  };

  // Ejemplo de datos para el carrito
  const carritoItems = [
    {
      name: 'Audífonos Bluetooth True Wireless Apple',
      description: 'Airpods Pro 2da gen. con estuche de carga tipo C',
      price: 949.90,
      quantity: 1,
      image: 'https://via.placeholder.com/60' // Ruta temporal de la imagen
    },
  ];

  return (
    <>
      <header className="HeaderCompleto">
        {/* Banner superior */}
        <div className="banner-header">
          <img src={bannerHeader} alt="Banner Header" />
        </div>

        {/* Header principal */}
        <div className="header">
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
              <button onClick={handleToggleDropdown} className="user-link-container">
                <img src={login} alt="Login" />
                <span>Iniciar sesión</span>
              </button>
              <button onClick={handleToggleCarrito} className="user-link-container">
                <img src={carrito} alt="Carrito" />
                <span>Mi carrito</span>
              </button>
            </div>
          </div>
        </div>

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

        {/* Vista desplegable de inicio de sesión */}
        {showDropdown && <DropdownMenu handleClose={handleCloseDropdown} />}

        {/* Vista emergente del carrito */}
        {showCarrito && (
          <CarritoEmergente items={carritoItems} handleCloseCart={handleCloseCarrito} />
        )}
      </header>
    </>
  );
}

export default Header;
