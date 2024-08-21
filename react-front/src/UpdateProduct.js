import Header from './Header';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Image, Modal, Alert } from 'react-bootstrap';

function UpdateProduct() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            let result = await fetch(`http://localhost:8000/api/product/${id}`);
            result = await result.json();
            setData(result);
            setName(result.name);
            setPrice(result.price);
            setDescription(result.description);
        }

        fetchData();
    }, [id]);

    const handleShow = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    async function updateProduct() {
        const formData = new FormData();
        if (file) formData.append('file', file);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);

        try {
            let result = await fetch(`http://localhost:8000/api/product/update/${id}`, {
                method: 'POST',
                body: formData,
            });

            if (result.ok) {
                setSuccessMessage("Producto actualizado exitosamente");
                setTimeout(() => {
                    navigate('/productlist');
                }, 2000);
            } else {
                alert("Error al actualizar el producto");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className='bg-secondary'>
            <Header />
            <Container className="mt-5">
                <h1 className="text-center mb-4">Actualizar Producto</h1>
                <Row className="justify-content-center">
                    <Col md={6}>
                        {successMessage && (
                            <Alert variant="success" onClose={() => setSuccessMessage("")} dismissible>
                                {successMessage}
                            </Alert>
                        )}
                        <Form>
                            <Form.Group controlId="productName" className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="productPrice" className="mb-3">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="productDescription" className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="productImage" className="mb-4 text-center">
                                <Form.Label>Imagen Actual</Form.Label>
                                {data.file_path && (
                                    <div className="d-flex justify-content-center mb-3">
                                        <Image
                                            src={`http://localhost:8000/storage/${data.file_path}`}
                                            alt={data.name}
                                            thumbnail
                                            fluid
                                            style={{ maxWidth: '100px', cursor: 'pointer' }}
                                            onClick={() => handleShow(`http://localhost:8000/storage/${data.file_path}`)}
                                        />
                                    </div>
                                )}
                            </Form.Group>

                            <Form.Group controlId="productNewImage" className="mb-4">
                                <Form.Label>Subir Nueva Imagen</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </Form.Group>

                            <Button variant="primary" onClick={updateProduct} block>
                                Actualizar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            <br />

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Vista previa de la imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src={selectedImage} fluid />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default UpdateProduct;
