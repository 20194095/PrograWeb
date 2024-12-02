import React, { useState, useEffect } from "react";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para ver y editar
  const [editedProduct, setEditedProduct] = useState(null); // Producto editado temporalmente

  // Obtener la lista de productos
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:4001/api/admin/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setProducts(data); // La respuesta debe incluir `marca` 
      } else {
        console.error("Error al obtener los productos:", data.message);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };


  useEffect(() => {
    fetchProducts(); // Cargar los productos al montar el componente
  }, []);

  // Seleccionar un producto para ver/editar
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product }); // Crea una copia editable del producto
  };

  // Manejar los cambios en el formulario de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  // Guardar los cambios del producto editado
  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:4001/api/admin/products/${selectedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedProduct),
        }
      );

      if (response.ok) {
        alert("Producto actualizado correctamente");
        fetchProducts(); // Recargar la lista de productos
        setSelectedProduct(null); // Cerrar el formulario de edición
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar el producto:", errorData.message);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  // Filtrar productos según el término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list-container">
      <h1>Listado de Productos</h1>
      <input
        type="text"
        placeholder="Buscar producto por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-barr"
      />

      {selectedProduct ? (
        <div className="product-detail">
          <h2>Detalle del Producto</h2>
          <form className="edit-form">
            <label>
              Nombre:
              <input
                type="text"
                name="nombre"
                value={editedProduct.nombre}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Descripción:
              <input
                type="text"
                name="descripcion"
                value={editedProduct.descripcion}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Precio:
              <input
                type="number"
                name="precio"
                value={editedProduct.precio}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Stock:
              <input
                type="number"
                name="stock"
                value={editedProduct.stock}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Marca:
              <input
                type="text"
                name="marca"
                value={editedProduct.marca}
                onChange={handleInputChange}
              />
            </label>
            <button
              type="button"
              onClick={handleSaveChanges}
              className="save-button"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="cancel-button"
            >
              Cancelar
            </button>
          </form>

        </div>
      ) : (
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <h2>{product.nombre}</h2>
                
                <p><strong>Descripción:</strong> {product.descripcion}</p>
                <p><strong>Marca:</strong> {product.marca}</p>
                <p><strong>Precio:</strong> ${product.precio.toFixed(2)}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <button
                  onClick={() => handleSelectProduct(product)}
                  className="edit-button"
                >
                  Editar
                </button>
              </div>

            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
