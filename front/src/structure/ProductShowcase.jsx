import React from 'react';

function ProductShowcase() {
  return (
    <div className="product-showcase">
      {/* Aquí van los productos destacados */}
      <div className="product-item">
        <img src="/ruta/al/producto1.png" alt="Producto 1" />
        <h3>Producto 1</h3>
        <p>S/1549.90</p>
      </div>

      <div className="product-item">
        <img src="/ruta/al/producto2.png" alt="Producto 2" />
        <h3>Producto 2</h3>
        <p>S/1319.90</p>
      </div>
    </div>
  );
}

export default ProductShowcase;
