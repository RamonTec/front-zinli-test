import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { createPost, getPosts } from '../../shared/rest/post';
import { PostForm } from '../../components/postForm';

const Home: React.FC = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <Navbar expand={false} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Dashboard</Navbar.Brand>
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
                <Nav.Link href="#action1">Perfil</Nav.Link>
                <Nav.Link href="#action1">Cerrar sesion</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <PostForm
        
      />
    </>
  );
}

export default Home;