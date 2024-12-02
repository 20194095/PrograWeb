import React, { useState } from "react";
import "./addProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    marca: "", // Incluye este campo
    categoria: "", // Si es necesario
  });


  const [message, setMessage] = useState("");

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Obtén el token del almacenamiento local
    if (!token) {
      setMessage("Error: No tienes autorización para realizar esta acción.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4001/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Producto creado exitosamente.");
        setFormData({
          nombre: "",
          descripcion: "",
          precio: "",
          stock: "",
        }); // Limpia el formulario
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Error al crear el producto.");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="add-product-container">
      <h1>Agregar Nuevo Producto</h1>
      {message && <p className="message">{message}</p>}
      <form className="add-product-form" onSubmit={handleSubmit}>
        {/* Campos existentes */}
        <label htmlFor="nombre">Nombre del Producto</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ingrese el nombre del producto"
          required
        />

        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Ingrese una descripción del producto"
          required
        />

        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          placeholder="Ingrese el precio del producto"
          required
        />

        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Ingrese la cantidad de stock"
          required
        />

        {/* Nuevos campos */}
        <label htmlFor="categoria">Categoría</label>
        <input
          type="text"
          id="categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          placeholder="Ingrese la categoría del producto"
          required
        />
        <label htmlFor="marca">Marca</label>
        <input
          type="text"
          id="marca"
          name="marca"
          value={formData.marca}
          onChange={handleChange}
          placeholder="Ingrese la marca del producto"
          required
        />


        <button type="submit" className="add-product-button">
          Crear Producto
        </button>
      </form>

    </div>
  );
};

export default AddProduct;
