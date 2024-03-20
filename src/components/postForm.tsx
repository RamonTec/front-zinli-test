import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type Inputs = {
  message: string,
};

interface FormPostProps {
  action: (_message: string) => void;
}

const schema = yup.object({
  message: yup.string().required(),
}).required();

export const PostForm: React.FC<FormPostProps> = ({
  action,
}) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { control, handleSubmit, formState:{ errors }, register } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    action(data.message);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Crear post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            
          <Controller
            name="message"
            control={control}
            rules={{ 
              required: true 
            }}
            render={() => 
              <>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" type="text" placeholder="Enter your message here..." {...register("message")} />
                </Form.Group>
                <p>{errors?.message?.message}</p>
              </>
            }
          />


          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Publicar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}