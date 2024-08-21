import React, { useState, useEffect } from 'react';
import { Table, Container, Button, FormControl, Image, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const user_id = 1;
    const navigate = useNavigate();

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

    async function purchaseItem(product_id) {
        const response = await fetch('http://localhost:8000/api/purchase', {
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
            navigate('/compras');
        } else {
            alert('Error al realizar la compra');
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
                                        variant="success"
                                        onClick={() => purchaseItem(item.product.id)}
                                        className="me-2"
                                    >
                                        Comprar
                                    </Button>
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
                <Modal.Header
                    closeButton>
                    <Modal.Title>Vista Previa de la Imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={selectedImage} alt="Preview" fluid />
                </Modal.Body>
            </Modal>
            <br />
        </div>
    );
}

export default Cart;