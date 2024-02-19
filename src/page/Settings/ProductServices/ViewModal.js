
// ViewModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../style/view.css';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function ViewModal({ showModal, handleClose, selectedDatas }) {
  const capitalizeFirstLetter = (value) => {
    return value
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  return (
    <Modal show={showModal} onHide={handleClose}  backdrop="static"  centered>
      <Modal.Header closeButton>
        <Modal.Title>View  Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <Container>
          <Row>
          <Col md={6}>
              <Form.Label style={{fontSize:'14px'}}>Name</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={ capitalizeFirstLetter (` ${selectedDatas?.name || ''}`)}
                className='custom-disabled-input'
              />
            </Col>

            <Col md={6}>
              <Form.Label style={{fontSize:'14px'}}>Status</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={ capitalizeFirstLetter (` ${selectedDatas?.status || ''}`)}
                className='custom-disabled-input'
              />
            </Col>
  

<Col md={6}>
              <Form.Label style={{fontSize:'14px'}}>CreateAt</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={ capitalizeFirstLetter (` ${selectedDatas?.createdAt
                  ? new Date(selectedDatas.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  : ''}`)}
                className='custom-disabled-input'
              />
            </Col>

            <Col md={12}>
              <Form.Label style={{fontSize:'14px'}}>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                disabled={true} 
                value={ capitalizeFirstLetter (` ${selectedDatas?.desc || ''}`)}
                className='custom-disabled-input'
              />
            </Col>
            </Row>
        </Container>
  
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewModal;
