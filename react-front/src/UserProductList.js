import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Image, Modal } from 'react-bootstrap';
import Header from './Header';

function UserProductList() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const user_id = 1;

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
        <div>
            <Header />
            <Container className="mt-5">
                <h1 className="text-center mb-4">Lista de Productos</h1>
                <Table striped bordered hover responsive="md" className="table-sm">
                    <thead className="table-dark">
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                            <th>Imagen</th>
                            <th>Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="text-center align-middle">
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.description}</td>
                                <td>
                                    <Image
                                        src={`http://localhost:8000/storage/${item.file_path}`}
                                        alt={item.name}
                                        thumbnail
                                        fluid
                                        style={{ maxWidth: '100px', cursor: 'pointer' }}
                                        onClick={() => handleShow(`http://localhost:8000/storage/${item.file_path}`)}
                                    />
                                </td>
                                <td>
                                    <Button variant="primary" onClick={() => addToCart(item.id)}>
                                        Agregar al carrito
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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
