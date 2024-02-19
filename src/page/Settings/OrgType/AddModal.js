import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useFormik } from 'formik';
import '../../style/addmodel.css';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({getDatas}) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    formik.resetForm(); // Reset Formik state when modal is closed
  };
  const handleShow = () => setShow(true);

   // Validation schema using Yup
   const validationSchema = Yup.object({
    name: Yup.string().required('OrgType is required'),
    descp: Yup.string().required('Description is required'),
    status:  Yup.string().required('Status is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      descp: '',
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin',
      updatedBy: 'admin',
      isDeleted: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Validate the newItem object using Formik and Yup
        await validationSchema.validate(values, { abortEarly: false });

        
        const response = await axios.post('http://localhost:3000/orgType', values);
        console.log('Response:', response.data);
        getDatas();
        toast.success("Successfully Added");
    
        handleClose();
      } catch (error) {
        if (error.response) {
          console.log('Error Response:', error.response.data);
          console.log('Status Code:', error.response.status);
          toast.error('Organisation Type Already Existed', error.response.status);
        } else if (error.request) {
          toast.error('No response received from the server.');
          console.log('No response received from the server.');
        } else {
          toast.error('Error:', error.message);
        }
      }
    },
  });

  return (
    <>

      <Button style={{ background: '#5bb6ea', border: 'none', color: 'white', fontWeight: '600', marginBottom:'10px' }} onClick={handleShow}>
        + New
      </Button>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"  backdrop="static" centered className="modal-box">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>Add Organization Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
          <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
              <Form.Label className='mandatory-label' style={{ fontSize: '14px' }}>Organization Type</Form.Label>
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
            <Form.Group className="mb-3" controlId="descp">
              <Form.Label className='mandatory-label' style={{ fontSize: '14px' }}>Description</Form.Label>
              <Form.Control
                as="textarea"
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
          <Button style={{ background: '#5bb6ea', border: 'none', fontWeight: '600' }} onClick={formik.submitForm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
