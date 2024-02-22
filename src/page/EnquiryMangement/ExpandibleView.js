import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import "./../style/view.css";
import "./style/Tab.css";

function ExpandedView({ showModal, handleClose, selectedDatas }) {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [toggle, setToggle] = useState(1);
  
 



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
          <Modal.Title>Order Details1</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
           
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
                        `${selectedDatas?.enqNo || ""}`
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
                        `${selectedDatas?.orderDetails || ""}`
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
