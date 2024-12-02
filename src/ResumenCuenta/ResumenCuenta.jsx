import React, { useState, useEffect } from "react";
import "./ResumenCuenta.css";
import { useNavigate } from "react-router-dom";

const ResumenCuenta = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    direccion: "",
    ciudad: "",
    telefono: "",
  });
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]); // Inicializa como un array vacío
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  // Recupera el token dinámicamente desde Local Storage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No se encontró el token en Local Storage");
      return;
    }

    // Solicitud para obtener datos del usuario
    fetch("http://localhost:4001/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener datos del usuario");
        }
        return response.json();
      })
      .then((data) => {
        // Limpia el campo de contraseña para permitir ingresar una nueva
        setUserData({ ...data, password: "Ingresar nueva contraseña" });
      })
      .catch((error) => console.error("Error al obtener datos del usuario:", error));

    // Solicitud para obtener órdenes
    fetch("http://localhost:4001/api/orders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener órdenes");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data); // Guarda las órdenes obtenidas
      })
      .catch((error) => console.error("Error al obtener órdenes:", error));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    if (!token) {
      console.error("No se encontró el token en Local Storage");
      return;
    }

    fetch("http://localhost:4001/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData), // Envía los datos actualizados al backend
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar los datos");
        }
        alert("Datos actualizados correctamente");
      })
      .catch((error) => console.error("Error al actualizar datos:", error));
  };

  return (
    <div className="resumen-cuenta-container">
      <h1 className="titulo">Resumen de Cuenta</h1>
      <div className="form-container">
        <h2 className="subtitulo">Datos del Usuario</h2>
        <form>
          <label className="form-label">
            Nombre: 
            <input
              type="text"
              name="nombre"
              value={userData.nombre}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Apellido:
            <input
              type="text"
              name="apellido"
              value={userData.apellido}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Email:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Dirección:
            <input
              type="text"
              name="direccion"
              value={userData.direccion}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Ciudad:
            <input
              type="text"
              name="ciudad"
              value={userData.ciudad}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Teléfono:
            <input
              type="text"
              name="telefono"
              value={userData.telefono}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Contraseña:
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"} // Alterna entre texto y puntos
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="form-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Cambia el estado
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  
                }}
              >
                {showPassword ? "Ocultar" : "Mostrar"} {/* Texto dinámico del botón */}
              </button>
            </div>
          </label>
          <button class="button-save" type="button" onClick={handleSave} className="btn">
            Guardar Datos
          </button>
        </form>

      </div>

      <div className="orders-container">
        <h2 className="subtitulo2">Órdenes Realizadas</h2>
        <ul className="order-list">
          {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <li key={index} className="order-item">
                <strong>Orden #{order.id}:</strong>
                <ul>
                  <li><strong>Total:</strong> {order.total}</li>
                  <li><strong>Subtotal:</strong> {order.subTotal}</li>
                  <li><strong>Método de Entrega:</strong> {order.metodoDeEntrega}</li>
                  <li><strong>Fecha:</strong> {new Date(order.fecha).toLocaleDateString()}</li>
                </ul>
                <button
                  className="details-button"
                  onClick={() => navigate(`/DetallesAdmin/${order.id}`)}
                >
                  Ver Detalles
                </button>
              </li>
            ))
          ) : (
            <p class="noorden">No se encontraron órdenes.</p>
          )}
        </ul>
      </div>

    </div>
  );
};

export default ResumenCuenta;
