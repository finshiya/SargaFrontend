import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const userData = await response.json();
        console.log("User data:", userData); // Log user data to see if it contains the role
        const jwtToken = userData.token;
  
        // Store token and user role in localStorage
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('role', userData.userType);
  
        // Update state using the login function
        login(jwtToken, userData.userType);
  
        if (userData.userType === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/other-page");
        }
  
        toast.success("Login successful!");
      } else {
        console.log("Login failed");
        toast.error("Login failed. Please check your credentials.", {
          theme: "light",
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  
  
  
  return (
    <>
      <ToastContainer position="top-right" />
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={10}>
              <CCardGroup>
                <CCard className="">
                  <CCardBody>
                    <CForm className="login-frm" autoComplete="on"> 
                      <h3>Login Account</h3 >
                      <p className="text-medium-emphasis">
                      Don't have an account?
                      <CButton color="link" className="px-0 ">
                      Login
                          </CButton>

                      </p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-2">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0 mb-4">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                      <CCol xs={12} className=" d-flex justify-content-end">
                          <CButton
                            className="px-4 lg-btn"
                            onClick={handleLogin}
                          >
                            LOGIN
                          </CButton>
                        </CCol>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white login-right py-5"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="">
                    <div>
                      <h2 className="mb-4">WELCOME BACK</h2>
                      <p>
                     An  Inqportal improves customer satisfaction by streamlining inquiries through a user-friendly form and a central tracking dashboard. It enhances efficiency with efficient communication tools for resolving inquiries.
                      </p>
                    <div className="line"></div>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Login;
