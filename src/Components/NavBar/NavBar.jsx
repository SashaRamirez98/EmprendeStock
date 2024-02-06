import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { axiosInstance } from "../../services/axios.config";
import './NavBar.css'

const NavBar = () => {


    const [searchValue, setSearchValue] = useState('');
     const [searchResults, setSearchResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.get(`/`);
            const data = response.data;

            // Convertir el valor de búsqueda a minúsculas
            const searchValueLower = searchValue.toLowerCase();

            // Filtrar los resultados basados en la búsqueda insensible a mayúsculas y minúsculas
            const filteredData = data.filter(
                (product) =>
                    product.code.toLowerCase().includes(searchValueLower) ||
                    product.name.toLowerCase().includes(searchValueLower)
            );

            console.log(filteredData);
        } catch (error) {
            console.error('Error en la solicitud:', error);

            if (error.response) {
                // La solicitud fue hecha y el servidor respondió con un código de estado fuera del rango 2xx
                console.error('Respuesta del servidor:', error.response.data);
                console.error('Código de estado:', error.response.status);
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió ninguna respuesta
                console.error('No se recibió respuesta del servidor');
            } else {
                // Se produjo un error al configurar la solicitud
                console.error('Error al configurar la solicitud:', error.message);
            }

        }
    };

    return(
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#" style={{ color: 'white'}}>Emprende-Stock</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="nav-container justify-content-evenly"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >    
                        <Nav.Item>
                            <Link to='/' style={{ color: 'white', textDecoration: 'none'}}> Home </Link>                        </Nav.Item>
                        <Nav.Item>
                            <Link to='/create'  style={{ color: 'white', textDecoration: 'none'}}> Crear </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to='/show'  style={{ color: 'white', textDecoration: 'none'}}> Listar </Link>
                        </Nav.Item>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Código o Nombre"
                            className="me-2"
                            aria-label="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit" > Buscar </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    )
}

export default NavBar;