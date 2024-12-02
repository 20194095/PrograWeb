import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h1>Bienvenido al Dashboard</h1>
        <div className="card">
          <h2>Gestión de Órdenes</h2>
          <p>
            Administra y visualiza todas las órdenes generadas por los clientes.
          </p>
          <button className="card-button" onClick={() => navigate("/OrderDetail")}>
            Ver Órdenes
          </button>
        </div>
        <div className="card">
          <h2>Gestión de Productos</h2>
          <p>
            Administra los productos disponibles para la venta.
          </p>
          <button className="card-button" onClick={() => navigate("/Products")}>
            Ver Productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
