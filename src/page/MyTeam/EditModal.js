// EditModal.js
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useFormik } from 'formik';
 

import { Container, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';

import { BsEye, BsEyeSlash } from 'react-icons/bs';
import '../style/edit.css';


function EditModal({ showModal, handleClose, selectedDatas, handleUpdate }) {
  const [userRole, setUserRole] = useState([]);
  useEffect(()=>{

    fetchUserRole();
  },[])

  const fetchUserRole = async () => {
    try {
      const response = await axios.get('http://localhost:3000/userroles');
      const filteredUserRoles = response.data.userRole.filter(source => !source.isDeleted);
      console.log("from finshi" ,  response.data.userRole);
      setUserRole(filteredUserRoles);
      console.log(filteredUserRoles); 
    } catch (error) {
      console.error(error);
    }
  };


  const capitalizeFirstLetter = (value) => {
    return value
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formik = useFormik({
    initialValues: {
      fname: selectedDatas?.fname || '',
      lname: selectedDatas?.lname || '',
      email: selectedDatas?.email || '',
      mobile: selectedDatas?.mobile || '',
      userRoles: selectedDatas?.userRoles || '',
    },
    // validationSchema: Yup.object({
    //   fname: Yup.string().required('First name is required'),
    //   lname: Yup.string().required('Last name is required'),
    //   email: Yup.string().email('Invalid email format').required('Email is required'),
    //   mobile: Yup.string().required('Mobile is required'),
    //   userRoles: Yup.string().required('User roles are required'),
    // }),
    onSubmit: (values) => {
      handleUpdate(selectedDatas?._id, values);
      handleClose();
    },
  });

  const handleModalHide = () => {
    formik.resetForm();
    handleClose();
  };

  useEffect(() => {
    console.log("selectedDatas:", selectedDatas);
    formik.setValues({
      fname: selectedDatas?.fname || '',
      lname: selectedDatas?.lname || '',
      email: selectedDatas?.email || '',
      mobile: selectedDatas?.mobile || '',
  
      userRoles: selectedDatas?.userRoles?._id || '',
      
    });
  }, [selectedDatas]);

  return (

    <>
     <Modal show={showModal} onHide={handleModalHide} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit My Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
        
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3 " controlId="fname">
                  <Form.Label style={{fontSize:'14px'}}>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fname"
                      placeholder=" "
                      value={formik.values.fname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                   
              
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3 " controlId="lname">
                  <Form.Label style={{fontSize:'14px'}}>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lname"
                      placeholder=" "
                      value={formik.values.lname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3 " controlId="email">
                  <Form.Label style={{fontSize:'14px'}}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder=" "
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3 " controlId="mobile">
                  <Form.Label style={{fontSize:'14px'}}>Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      placeholder=" "
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Form.Group>
                </Col>
  {/* <Form.Control 
                  as="select"
                  name="userRoles"
                  value={formik.values.userRoles}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={(formik.touched.enqType && formik.errors.enqType) ? 'error-border' : ''}>
  <Form.Label className='label' style={{ fontSize: '14px' }}>User Roles</Form.Label>
  <option value="" disabled selected >User Role</option>
  {userRole.map(type => (
    <option key={type._id} value={type._id}>
      {capitalizeFirstLetter (type.name)}
    </option>
  ))}
        </Form.Control> */}
      
      <Col md={6}>
  <Form.Group className="mb-3" controlId="userRoles">
    <Form.Label style={{ fontSize: '14px' }}>User Role</Form.Label>
    <Form.Control
      as="select"
      name="userRoles"
      value={formik.values.userRoles}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={`form-select ${formik.touched.userRoles && formik.errors.userRoles ? 'is-invalid' : ''}`}
    >
      <option value="" disabled>Select a role</option>
      {userRole.map(role => (
        <option key={role._id} value={role._id}>
          {capitalizeFirstLetter(role.name)}
        </option>
      ))}
    </Form.Control>
    {formik.touched.userRoles && formik.errors.userRoles ? (
      <div className="error" style={{ color: 'red' }}>{formik.errors.userRoles}</div>
    ) : null}
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


export default EditModal;
