// ViewModal.js
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../style/view.css";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function ViewModal({ showModal, handleClose, selectedDatas }) {
  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>View Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={6}>
              <Form.Label style={{ fontSize: "14px" }}>
                {" "}
                Payment Date
              </Form.Label>
              <Form.Control
                rows={3}
                disabled={true}
                value={` ${selectedDatas?.paymentMethod || ""}`}
                className="custom-disabled-input"
              />
            </Col>

            <Col md={6}>
              <Form.Label style={{ fontSize: "14px" }}>
                {" "}
                Payment Method
              </Form.Label>
              <Form.Control
                rows={3}
                disabled={true}
                value={` ${selectedDatas?.paymentMethod || ""}`}
                className="custom-disabled-input"
              />
            </Col>

            <Col md={6}>
              <Form.Label style={{ fontSize: "14px" }}>
                {" "}
                Payment Amount
              </Form.Label>
              <Form.Control
                rows={3}
                disabled={true}
                value={`${selectedDatas?.paymentAmount || ""}`}
                className="custom-disabled-input"
              />
            </Col>

            <Col md={6}>
              <Form.Label style={{ fontSize: "14px" }}>
                {" "}
                Transaction Id
              </Form.Label>
              <Form.Control
                rows={3}
                disabled={true}
                value={`${selectedDatas?.transactionId || ""}`}
                className="custom-disabled-input"
              />
            </Col>
          </Row>
          <Row></Row>
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
  );
}

export default ViewModal;
