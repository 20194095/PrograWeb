import React from "react";
import { useNavigate } from "react-router-dom";
import "./CompraExitosa.css"; // Agrega este archivo CSS para estilos

const CompraExitosa = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <h1>¡Compra Exitosa!</h1>
      <p>Tu compra se ha realizado correctamente.</p>
      <div className="success-buttons">
        <button onClick={() => navigate("/resumen-cuenta")}>Ver Resumen de Cuenta</button>
        <button onClick={() => navigate("/")}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default CompraExitosa;
