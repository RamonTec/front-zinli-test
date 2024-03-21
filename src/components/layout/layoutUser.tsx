import React, { useState } from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

export function LayoutUser ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  {

  const navigate = useNavigate();
  
  const clearStorage = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <>
      <Navbar expand={false} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="/home">Dashboard</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Offcanvas
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/perfil">Perfil</Nav.Link>
                <Nav.Link onClick={() => clearStorage()} >Cerrar sesion</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      { children }
    </>
  );
}
} 