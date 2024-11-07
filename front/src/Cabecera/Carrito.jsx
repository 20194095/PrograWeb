import React, { useState } from 'react';
import './Carrito.css';
import trashIcon from '../imagesCabecera/trash.png'; // Ruta de tu icono trash

const Cart = ({ items, handleCloseCart }) => {
  const [cartItems, setCartItems] = useState(items || []);

  // Eliminar artículo del carrito
  const handleRemoveItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
  };

  // Cambiar cantidad
  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  // Calcular subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <button className="close-button" onClick={handleCloseCart}>X</button>
      <div className="cart-header">
        <h2>Carrito</h2>
      </div>
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
                <div className="quantity-control">
                  <select
                    id={`quantity-${index}`}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                    style={{ marginTop: '5px' }} // Asegura que el selector esté cerca del texto
                  >
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="item-price">S/ {item.price.toFixed(2)}</p>
              </div>
              <button className="remove-button" onClick={() => handleRemoveItem(index)}>
                <img src={trashIcon} alt="Eliminar" style={{ width: '30px', height: '30px' }} />
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
  <button className="checkout-button">Comprar</button>
  <p className="purchase-note">COMPRA 100% SEGURA</p>
</div>



        </>
      )}
    </div>
  );
};

export default Cart;
