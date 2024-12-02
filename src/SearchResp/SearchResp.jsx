import React, { useEffect, useState } from "react";
import "./SearchResp.css";

const SearchResp = () => {
  const [products, setProducts] = useState([]); // Lista de productos
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para ver detalles
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  // Función para obtener todos los productos desde la API
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4001/api/products");
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
        setFilteredProducts(data); // Inicialmente, muestra todos los productos
      } else {
        console.error("Error al obtener los productos:", data.message);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para buscar productos en tiempo real
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = products.filter((product) =>
      product.nombre.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  // Función para seleccionar un producto y mostrar sus detalles
  const handleViewDetail = (product) => {
    setSelectedProduct(product);
  };

  // Función para regresar a la lista de productos
  const handleBackToList = () => {
    setSelectedProduct(null); // Resetea el producto seleccionado
  };

  // Función para agregar al carrito
  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token"); // Obtén el token del local storage
    if (!token) {
      alert("No se encontró un token válido. Por favor, inicia sesión.");
      return;
    }

    const payload = {
      productId,
      cantidad: 1, // Cantidad por defecto
    };

    try {
      const response = await fetch("http://localhost:4001/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Producto agregado al carrito correctamente.");
      } else {
        const errorData = await response.json();
        console.error("Error al agregar al carrito:", errorData.message);
        alert("Error al agregar el producto al carrito: " + errorData.message);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  useEffect(() => {
    fetchProducts(); // Carga inicial de productos
  }, []);

  // Si hay un producto seleccionado, muestra los detalles
  if (selectedProduct) {
    return (
      <div className="product-detail-container">
        <h1>Detalle del Producto</h1>
        <h2>{selectedProduct.nombre}</h2>
        {/* Agregar imagen */}
        {selectedProduct.imagen && (
          <img
            src={selectedProduct.imagen}
            alt={`Imagen de ${selectedProduct.nombre}`}
            className="product-image"
          />
        )}
        <p>{selectedProduct.descripcion}</p>
        <p>
          <strong>Marca:</strong> {selectedProduct.marca}
        </p>
        <p>
          <strong>Precio:</strong> ${selectedProduct.precio.toFixed(2)}
        </p>
        <p>
          <strong>Stock:</strong> {selectedProduct.stock}
        </p>
        <button
          className="back-button"
          onClick={handleBackToList}
        >
          Regresar
        </button>
      </div>
    );
  }



  // Lista de productos
  return (
    <div className="product-search-container">
      <h1>Resultados de Búsqueda</h1>
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto por nombre"
        value={searchTerm}
        onChange={handleSearch}
        className="search-barr"
      />
      {/* Lista de productos */}
      <div className="product-list">
        {isLoading ? (
          <p>Cargando productos...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.nombre}</h2>
              <p>{product.descripcion}</p>
              <p>
                <strong>Precio:</strong> ${product.precio.toFixed(2)}
              </p>
              <p>
                <strong>Stock:</strong> {product.stock}
              </p>
              {/* Botón para ver detalle */}
              <button
                className="view-detail-button"
                onClick={() => handleViewDetail(product)}
              >
                Ver Detalle
              </button>
              {/* Botón para agregar al carrito */}
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product.id)}
              >
                Agregar al Carrito
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResp;
