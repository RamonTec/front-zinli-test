import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ModalDetailProps {
  action: () => void;
  children: React.ReactNode;
  showModal: boolean;
  aprovePost: () => void;
  deletedPost: () => void;
}

export const ModalDetail: React.FC<ModalDetailProps> = ({
  action,
  children,
  showModal,
  aprovePost,
  deletedPost,
}) => {
  
  return (
    <>
      <Modal show={showModal} onHide={action}>
        <Modal.Header closeButton>
          <Modal.Title>Post Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children} {/* Aquí se renderiza el componente hijo */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={aprovePost}>
            Aprobar
          </Button>

          <Button variant="secondary" onClick={deletedPost}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
