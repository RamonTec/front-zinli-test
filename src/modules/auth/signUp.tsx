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
import { createUser } from '../../shared/rest/login';
import { UserModel, ErrorMessages } from '../../shared/types';
import { useNavigate } from 'react-router-dom';
import { LoaderRequest } from '../../components/loaders';
import { toast } from 'react-toastify';

type Inputs = {
  username: string,
  name: string,
  surname: string,
};

const schema = yup.object({
  username: yup.string().required(),
  name: yup.string().required(),
  surname: yup.string().required(),
}).required();

const SignUp: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { control, handleSubmit, formState:{ errors }, register } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  const fetchCreateUser = async (body: UserModel) => {
    const response = await createUser(body);
    setLoading(false);
    if (response.status === 200) {
      toast.success("Usuario creado!", {
        position: "top-right"
      });
      navigate('/SignIn');
      return
    }
    if (response.response.data.message === ErrorMessages.emailExist) {
      toast.error("Este usuario ya esta en uso", {
        position: "top-right"
      });
      return
    }
  }

  const onSubmit: SubmitHandler<Inputs> = data => {
    setLoading(true);
    fetchCreateUser({
      username: data.username,
      name: data.name,
      surname: data.surname
    })
  }

  return (
    <Container className='mt-4'>
      { loading ?? <LoaderRequest></LoaderRequest> }
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Card border='light'>
            <Card.Body>
              <Card.Text className='text-center titleLogin'>
                Create an account
              </Card.Text>

              <Stack className="col-md-5 mx-auto col-lg-8">
                <Form>

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

                  <Controller
                    name="name"
                    control={control}
                    rules={{ 
                      required: true 
                    }}
                    render={() => 
                      <>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                          <Form.Label>Name</Form.Label>
                          <Form.Control type="text" placeholder="Name" {...register('name')} />
                        </Form.Group>
                        <p>{errors?.name?.message}</p>
                      </>
                    }
                  />

                  <Controller
                    name="surname"
                    control={control}
                    rules={{ 
                      required: true 
                    }}
                    render={() => 
                      <>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                          <Form.Label>Surname</Form.Label>
                          <Form.Control type="text" placeholder="Surname" {...register('surname')} />
                        </Form.Group>
                        <p>{errors?.surname?.message}</p>
                      </>
                    }
                  />

                </Form>
              </Stack>
              
              <Stack className="col-md-5 mx-auto col-lg-8">
                <Button onClick={handleSubmit(onSubmit)} className='mt-3 buttonLogin' variant="primary">Sing Up now</Button>
              </Stack>

              <Card.Text className='text-center mt-4 mb-3'>
                Already have an account? <a href="/SignIn" className='styleRedirect'>Login</a>
              </Card.Text>
            </Card.Body>
          </Card>
          
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;