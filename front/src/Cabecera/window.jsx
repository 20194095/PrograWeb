import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para manejar la navegación
import "./window.css";

const DropdownMenu = ({ handleClose }) => {
  const [view, setView] = useState(1); // Vista inicial
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    tipo: "cliente",
    direccion: "",
    ciudad: "",
    telefono: "",
  });

  const [message, setMessage] = useState(""); // Mensajes de error o éxito
  const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado
  const navigate = useNavigate(); // Hook de React Router para redirigir

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Maneja el login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Guarda el token en localStorage
        setMessage("Inicio de sesión exitoso");

        // Llama a fetchUserInfo para obtener detalles adicionales del usuario
        const userInfo = await fetchUserInfo(); // Obtén el usuario con su tipo

        if (userInfo?.tipo === "administrador") {
          navigate("/dashboard"); // Redirige al dashboard para administradores
        } else {
          navigate("/resumen-cuenta"); // Redirige al resumen de cuenta para clientes
        }

        handleClose(); // Cierra el dropdown
      } else {
        setMessage(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor");
    }
  };

  // Función para registrar
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Envía todos los datos del formulario, incluido "tipo"
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registro exitoso. Ahora puedes iniciar sesión.");
        setView(3); // Cambiar a la vista de login
      } else {
        setMessage(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor");
    }
  };

  // Función para obtener los datos del usuario
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("http://localhost:4001/api/users/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data); // Almacena los datos del usuario
          return data; // Devuelve los datos del usuario
        } else {
          console.error("Error al obtener los datos del usuario");
          return null;
        }
      } catch (error) {
        console.error("Error al conectar con el servidor", error);
        return null;
      }
    }
  };

  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token del almacenamiento local
    setUser(null); // Limpia los datos del usuario
    setView(1); // Cambia a la vista inicial
    navigate("/"); // Redirige a la página principal
  };

  // Obtén la información del usuario al cargar el componente
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Renderizar contenido según el estado
  const renderContent = () => {
    if (user) {
      if (user.tipo === "administrador") {
        return (
          <>
            <h2>Bienvenido, Administrador  {user.nombre}</h2>

            <button className="modal-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        );
      } else {
        return (
          <>
            <h2>Bienvenido,  {user.nombre}</h2>
            <button
              className="modal-button"
              onClick={() => navigate("/resumen-cuenta")} // Redirige al resumen de cuenta
            >
              Resumen de Cuenta
            </button>
            <button className="modal-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        );
      }
    }

    switch (view) {
      case 1:
        return (
          <>
            <h2>Selecciona Modo de Ingreso</h2>
            <button className="modal-button" onClick={() => setView(2)}>
              Registrarte
            </button>
            <button className="modal-button" onClick={() => setView(3)}>
              Entrar con e-mail y contraseña
            </button>
            <p className="terms-text">
              Al registrarte, estás aceptando nuestros{" "}
              <a href="/">Términos y condiciones</a> y nuestras{" "}
              <a href="/">Políticas de privacidad</a>.
            </p>
          </>
        );
      case 2:
        return (
          <>
            <h2>Regístrate</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                className="input-field"
                value={formData.nombre}
                onChange={handleChange}
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                className="input-field"
                value={formData.apellido}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Correo"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                className="input-field"
                value={formData.direccion}
                onChange={handleChange}
              />
              <input
                type="text"
                name="ciudad"
                placeholder="Ciudad"
                className="input-field"
                value={formData.ciudad}
                onChange={handleChange}
              />
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                className="input-field"
                value={formData.telefono}
                onChange={handleChange}
              />

              <label className="form-label">Tipo de usuario:</label>
              <select
                name="tipo"
                className="select-field"
                value={formData.tipo}
                onChange={handleChange}
              >
                <option value="cliente">Cliente</option>
                <option value="administrador">Administrador</option>
              </select>
              <button type="submit" className="modal-button">
                Registrar
              </button>
              <button
                type="button"
                className="modal-button"
                onClick={() => setView(1)}
              >
                Volver
              </button>
            </form>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="modal-title">Ingresa tus Credenciales</h2>
            <form className="modal-form" onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Correo"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="password-options">
                <a
                  href="/"
                  className="forgot-password-link"
                  onClick={() => setView(2)}
                >
                  Olvidé mi contraseña
                </a>
              </div>
              <div className="button-container">
                <button type="submit" className="modal-button">
                  Entrar
                </button>
                <button
                  type="button"
                  className="modal-button modal-button-secondary"
                  onClick={() => setView(1)}
                >
                  Volver
                </button>
              </div>
            </form>
            <p className="register-text">
              <a
                href="#"
                className="register-link"
                onClick={() => setView(2)}
              >
                ¿No tienes una cuenta? Regístrate
              </a>
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dropdown-menu">
      {message && <p className="error-message">{message}</p>}
      {renderContent()}
    </div>
  );
};

export default DropdownMenu;
