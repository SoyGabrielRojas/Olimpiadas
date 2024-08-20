import Header from './Header';
import React, { useState, useEffect } from 'react';
import { Table, Image, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function SearchProduct() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const { searchTerm } = useParams(); // Obtener el término de búsqueda desde la URL

    const handleShow = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    useEffect(() => {
        if (searchTerm) {
            search(searchTerm); // Realizar la búsqueda con el término de búsqueda de la URL
        }
    }, [searchTerm]);

    async function search(key) {
      console.warn(key);
    
      let result = await fetch("http://localhost:8000/api/search/" + key);
      result = await result.json();
    
      setData(result);
    }

    return (
      <div>
        <Header />
        <div className="col-sm-6 offset-sm-3">
          <h2>Resultados de la búsqueda</h2>
          <Table striped bordered hover responsive="md" className="table-sm">
            <thead className="table-dark">
              <tr className="text-center">
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Imagen</th>
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
                </tr>
              ))}
            </tbody>
          </Table>
          <br />

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Vista previa de la imagen</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <Image src={selectedImage} fluid />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
}

export default SearchProduct;
