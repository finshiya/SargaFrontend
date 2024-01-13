
// ViewModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './style/view.css';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
// import { Formik } from 'formik';

function ViewModal({ showModal, handleClose, selectedDatas }) {
  console.log('selectedDatas:', selectedDatas); 


  const capitalizeFirstLetter = (value) => {
    return value
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Modal show={showModal} onHide={handleClose}  backdrop="static" centered className='view-modal ps-0'>
      <Modal.Header closeButton>
        <Modal.Title>View  Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
        <Form>
          <Row className='first-row'>
            <h5> Personal Details </h5>
            <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>First Name</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={`${selectedDatas?.fName || ''}`}
                className='custom-disabled-input'
              />
         </Col>
         <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>Last Name</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={`${selectedDatas?.lName || ''}`}
                className='custom-disabled-input'
              />
         </Col>
         <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>Email</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={`${selectedDatas?.email || ''}`}
                className='custom-disabled-input'
              />
         </Col>
         
         <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>Mobile</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={`${selectedDatas?.mobile || ''}`}
                className='custom-disabled-input'
              />
               </Col>
               <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>Location</Form.Label>
              <Form.Control
                    rows={3}
                disabled={true} 
                value={`${selectedDatas?.location || ''}`}
                className='custom-disabled-input'
              />
         </Col>
         <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>Gender</Form.Label>
              <Form.Control
                    rows={3}
                disabled={true} 
                value={`${selectedDatas?.gender }`}
                className='custom-disabled-input'
              />
         </Col>
              
 

        
            </Row>
  
            <Row className='first-row'>
            <h5>Enquiry Details</h5>
            <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>Enquiry Source</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={capitalizeFirstLetter (`${selectedDatas?.enqSource?.name||""}`)}
                className='custom-disabled-input'
              />
         </Col>
                   <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>Enquiry Type</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={capitalizeFirstLetter (`${selectedDatas?.enqType?.name || ''}`)}
                className='custom-disabled-input'
              />
               </Col>
 
              <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>Support Type</Form.Label>
              <Form.Control
                    rows={3}
                disabled={true} 
                value={capitalizeFirstLetter(`${selectedDatas?.supportType?.name || ''}`)}
                className='custom-disabled-input'
              />
         </Col>
         <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>Enquiry Mode</Form.Label>
              <Form.Control
                    rows={3}
                disabled={true} 
                value={capitalizeFirstLetter(`${selectedDatas?.enqMode?.name || ""}`)}
                className='custom-disabled-input'
              />
         </Col>
      

         <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>Enquiry To</Form.Label>
              <Form.Control
                    rows={3}
                disabled={true} 
                value={capitalizeFirstLetter(`${selectedDatas?.enqTo?.name || ''}`)}
                className='custom-disabled-input'
              />
         </Col>

         <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>Updated By</Form.Label>
              <Form.Control
                    rows={3}
                disabled={true} 
                value={`${selectedDatas?.enqTo?.updatedBy || ""}`}
                className='custom-disabled-input'
              />
         </Col>
        
            </Row>

            
            <Row className='first-row'>
            <h5>Additional Details</h5>
            <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>Reference Id</Form.Label>
              <Form.Control
                    rows={3}
                disabled={true} 
                value={`${selectedDatas?.referenceId || ''}`}
                className='custom-disabled-input'
              />
         </Col>
         <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>Lead Quality</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={`${selectedDatas?.leadQuality || ''}`}
                className='custom-disabled-input'
              />
               </Col>
               <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>district</Form.Label>
              <Form.Control
                    rows={3}
                disabled={true} 
                value={`${selectedDatas?.district}`}
                className='custom-disabled-input'
              />
         </Col>
           
       
      

         <Col md={4}>
           <Form.Label style={{fontSize:'14px'}}>State</Form.Label>
              <Form.Control
                            disabled={true} 
                value={`${selectedDatas?.state || ''}`}
                className='custom-disabled-input'
              />
         </Col>

         <Row className='pe-0'>  
         <Col md={6}>
           <Form.Label style={{fontSize:'14px'}}>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                // rows={3}
                disabled={true} 
                value={`${selectedDatas?.remarks || ''}`}
                className='custom-disabled-input'
              />
         </Col>
               

<Col md={6} className='pe-0'>
           <Form.Label style={{fontSize:'14px'}}>Description</Form.Label>
              <Form.Control
                as="textarea"
                // rows={3}
                disabled={true} 
                value={`${selectedDatas?.enqDescp || ''}`}
                className='custom-disabled-input'
              />
         </Col>
         </Row>
        
            </Row>


            </Form>
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
