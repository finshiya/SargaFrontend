// EditModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../style/edit.css';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';

function EditModal({ showModal, handleClose, selectedDatas, handleUpdate }) {
  // Formik form configuration
  const formik = useFormik({
    initialValues: {
      name: selectedDatas?.name || '',
      desc: selectedDatas?.desc || '',
    

    },
    validationSchema: Yup.object({
        name: Yup.string().required('Name is required'),
        desc: Yup.string().required('Description is required'),
       
    }),
    onSubmit: (values) => {
      handleUpdate(selectedDatas?._id, values);
      handleClose();
    },
  });

  const handleModalHide = () => {
    formik.resetForm(); // Reset Formik state when modal is closed
    handleClose();
  };

  useEffect(() => {
    console.log("selectedDatas:", selectedDatas);
    formik.setValues({
      name: selectedDatas?.name || '',
      desc: selectedDatas?.desc || '',
      
    });
  }, [selectedDatas]);
  
 // Function to check if there are changes in the form
 const hasChanges = () => {
  return formik.values.name !== selectedDatas.name || formik.values.desc !== selectedDatas.desc;
};

// Function to handle form submission
const handleSubmit = () => {
  if (hasChanges()) {
    formik.submitForm();
  } else {
    // No changes, do not submit
    handleClose();
  }
};

  return (
    <Modal show={showModal} onHide={handleModalHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
      <Form onSubmit={formik.handleSubmit}>
          
          <Form.Group className="mb-3" controlId="name" onSubmit={formik.handleSubmit}>
              <Form.Label style={{ fontSize: '14px' }}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error" style={{color:'red'}}>{formik.errors.name}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="desc">
              <Form.Label style={{ fontSize: '14px' }}>Description</Form.Label>
              <Form.Control
              as="textarea"
                type="text"
                placeholder="Enter Description"
                name="desc"
                value={formik.values.desc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.desc && formik.errors.desc ? (
                <div className="error" style={{color:'red'}}>{formik.errors.desc}</div>
              ) : null}
            </Form.Group>


            
      </Form>
      </Container>
      </Modal.Body>
      <Modal.Footer>
          <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleClose}>
            Close
          </Button>
          <Button style={{ background: '#5bb6ea', border: 'none', fontWeight: '600' }} onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default EditModal;


