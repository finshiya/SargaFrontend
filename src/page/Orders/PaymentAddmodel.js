import React, { useState } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../style/view.css";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";

const PaymentExpandibleView = ({ showModal, handleClose, selectedData }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  console.log("expandible orders", selectedData);

  const validationSchema = Yup.object({
    // enqId: Yup.string().required('enqId is required'),
    paymentAmount: Yup.string().required("Payment Amount is required"),
    paymentMethod: Yup.string().required("Payment Method is required"),
    transactionId: Yup.string().required("Transaction Id are required"),
    // enqTo: Yup.string().required('Enquiry To is required'),
  });

  const formik = useFormik({
    initialValues: {
      // enqId: enqId || '',
      paymentAmount: "",
      paymentMethod: "",
      transactionId: "",
      status: "new",

      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "admin",
      updatedBy: "admin",
      isDeleted: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);
      try {
        // Validate the newItem object using Formik and Yup
        await validationSchema.validate(values, { abortEarly: false });

        const response = await axios.post(
          "http://localhost:3000/collctions",
          values
        );
        console.log("Response:", response.data);

        toast.success("Data Added successfully!", { autoClose: 1000 });

        handleClose();
      } catch (error) {
        if (error.response) {
          console.log("Error Response:", error.response.data);
          console.log("Status Code:", error.response.status);
        } else if (error.request) {
          console.log("No response received from the server.");
        } else {
          console.log("Error:", error.message);
          toast.error("Error creating data Please try again.", {
            autoClose: 1000,
          });
        }
      }
    },
  });

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="nextContactDate">
                  <Form.Label style={{ fontSize: "14px" }}>
                    Payment Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="nextContactDate"
                    placeholder="Contact Date"
                    value={formik.values.nextContactDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    min={currentDate} // Set the minimum date to the current date
                  />
                  {formik.touched.nextContactDate &&
                  formik.errors.nextContactDate ? (
                    <div className="error" style={{ color: "red" }}>
                      {formik.errors.nextContactDate}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="paymentAmount">
                  <Form.Label style={{ fontSize: "14px" }}>
                    Payment Amount
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="paymentAmount"
                    placeholder="Payment Amount"
                    value={formik.values.paymentAmount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // min={currentDate} // Set the minimum date to the current date
                  />
                  {formik.touched.paymentAmount &&
                  formik.errors.paymentAmount ? (
                    <div className="error" style={{ color: "red" }}>
                      {formik.errors.paymentAmount}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="paymentMethod">
                  <Form.Label style={{ fontSize: "14px" }}>
                    Payment Method
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="paymentMethod"
                    placeholder="Payment Method"
                    value={formik.values.paymentMethod}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // min={currentDate} // Set the minimum date to the current date
                  />
                  {formik.touched.paymentMethod &&
                  formik.errors.paymentMethod ? (
                    <div className="error" style={{ color: "red" }}>
                      {formik.errors.paymentMethod}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="transactionId">
                  <Form.Label style={{ fontSize: "14px" }}>
                    Transaction ID
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="transactionId"
                    placeholder="Transaction Id"
                    value={formik.values.transactionId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // min={currentDate} // Set the minimum date to the current date
                  />
                  {formik.touched.transactionId &&
                  formik.errors.transactionId ? (
                    <div className="error" style={{ color: "red" }}>
                      {formik.errors.transactionId}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
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

      {/* Lightbox */}
      {lightboxOpen && (
        <Modal show={lightboxOpen} onHide={closeLightbox} centered>
          <Modal.Body style={{ cursor: "pointer" }}>
            <img
              src={GPImage}
              alt="Google Pay Screenshot"
              className="lightbox-image"
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default PaymentExpandibleView;
