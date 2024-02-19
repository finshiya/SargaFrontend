import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../style/addmodel.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddModal({
  enqId,
  getDatas,
  showFollowUpModal,
  setShowFollowUpModal,
}) {
  const [show, setShow] = React.useState(showFollowUpModal);
  const [enqTo, setEnqTo] = useState([]);

  const handleClose = () => {
    setShow(false);
    // Reset the form when the modal is closed
    formik.resetForm();
    setShowFollowUpModal(false);
  };

  const capitalizeFirstLetter = (value) => {
    return value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(showFollowUpModal);
  }, [showFollowUpModal]);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    enqId: Yup.string().required("enqId is required"),
    followUpDetails: Yup.string().required("order are required"),
    nextContactDate: Yup.string().required("Next Delivarable is required"),
    // remarks:Yup.string().required('Remarks are required'),
    // enqTo: Yup.string().required('Enquiry To is required'),
  });

  const formik = useFormik({
    initialValues: {
      enqId: enqId || "",
      followUpDetails: "",
      nextContactDate: "",
      status: "new",
      // enqTo: '',

      // remarks:'',
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
          "http://localhost:3000/followUp",
          values
        );
        console.log("Response:", response.data);

        getDatas();
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

  const fetchEnquiryTo = async () => {
    try {
      const response = await axios.get("http://localhost:3000/productService");
      const filteredEnqTo = response.data.product
        .filter((to) => !to.isDeleted)
        .sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1; // Sort in alphabetical ascending order
          if (nameA > nameB) return 1;
          return 0;
        });
      setEnqTo(filteredEnqTo);
      console.log(filteredEnqTo);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEnquiryTo();
  }, []);

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <ToastContainer />

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Add Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="enqTo">
                    <Form.Label
                      className="mandatory-label"
                      style={{ fontSize: "14px" }}
                    >
                      Enquiry To
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="enqTo"
                      value={formik.values.enqTo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-select ${
                        formik.touched.enqTo && formik.errors.enqTo ? (
                          <div className="error" style={{ color: "red" }}>
                            {formik.errors.referenceId}
                          </div>
                        ) : null
                      }`}
                    >
                      <option value="" disabled>
                        Enquiry To
                      </option>
                      {enqTo.map((to) => (
                        <option key={to._id} value={to._id}>
                          {capitalizeFirstLetter(to.name)}
                        </option>
                      ))}
                    </Form.Control>
                    {formik.touched.enqTo && formik.errors.enqTo ? (
                      <div className="error" style={{ color: "red" }}>
                        {formik.errors.enqTo}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="nextContactDate">
                    <Form.Label
                      className="mandatory-label"
                      style={{ fontSize: "14px" }}
                    >
                      Deliverable Date
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
                  <Form.Group className="mb-3" controlId="followUpDetails">
                    <Form.Label
                      className="mandatory-label"
                      style={{ fontSize: "14px" }}
                    >
                      Order Details
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="followUpDetails"
                      placeholder="Details"
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
                  <Form.Group className="mb-3" controlId="remarks">
                    <Form.Label style={{ fontSize: "14px" }}>
                      Remarks
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="remarks"
                      placeholder="Remarks"
                      value={formik.values.remarks}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.remarks && formik.errors.remarks ? (
                      <div className="error" style={{ color: "red" }}>
                        {formik.errors.remarks}
                      </div>
                    ) : null}
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

export default AddModal;
