import React, { useEffect, useState } from "react";
import "./OrdenAdmin.css";

const OrderDetail = () => {
  const [orders, setOrders] = useState([]); // Estado para todas las órdenes
  const [selectedOrder, setSelectedOrder] = useState(null); // Estado para la orden seleccionada
  const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario de la orden
  const [error, setError] = useState(null); // Estado para errores
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  // Recupera el listado de órdenes
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No se encontró un token válido");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:4001/api/admin/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las órdenes del sistema");
        }

        const data = await response.json();
        setOrders(data); // Guarda todas las órdenes en el estado
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const fetchOrderDetails = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No se encontró un token válido");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4001/api/admin/orders/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener detalles de la orden");
      }

      const orderData = await response.json();
      setSelectedOrder(orderData); // Guarda la orden seleccionada en el estado

      // Obtén la información del usuario asociado a la orden
      const userResponse = await fetch(`http://localhost:4001/api/admin/users/${orderData.idUsuario}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Error al obtener detalles del usuario");
      }

      const userData = await userResponse.json();
      setSelectedUser(userData); // Guarda los detalles del usuario en el estado
    } catch (err) {
      console.error(err.message);
    }
  };

  // Renderizado mientras carga
  if (isLoading) {
    return (
      <div className="order-detail-container">
        <h1>Cargando órdenes...</h1>
      </div>
    );
  }

  // Renderizado de errores
  if (error) {
    return (
      <div className="order-detail-container">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="order-detail-container">
      <h1>Órdenes Registradas</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <h2>Orden #{order.id}</h2>
            <p>
              <strong>Cliente:</strong> {order.idUsuario || "Desconocido"}
            </p>
            <p>
              <strong>Fecha:</strong> {new Date(order.fecha).toLocaleDateString()}
            </p>
            <p>
              <strong>Total:</strong> S/ {order.total}
            </p>
            <p>
              <strong>Método de Entrega:</strong> {order.metodoDeEntrega}
            </p>
            <button
              className="card-button"
              onClick={() => fetchOrderDetails(order.id)} // Obtiene los detalles de la orden
            >
              Ver Detalles
            </button>
          </div>
        ))}
      </div>

      {/* Detalles de la orden seleccionada */}
      {selectedOrder && selectedUser && (
        <div className="order-details">
          <h2>Detalles de la Orden #{selectedOrder.id}</h2>
          <p>
            <strong>Nombre del Cliente:</strong> {selectedUser.nombre} {selectedUser.apellido}
          </p>
          <p>
            <strong>Email del Cliente:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Total:</strong> S/ {selectedOrder.total}
          </p>
          <p>
            <strong>Subtotal:</strong> S/ {selectedOrder.subTotal}
          </p>
          <p>
            <strong>Método de Entrega:</strong> {selectedOrder.metodoDeEntrega}
          </p>
          <p>
            <strong>Productos:</strong>
          </p>
          <ul>
            {selectedOrder.order_items.map((item) => (
              <li key={item.id}>
                Producto ID: {item.idProducto}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
