import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import './auth.css';
import { loginUser } from '../../shared/rest/login';
import { UserModel, ErrorMessages } from '../../shared/types';
import { useNavigate } from 'react-router-dom';
import { LoaderRequest } from '../../components/loaders';
import { toast } from 'react-toastify';
import { SetUserLocalStorage } from '../../shared/utils/session.storage';

type Inputs = {
  username: string,
};

const schema = yup.object({
  username: yup.string().required(),
}).required();

const SignIn: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { control, handleSubmit, formState:{ errors }, register } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  const fetchLoginUser = async (body: UserModel) => {
    const response = await loginUser(body);
    setLoading(false);
    console.log('- response:', response);
    if (response.status === 200) {
      toast.success("Bienvenido", {
        position: "top-right"
      });

      SetUserLocalStorage({
        data: {
          id: response?.token.user._id as string,
          token: response?.token.authToken as string,
          refreshToken: response?.token.refreshToken as string,
          username: response.token.user.username,
          name: response?.token.user.name as string,
          surname: response?.token.user.surname as string,
          avatar: '',
        }
      });
      
      navigate('/home');
      return
    }
    if (response.error === ErrorMessages.userNotExist) {
      toast.error("Usuario no registrado", {
        position: "top-right"
      });
      return
    }
  }

  const onSubmit: SubmitHandler<Inputs> = data => {
    setLoading(true);
    fetchLoginUser({
      username: data.username,
    })
  }
  return (
    <Container className='mt-4'>
      { loading ?? <LoaderRequest></LoaderRequest> }
      <Row className="justify-content-center">
        <Col xs md="5" lg="5" xl="5" xxl="5">
          <Card border="light" style={{ width: '570px' }}>
            <Card.Body>
              <Card.Text className='ms-5 titleWelcomeBack'>
                Welcome back
              </Card.Text>
              <Card.Text className='text-center titleLogin'>
                Login to your account
              </Card.Text>

              <Stack className="col-md-8 mx-auto col-lg-8 col-xl-8 col-xxl-8">
                <Form >

                  <Controller
                    name="username"
                    control={control}
                    rules={{ 
                      required: true 
                    }}
                    render={() => 
                      <>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>User Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter your user name" {...register("username")} />
                        </Form.Group>
                        <p>{errors?.username?.message}</p>
                      </>
                    }
                  />

                </Form>
              </Stack>
              
              <Stack className="col-md-8 mx-auto col-lg-8 col-xl-8 col-xxl-8">
                <Button onClick={handleSubmit(onSubmit)} className='mt-3 buttonLogin' variant="primary">Login now</Button>
              </Stack>

              <Card.Text className='text-center mt-4 mb-3'>
                Don’t have an account? <a href="/SignUp" className='styleRedirect'>Sing Up</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;