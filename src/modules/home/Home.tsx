import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { createPost, getPosts } from '../../shared/rest/post';
import { PostForm } from '../../components/postForm';
import { ErrorMessages, PostModel } from '../../shared/types';
import { GetUserLocalStorage } from '../../shared/utils/session.storage';
import { toast } from 'react-toastify';
import { LoaderRequest } from '../../components/loaders';

const Home: React.FC = () => {

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const fetchCreatePost = async (body: PostModel) => {
    const response = await createPost(body);
    setLoading(false);
    console.log('- response:', response);
    if (response.status === 200) {
      toast.success("Post creado!", {
        position: "top-right"
      });
      return
    }
    if (response.response.data.message === ErrorMessages.emailExist) {
      toast.error("No se pudo crear el post", {
        position: "top-right"
      });
      return
    }
  }

  const fetchRequest = (_dataForm: string) => {
    setLoading(true);
    const userStorage = GetUserLocalStorage();
    const postData: PostModel = {
      message: _dataForm,
      status: 'drafted',
      author: `${userStorage?.data.name} ${userStorage?.data.surname}`,
      create_at: new Date(),
      location: 'ubicacion provicional'
    }

    fetchCreatePost(postData);
  }

  const fetchQueryPosts = () => {
    getPosts();
  }

  useEffect(() => {
    fetchQueryPosts();
  }, []);

  return (
    <>
    { loading ?? <LoaderRequest></LoaderRequest> }
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
        action={fetchRequest}
      />
    </>
  );
}

export default Home;