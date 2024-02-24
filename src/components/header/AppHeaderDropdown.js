import React, { useState, useEffect } from 'react';
import axios from 'axios';
import avatar from '../../assets/images/prf-logo.png';
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AppHeaderDropdown.css';
import { useNavigate } from 'react-router';
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
 
 
 

 

const apiUrl = 'http://localhost:3000';
const imagesUrl = 'http://localhost:3000/public/Images';

const AppHeaderDropdown = () => {
  const [showModal, setShowModal] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [userProfiles, setUserProfiles] = useState([]);
  const navigate = useNavigate();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const createPost = async () => {
    try {
      if (postImage) {
        const formData = new FormData();
        formData.append('file', postImage);

        const headers = { 'Content-Type': 'multipart/form-data' };

        await axios.post(`${apiUrl}/userProfile/create`, formData, { headers });

        console.log('Post created successfully');
        getAllUserProfiles();
      } else {
        console.log('No image to upload');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  useEffect(() => {
    getAllUserProfiles();
  }, []);

  const getAllUserProfiles = async () => {
    try {
      const response = await axios.get(`${apiUrl}/userProfile/all`);
      setUserProfiles(response.data);
      console.log("zain" , response.data);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  };

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost();
    handleCloseModal(); 
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPostImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlogin = () => {
    navigate('/login');
  };
  return ( 

    
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar   src={
                      userProfiles.length > 0 && userProfiles[0].filename
                        ? `${imagesUrl}/${userProfiles[0].filename}`
                        : avatar
                    } size="md" className='' style={{height:'40px', width:'50px'}} />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="#" onClick={handleShowModal}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Reset Password
        </CDropdownItem>
        <CDropdownItem href="login" >
          <CIcon icon={cilLockLocked} className="me-2"/>
          Log Out
        </CDropdownItem>
        <CDropdownDivider />
      </CDropdownMenu>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>My Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="image body1">
              <div className="App">
                <label htmlFor="file-upload" className="custom-file-upload">
                  <img
                    src={
                      userProfiles.length > 0 && userProfiles[0].filename
                        ? `${imagesUrl}/${userProfiles[0].filename}`
                        : avatar
                    }
                    alt=""
                  />
                </label>
                <input
                  type="file"
                  label="Image"
                  name="file"
                  id="file-upload"
                  accept=".jpeg, .png, .jpg"
                  onChange={handleFileUpload}
                />
              </div>
            </Form.Group>

            <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>
            <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button> */}

          <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleCloseModal}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button> */}

          <Button style={{ background: '#5bb6ea', border: 'none', fontWeight: '600' }} onClick={handleSubmit}>
          Save
          </Button>
        </Modal.Footer>
      </Modal>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
