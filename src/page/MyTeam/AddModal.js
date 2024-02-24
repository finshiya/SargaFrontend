
// export default App;
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
const App = ({getDatas, fetchUserRoles}) => {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userRoles, setUserRoles] = useState([]);



  
  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/userroles');
        const filteredUserRoles = response.data.userRole.filter(role => role.isDeleted === false);
     
        setUserRoles(filteredUserRoles);
  
        formik.setValues((prevValues) => ({
          ...prevValues,
          userRoles: filteredUserRoles.map(role => role._id),
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
      userType: 'admin',
      userRoles: '',

   
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await validationSchema.validate(values, { abortEarly: false });
    
        const response = await axios.post('http://localhost:3000/users', {
          ...values,
          userRoles: values.userRoles,
        });
    
        showSuccessAlert("Successfully Added");
    
        handleClose();
         getDatas();
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

  const capitalizeFirstLetter = (value) => {
    return value
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


  return (
    <>
   
      <Button style={{ background: '#000000', border: 'none', color: 'white', fontWeight: '600',marginBottom:'10px'  }} onClick={handleShow}>
        + New
      </Button>

      <Modal className='modal-box' show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '17px' }}>Add My Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6}>
                <Form.Group className="mb-3" controlId="fname">
  <Form.Label className="mandatory-label" style={{ fontSize: '14px' }}>
    First Name
  </Form.Label>
  <Form.Control
    type="text"
    name="fname"
    placeholder="First Name"
    value={formik.values.fname}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.fname && formik.errors.fname ? (
    <div className="error">{formik.errors.fname}</div>
  ) : null}
</Form.Group>
                </Col>

                <Col md={6}>
                <Form.Group className="mb-3 " controlId="lname" >
                    <Form.Label className="mandatory-label" style={{fontSize:'14px'}}>Last Name</Form.Label>
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
                    <Form.Label className="mandatory-label" style={{fontSize:'14px'}}>Email</Form.Label>
                    <Form.Control
  type="email"
  name="email"
  placeholder="Email"
  value={formik.values.email}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  autoComplete="email" 
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
                    <Form.Label className="mandatory-label" style={{fontSize:'14px'}}>Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      placeholder="Mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
           
                    />
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div className="error ">
                        {formik.errors.mobile}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                
<Col md={6}>
  <Form.Group className="mb-3" style={{ position: 'relative' }} controlId="password">
    <Form.Label className="mandatory-label" style={{ fontSize: '14px' }}>Password</Form.Label>
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
                  <Form.Label className="mandatory-label" style={{fontSize:'14px'}}>Confirm Password</Form.Label>
                  <Form.Control
  type="password"
  placeholder="Confirm Password"
  name="confirmPassword"
  value={formik.values.confirmPassword}
  onChange={formik.handleChange}
  onBlur={() => formik.setFieldTouched('confirmPassword', true)}
  onFocus={() => formik.setFieldTouched('confirmPassword', false)} 
  className={(formik.touched.confirmPassword && formik.errors.confirmPassword)}
  autoComplete="new-password"  // Add this line
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
                <Form.Group  className="mb-3 " controlId="confirmPassword">
                  <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>User Role</Form.Label>
                  <Form.Select
  as="select"
  className='input-controll'
  name="userRoles"
  value={formik.values.userRoles}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
>
  <option value="" label="Select a role" />
  {['admin', 'licensee', 'vendor', 'operator', 'accountant'].map(role => (
    <option key={role} value={role}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </option>
  ))}
</Form.Select>

                {/* <Form.Select
                    as="select"
  className='input-controll'
  name="userRoles"
  value={formik.values.userRoles} // Update this line
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
>

  <Form.Label className='label' style={{ fontSize: '14px' }}>User Roles</Form.Label>
  <option value="" label="Select a role" />
  {userRoles.map(role => (
  <option key={role._id} value={role._id}>
    {capitalizeFirstLetter (role.name)}
  </option>
  
))}


</Form.Select> */}
</Form.Group>
</Col>
                
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ background: 'none', color: '#000000', border: '1px solid #000000' }} onClick={handleClose}>
            Close
          </Button>
          <Button style={{ background: '#000000', border: 'none', fontWeight: '600' }} onClick={formik.submitForm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



export default App;
