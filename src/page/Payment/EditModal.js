// EditModal.js
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "react-bootstrap";
import "../style/edit.css";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditModal({ showModal, handleClose, selectedDatas, handleUpdate }) {
  const [enquiry, setEnquiry] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get("http://localhost:3000/enquiries");
      const filteredEnquiry = response.data.enquiry
        .filter((enq) => !enq.isDeleted)
        .sort((a, b) => {
          const nameA = a.paymentAmount.toUpperCase();
          const nameB = b.paymentAmount.toUpperCase();
          if (nameA < nameB) return -1; // Sort in alphabetical ascending order
          if (nameA > nameB) return 1;
          return 0;
        });
      setEnquiry(filteredEnquiry);
      console.log(filteredEnquiry);
    } catch (error) {
      console.error(error);
    }
  };

  // Formik form configuration
  const formik = useFormik({
    initialValues: {
      enqId: selectedDatas?.enqId || "",
      followUpDetails: selectedDatas?.followUpDetails || "",
      paymentMethod: selectedDatas?.paymentMethod || "",
      transactionId: selectedDatas?.transactionId || "",
      createdAt: selectedDatas?.createdAt || "",
    },
    validationSchema: Yup.object({
      followUpDetails: Yup.string().required("followUpDetails is required"),
      paymentMethod: Yup.string().required("paymentMethod is required"),
      createdAt: Yup.string().required("createdAt is required"),
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
      enqId: selectedDatas?.enqId?._id || "",
      paymentAmount: selectedDatas?.paymentAmount?._id || "",
      followUpDetails: selectedDatas?.followUpDetails || "",
      paymentMethod: selectedDatas?.paymentMethod || "",
      transactionId: selectedDatas?.transactionId || "",
      createdAt: selectedDatas?.createdAt || "",
    });
  }, [selectedDatas]);

  return (
    <>
      <ToastContainer autoClose={1000} />
      <Modal
        show={showModal}
        onHide={handleModalHide}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6}>
                  {/* Support Type Dropdown */}
                  {/* <Form.Group className="mb-3" controlId="enqId">
         <Form.Label style={{ fontSize: '14px' }}>Name</Form.Label>
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
                     {`${enq.paymentAmount} ${enq.lName}`}
                  </option>
                ))}
              </Form.Control>
              {formik.touched.enqId && formik.errors.enqId ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqId}</div>
              ) : null}
            </Form.Group> */}
                  <Form.Group className="mb-3" controlId="paymentAmount">
                    <Form.Label style={{ fontSize: "14px" }}>
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="paymentAmount"
                      // value={formik.values.enqId}
                      value={`${selectedDatas?.enqId.paymentAmount || ""}  `}
                      // value={formik.values.enqId.paymentAmount}
                      // value={selectedDatas.enqId.paymentAmount}

                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {/* {formik.touched.enqId && formik.errors.enqId ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqId}</div>
              ) : null} */}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="paymentMethod">
                    <Form.Label style={{ fontSize: "14px" }}>
                      Deliverable Date
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="paymentMethod"
                      value={formik.values.paymentMethod}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {/* {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                <div className="error" style={{color:'red'}}>{formik.errors.paymentMethod}</div>
              ) : null} */}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="followUpDetails">
                    <Form.Label style={{ fontSize: "14px" }}>
                      FollowUp Details
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="followUpDetails"
                      value={formik.values.followUpDetails}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.followUpDetails &&
                    formik.errors.followUpDetails ? (
                      <div className="error" style={{ color: "red" }}>
                        {formik.errors.followUpDetails}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="createdAt">
                    <Form.Label style={{ fontSize: "14px" }}>
                      createdAt
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="createdAt"
                      value={formik.values.createdAt}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {/* {formik.touched.createdAt && formik.errors.createdAt ? (
                <div className="error" style={{color:'red'}}>{formik.errors.createdAt}</div>
              ) : null} */}
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              background: "none",
              color: "#000000",
              border: "1px solid #000000",
            }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            style={{ background: "#000000", border: "none", fontWeight: "600" }}
            onClick={formik.submitForm}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
