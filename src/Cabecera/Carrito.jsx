import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Carrito.css';

const Cart = ({ handleCloseCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Hook para redirección
  // Obtener el token desde localStorage
  const token = localStorage.getItem('token');

  // Cargar el carrito del cliente
  useEffect(() => {
    if (!token) {
      console.error("Token no encontrado en localStorage.");
      return;
    }

    fetch("http://localhost:4001/api/cart", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("No autorizado: verifica tu token.");
        }
        return response.json();
      })
      .then((data) => {
        // Extrae los items del carrito correctamente
        if (data && Array.isArray(data.ItemDeCarritos)) {
          const items = data.ItemDeCarritos.map((item) => ({
            id: item.id,
            cantidad: item.cantidad,
            producto: item.product, // Detalles del producto
          }));
          setCartItems(items);
        } else {
          console.error("El carrito no contiene items válidos:", data);
          setCartItems([]);
        }
      })
      .catch((error) => {
        console.error("Error al cargar el carrito:", error);
        setCartItems([]);
      });
  }, [token]);

  // Eliminar todos los artículos del carrito
  const handleClearCart = () => {
    fetch("http://localhost:4001/api/cart", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setCartItems([]); // Limpia el estado del carrito
        } else {
          console.error("Error al eliminar todos los artículos del carrito");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el carrito:", error);
      });
  };

  // Eliminar artículo individual del carrito
  const handleRemoveItem = (id) => {
    fetch(`http://localhost:4001/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setCartItems(cartItems.filter((item) => item.id !== id));
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el artículo:", error);
      });
  };

  // Cambiar cantidad
  const handleQuantityChange = (id, newQuantity) => {
    fetch(`http://localhost:4001/api/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cantidad: newQuantity }),
    })
      .then((response) => {
        if (response.ok) {
          setCartItems(
            cartItems.map((item) =>
              item.id === id ? { ...item, cantidad: newQuantity } : item
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error al actualizar la cantidad:", error);
      });
  };

  // Calcular subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.cantidad * item.producto.precio,
      0
    );
  };

  return (
    <div className="cart-container">
      <button className="close-button" onClick={handleCloseCart}>X</button>
      <div className="cart-header">
        <h2>Carrito</h2>
        {cartItems.length > 0 && (
          <button className="clear-cart-button" onClick={handleClearCart}>
            Vaciar Carrito
          </button>
        )}
      </div>
      {cartItems.length === 0 ? (
        <p class="vacio">Tu carrito está vacío</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.producto.imagen || "https://via.placeholder.com/150"}
                alt={item.producto.nombre}
                className="item-image"
              />
              <div className="item-details">
                <p className="item-title">{item.producto.nombre}</p>
                <p className="item-description">{item.producto.descripcion}</p>
                <div className="quantity-control">
                  <select
                    value={item.cantidad}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    style={{ marginTop: '5px' }}
                  >
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="item-price">S/ {item.producto.precio.toFixed(2)}</p>
              </div>
              <button
                className="remove-button"
                onClick={() => handleRemoveItem(item.id)}
              >
                <img src="imagesCabecera/trash.png" alt="Eliminar" style={{ width: '30px', height: '30px' }} />
              </button>
            </div>
          ))}
          <div className="cart-summary">
            <p>
              <span>Subtotal:</span>
              <span>S/ {calculateSubtotal().toFixed(2)}</span>
            </p>
            <p>
              <span>Entrega:</span>
              <span>Por calcular</span>
            </p>
            <p className="total-summary">
              <strong>
                <span>Total:</span>
                <span>S/ {calculateSubtotal().toFixed(2)}</span>
              </strong>
            </p>
            <button
              className="checkout-button"
              onClick={() => navigate('/checkout')} // Redirigir a la página de Checkout
            >
              Comprar
            </button>
            <p className="purchase-note">Compra 100% Segura</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
