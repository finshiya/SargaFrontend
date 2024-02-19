import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import "./../style/view.css";
import "./style/Tab.css";

function ExpandedView({ showModal, handleClose, selectedDatas }) {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [toggle, setToggle] = useState(1);

  // useEffect(() => {
  //   if (toggle === 2 && paymentDetails.length === 0) {
  //     fetchPaymentDetails();
  //   }
  // }, [toggle]);

  // const fetchPaymentDetails = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/payments");
  //     setPaymentDetails(response.data.Payments);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const capitalizeFirstLetter = (value) => {
    return value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const toggleTab = (index) => {
    setToggle(index);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {/* <Col md={6}>
                <div
                  onClick={() => toggleTab(1)}
                  className={`${toggle === 1 ? "tab active-tab" : "tab"}`}
                >
                  Order Details
                </div>
              </Col> */}
              {/* <Col md={6}>
                <div
                  onClick={() => toggleTab(2)}
                  className={`${toggle === 2 ? "tab active-tab" : "tab"}`}
                >
                  Payments Details
                </div>
              </Col> */}
            </Row>
            <div className="contents">
              <div
                className={`${
                  toggle === 1 ? "content active-content" : "content"
                }`}
              >
                <Row>
                  <Col md={6}>
                    <Form.Label style={{ fontSize: "14px" }}>
                      OrderId
                    </Form.Label>
                    <Form.Control
                      disabled={true}
                      value={capitalizeFirstLetter(
                        `${selectedDatas?.OrderId || ""}`
                      )}
                      className="custom-disabled-input"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label style={{ fontSize: "14px" }}>
                      Order Details
                    </Form.Label>
                    <Form.Control
                      disabled={true}
                      value={capitalizeFirstLetter(
                        `${selectedDatas?.followUpDetails || ""}`
                      )}
                      className="custom-disabled-input"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label style={{ fontSize: "14px" }}>
                      Deliverable Date
                    </Form.Label>
                    <Form.Control
                      disabled={true}
                      value={capitalizeFirstLetter(
                        `${selectedDatas?.nextContactDate || ""}`
                      )}
                      className="custom-disabled-input"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label style={{ fontSize: "14px" }}>Status</Form.Label>
                    <Form.Control
                      disabled={true}
                      value={capitalizeFirstLetter(
                        `${selectedDatas?.status || ""}`
                      )}
                      className="custom-disabled-input"
                    />
                  </Col>
                </Row>
              </div>
              {/* <div className={`${toggle === 2 ? "content active-content" : "content"}`}>
  {paymentDetails && paymentDetails.length > 0 ? (
    paymentDetails.map((payment, index) => (
      <Row key={index}>
         <Col md={6}>
          <Form.Label style={{ fontSize: "14px" }}>
          Payment Date
          </Form.Label>
          <Form.Control
            disabled={true}
            value={`${payment.nextContactDate || ""}`}
            className="custom-disabled-input"
          />
        </Col>
        <Col md={6}>
          <Form.Label style={{ fontSize: "14px" }}>
            Payment Method
          </Form.Label>
          <Form.Control
            disabled={true}
            value={capitalizeFirstLetter(
              `${payment.paymentMethod || ""}`
            )}
            className="custom-disabled-input"
          />
        </Col>
        <Col md={6}>
          <Form.Label style={{ fontSize: "14px" }}>
            Payment Amount
          </Form.Label>
          <Form.Control
            disabled={true}
            value={`${payment.paymentAmount || ""}`}
            className="custom-disabled-input"
          />
        </Col>
        <Col md={6}>
          <Form.Label style={{ fontSize: "14px" }}>
          Transaction Id
          </Form.Label>
          <Form.Control
            disabled={true}
            value={`${payment.transactionId || ""}`}
            className="custom-disabled-input"
          />
        </Col>
      </Row>
    ))
  ) : (
    <p>No payment details available</p>
  )}
</div> */}
            </div>
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
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ExpandedView;
