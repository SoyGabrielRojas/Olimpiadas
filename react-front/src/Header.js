import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Header() {
    let user = JSON.parse(localStorage.getItem('user-info'))
    function logout() {
        localStorage.clear()
        navigate('/login')
    }

    const navigate = useNavigate()

    return (
        <>
            {[false].map((expand) => (
                <Navbar sticky="top" bg="dark" data-bs-theme="dark" key={expand} expand={expand} className="bg-body-tertiary mb-3">
                    <Container fluid>
                        <Navbar.Brand href="/nos">GREP</Navbar.Brand>

                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas bg="dark" data-bs-theme="dark"
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >

                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Menu
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="/Home">Home</Nav.Link>

                                    {
                                        localStorage.getItem('user-info') ?
                                            <NavDropdown title={user && user.name} id="offcanvasNavbarDropdown">
                                                <NavDropdown.Item onClick={logout}>Cerrar Sesión</NavDropdown.Item>
                                            </NavDropdown>
                                            : null
                                    }

                                    <NavDropdown
                                        title="Ver más"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        {
                                            localStorage.getItem('user-info') ?
                                                <>
                                                    <NavDropdown.Item>
                                                        <Link to="/AddProduct">Agregar Producto</Link>
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item>
                                                        <Nav.Link href="/smth">algo mas</Nav.Link>
                                                    </NavDropdown.Item>

                                                </>
                                                :
                                                <>
                                                    <NavDropdown.Item href="/Login">
                                                        <Link to="/Login">Iniciar sesión</Link>
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item href="/Register">
                                                        <Link to="/Register">Registrarse</Link>
                                                    </NavDropdown.Item>
                                                </>
                                        }
                                    </NavDropdown>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Buscar"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success">Buscar</Button>
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