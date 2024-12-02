import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./OrdenDetalle.css";

const OrdenDetalle = () => {
  const { id } = useParams(); // Obtén el ID de la orden desde la URL
  const [orderDetails, setOrderDetails] = useState({
    id: null,
    items: [],
    subTotal: 0,
    total: 0,
    metodoDeEntrega: "",
    direccion: "",
  });
  const [isLoading, setIsLoading] = useState(true); // Para manejar la carga
  const [error, setError] = useState(null); // Para manejar errores
  const token = localStorage.getItem("token"); // Recupera el token

  useEffect(() => {
    if (!token) {
      setError("Token no encontrado. Por favor, inicia sesión.");
      setIsLoading(false);
      return;
    }

    // Fetch para obtener los detalles de la orden
    fetch(`http://localhost:4001/api/orders/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener detalles de la orden.");
        }
        return response.json();
      })
      .then(async (data) => {
        // Fetch para obtener datos del usuario si la dirección no está incluida
        const userResponse = await fetch("http://localhost:4001/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await userResponse.json();

        // Procesar los productos asociados a los `order_items`
        const productPromises = data.order_items.map((item) =>
          fetch(`http://localhost:4001/api/products/${item.idProducto}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json())
        );

        const products = await Promise.all(productPromises);

        // Combinar los datos de los productos con los `order_items`
        const items = data.order_items.map((item, index) => ({
          ...item,
          ...products[index],
        }));

        setOrderDetails({ ...data, items, direccion: userData.direccion });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar detalles de la orden:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [id, token]);

  if (isLoading) {
    return <p>Cargando detalles de la orden...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="orden-detalle-container">
      <h1>Detalles de la Orden #{orderDetails.id}</h1>
      <h2>Información del Pedido</h2>
      <ul>
        {orderDetails.items && orderDetails.items.length > 0 ? (
          orderDetails.items.map((item, index) => (
            <li key={index}>
              <strong> - Producto:</strong> {item.nombre} <br />
              <strong> - Cantidad:</strong> 1 <br />
              <strong> - Precio Unitario:</strong> S/ {item.precio.toFixed(2)} <br />
              <strong> - Total Producto:</strong> S/ {(1 * item.precio).toFixed(2)}
            </li>
          ))
        ) : (
          <p>No hay productos en esta orden.</p>
        )}
      </ul>
      <h2>Resumen de Pago</h2>
      <p>
        <strong>Subtotal:</strong> S/ {orderDetails.subTotal.toFixed(2)}
      </p>
      <p>
        <strong>Total:</strong> S/ {orderDetails.total.toFixed(2)}
      </p>
      <p>
        <strong>Método de Entrega:</strong> {orderDetails.metodoDeEntrega}
      </p>
      <h2>Dirección</h2>
      <p>{orderDetails.direccion || "No registrada"}</p>
    </div>
  );
};

export default OrdenDetalle;
