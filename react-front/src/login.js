import Header from './Header';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Estado para manejar el error
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/Home');
    }
  }, [navigate]);

  async function login() {
    console.warn(email, password);
    let item = { email, password };
    let result = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(item),
    });

    result = await result.json();

    // Verifica si hubo un error en la autenticación
    if (result.error) {
      setError(result.error);  // Muestra el error desde la respuesta del servidor
    } else {
      localStorage.setItem('user-info', JSON.stringify(result));
      navigate('/Home');
    }
  }

  return (
    <div>
      <Header />
      <section className="unique-container">
        <div className="unique-image-section">
          <div className="unique-image-wrapper">
            <img src="./mesh-gradient.png" alt="" />
          </div>
          <div className="unique-content-container">
            <h1 className="unique-section-heading">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit <span>Algo</span>
            </h1>
            <p className="unique-section-paragraph">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>

        <div className="unique-form-section">
          <div className="unique-form-wrapper">
            <div className="unique-logo-container">
              <a href="/index" className="unique-logo-container">
                <img src="./logo.png" alt="Logo" />
              </a>
            </div>

            <h2>Hola 👋🏻</h2>
            <p>Cargue sus datos aquí</p>

            {/* Si hay un error, mostrarlo */}
            {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

            <div className="unique-input-container">
              <div className="unique-form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} autoComplete="off" onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className="unique-form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
              </div>
            </div>

            <div className="unique-remember-forgot">
              <div className="unique-remember-me">
                <input type="checkbox" value="remember-me" id="remember-me" />
                <label htmlFor="remember-me">Recordar inicio</label>
              </div>

              <a href="/Register">¿No tiene una cuenta? Registrarse</a>
            </div>

            <button className="unique-login-btn" onClick={login}>Iniciar sesión</button>

            <div className="unique-or-divider">o</div>

            <button className="unique-google-signin">
              <object data="./google.svg">google logo xd</object>
              <span>Inicia sesión con Google</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
