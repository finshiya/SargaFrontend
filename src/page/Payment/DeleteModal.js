import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import "../style/delete.css";
import { Container } from "react-bootstrap";

const DeleteModal = ({ getDatas, deleteclose, dlt, id }) => {
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/payments/${_id}`);
      toast.success("Data successfully deleted", { autoClose: 1000 });
      getDatas();
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Error deleting data. Please try again.", {
        autoClose: 1000,
      });
    }
  };

  const handleModalClose = () => {
    deleteclose();
  };

  return (
    <>
      <ToastContainer autoClose={5000} />
      <Modal show={dlt} backdrop="static" centered onHide={handleModalClose}>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button
              onClick={() => {
                handleDelete(id);
                handleModalClose();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
};

export default DeleteModal;
