import Header from './Header';
import React, { useState, useEffect } from 'react';
import { Table, Image, Container, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductList() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        getData();
    }, []);

    async function deleteOperation(id) {
        let result = await fetch('http://localhost:8000/api/delete/' + id, {
            method: 'DELETE',
        });
        result = await result.json();
        console.warn(result);
        getData();
    }

    async function getData() {
        let result = await fetch('http://localhost:8000/api/list');
        result = await result.json();
        setData(result);
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
                <Table striped bordered hover responsive="md" className="table-sm">
                    <thead className="table-dark">
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                            <th>Imagen</th>
                            <th>Operaciones</th> {/* Esta columna ahora cubrirá ambos botones */}
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
                                    <div className="d-flex justify-content-center">
                                        <Button variant="danger" onClick={() => deleteOperation(item.id)}>
                                            Borrar
                                        </Button>
                                        <span className="mx-2">|</span>
                                        <Link to={'/update/' + item.id}>
                                            <Button variant="success">
                                                Actualizar
                                            </Button>
                                        </Link>
                                    </div>
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
            <br />
        </div>
    );
}

export default ProductList;
