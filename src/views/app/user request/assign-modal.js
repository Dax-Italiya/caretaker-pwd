import React from 'react';
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import ModalSearch from './modal-search';

const AssignModal = ({ modalOpen, toggleModal }) => {
  return (
    <div>
      {/* <Button onClick={() => setModal((prevState) => !prevState)}>Click</Button> */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <Label className="font-weight-bolder">Assign Caretakers</Label>
        </ModalHeader>
        <ModalBody style={{ height: '67vh', overflow: 'auto' }}>
          <ModalSearch onChange={() => {}} />
        </ModalBody>
        <ModalFooter>
          <Button
            outline
            className="d-block px-5"
            onClick={() => {
              console.log('Assigned');
              toggleModal();
            }}
            style={{ margin: 'auto' }}
          >
            Assign
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AssignModal;
