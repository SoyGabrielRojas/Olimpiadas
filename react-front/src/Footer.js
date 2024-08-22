import React from 'react';
import { Container, Row, Col, Stack, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <Container fluid>
                <Row className="bg-dark text-white p-4">
                    <Col className="mx-5">
                        <Stack>
                            <img
                                src='/logofooter.jpg'
                                alt="company logo"
                                rounded
                                width={150}
                                height={150}
                            />
                            <h2>CHAYOTE</h2>
                            <p>Tu cancha, tu tienda</p>
                        </Stack>
                    </Col>
                    <Col>
                        <Nav className="flex-column fs-5">
                            Links
                            <a href="https://github.com/SoyGabrielRojas/Olimpiadas" className="text-white">Repositorio de GitHub</a>
                            <NavLink href="#" className="text-white">Manual de usuario</NavLink>
                            <NavLink href="#" className="text-white">Video de ayuda</NavLink>
                        </Nav>
                    </Col>
                    <Col>
                        <h4>Contactos:</h4>
                        <p>gabrielrojasokk@gmail.com</p>
                        <p>Teléfono: +54 (9) 367-4 414972</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
