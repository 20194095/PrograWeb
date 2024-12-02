import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [form, setForm] = useState({
    metodoDeEntrega: "",
    nroTarjeta: "",
    tipoTarjeta: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate(); // Inicializa useNavigate

  const token = localStorage.getItem("token"); // Obtener el token del localStorage

  // Cargar datos del carrito
  useEffect(() => {
    fetch("http://localhost:4001/api/cart", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.ItemDeCarritos)) {
          const items = data.ItemDeCarritos.map((item) => ({
            idProducto: item.idProducto,
            cantidad: item.cantidad,
            precio: item.product.precio,
            nombre: item.product.nombre,
          }));
          setCartItems(items);

          // Calcular subtotal
          const sub = items.reduce((sum, item) => sum + item.cantidad * item.precio, 0);
          setSubtotal(sub);
        }
      })
      .catch((error) => console.error("Error al cargar el carrito:", error));
  }, [token]);

  // Cargar detalles del usuario
  useEffect(() => {
    // Verifica si el token está disponible antes de realizar la llamada
    const storedToken = localStorage.getItem("token");
  
    if (!storedToken) {
      console.error("Token no encontrado en localStorage.");
      return;
    }
  
    fetch("http://localhost:4001/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario.");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUserDetails({
            nombre: data.nombre, // Asegúrate de que las claves coincidan con tu API
            apellido: data.apellido,
            direccion: data.direccion,
            ciudad: data.ciudad,
            telefono: data.telefono,
          });
        }
      })
      .catch((error) => {
        console.error("Error al cargar los datos del usuario:", error);
      });
  }, []);
  

  // Actualizar el total dependiendo del método de entrega
  useEffect(() => {
    if (form.metodoDeEntrega === "delivery") {
      setTotal(subtotal + 10); // Agregar costo de envío
    } else {
      setTotal(subtotal); // Sin costo de envío
    }
  }, [form.metodoDeEntrega, subtotal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const orderData = {
      items: cartItems.map((item) => ({
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        precio: item.precio,
      })),
      total: total,
      subTotal: subtotal,
      metodoDeEntrega: form.metodoDeEntrega,
      nroTarjeta: form.nroTarjeta,
      tipoTarjeta: form.tipoTarjeta,
      fecha: new Date().toISOString(),
    };
  
    fetch("http://localhost:4001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/compra-exitosa"); // Redirige a la página de éxito
        } else {
          alert("Error al crear la orden");
        }
      })
      .catch((error) => console.error("Error al crear la orden:", error));
  };
  

  return (
    <div className="checkout-container">
      <h1>Resumen de Compra</h1>
      <div className="checkout-content">
        {/* Resumen de Pedido */}
        <div className="order-summary">
          <h2>Detalles del Pedido</h2>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.nombre} - {item.cantidad} x S/ {item.precio.toFixed(2)}
              </li>
            ))}
          </ul>
          <p class="total">
            <strong>Subtotal:</strong> S/ {subtotal.toFixed(2)}
          </p>
          <p class="total">
            <strong>Total:</strong> S/ {total.toFixed(2)}
          </p>
          <h2>Detalles del Usuario</h2>
          <p><strong>Nombre:</strong> {userDetails.nombre}</p>
          <p><strong>Apellido:</strong> {userDetails.apellido}</p>
          <p><strong>Dirección:</strong> {userDetails.direccion}</p>
          <p><strong>Ciudad:</strong> {userDetails.ciudad}</p>
          <p><strong>Teléfono:</strong> {userDetails.telefono}</p>
        </div>

        {/* Formulario de Checkout */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Información de Envío y Pago</h2>
          <label>
            Método de Entrega:
            <select
              name="metodoDeEntrega"
              value={form.metodoDeEntrega}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona un método</option>
              <option value="delivery">Delivery</option>
              <option value="pickup">Recojo en tienda</option>
            </select>
          </label>
          <label>
            Número de Tarjeta:
            <input
              type="text"
              name="nroTarjeta"
              value={form.nroTarjeta}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Tipo de Tarjeta:
            <select
              name="tipoTarjeta"
              value={form.tipoTarjeta}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona un tipo</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
            </select>
          </label>
          <button className="checkout-button" type="submit">
            Confirmar Compra
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
