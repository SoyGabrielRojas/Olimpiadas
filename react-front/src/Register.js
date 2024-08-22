import Header from './Header';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Form} from 'react-bootstrap'; // Importa los componentes necesarios de Bootstrap

function Register() {
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/Home')
        }
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
    const navigate = useNavigate();

    async function signUp() {
        let item = {
            name: name,
            email: email,
            password: password
        };
        console.warn(item);

        let result = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        result = await result.json();
        localStorage.setItem('user-info', JSON.stringify(result));
        navigate('/Home');
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

                        <h2>Bienvenido 👋🏻</h2>
                        <p>Registre sus datos aquí</p>

                        <div className="unique-input-container">
                            <div className="unique-form-group">
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    autoComplete="off"
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>
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

                            <a href="/login">¿Ya tiene una cuenta? Iniciar sesión</a>
                        </div>

                        <button className="unique-login-btn" onClick={signUp}>Registrarse</button>

                        <div className="unique-or-divider">o</div>

                        <button className="unique-google-signin">
                            <object data="./google.svg">google logo xd</object>
                            <span>Registrarse con Google</span>
                        </button>
                    </div>
                </div>

            </section>
            <br />

        </div >
    );
}

export default Register;
