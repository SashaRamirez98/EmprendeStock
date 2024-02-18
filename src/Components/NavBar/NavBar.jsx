import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'

const NavBar = () => {

    return(
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#" style={{ color: 'white'}}>Emprende-Stock</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" className="navbar-toggler" />
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    )
} 

export default NavBar;