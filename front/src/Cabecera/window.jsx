import React, { useState } from 'react';
import './window.css';

const DropdownMenu = ({ handleClose }) => {
  const [view, setView] = useState(1); // Vista inicial

  // Función que renderiza el contenido basado en la vista seleccionada
  const renderContent = () => {
    switch (view) {
      case 1:
        return (
          <>
            <h2>Selecciona Modo de Ingreso</h2>
            <button className="modal-button" onClick={() => setView(2)}>
              Recibir código de acceso por e-mail
            </button>
            <button className="modal-button" onClick={() => setView(3)}>
              Entrar con e-mail y contraseña
            </button>
            <p className="terms-text">
              Al registrarte, estás aceptando nuestros{' '}
              <a href="/">Términos y condiciones</a> y nuestras{' '}
              <a href="/">Políticas de privacidad</a>.
            </p>
          </>
        );
      case 2:
        return (
          <>
            <h2>Ingresa tu correo y te enviaremos un código de acceso</h2>
            <form>
              <input type="email" placeholder="Correo" className="input-field" />
              <button type="submit" className="modal-button">Enviar</button>
              <button type="button" className="modal-button" onClick={() => setView(1)}>
                Volver
              </button>
            </form>
          </>
        );
        case 3:
  return (
    <>
      <h2 className="modal-title">Ingresa tus Credenciales</h2>
      <form className="modal-form">
        <input type="email" placeholder="Correo" className="input-field" />
        <input
          type="password"
          placeholder="Contraseña"
          className="input-field"
        />
        <div className="password-options">
          <a href="/" className="forgot-password-link" onClick={() => setView(2)}>Olvidé mi contraseña</a>
        </div>
        <div className="button-container">
          <button type="submit" className="modal-button">Entrar</button>
          <button type="button" className="modal-button modal-button-secondary" onClick={() => setView(1)}>
            Volver
          </button>
        </div>
      </form>
      <p className="register-text">
        <a href="#" className="register-link" onClick={() => setView(2)}>¿No tienes una cuenta? Regístrese</a>
      </p>
    </>
  );

      default:
        return null;
    }
  };

  return (
    <div className="dropdown-menu">
      {renderContent()}
    </div>
  );
};

export default DropdownMenu;
