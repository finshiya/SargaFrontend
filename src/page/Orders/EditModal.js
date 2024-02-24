import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditModal({ showModal, handleClose, selectedDatas, handleUpdate }) {
  // Formik form configuration
  const formik = useFormik({
    initialValues: {
      enqId: selectedDatas?.enqId || '',
      orderDetails: selectedDatas?.orderDetails || '',
      nextContactDate: selectedDatas?.nextContactDate || '',
      status: selectedDatas?.status || '',
      remarks: selectedDatas?.remarks || '',
      fName: selectedDatas?.enqId?.fName || '', // fName field initialized here
    },
    validationSchema: Yup.object({
      enqId: Yup.string().required('Enq-Id is required'),
      orderDetails: Yup.string().required('Order Detail is required'),
      nextContactDate: Yup.string().required('Next Contact Date is required'),
      remarks: Yup.string().required('Remarks is required'),
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
      enqId: selectedDatas?.enqId?._id || '',
      orderDetails: selectedDatas?.orderDetails || '',
      nextContactDate: selectedDatas?.nextContactDate || '',
      status: selectedDatas?.status || '',
      remarks: selectedDatas?.remarks || '',
      fName: selectedDatas?.enqId?.fName || '', // Ensure fName is updated in useEffect
    });
  }, [selectedDatas]);
  
  return (
    <>
      <ToastContainer autoClose={1000}/>
      <Modal show={showModal} onHide={handleModalHide} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="fName">
                    <Form.Label style={{ fontSize: '14px' }}>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fName"
                      value={formik.values.fName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="nextContactDate">
                    <Form.Label style={{ fontSize: '14px' }}>Next Order Schedule</Form.Label>
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
                  <Form.Group className="mb-3" controlId="orderDetails">
                    <Form.Label style={{ fontSize: '14px' }}>Order Details</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="orderDetails"
                      value={formik.values.orderDetails}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.orderDetails && formik.errors.orderDetails ? (
                      <div className="error" style={{color:'red'}}>{formik.errors.orderDetails}</div>
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
