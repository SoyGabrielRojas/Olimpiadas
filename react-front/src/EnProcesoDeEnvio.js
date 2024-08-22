import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function EnProcesoDeEnvio() {
    const [purchases, setPurchases] = useState([]);
    const user_id = 1; // Cambiar por el ID del usuario autenticado
    const navigate = useNavigate();

    useEffect(() => {
        fetchPurchases();
    }, []);

    async function fetchPurchases() {
        let result = await fetch(`http://localhost:8000/api/purchases/${user_id}`);
        result = await result.json();
        setPurchases(result.filter(item => item.estado === 'En proceso de envío'));
    }

    async function deliverProduct(id) {  // Cambié 'purchase_id' por 'id'
        const response = await fetch('http://localhost:8000/api/deliver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,  // Enviando 'id' en lugar de 'purchase_id'
            }),
        });

        if (response.ok) {
            navigate('/entregados');
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    }

    return (
        <div className='bg-secondary'>
            <Header />
            <Container className="mt-5">
                <h1 className="text-center mb-4">Pedidos</h1>
                <Table striped bordered hover responsive="md" className="table-sm">
                    <thead className="table-dark">
                        <tr className="text-center">
                            <th>ID Producto</th>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th>Precio Total</th>
                            <th>Cantidad</th>
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
                                <td>
                                    <Button
                                        variant="success"
                                        onClick={() => deliverProduct(item.id)} // Aquí también cambié a 'item.id'
                                    >
                                        Entregar
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

export default EnProcesoDeEnvio;
