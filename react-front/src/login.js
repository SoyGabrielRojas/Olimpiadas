import Header from './Header';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap'; // Importa los componentes necesarios de Bootstrap

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/home');
    }
  }, [navigate]);

  async function login() {
    let item = { email, password };

    if (email === 'admin@gmail.com' && password === 'admin123') {
      const adminInfo = {
        email: 'admin@gmail.com',
        name: 'admin',
        role: 'admin' 
      };
      localStorage.setItem('user-info', JSON.stringify(adminInfo));
      navigate('/home');
    } else {
      let result = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(item),
      });

      result = await result.json();

      if (result.error) {
        setError(result.error);
      } else {
        localStorage.setItem('user-info', JSON.stringify(result));
        navigate('/home');
      }
    }
  }

  return (
    <div>
      <Header />
      <section className="unique-container">
        <div className="unique-image-section">
          <div className="unique-image-wrapper">
            <img src="./fondo.jpeg" alt="" />
          </div>
          <div className="unique-content-container">
            <h1 className="unique-section-heading">
              La tienda en línea para deportistas exigentes. Con variedad de productos para fútbol, básquetbol, tenis, voleibol y otros deportes <span>CHAYOTE</span>
            </h1>
            <p className="unique-section-paragraph">
              Tu cancha, tu tienda
            </p>
          </div>
        </div>

        <div className="unique-form-section">
          <div className="unique-form-wrapper">
            <div className="unique-logo-container">
                <img src="./Zombatar.jpg" alt="Logo" />
            </div>

            <h2>Hola 👋🏻</h2>
            <p>Cargue sus datos aquí</p>

            {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

            <div className="unique-input-container">
              <div className="unique-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  autoComplete="off"
                  onChange={(e) => { setEmail(e.target.value) }}
                />
              </div>
              <div className="unique-form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                />
              </div>
            </div>

            <div className="unique-remember-forgot">
              <div className="unique-remember-me">
                <Form.Check
                  type="checkbox"
                  id="show-password"
                  label="Mostrar contraseña"
                  onChange={() => setShowPassword(!showPassword)}
                />
              </div>

              <a href="/register">¿No tiene una cuenta? Registrarse</a>
            </div>

            <button className="unique-login-btn" onClick={login}>Iniciar sesión</button>

            <div className="unique-or-divider">o</div>

            <button className="unique-google-signin">
              <object data="./google.svg">google logo</object>
              <span>Inicia sesión con Google</span>
            </button>
          </div>
        </div>
      </section>
      <br/>
    </div>
  );
}

export default Login;
