// AllocationModal.js

import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Form";
import axios from "axios";
import { useFormik } from "formik";
function AllocationModal({ show, handleClose }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [remarks, setRemarks] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleAllocation = async () => {
    try {
      const formData = {
        user: selectedUser,
        remarks: remarks,
      };
      await axios.post("http://localhost:3000/allocation", formData);
      // Handle success (e.g., show success message, refresh data)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Error allocating user:", error);
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/allocation");
      setUsers(response.data.Allocations); // Assuming response.data.Allocations contains the user data
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Allocate Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form>
            <Form.Group controlId="selectedUser">
              <Form.Label>Select User</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Select User</option>
                {/* Map through the users array to create dropdown options */}
                {users &&
                  users.map((user) => (
                    <option key={user._id} value={user.fname}>
                      {user.fname}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="remarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Form.Group>
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
          {" "}
          Close
        </Button>
        <Button
          style={{ background: "black", border: "none", fontWeight: "600" }}
        >
          {" "}
          Submit{" "}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AllocationModal;
