import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Header from './Header';

function Home() {
  return (
    <div className="home" style={{ backgroundColor: '#f0f0f0' }}>
      <Header />
      <Container className="mt-5">
        <Row className="justify-content-md-center align-items-center">
          <Col md={6}>
            <h1 className="display-2 text-center">¡Bienvenido a Chayote!</h1>
            <p className="lead text-center">Tu cancha, tu tienda.</p>
            <p className="fs-4 text-center lh-lg">
              En Chayote, creemos que el deporte es mucho más que una actividad física; es una forma de vida. Ya seas un corredor apasionado, un amante del ciclismo, un entusiasta del fitness o alguien que simplemente busca mantenerse activo, estamos aquí para equiparte con lo mejor.
            </p>
            <p className="fs-4 text-center lh-lg">
              Explora nuestra amplia selección de productos, desde calzado y ropa deportiva hasta accesorios y equipos de alta calidad, todo diseñado para ayudarte a alcanzar tus metas y disfrutar del deporte al máximo. ¡Únete a nuestra comunidad y lleva tu rendimiento al siguiente nivel con Chayote!
            </p>
          </Col>
          <Col md={6}>
            <Image src="/logofooter.jpg" width="100%" rounded className="shadow mb-4" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;