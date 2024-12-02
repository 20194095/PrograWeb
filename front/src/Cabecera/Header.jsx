import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir
import DropdownMenu from "./window"; // Menú desplegable
import CarritoEmergente from "./Carrito"; // Carrito emergente
import "./Header.css";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCarrito, setShowCarrito] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const navigate = useNavigate(); // Para redirigir a otras páginas

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

  // Manejar el envío de búsqueda
  const handleSearch = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado
    const query = searchTerm.trim(); // Limpia los espacios en blanco
    if (query) {
      navigate(`/SearchResp?search=${query}`); // Redirige con el término de búsqueda
    } else {
      navigate(`/SearchResp`); // Redirige para mostrar todos los productos si no hay término
    }
  };

  return (
    <>
      <header className="HeaderCompleto">
        {/* Banner superior */}
        <div className="banner-header">
          <img src="imagesCabecera/bannerheader.png" alt="Banner Header" />
        </div>

        {/* Header principal */}
        <div className="header">
          <div className="header-top">
            {/* Logo */}
            <div className="logo">
              <img src="imagesCabecera/Logo.png" alt="Logo" />
            </div>

            {/* Botón de Categorías */}
            <div className="categorias">
              <img src="imagesCabecera/barrasrojas.png" alt="Categorías" />
              <span>Categorías</span>
            </div>

            {/* Barra de Búsqueda */}
            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado con el término de búsqueda
              />
              <button type="submit" className="search-button">
                <img src="imagesCabecera/lupa.png" alt="Buscar" />
              </button>
            </form>

            {/* Links de Usuario */}
            <div className="user-links">
              <button
                onClick={handleToggleDropdown}
                className="user-link-container"
              >
                <img src="imagesCabecera/login.png" alt="Login" />
                <span>Iniciar sesión</span>
              </button>
              <button
                onClick={handleToggleCarrito}
                className="user-link-container"
              >
                <img src="imagesCabecera/carrito.png" alt="Carrito" />
                <span>Mi carrito</span>
              </button>
            </div>
          </div>
        </div>

        {/* Parte baja del Header */}
        <div className="header-bottom">
          <div className="location">
            <img src="imagesCabecera/ubicacion.png" alt="Ubicación" />
            <span>Ingresa tu ubicación</span>
          </div>
          <nav className="nav-links">
            <img src="imagesCabecera/cohete.png" alt="Cohete" />
            <a href="/">¡Descubre lo nuevo!</a>
            <img src="imagesCabecera/jbl.png" alt="JBL" />
            <a href="/">Mundo JBL</a>
            <img src="imagesCabecera/apple.png" alt="Apple" />
            <a href="/">Mundo Apple</a>
            <a href="/">¿Necesitas ayuda?</a>
          </nav>
        </div>

        {/* Vista desplegable de inicio de sesión */}
        {showDropdown && <DropdownMenu handleClose={handleCloseDropdown} />}

        {/* Vista emergente del carrito */}
        {showCarrito && (
          <CarritoEmergente
            items={[
              {
                name: "Audífonos Bluetooth True Wireless Apple",
                description: "Airpods Pro 2da gen. con estuche de carga tipo C",
                price: 949.9,
                quantity: 1,
                image: "https://via.placeholder.com/60", // Imagen temporal
              },
            ]}
            handleCloseCart={handleCloseCarrito}
          />
        )}
      </header>
    </>
  );
}

export default Header;
