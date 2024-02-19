import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import '../style/addmodel.css';
import { showSuccessAlert, showFailsAlert } from '../Toastify/tostifyAlert';

const App = ({getDatas}) => {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userRoles, setUserRoles] = useState([]);



  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/userroles');
        const filteredEnqTo = response.data.userRole.filter(to => !to.isDeleted);
        setUserRoles(filteredEnqTo);  // <-- Here is the first update
  
        setUserRoles(response.data.userRole);  // <-- Here is the second update
        formik.setValues((prevValues) => ({
          ...prevValues,
          userType: 'admin',
          userRoles: response.data.userRole.find(role => role.name === 'licensee')._id, 
        }));
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }
    };
  
    fetchUserRoles();
  }, []);
  
  

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object({
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    mobile: Yup.string().required('Mobile is required'),
    userType: Yup.string().required('User types are required'),
    userRoles: Yup.string().required('User types are required'),
  });

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      userType: '',
      userRoles: '',
   
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await validationSchema.validate(values, { abortEarly: false });

        const response = await axios.post('http://localhost:3000/users', values);
        console.log('Response:', response.data);


        showSuccessAlert("Successfully Added");
        handleClose();
        getDatas(); 
        // Refresh the page after successful submission
       window.location.reload();
      } catch (error) {
        if (error.response) {
          console.log('Error Response:', error.response.data);
          console.log('Status Code:', error.response.status);
        } else if (error.request) {
          console.log('No response received from the server.');
        } else {
          console.log('Error:', error.message);
          // Handle other errors
        }
      }
    },
  });


  return (
    <>
     
      <Button style={{ background: '#5bb6ea', border: 'none', color: 'white', fontWeight: '600',marginBottom:'10px' }} onClick={handleShow}>
        + New
      </Button>

      <Modal className='modal-box' show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '17px' }}>Add Licensee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3 " controlId="fname" >
                    <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fname"
                      placeholder=" First Name"
                      value={formik.values.fname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
           
                    />
                    {formik.touched.fname && formik.errors.fname ? (
                      <div className="error">
                        {formik.errors.fname}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                <Form.Group className="mb-3 " controlId="lname" >
                    <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lname"
                      placeholder=" Last Name"
                      value={formik.values.lname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
           
                    />
                    {formik.touched.lname && formik.errors.lname ? (
                      <div className="error">
                        {formik.errors.lname}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>


                <Col md={6}>
                <Form.Group className="mb-3 " controlId="email" >
                    <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder=" Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>


                <Col md={6}>
                <Form.Group className="mb-3 " controlId="mobile" >
                    <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      placeholder="Mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
           
                    />
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div className="error">
                        {formik.errors.mobile}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                             
<Col md={6}>
  <Form.Group className="mb-3" style={{ position: 'relative' }} controlId="password">
    <Form.Label className='mandatory-label' style={{ fontSize: '14px' }}>Password</Form.Label>
    <div className="password-input-container">
      <Form.Control
        type={showPassword ? 'text' : 'password'}
        name="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={() => formik.setFieldTouched('password', true)}
        onFocus={() => formik.setFieldTouched('password', false)}
        className={(formik.touched.password && formik.errors.password)}
        autoComplete="new-password"  // Add this line
      />
      <div className="input-group-append">
        <div className="password-toggle-icon input-group-text" onClick={togglePasswordVisibility}>
          {showPassword ? <BsEye /> : <BsEyeSlash />}
        </div>
      </div>
    </div>
    {formik.touched.password && formik.errors.password ? (
      <div className="error">
        {formik.errors.password}
      </div>
    ) : null}
  </Form.Group>
</Col>
                <Col md={6}>
                  <Form.Group  className="mb-3 " controlId="confirmPassword">
                  <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password "
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={() => formik.setFieldTouched('confirmPassword', true)}
                      onFocus={() => formik.setFieldTouched('confirmPassword', false)} 
                      className={(formik.touched.confirmPassword && formik.errors.confirmPassword) ? 'error-border' : ''}
                    />
                     {/* <Form.Label className={formik.touched.confirmPassword || formik.values.confirmPassword ? 'floating' : ''} style={{color: formik.touched.confirmPassword && formik.errors.confirmPassword ? 'red' : '#5bb6ea !importend' }}>Confirm Password</Form.Label> */}
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <div className="error" >
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={6}>
  <Form.Group className="mb-3 input-box" controlId="userRoles">
    <Form.Label  className='label' style={{ fontSize: '14px' }}>User Role</Form.Label>
    <Form.Control
      className='input-controll'
      type="text"
      placeholder="Licensee"
      name="userrole"
      value={formik.values.userRoles.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      disabled
    />
    {formik.touched.userType && formik.errors.userType ? (
      <div className="error">
        {formik.errors.userType}
      </div>
    ) : null}
  </Form.Group>
</Col>

              </Row>
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
