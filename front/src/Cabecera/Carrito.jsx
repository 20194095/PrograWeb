import React, { useState } from 'react';
import './Carrito.css';
import trashIcon from '../imagesCabecera/trash.png'; // Asegúrate de tener esta imagen o cualquier icono que prefieras

const Cart = ({ items, handleCloseCart }) => {
  const [cartItems, setCartItems] = useState(items || []);

  const handleRemoveItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <button className="close-button" onClick={handleCloseCart}>X</button>
      <h2>Carrito</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <p className="item-title">{item.name}</p>
                <p className="item-description">{item.description}</p>
                <p className="item-price">S/ {item.price.toFixed(2)}</p>
                <div className="quantity-control">
                  <label htmlFor={`quantity-${index}`}>Cantidad:</label>
                  <select
                    id={`quantity-${index}`}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                  >
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveItem(index)}
                >
                  <img src={trashIcon} alt="Eliminar" style={{ width: '16px', height: '16px' }} />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p>Subtotal: S/ {calculateSubtotal().toFixed(2)}</p>
            <p>Entrega: Por calcular</p>
            <p>Total: S/ {calculateSubtotal().toFixed(2)}</p>
            <button className="checkout-button">Comprar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
