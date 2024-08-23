import React from 'react';
import { Container, Card } from 'react-bootstrap';
import Header from './Header';

const GuiaUso = () => {
    return (
        <div className='bg-secondary'>
            <Header/>
            <Container className="my-5">
                <h1 className="text-center mb-4 text-dark">Guía de Uso de Chayote</h1>

                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title className="text-success">📝 Registro y Login</Card.Title>
                        <Card.Text>
                            <h5 className="text-info">Registro:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Haz clic en el botón <strong className="text-warning">"Registrarse"</strong> o <strong className="text-warning">"Crear Cuenta"</strong>.</li>
                                <li>👉 Completa el formulario con tu nombre, correo electrónico y contraseña.</li>
                                <li>👉 Haz clic en <strong className="text-warning">"Registrarse"</strong>.</li>
                                <li>👉 (Opción de registrarse con Google aún no implementada).</li>
                            </ul>
                            <h5 className="text-info">Inicio de Sesión:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Haz clic en el botón <strong className="text-warning">"Iniciar Sesión"</strong>.</li>
                                <li>👉 Introduce tu correo electrónico y contraseña.</li>
                                <li>👉 Haz clic en <strong className="text-warning">"Iniciar Sesión"</strong>.</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title className="text-success">🌐 Navegación Principal</Card.Title>
                        <Card.Text>
                            <h5 className="text-info">Página de Inicio:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Al iniciar sesión, serás redirigido a la página de inicio.</li>
                                <li>👉 Aquí encontrarás la bienvenida de la página.</li>
                            </ul>
                            <h5 className="text-info">Búsqueda:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Utiliza la barra de búsqueda para encontrar productos específicos por nombre o palabra clave.</li>
                            </ul>
                            <h5 className="text-info">Cerrar Sesión:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Utiliza la opción de cerrar sesión en el menú de navegación y confirma para finalizar.</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title className="text-success">🛒 Visualización de Productos</Card.Title>
                        <Card.Text>
                            <h5 className="text-info">Ficha de Producto:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Accede a la ficha de un producto al hacer clic en él.</li>
                                <li>👉 En la ficha verás:
                                    <ul className="list-unstyled ms-3">
                                        <li>📸 Imagen del producto</li>
                                        <li>📝 Nombre y Descripción</li>
                                        <li>💰 Precio</li>
                                    </ul>
                                </li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title className="text-success">🛒 Carrito de Compras</Card.Title>
                        <Card.Text>
                            <h5 className="text-info">Agregar al Carrito:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Haz clic en <strong className="text-warning">"Agregar al Carrito"</strong> en la ficha del producto.</li>
                                <li>👉 El producto se añadirá a tu carrito.</li>
                            </ul>
                            <h5 className="text-info">Ver Carrito:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Haz clic en el ícono del carrito en la parte superior de la página para ver tus productos.</li>
                            </ul>
                            <h5 className="text-info">Modificar Carrito:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Ajusta la cantidad de productos.</li>
                                <li>👉 Elimina productos si es necesario.</li>
                                <li>👉 Aplica códigos de descuento (si están disponibles).</li>
                            </ul>
                            <h5 className="text-info">Finalizar Compra:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Revisa tu carrito y haz clic en <strong className="text-warning">"Finalizar Compra"</strong>.</li>
                                <li>👉 Confirma tu pedido.</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title className="text-danger">🔑 Acceso como Administrador</Card.Title>
                        <Card.Text>
                            <h5 className="text-info">Acceso a Herramientas de Administración:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>🔑 Ingresa al sitio web.</li>
                                <li>🔑 Introduce los datos de acceso.</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title className="text-success">📦 Gestión de Productos</Card.Title>
                        <Card.Text>
                            <h5 className="text-info">Agregar Productos:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Accede a la sección de productos.</li>
                                <li>👉 Completa la información requerida.</li>
                                <li>👉 Guarda los cambios.</li>
                            </ul>
                            <h5 className="text-info">Editar Productos:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Encuentra el producto a editar.</li>
                                <li>👉 Haz clic en el botón de edición.</li>
                                <li>👉 Realiza los ajustes necesarios.</li>
                                <li>👉 Guarda los cambios.</li>
                            </ul>
                            <h5 className="text-info">Eliminar Productos:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Selecciona el producto que deseas eliminar.</li>
                                <li>👉 Confirma la eliminación.</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title className="text-success">🚚 Gestión de Pedidos</Card.Title>
                        <Card.Text>
                            <h5 className="text-info">Marcar Pedidos como Entregados:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Accede a la sección de pedidos.</li>
                                <li>👉 Marca el pedido como entregado.</li>
                                <li>👉 Confirma la acción.</li>
                            </ul>
                            <h5 className="text-info">Ver Historial de Entregas:</h5>
                            <ul className="list-unstyled ms-3">
                                <li>👉 Accede al historial de pedidos entregados.</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            <br/>
        </div>
    );
};

export default GuiaUso;
