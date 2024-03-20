import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Home: React.FC = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="uranosTitle"></div>
            <div className="jetsTitle"></div>
            <div className="jetBack"></div>
          </Col>
        </Row>

        <Row className='mt-5 ms-5'>
          <Col className='mt-5'>
            <div>
              <p className='titleHey'>Hey!, where are you </p>
              <span className='flyginStyle'>flying</span><span className='titleHey'> to</span><span className='signoStyle'>?</span>
            </div>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col className='mt-5'>
            <Navbar className='styleNavbar' expand="lg">
              <Container fluid>
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                  >
                    <Form className="d-flex">
                      <Form.Control
                        type="search"
                        placeholder="Search destinations"
                        className="me-2 styleInputSearch"
                        aria-label="Search"
                      />
                    </Form>
          
                  </Nav>
                  
                </Navbar.Collapse>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
                > 
                  <a className='me-5 titleButtonsNav' href="/SignIn">From</a>{' '}
                  <a className='me-5 titleButtonsNav' href="/SignIn">To</a>{' '}
                  
        
                </Nav>
                
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
                >
                  <a className='me-3 titleButtonsNav' href="/SignIn">Sign In</a>{' '}
                  <a className='me-3 titleButtonsNav' href="/SignIn">Sign In</a>{' '}
                  
        
                </Nav>

                <Button className='styleButton'>Search</Button>
                
              </Container>
            </Navbar>
          </Col>
        </Row>

        <Stack className="mx-auto">
          <Row className="justify-content-lg-center">
            <Col xs md="5" lg="5" xl="5" xxl="10">
              <div className="jetBackFront"></div>
            </Col>
          </Row>
        </Stack>
        
        <Row className='mt-5 ms-5'>
          <Col className='mt-5'>
            <div>
              <span className='flyginStyle'>Popular</span><span className='titleHey'> flights</span>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-lg-center">
          <Col xs md="5" lg="5" xl="5" xxl="9" className='mt-5'>
            <div className="mapBack"></div>
          </Col>
        </Row>
        
      </Container>
    </>
  );
}

export default Home;