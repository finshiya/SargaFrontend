import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style/Tab.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditModal({ showModal, handleClose, selectedDatas, handleUpdate }) {
  const [enquirySources, setEnquirySources] = useState([]);
  const [enquiryType, setEnquiryTpe] = useState([]);
  const [enquiryMode, setEnquiryMode] = useState([]);

  const capitalizeFirstLetter = (value) => {
    return value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const [toggle, setToggle] = useState(1);

  const toggleTab = (index) => {
    setToggle(index);
    console.log(index);
  };

  useEffect(() => {
    fetchEnquirySource();
    fetchEnquiryType();
    fetchEnquiryMode();
  }, []);

  const fetchEnquirySource = async () => {
    try {
      const response = await axios.get("http://localhost:3000/enquirySource");
      const filteredEnquirySources = response.data.enquiriesSource
        .filter((source) => !source.isDeleted)
        .sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1; // Sort in alphabetical ascending order
          if (nameA > nameB) return 1;
          return 0;
        });
      setEnquirySources(filteredEnquirySources);
      console.log(filteredEnquirySources);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnquiryType = async () => {
    try {
      const response = await axios.get("http://localhost:3000/enquiryType");
      const filteredEnquiryTypes = response.data.enquiryType
        .filter((type) => !type.isDeleted)
        .sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1; // Sort in alphabetical ascending order
          if (nameA > nameB) return 1;
          return 0;
        });
      setEnquiryTpe(filteredEnquiryTypes);
      console.log(filteredEnquiryTypes);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnquiryMode = async () => {
    try {
      const response = await axios.get("http://localhost:3000/enquiryMode");
      const enquiriesMode = response.data.enquiryModes
        .filter((mode) => !mode.isDeleted)
        .sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1; // Sort in alphabetical ascending order
          if (nameA > nameB) return 1;
          return 0;
        });
      setEnquiryMode(enquiriesMode);
      console.log(enquiriesMode);
    } catch (error) {
      console.error(error);
    }
  };

  // Formik form configuration
  const formik = useFormik({
    initialValues: {
      // enqNo: selectedDatas?.enqNo || "",
      enqMode: selectedDatas?.enqMode?._id || "",
      enqSource: selectedDatas?.enqSource || "",
      enqType: selectedDatas?.enqType || "",
      fName: selectedDatas?.fName || "",
      lName: selectedDatas?.lName || "",
      email: selectedDatas?.email || "",
      gender: selectedDatas?.gender || "",
      mobile: selectedDatas?.mobile || "",
      location: selectedDatas?.location || "",
      district: selectedDatas?.district || "",
      state: selectedDatas?.state || "",
      referenceId: selectedDatas?.referenceId || "",
      status: selectedDatas?.status || "",
    },
    validationSchema: Yup.object({
      // enqNo: Yup.string().required("Enquiry Number is required"),
      enqMode: Yup.string().required("Enquiry Mode is required"),
      enqSource: Yup.string().required("Enquiry Source is required"),
      enqType: Yup.string().required("Enquiry Type is required"),
      fName: Yup.string().required("First Name is required"),
      lName: Yup.string().required("Last Name is required"),
      email: Yup.string().required("Email is required"),
      mobile: Yup.string().required("Mobile is required"),
      location: Yup.string().required("Location is required"),
      district: Yup.string().required("District  is required"),
      state: Yup.string().required("State is required"),
      // referenceId: Yup.string().required('Reference Id is required'),
      status: Yup.string().required("Status is required"),

      // gender: Yup.string().required('Gender is required'),
    }),
    onSubmit: (values) => {
      // handleUpdate(selectedDatas?._id, values);
      handleUpdate(selectedDatas?._id, values);
      handleClose();
    },
  });

  const handleModalHide = () => {
    formik.resetForm(); // Reset Formik state when modal is closed
    handleClose();
  };

  useEffect(() => {
    formik.setValues({
      // enqNo: selectedDatas?.enqNo || "",
      enqMode: selectedDatas?.enqMode?._id || "",
      enqSource: selectedDatas?.enqSource?._id || "",
      enqType: selectedDatas?.enqType?._id || "",
      fName: selectedDatas?.fName || "",
      landMark: selectedDatas?.landMark || "",
      lName: selectedDatas?.lName || "",
      pincode: selectedDatas?.pincode || "",
      gender: selectedDatas?.gender || "",
      wtsApp: selectedDatas?.wtsApp || "",
      email: selectedDatas?.email || "",
      mobile: selectedDatas?.mobile || "",
      location: selectedDatas?.location || "",
      district: selectedDatas?.district || "",
      state: selectedDatas?.state || "",
      referenceId: selectedDatas?.referenceId || "",
      status: selectedDatas?.status || "",
    });
  }, [selectedDatas]);

  return (
    <>
      <ToastContainer autoClose={1000} />
      <Modal
        show={showModal}
        onHide={handleModalHide}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Edit Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={formik.handleSubmit}>
              <div className="App">
                <div className="box">
                  <div className="tabs">
                    <div
                      onClick={() => toggleTab(1)}
                      className={`${toggle === 1 ? "tab active-tab" : "tab"}`}
                    >
                      Basic Details
                    </div>
                    <div
                      onClick={() => toggleTab(2)}
                      className={`${toggle === 2 ? "tab active-tab" : "tab"}`}
                    >
                      Additional Details
                    </div>
                    <div
                      onClick={() => toggleTab(3)}
                      className={`${toggle === 3 ? "tab active-tab" : "tab"}`}
                    >
                      General Details
                    </div>
                  </div>
                </div>

                <div className="contents">
                  <div
                    className={`${
                      toggle === 1 ? "content active-content" : "content"
                    }`}
                  >
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="enqType">
                          <Form.Label style={{ fontSize: "14px" }}>
                            Customer Type
                          </Form.Label>
                          <Form.Control
                            as="select"
                            name="enqType"
                            value={formik.values.enqType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-select ${
                              formik.touched.enqType && formik.errors.enqType
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value="" disabled selected>
                              Customer Type
                            </option>
                            {enquiryType.map((type) => (
                              <option key={type._id} value={type._id}>
                                {capitalizeFirstLetter(type.name)}
                              </option>
                            ))}
                          </Form.Control>
                          {formik.touched.enqType && formik.errors.enqType ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.enqType}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label style={{ fontSize: "14px" }}>
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.email}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="fName">
                          <Form.Label style={{ fontSize: "14px" }}>
                            First Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="FirstName"
                            name="fName"
                            value={formik.values.fName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.fName && formik.errors.fName ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.fName}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="lName">
                          <Form.Label style={{ fontSize: "14px" }}>
                            Last Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="LastName"
                            name="lName"
                            value={formik.values.lName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.lName && formik.errors.lName ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.lName}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="mobile">
                          <Form.Label style={{ fontSize: "14px" }}>
                            Mobile
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Mobile"
                            name="mobile"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.mobile && formik.errors.mobile ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.mobile}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="wtsApp">
                          <Form.Label style={{ fontSize: "14px" }}>
                            {" "}
                            WhatsApp
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="WhatsApp"
                            name="wtsApp"
                            value={formik.values.wtsApp}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.wtsApp && formik.errors.wtsApp ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.wtsApp}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>

                  <div
                    className={`${
                      toggle === 2 ? "content active-content" : "content"
                    }`}
                  >
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="state">
                          <Form.Label style={{ fontSize: "14px" }}>
                            State
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="State"
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.state && formik.errors.state ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.state}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="district">
                          <Form.Label style={{ fontSize: "14px" }}>
                            District
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="District"
                            name="district"
                            value={formik.values.district}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.district && formik.errors.district ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.district}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="location">
                          <Form.Label style={{ fontSize: "14px" }}>
                            Location / City
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Location"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.location && formik.errors.location ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.location}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Label style={{ fontSize: "14px" }}>
                          LandMark
                        </Form.Label>
                        <Form.Group className="mb-3" controlId="landMark">
                          <Form.Control
                            type="text"
                            placeholder="LandMark"
                            name="landMark"
                            value={formik.values.landMark}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {/* {formik.touched.referenceId && formik.errors.referenceId ? (
                <div className="error" style={{color:'red'}}>{formik.errors.referenceId}</div>
              ) : null} */}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Label style={{ fontSize: "14px" }}>
                          pincode
                        </Form.Label>
                        <Form.Group className="mb-3" controlId="pincode">
                          <Form.Control
                            type="text"
                            placeholder="pincode"
                            name="pincode"
                            value={formik.values.pincode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {/* {formik.touched.referenceId && formik.errors.referenceId ? (
                <div className="error" style={{color:'red'}}>{formik.errors.referenceId}</div>
              ) : null} */}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="gender">
                          <Form.Label style={{ fontSize: "14px" }}>
                            Gender
                          </Form.Label>
                          <div className="radio-group">
                            <Form.Check
                              type="radio"
                              label="Male"
                              name="gender"
                              id="male"
                              value="male"
                              checked={formik.values.gender === "male"}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <Form.Check
                              type="radio"
                              label="Female"
                              name="gender"
                              id="female"
                              value="female"
                              checked={formik.values.gender === "female"}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <Form.Check
                              type="radio"
                              label="Other"
                              name="gender"
                              id="other"
                              value="other"
                              checked={formik.values.gender === "other"}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                          {formik.touched.gender && formik.errors.gender && (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.gender}
                            </div>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>

                  <div
                    className={`${
                      toggle === 3 ? "content active-content" : "content"
                    }`}
                  >
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="referenceId">
                          <Form.Label style={{ fontSize: "14px" }}>
                            Reference Id
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="ReferenceId"
                            name="referenceId"
                            value={formik.values.referenceId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />

                          {/* {formik.touched.referenceId && formik.errors.referenceId ? (
                <div className="error" style={{color:'red'}}>{formik.errors.referenceId}</div>
              ) : null} */}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="enqSource">
                          <Form.Label style={{ fontSize: "14px" }}>
                            Enquiry Source
                          </Form.Label>
                          <Form.Control
                            as="select"
                            name="enqSource"
                            value={formik.values.enqSource}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-select ${
                              formik.touched.enqSource &&
                              formik.errors.enqSource
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value="" disabled>
                              Enquiry Source
                            </option>
                            {enquirySources.map((source) => (
                              <option key={source._id} value={source._id}>
                                {capitalizeFirstLetter(source.name)}
                              </option>
                            ))}
                          </Form.Control>
                          {formik.touched.enqSource &&
                          formik.errors.enqSource ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.enqSource}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="enqMode">
                          <Form.Label style={{ fontSize: "14px" }}>
                            Enquiry Mode
                          </Form.Label>
                          <Form.Control
                            as="select"
                            name="enqMode"
                            value={formik.values.enqMode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-select ${
                              formik.touched.enqMode && formik.errors.enqMode
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value="" disabled>
                              Enquiry Mode
                            </option>
                            {enquiryMode.map((mode) => (
                              <option key={mode._id} value={mode._id}>
                                {capitalizeFirstLetter(mode.name)}
                              </option>
                            ))}
                          </Form.Control>
                          {formik.touched.enqMode && formik.errors.enqMode ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.enqMode}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              background: "none",
              color: "black",
              border: "1px solid black",
            }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            style={{ background: "black", border: "none", fontWeight: "600" }}
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
