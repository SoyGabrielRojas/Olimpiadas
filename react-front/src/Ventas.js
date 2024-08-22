import React, { useState, useEffect } from 'react';
import { Table, Container, Image } from 'react-bootstrap';
import Header from './Header';

function Ventas() {
    const [deliveredProducts, setDeliveredProducts] = useState([]);
    const user_id = 1; 

    useEffect(() => {
        fetchDeliveredProducts();
    }, []);

    async function fetchDeliveredProducts() {
        let result = await fetch(`http://localhost:8000/api/delivered-products/${user_id}`);
        result = await result.json();
        setDeliveredProducts(result);
    }

    return (
        <div className='bg-secondary'>
            <Header />
            <Container className="mt-5">
                <h1 className="text-center mb-4">Ventas</h1>
                <Table striped bordered hover responsive="md" className="table-sm">
                    <thead className="table-dark">
                        <tr className="text-center">
                            <th>ID Usuario</th>
                            <th>ID Producto</th>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th>Precio Total</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveredProducts.map((item) => (
                            <tr key={item.id} className="text-center align-middle">
                                <td>{item.user_id}</td>
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <br />
        </div>
    );
}

export default Ventas;
