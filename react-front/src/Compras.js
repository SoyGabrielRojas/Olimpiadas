import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Image } from 'react-bootstrap';
import Header from './Header';

function Compras() {
    const [purchases, setPurchases] = useState([]);
    const user_id = 1;

    useEffect(() => {
        fetchPurchases();
    }, []);

    async function fetchPurchases() {
        let result = await fetch(`http://localhost:8000/api/purchases/${user_id}`);
        result = await result.json();
        setPurchases(result);
    }

    async function cancelPurchase(purchase_id) {
        const response = await fetch('http://localhost:8000/api/purchase/cancel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                purchase_id: purchase_id,
            }),
        });

        if (response.ok) {
            fetchPurchases();
        } else {
            alert('Error al cancelar la compra');
        }
    }

    return (
        <div className='bg-secondary'>
            <Header />
            <Container className="mt-5">
                <h1 className="text-center mb-4">Tus Compras</h1>
                <Table striped bordered hover responsive="md" className="table-sm">
                    <thead className="table-dark">
                        <tr className="text-center">
                            <th>ID Producto</th>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th>Precio Total</th>
                            <th>Cantidad</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((item) => (
                            <tr key={item.id} className="text-center align-middle">
                                <td>{item.product_id}</td>
                                <td>{item.nombre}</td>
                                <td>
                                    <Image
                                        src={`http://localhost:8000/storage/${item.imagen}`}
                                        alt={item.nombre}
                                        thumbnail
                                        fluid
                                        style={{ maxWidth: '100px' }}
                                    />
                                </td>
                                <td>${item.precio_total}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.estado}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => cancelPurchase(item.id)}
                                    >
                                        Cancelar Compra
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <br />
        </div>
    );
}

export default Compras;