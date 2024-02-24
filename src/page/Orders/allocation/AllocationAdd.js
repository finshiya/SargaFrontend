


import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";

function AllocationModal({ show, handleClose }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [remarks, setRemarks] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data.users);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAllocation = async () => {
    try {
      if (!selectedUser) {
        console.error("Please select a user.");
        return;
      }

      if (!remarks) {
        console.error("Please provide remarks.");
        return;
      }

      const formData = {
        user: selectedUser,
        remarks: remarks,
      };

      const response = await axios.post(
        "http://localhost:3000/allocation",
        formData
      );
      console.log("Allocation successful:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error allocating user:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Staff Allocation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form>
            <Form.Group controlId="selectedUser" className="mb-3">
              <Form.Label>Select Staff</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Select Staff</option>
                {users &&
                  users.map((user) => (
                    <option key={user._id} value={user.fname}>
                      {user.fname}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="remarks" className="mb-3">
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
          Close
        </Button>
        <Button
          style={{ background: "black", border: "none", fontWeight: "600" }}
          onClick={handleAllocation}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AllocationModal;
