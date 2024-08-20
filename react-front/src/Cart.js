import React, { useState, useEffect } from 'react';
import { Table, Container, Button, FormControl, Image, Modal } from 'react-bootstrap';
import Header from './Header';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const user_id = 1;

    useEffect(() => {
        fetchCartItems();
    }, []);

    async function fetchCartItems() {
        let result = await fetch(`http://localhost:8000/api/cart/${user_id}`);
        result = await result.json();
        setCartItems(result);
    }

    async function updateCartItem(product_id, quantity) {
        const response = await fetch('http://localhost:8000/api/cart/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user_id,
                product_id: product_id,
                quantity: quantity,
            }),
        });

        if (response.ok) {
            fetchCartItems();
        } else {
            alert('Error al actualizar el producto en el carrito');
        }
    }

    async function removeCartItem(product_id) {
        const response = await fetch('http://localhost:8000/api/cart/remove', {
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
            fetchCartItems();
        } else {
            alert('Error al eliminar el producto del carrito');
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
                <h1 className="text-center mb-4">Tu Carrito</h1>
                <Table striped bordered hover responsive="md" className="table-sm">
                    <thead className="table-dark">
                        <tr className="text-center">
                            <th>ID Producto</th>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.product.id} className="text-center align-middle">
                                <td>{item.product.id}</td>
                                <td>{item.product.name}</td>
                                <td>
                                    <Image
                                        src={`http://localhost:8000/storage/${item.product.file_path}`}
                                        alt={item.product.name}
                                        thumbnail
                                        fluid
                                        style={{ maxWidth: '100px', cursor: 'pointer' }}
                                        onClick={() => handleShow(`http://localhost:8000/storage/${item.product.file_path}`)}
                                    />
                                </td>
                                <td>${item.product.price * item.quantity}</td>
                                <td>
                                    <FormControl
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateCartItem(item.product.id, e.target.value)}
                                        min="1"
                                    />
                                </td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => removeCartItem(item.product.id)}
                                    >
                                        Eliminar
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

export default Cart;
