
// ViewModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../style/view.css';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function ViewModal({ showModal, handleClose, selectedDatas }) {
  return (
    <Modal show={showModal} onHide={handleClose}  backdrop="static"  centered>
      <Modal.Header closeButton>
        <Modal.Title>View Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
          <Row>
          <Col md={6}>
           <Form.Label style={{fontSize:'14px'}}> Name</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={`${selectedDatas?.enqId.fName || ''} ${selectedDatas?.enqId.lName || ''}`}
                className='custom-disabled-input'
              />
         </Col>
         <Col md={6}>
              {/* <p className='view-label'>Next Contact Date</p>
              <p className='view-data'> {selectedDatas?.nextContactDate}</p> */}
              <Form.Label style={{fontSize:'14px'}}> Next Contact Date</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={` ${selectedDatas?.nextContactDate|| ''}`}
                className='custom-disabled-input'
              />
            </Col>

         <Col md={6}>
           <Form.Label style={{fontSize:'14px'}}> Follow-Up Details</Form.Label>
              <Form.Control
               as="textarea"
                rows={3}
                disabled={true} 
                value={`${selectedDatas?.followUpDetails || ''}`}
                className='custom-disabled-input'
              />
         </Col>
         <Col md={6}>
              {/* <p className='view-label'>Remarks</p>
              <p className='view-data'> {selectedDatas?.remarks}</p> */}
              <Form.Label style={{fontSize:'14px'}}> Follow-Up Details</Form.Label>
              <Form.Control
               as="textarea"
                rows={3}
                disabled={true} 
                value={`${selectedDatas?.remarks || ''}`}
                className='custom-disabled-input'
              />
            </Col>
           
         
            </Row>
            <Row>
         
            {/* <Col md={6}>
              <p className='view-label'>createdBy</p>
              <p className='view-data'> {selectedDatas?.createdBy}</p>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
              <p className='view-label'>Status</p>
              <p className='view-data'> {selectedDatas?.status}</p>
            </Col> */}
           
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
