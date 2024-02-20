/*import React,{useState,useEffect}from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../style/addmodel.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddModal({getDatas }) {


  const [show, setShow] = React.useState(false);

  const [enquiry, setEnquiry] = useState([]);


  useEffect(()=>{
    fetchEnquiries();

  },[])
  

  const handleClose = () => {
    setShow(false);
    formik.resetForm(); 
  };
  const handleShow = () => setShow(true);
  
  const fetchEnquiries = async () => {
    try {
      const response = await axios.get('http://localhost:3000/enquiries');
      const filteredEnquiry = response.data.enquiry.filter(enq => !enq.isDeleted) || [];
      setEnquiry(filteredEnquiry);
      console.log(filteredEnquiry);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  // Validation schema using Yup
  const validationSchema = Yup.object({
    enqId: Yup.string().required('enqId is required'),
    followUpDetails: Yup.string().required('followUpDetails is required'),
    nextContactDate: Yup.string().required('nextContactDate is required'),
    remarks:Yup.string().required('remarks is required'),
  });

  const formik = useFormik({
    initialValues: {
      enqId :'',
      followUpDetails: '',
      nextContactDate:'',
      status: 'new',
      remarks:'',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
      isDeleted: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      console.log('Form values:', values);
      try {
        // Validate the newItem object using Formik and Yup
        await validationSchema.validate(values, { abortEarly: false });

        
        const response = await axios.post('http://localhost:3000/followUp', values);
        console.log('Response:', response.data);
  
        getDatas();
        toast.success('Data Added successfully!',{ autoClose: 1000 });
    
        handleClose();
      } catch (error) {
        if (error.response) {
          console.log('Error Response:', error.response.data);
          console.log('Status Code:', error.response.status);
        } else if (error.request) {
          console.log('No response received from the server.');
        } else {
          console.log('Error:', error.message);
          toast.error('Error creating data Please try again.',{ autoClose: 1000 });
        }
      }
    },
  });

  return (
    <>
    <ToastContainer/>
      <Button style={{ background: '#5bb6ea', border: 'none', color: 'white', fontWeight: '600' }} onClick={handleShow}>
        + New
      </Button>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"  backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>Add FollowUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={formik.handleSubmit}>
           
          
         <Row>
            <Col md={6}>
      
          {/* Support Type Dropdown *
         <Form.Group className="mb-3" controlId="enqId">
           
         <Form.Label style={{ fontSize: '14px' }}>Enquiry Id</Form.Label>
              <Form.Control
                as="select"
                name="enqId"
                value={formik.values.enqId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-select ${formik.touched.enqId && formik.errors.enqId ? 'is-invalid' : ''}`}
                >
                <option value="" disabled>
                  Enquiry Id
                </option>
                {enquiry.map(enq => (
                  <option key={enq._id} value={enq._id}>
                     {`${enq.fName} ${enq.lName}`}
                  </option>
                ))}
              </Form.Control>
              {formik.touched.enqId && formik.errors.enqId ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqId}</div>
              ) : null}
            </Form.Group>
            </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="nextContactDate">
            <Form.Label style={{ fontSize: '14px' }}>Next Contact Date</Form.Label>
              <Form.Control
                type="text"
                name="nextContactDate"
                value={formik.values.nextContactDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nextContactDate && formik.errors.nextContactDate ? (
                <div className="error" style={{color:'red'}}>{formik.errors.nextContactDate}</div>
              ) : null}
            </Form.Group>
            </Col>
            </Row>
         <Row>
            <Col md={6}>
            <Form.Group className="mb-3" controlId="followUpDetails">
            <Form.Label style={{ fontSize: '14px' }}>FollowUp Details</Form.Label>
              <Form.Control
                as="textarea"
                name="followUpDetails"
                value={formik.values.followUpDetails}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.followUpDetails && formik.errors.followUpDetails ? (
                <div className="error" style={{color:'red'}}>{formik.errors.followUpDetails}</div>
              ) : null}
            </Form.Group>
</Col>
<Col md={6}>
            <Form.Group className="mb-3" controlId="remarks">
            <Form.Label style={{ fontSize: '14px' }}>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                name="remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.remarks && formik.errors.remarks ? (
                <div className="error" style={{color:'red'}}>{formik.errors.remarks}</div>
              ) : null}
            </Form.Group>
            </Col>
            </Row>
          </Form>
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

export default AddModal;
 */