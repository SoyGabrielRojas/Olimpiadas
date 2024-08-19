import Header from './Header';
import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function AddProduct() {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    async function addProduct() {
        console.log("Producto a agregar:", name, file, price, description);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);

        try {
            let result = await fetch('http://localhost:8000/api/addproduct', {
                method: 'POST',
                body: formData,
            });

            if (result.ok) {
                setSuccessMessage("Producto agregado exitosamente");
                clearForm();
            } else {
                alert("Error al agregar el producto");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function clearForm() {
        setName("");
        setFile(null);
        setPrice("");
        setDescription("");
    }

    return (
        <div>
            <Header />
            <Container className="mt-5">
                <h1 className="text-center mb-4">Agregar Producto</h1>
                <Row className="justify-content-center">
                    <Col md={6}>
                        {successMessage && (
                            <Alert variant="success" onClose={() => setSuccessMessage("")} dismissible>
                                {successMessage}
                            </Alert>
                        )}
                        <Form>
                            <Form.Group controlId="productName" className="mb-3">
                                <Form.Label>Nombre del Producto</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ingrese el nombre del producto"
                                />
                            </Form.Group>

                            <Form.Group controlId="productImage" className="mb-3">
                                <Form.Label>Imagen del Producto</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </Form.Group>

                            <Form.Group controlId="productPrice" className="mb-3">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Ingrese el precio del producto"
                                />
                            </Form.Group>

                            <Form.Group controlId="productDescription" className="mb-4">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Ingrese una descripción del producto"
                                />
                            </Form.Group>

                            <Button variant="primary" onClick={addProduct}>
                                Agregar Producto
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <br />
        </div>
    );
}

export default AddProduct;
