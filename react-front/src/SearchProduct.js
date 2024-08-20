import Header from './Header';
import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

function SearchProduct() {


    return (
        <div>
            <Header />
            <h1>Buscar Producto</h1>
        </div>
    );
}

export default SearchProduct;
