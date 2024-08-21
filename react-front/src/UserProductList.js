import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Image, Modal, Row, Col } from 'react-bootstrap';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function UserProductList() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const user_id = 1;
    const navigate = useNavigate(); // Hook para redirigir
    const imageSize = { width: '100%', height: '200px', objectFit: 'cover' }; // Tamaño uniforme de imágenes

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let result = await fetch('http://localhost:8000/api/list');
        result = await result.json();
        setData(result);
    }

    async function addToCart(product_id) {
        const response = await fetch('http://localhost:8000/api/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user_id,
                product_id: product_id,
            }),
        });

        if (response.ok) {
            alert('Producto agregado al carrito!');
            navigate('/cart'); // Redirigir al carrito
        } else {
            alert('Error al agregar al carrito');
        }
    }

    const handleShow = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    return (
        <div className='bg-secondary'>
            <Header />
            <Container className="mt-5">
                <h1 className="text-center mb-4">Lista de Productos</h1>
                <Row>
                    {data.map((item) => (
                        <Col key={item.id} md={4} className="mb-4">
                            <Card className="bg-dark text-white">
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:8000/storage/${item.file_path}`}
                                    style={imageSize}
                                    onClick={() => handleShow(`http://localhost:8000/storage/${item.file_path}`)}
                                />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Precio: ${item.price}</strong>
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => addToCart(item.id)}>
                                        Agregar al carrito
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Vista previa de la imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <Image src={selectedImage} fluid />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default UserProductList;
