// EditModal.js
import React,{useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../style/edit.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';

function EditModal({ showModal, handleClose, selectedDatas, handleUpdate }) {
  // Formik form configuration
 
  const nameSchema = Yup.string().required('Name is required');
  const descpSchema = Yup.string().required('Description is required');
  const statusSchema = Yup.string().required('Status is required');
  // Combine the field validation schemas using Yup.object().shape
  const validationSchema = Yup.object().shape({
    name: Yup.lazy((value) => (value && value.trim() !== '' ? nameSchema : Yup.string())),
    descp: Yup.lazy((value) => (value && value.trim() !== '' ? descpSchema : Yup.string())),
    status: Yup.lazy((value) => (value && value.trim() !== '' ? statusSchema : Yup.string())),
   
  });

  // Formik form configuration
  const formik = useFormik({
    initialValues: {
      name: selectedDatas?.name || '',
      descp: selectedDatas?.descp || '',
      

    },
    validationSchema: validationSchema,
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
      descp: selectedDatas?.descp || '',
      status: selectedDatas?.status || '',
   
    });
  }, [selectedDatas]);

    // Function to check if there are changes in the form
    const hasChanges = () => {
      return formik.values.name !== selectedDatas.name || formik.values.descp !== selectedDatas.descp;
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
    <>
    <ToastContainer autoClose={1000}/>
    <Modal show={showModal} onHide={handleModalHide}  backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Enquiry Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
      <Form onSubmit={formik.handleSubmit}>
          
          <Form.Group className="mb-3" controlId="name" onSubmit={formik.handleSubmit}>
              <Form.Label style={{ fontSize: '14px' }}>Enquiry Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enquiry Type"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error" style={{color:'red'}}>{formik.errors.name}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="descp">
              <Form.Label style={{ fontSize: '14px' }}>Description</Form.Label>
              <Form.Control
              as="textarea"
                type="text"
                placeholder="Enter Description"
                name="descp"
                value={formik.values.descp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.descp && formik.errors.descp ? (
                <div className="error" style={{color:'red'}}>{formik.errors.descp}</div>
              ) : null}
            </Form.Group>
            </Form>
            </Container>
      </Modal.Body>
      <Modal.Footer>
      <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleClose}>
        Close
      </Button>
      <Button style={{ background: '#5bb6ea', border: 'none', fontWeight: '600' }}  onClick={handleSubmit}>
        Submit
      </Button>
    </Modal.Footer>
    </Modal>
    </>
  );
}

export default EditModal;
