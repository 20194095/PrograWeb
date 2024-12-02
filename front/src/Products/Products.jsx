import React from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h1>Revisar los productos</h1>
        <div className="card">
          <h2>Lista de Productos</h2>
          <p>
            Visualiza el lista de productos y filtralos.
          </p>
          <button className="card-button" onClick={() => navigate("/ProductList")}>
            Ver Productos
          </button>
        </div>
        <div className="card">
          <h2>Agregar Productos</h2>
          <p>
            Agrega nuevos productos.
          </p>
          <button className="card-button" onClick={() => navigate("/AddProduct")}>
            Agregar productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
