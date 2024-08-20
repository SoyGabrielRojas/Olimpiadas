import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';

function Header() {
    let user = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    function logout() {
        localStorage.clear();
        navigate('/login');
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search/${searchTerm}`);
        }
    };

    return (
        <>
            {[false].map((expand) => (
                <Navbar sticky="top" bg="dark" data-bs-theme="dark" key={expand} expand={expand} className="bg-body-tertiary mb-3">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/home">GREP</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas bg="dark" data-bs-theme="dark"
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Menú
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link as={Link} to="/home">Inicio</Nav.Link>

                                    {user ? (
                                        <>
                                            <NavDropdown title={user.name} id="offcanvasNavbarDropdown">
                                                <NavDropdown.Item onClick={logout}>Cerrar Sesión</NavDropdown.Item>
                                            </NavDropdown>

                                            {user.role === 'admin' ? (
                                                <NavDropdown title="Acciones" id="adminDropdown">
                                                    <NavDropdown.Item as={Link} to="/addProduct">Agregar Producto</NavDropdown.Item>
                                                    <NavDropdown.Item as={Link} to="/productList">Lista de Productos</NavDropdown.Item>
                                                </NavDropdown>
                                            ) : (
                                                <NavDropdown title="Acciones" id="userDropdown">
                                                    <NavDropdown.Item as={Link} to="/userProductList">Lista de Productos</NavDropdown.Item>
                                                    <NavDropdown.Item as={Link} to="/cart">Carrito de Compras</NavDropdown.Item>
                                                </NavDropdown>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                                            <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
                                        </>
                                    )}
                                </Nav>
                                <Form className="d-flex" onSubmit={handleSearch}>
                                    <Form.Control
                                        type="search"
                                        placeholder="Buscar"
                                        className="me-2"
                                        aria-label="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Button type="submit" variant="outline-success">Buscar</Button>
                                </Form>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default Header;
