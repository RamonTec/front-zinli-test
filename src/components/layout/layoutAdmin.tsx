import React, { useState } from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

export function LayoutAdmin ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  {

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const clearStorage = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <>
      <Navbar expand={false} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Dashboard Admin</Navbar.Brand>
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