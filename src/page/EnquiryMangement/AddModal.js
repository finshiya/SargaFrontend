// import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import { Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import './style/addmodel.css';
// import './style/Tab.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AddModal = ({getDatas}) => {

//     const [toggle,setToggle] =useState(1);
//     const [currentTab, setCurrentTab] = useState(1);

// const capitalizeFirstLetter = (value) => {
//   return value
//     .toLowerCase()
//     .split(' ')
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// };

// const toggleTab = (index)=>{
// setToggle(index);
// setCurrentTab(index);
// }

// const [show, setShow] = React.useState(false);
//   const [enquirySources, setEnquirySources] = useState([]);
//   const [enquiryType,setEnquiryTpe] = useState([]);
//   const [enquiryMode,setEnquiryMode] = useState([]);
//   // const [enqTo, setEnqTo] = useState([]);
//   // const [supportType,setSupportType] =useState([]);
//   // const [leadQuality, setLeadQuality] = useState(['High', 'Medium', 'Low']);

// useEffect(()=>{

//   fetchEnquirySource();
//   fetchEnquiryType();
// fetchEnquiryMode();
// fetchEnquiryTo();
// fetchSupportType();
// },[])

//   const handleClose = () => {
//     setShow(false);
//     formik.resetForm(); // Reset Formik state when modal is closed
//   };
//   const handleShow = () => setShow(true);

//   const fetchEnquirySource = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/enquirySource');
//       const filteredEnquirySources = response.data.enquiriesSource.filter(source => !source.isDeleted)
//       .sort((a, b) => {
//         const nameA = a.name.toUpperCase();
//         const nameB = b.name.toUpperCase();
//         if (nameA < nameB) return -1;
//         if (nameA > nameB) return 1;
//         return 0;
//       });
//       setEnquirySources(filteredEnquirySources);
//       console.log(filteredEnquirySources);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//     const fetchEnquiryType = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/enquiryType');
//         const filteredEnquiryTypes = response.data.enquiryType.filter(type => !type.isDeleted)
//         .sort((a, b) => {
//           const nameA = a.name.toUpperCase();
//           const nameB = b.name.toUpperCase();
//           if (nameA < nameB) return -1; // Sort in alphabetical ascending order
//           if (nameA > nameB) return 1;
//           return 0;
//         });
//         setEnquiryTpe(filteredEnquiryTypes);
//         console.log(filteredEnquiryTypes);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//  const fetchEnquiryMode = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/enquiryMode');
//     const enquiriesMode = response.data.enquiryModes.filter(mode => !mode.isDeleted)
//      .sort((a, b) => {
//       const nameA = a.name.toUpperCase();
//       const nameB = b.name.toUpperCase();
//       if (nameA < nameB) return -1; // Sort in alphabetical ascending order
//       if (nameA > nameB) return 1;
//       return 0;
//     });;
//     setEnquiryMode(enquiriesMode);
//     console.log(enquiriesMode);
//   } catch (error) {
//     console.error(error);
//   }
// };

//  const fetchEnquiryTo = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/productService');
//     const filteredEnqTo = response.data.product.filter(to => !to.isDeleted)
//     .sort((a, b) => {
//       const nameA = a.name.toUpperCase();
//       const nameB = b.name.toUpperCase();
//       if (nameA < nameB) return -1; // Sort in alphabetical ascending order
//       if (nameA > nameB) return 1;
//       return 0;
//     });
//     setEnqTo(filteredEnqTo);
//     console.log(filteredEnqTo);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const fetchSupportType = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/supportType');
//     const filteredSupportType = response.data.supportType.filter(type => !type.isDeleted)
//     .sort((a, b) => {
//       const nameA = a.name.toUpperCase();
//       const nameB = b.name.toUpperCase();
//       if (nameA < nameB) return -1; // Sort in alphabetical ascending order
//       if (nameA > nameB) return 1;
//       return 0;
//     });
//     setSupportType(filteredSupportType);
//     console.log(filteredSupportType);
//   } catch (error) {
//     console.error(error);
//   }
// };

//   // Validation schema using Yup
//   const validationSchema = Yup.object({

//     enqMode: Yup.string().required('Enquiry Mode is required'),
//     enqSource: Yup.string().required('Enquiry Source is required'),
//     enqType: Yup.string().required('Enquiry Type is required'),
//     // supportType: Yup.string().required('Support Type is required'),
//     fName: Yup.string().required('First Name is required'),
//     lName: Yup.string().required('Last Name is required'),
//     wtsApp: Yup.string().required('WhatsApp No is required'),
//     // email: Yup.string().required('Email is required'),
//     mobile: Yup.string().required('Mobile is required'),
//     location: Yup.string().required('Location is required'),
//     pincode: Yup.string().required('Pincode is required'),
//     district: Yup.string().required('District is required'),
//     // enqTo: Yup.string().required('Enquiry To is required'),
//     // leadQuality: Yup.string().required('Lead Quality is required'),
//     state: Yup.string().required('State is required'),
//     // referenceId: Yup.string().required('Reference Id is required'),
//     remarks: Yup.string().required('Remarks are required'),
//     gender:Yup.string().required('Gender is required'),
//   });

//   const formik = useFormik({
//     initialValues: {

//       enqSource: '',
//       enqType: '',
//       enqMode: '',
//       pincode: '',
//       // supportType: '',
//       // enqDescp: '',
//       fName: '',
//       lName: '',
//       gender: '',
//       // email: '',
//       mobile: '',
//       wtsApp: '',
//       district: '',
//       location: '',
//       state: '',
//       status:"new",
//       // enqTo: '',
//       // leadQuality:'',
//       // referenceId: '',
//       remarks: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       try {
//         // Validate the newItem object using Formik and Yup
//         await validationSchema.validate(values, { abortEarly: false });

//         const response = await axios.post('http://localhost:3000/enquiries', values);
//         console.log('Response:', response.data);

//         getDatas();
//         toast.success('Data Added successfully!',{ autoClose: 1000 });

//         handleClose();

//       } catch (error) {
//         if (error.response) {
//           console.log('Error Response:', error.response.data);
//           console.log('Status Code:', error.response.status);
//         } else if (error.request) {
//           console.log('No response received from the server.');
//         } else {
//           console.log('Error:', error.message);
//           toast.error('Error creating data Please try again.',{ autoClose: 1000 });
//         }
//       }
//     },
//   });

//   const districts = [
//     { _id: '1', name: 'Kasaragod' },
//     { _id: '2', name: 'Kannur' },
//     { _id: '3', name: 'Wayanad' },
//     { _id: '4', name: 'Kozhikode' },
//     { _id: '5', name: 'Malappuram' },
//     { _id: '6', name: 'Palakkad' },
//     { _id: '7', name: 'Thrissur' },
//     { _id: '8', name: 'Ernakulam' },
//     { _id: '9', name: 'Idukki' },
//     { _id: '10', name: 'Kottayam' },
//     { _id: '11', name: 'Alappuzha' },
//     { _id: '12', name: 'Pathanamthitta' },
//     { _id: '13', name: 'Kollam' },
//     { _id: '14', name: 'Thiruvananthapuram' },
//   ];
//   const indianStates = [

//     'Kerala',

//   ];

//   // Sort the districts array in alphabetical order
//   const sortedDistricts = districts.sort((a, b) => a.name.localeCompare(b.name));

//   return (
//     <>
//       <ToastContainer />
//  <Button style={{ background: 'black', border: 'none', color: 'white', fontWeight: '600',marginBottom:'10px' }} onClick={handleShow}>
//         + New
//       </Button>
//       <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"  backdrop="static" centered  className="custom-modal"  >
//         <Modal.Header closeButton>
//           <Modal.Title className='modal-title'>Add Customer</Modal.Title>
//         </Modal.Header>
//         <Modal.Body >
//         <Container>
//         <Form onSubmit={formik.handleSubmit}>
//         <div className='App'>

//   <div className='box'>

//   <div className='tabs'>
//     <div  onClick={() => toggleTab(1)}  className={`${toggle === 1 ? 'tab active-tab' :'tab'}`}>
//     Basic  Details
//     </div>
//     <div  onClick={() => toggleTab(2)} style={{borderLeft:'none', borderRight:'none'}}  className={`${toggle === 2 ? 'tab active-tab' :'tab'}`}>
//     Additional Details
//     </div>
//     <div  onClick={() => toggleTab(3)}  className={`${toggle === 3 ? 'tab active-tab' :'tab'}`}>
//     General Details
//     </div>
//   </div>
// </div>

// <div className='contents'>
//     <div className={`${toggle === 1 ? 'content active-content' :'content'}`}>

//    <Row>

//            <Col md={6}>
//             <Form.Group className="mb-3" controlId="fName">
//             <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>First Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="First Name"
//                 name="fName"
//                 value={formik.values.fName}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}

//               />
//              {formik.touched.fName && formik.errors.fName ? (
//                 <div className="error" style={{color:'red'}}>{formik.errors.fName}</div>
//               ) : null}

//             </Form.Group>
//             </Col>
//              <Col md={6}>
//             <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>Last Name</Form.Label>
//             <Form.Group className="mb-3" controlId="lName">
//               <Form.Control
//                 type="text"
//                 placeholder="Last Name"
//                 name="lName"
//                 value={formik.values.lName}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}

//               />
//            {formik.touched.lName && formik.errors.lName ? (
//                 <div className="error" style={{color:'red'}}>{formik.errors.lName}</div>
//               ) : null}

//             </Form.Group>
//             </Col>

//                <Col md={6}>
//               <Form.Group className="mb-3" controlId="mobile">
//               <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>Mobile</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Mobile"
//                   name="mobile"
//                   value={formik.values.mobile}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                {formik.touched.mobile && formik.errors.mobile ? (
//                 <div className="error" style={{color:'red'}}>{formik.errors.mobile}</div>
//               ) : null}

//               </Form.Group>

//               </Col>

//               <Col md={6}>
//               <Form.Group className="mb-3" controlId="wtsApp">
//               <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>WhatsApp</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="WhatsApp "
//                   name="wtsApp"
//                   value={formik.values.wtsApp}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                {formik.touched.wtsApp && formik.errors.wtsApp ? (
//                 <div className="error" style={{color:'red'}}>{formik.errors.wtsApp}</div>
//               ) : null}

//               </Form.Group>

//               </Col>

//               <Col md={6}>
//               <Form.Group className="mb-3" controlId="email">
//               <Form.Label  style={{fontSize:'14px'}}>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Email"
//                   name="email"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {/* {formik.touched.email && formik.errors.email ? (
//                 <div className="error" style={{color:'red'}}>{formik.errors.email}</div>
//               ) : null} */}

//              </Form.Group>
//                </Col>
//                <Col md={6}>

//          {/* Enquiry Type Dropdown */}
//          <Form.Group className="mb-3" controlId="enqType">
//          <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>Customer Type</Form.Label>
//          <Form.Control
//            as="select"
//            name="enqType"
//            value={formik.values.enqType}
//            onChange={formik.handleChange}
//            onBlur={formik.handleBlur}
//           className={`form-select ${formik.touched.enqType && formik.errors.enqType ? (
//            <div className="error" style={{color:'red'}}>{formik.errors.referenceId}</div>
//          ) : null}`}
//          >
//            <option value="" disabled selected >
//            Customer Type
//            </option>
//            {enquiryType.map(type => (
//              <option key={type._id} value={type._id}>
//                {capitalizeFirstLetter (type.name)}
//              </option>
//            ))}
//          </Form.Control>
//          {formik.touched.enqType && formik.errors.enqType ? (
//            <div className="error" style={{color:'red'}}>{formik.errors.enqType}</div>
//          ) : null}
//        </Form.Group>
// </Col>

//             </Row>
//     </div>

//     <div className={`${toggle === 2 ? 'content active-content' :'content'}`}>
//     <Row>

//     <Col md={6}>
//                 <Form.Group className="mb-3" controlId="state">
//                 <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>State</Form.Label>
//                 <Form.Control
//   as="select"
//   name="state"
//   value={formik.values.state}
//   onChange={formik.handleChange}
//   onBlur={formik.handleBlur}
//   className={`form-select ${formik.touched.enqType && formik.errors.enqType ? (
//     <div className="error" style={{color:'red'}}>{formik.errors.referenceId}</div>
//   ) : null}`}
// >
//   <option value="" disabled>
//     Select State
//   </option>
//   {indianStates.map(state => (
//     <option key={state} value={state}>
//       {state}
//     </option>
//   ))}
// </Form.Control>

//               {formik.touched.state && formik.errors.state ? (
//                 <div className="error" style={{color:'red'}}>{formik.errors.state}</div>
//               ) : null}

//               </Form.Group>
//            </Col>

//            <Col md={6}>
//         <Form.Group className="mb-3" controlId="district">
//           <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>District</Form.Label>
//           <Form.Select
//             name="district"
//             value={formik.values.district}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           >
//             <option value="" label="Select a District" />
//             {districts.map(district => (
//               <option key={district._id} value={district.name}>
//                 {district.name}
//               </option>
//             ))}
//           </Form.Select>
//           {formik.touched.district && formik.errors.district ? (
//             <div className="error" style={{ color: 'red' }}>{formik.errors.district}</div>
//           ) : null}
//         </Form.Group>
//       </Col>

//    <Col md={6}>
//   <Form.Group className="mb-3" controlId="location">
//   <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>Location / City</Form.Label>
//     <Form.Control
//       type="text"
//       placeholder="Location / City"
//       name="location"
//       value={formik.values.location}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//     />
//    {formik.touched.location && formik.errors.location ? (
//     <div className="error" style={{color:'red'}}>{formik.errors.location}</div>
//   ) : null}
//   </Form.Group>
//   </Col>

//   <Col md={6}>

//   <Form.Group className="mb-3" controlId="landMark">
//   <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>Land Mark</Form.Label>
//     <Form.Control
//       type="text"
//       placeholder="Land Mark"
//       name="landMark"
//       value={formik.values.landMark}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//     />
//    {formik.touched.landMark && formik.errors.landMark ? (
//     <div className="error" style={{color:'red'}}>{formik.errors.landMark}</div>
//   ) : null}
//   </Form.Group>
//   </Col>

//   <Col md={6}>
//   <Form.Group className="mb-3" controlId="pincode">
//   <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>Pincode</Form.Label>
//     <Form.Control
//       type="text"
//       placeholder="Pincode"
//       name="pincode"
//       value={formik.values.pincode}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//     />
//    {formik.touched.location && formik.errors.pincode ? (
//     <div className="error" style={{color:'red'}}>{formik.errors.pincode}</div>
//   ) : null}
//   </Form.Group>
//   </Col>

//   <Col md={6}>
//   <Form.Group className="mb-3" controlId="gender">
//   <Form.Label className='mandatory-label' style={{ fontSize: '14px',marginTop:'2px'}}>Gender</Form.Label>
//   <div className="radio-group">
//       <Form.Check
//         type="radio"
//         label="Male"
//         name="gender"
//         id="male"
//         value="Male"
//         checked={formik.values.gender === 'Male'}
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//       />

//       <Form.Check
//         type="radio"
//         label="Female"
//         name="gender"
//         id="female"
//         value="Female"
//         checked={formik.values.gender === 'Female'}
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//       />
//         <Form.Check
//         type="radio"
//         label="Others"
//         name="gender"
//         id="other"
//         value="other"
//         checked={formik.values.gender === 'other'}
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//       />
//     </div>

//     {formik.touched.gender && formik.errors.gender && (
//       <div className="error mt-3" style={{ color: 'red' }}>
//         {formik.errors.gender}
//       </div>
//     )}
//   </Form.Group>
// </Col>

// </Row>

//     </div>

//     <div className={`${toggle === 3 ? 'content active-content' :'content'}`}>
//       <Row>
//        <Col md={6}>
//  <Form.Label style={{fontSize:'14px'}}>Reference Id</Form.Label>
//             <Form.Group className="mb-3" controlId="referenceId">

//               <Form.Control
//                 type="text"
//                 placeholder="Reference Id"
//                 name="referenceId"
//                 value={formik.values.referenceId}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}

//               />
//                {/* {formik.touched.referenceId && formik.errors.referenceId ? (
//                 <div className="error" style={{color:'red'}}>{formik.errors.referenceId}</div>
//               ) : null} */}

//              </Form.Group>

//             </Col>
//        <Col md={6}>
//   {/* Enquiry Source Dropdown */}
//   <Form.Group className="mb-3" controlId="enqSource">
//   <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>Enquiry Source</Form.Label>
//     <Form.Control
//       as="select"
//       name="enqSource"
//       value={formik.values.enqSource}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       className={`form-select ${formik.touched.enqSource && formik.errors.enqSource ? (
//         <div className="error" style={{color:'red'}}>{formik.errors.referenceId}</div>
//       ) : null}`}
//     >
//       <option value="" disabled>
//         Enquiry Source
//       </option>
//       {enquirySources.map(source => (
//         <option key={source._id} value={source._id}>
//           {capitalizeFirstLetter (source.name)}
//         </option>
//       ))}
//     </Form.Control>
//     {formik.touched.enqSource && formik.errors.enqSource ? (
//                 <div className="error" style={{color:'red'}}>{formik.errors.enqSource}</div>
//               ) : null}
//   </Form.Group>
// </Col>

// </Row>
// <Row>
// <Col md={6}>
//                {/* Enquiry Mode Dropdown */}
//                  <Form.Group className="mb-3" controlId="enqMode">
//                  <Form.Label className='mandatory-label' style={{fontSize:'14px'}}>Enquiry Mode</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="enqMode"
//                 value={formik.values.enqMode}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={`form-select ${formik.touched.enqMode && formik.errors.enqMode ? (
//                   <div className="error" style={{color:'red'}}>{formik.errors.referenceId}</div>
//                 ) : null}`}

//               >
//                 <option value="" disabled>
//                    Enquiry Mode
//                 </option>
//                 {enquiryMode.map(mode => (
//                   <option key={mode._id} value={mode._id}>
//                     {capitalizeFirstLetter (mode.name)}
//                   </option>
//                 ))}
//               </Form.Control>
//               {formik.touched.enqMode && formik.errors.enqMode ? (
//                 <div className="error" style={{color:'red'}}>{formik.errors.enqMode}</div>
//               ) : null}
//     </Form.Group>
//     </Col>

// </Row>

//     </div>

// </div>
//     </div>
//     </Form>
//     </Container>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button style={{ background: 'none', color: '#000000', border: '1px solid #000000' }} onClick={handleClose}>
//             Close
//           </Button>
//           <Button style={{ background: '#000000', border: 'none', fontWeight: '600' }}
//           onClick={formik.submitForm}    disabled={currentTab !== 3} >
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>

//     </>
//   )
// }

// export default AddModal

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style/addmodel.css";
import "./style/Tab.css";
import { toast } from "react-toastify";

import { showSuccessAlert, showFailsAlert } from "../tostify/toastifyAlert";

const AddModal = ({ getDatas }) => {
  const [toggle, setToggle] = useState(1);
  const [currentTab, setCurrentTab] = useState(1);

  const capitalizeFirstLetter = (value) => {
    return value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const toggleTab = (index) => {
    setToggle(index);
    setCurrentTab(index);
  };

  const [show, setShow] = React.useState(false);
  const [enquirySources, setEnquirySources] = useState([]);
  const [enquiryType, setEnquiryTpe] = useState([]);
  const [enquiryMode, setEnquiryMode] = useState([]);
  // const [supportType,setSupportType] =useState([]);
  // const [leadQuality, setLeadQuality] = useState(["High", "Medium", "Low"]);

  useEffect(() => {
    fetchEnquirySource();
    fetchEnquiryType();
    fetchEnquiryMode();
    // fetchEnquiryTo();
    // fetchSupportType();
  }, []);

  const handleClose = () => {
    setShow(false);
    formik.resetForm(); // Reset Formik state when modal is closed
  };
  const handleShow = () => setShow(true);

  const fetchEnquirySource = async () => {
    try {
      const response = await axios.get("http://localhost:3000/enquirySource");
      const filteredEnquirySources = response.data.enquiriesSource
        .filter((source) => !source.isDeleted)
        .sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1;
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
          if (nameA < nameB) return -1;
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
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      setEnquiryMode(enquiriesMode);
      console.log(enquiriesMode);
    } catch (error) {
      console.error(error);
    }
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    enqSource: Yup.string().required("Enquiry Source is required"),
    enqType: Yup.string().required("Customer Type is required"),
    enqMode: Yup.string().required("Enquiry Mode is required"),
    fName: Yup.string().required("First Name is required"),
    lName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string().required("Mobile is required"),
    wtsApp: Yup.string().required("Whatsapp is required"),
    pincode: Yup.string().required("Pincode is required"),
    district: Yup.string().required("District is required"),
    location: Yup.string().required("Location is required"),
    state: Yup.string().required("State is required"),
    // leadQuality: Yup.string().required('Lead Quality is required'),
    referenceId: Yup.string().required("Reference Id is required"),
    address: Yup.string().required("Address is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const formik = useFormik({
    initialValues: {
      enqSource: "",
      enqType: "",
      enqMode: "",
      fName: "",
      lName: "",
      email: "",
      mobile: "",
      wtsApp: "",
      district: "",
      location: "",
      state: "",
      // leadQuality: '',
      landMark: "",
      pincode: "",
      referenceId: "",
      address: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Validate the newItem object using Formik and Yup
        await validationSchema.validate(values, { abortEarly: false });

        const response = await axios.post(
          "http://localhost:3000/enquiries",
          values
        );
        console.log("Response:", response.data);

        getDatas();
        showSuccessAlert("Successfully Added");
        // toast.success("Successfully Added");

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

  const districts = [
    { _id: "1", name: "Kasaragod" },
    { _id: "2", name: "Kannur" },
    { _id: "3", name: "Wayanad" },
    { _id: "4", name: "Kozhikode" },
    { _id: "5", name: "Malappuram" },
    { _id: "6", name: "Palakkad" },
    { _id: "7", name: "Thrissur" },
    { _id: "8", name: "Ernakulam" },
    { _id: "9", name: "Idukki" },
    { _id: "10", name: "Kottayam" },
    { _id: "11", name: "Alappuzha" },
    { _id: "12", name: "Pathanamthitta" },
    { _id: "13", name: "Kollam" },
    { _id: "14", name: "Thiruvananthapuram" },
  ];

  // Sort the districts array in alphabetical order
  // const sortedDistricts = districts.sort((a, b) =>
  //   a.name.localeCompare(b.name)
  // );

  // console.log(sortedDistricts);

  return (
    <>
      <Button
        style={{
          background: "black",
          border: "none",
          color: "white",
          fontWeight: "600",
          marginBottom: "10px",
        }}
        onClick={handleShow}
      >
        + New
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Add Enquiry</Modal.Title>
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
                      style={{ borderLeft: "none", borderRight: "none" }}
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
                        {/* Enquiry Type Dropdown */}
                        <Form.Group className="mb-3" controlId="enqType">
                          <Form.Label
                            className="mandatory-label"
                            style={{ fontSize: "14px" }}
                          >
                            Customer Type
                          </Form.Label>
                          <Form.Control
                            as="select"
                            name="enqType"
                            value={formik.values.enqType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-select ${
                              formik.touched.enqType &&
                              formik.errors.enqType ? (
                                <div className="error" style={{ color: "red" }}>
                                  {formik.errors.enqType}
                                </div>
                              ) : null
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
                          <Form.Label
                            className="mandatory-label"
                            style={{ fontSize: "14px" }}
                          >
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email"
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
                          <Form.Label
                            className="mandatory-label"
                            style={{ fontSize: "14px" }}
                          >
                            First Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="First Name"
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
                        <Form.Label
                          className="mandatory-label"
                          style={{ fontSize: "14px" }}
                        >
                          Last Name
                        </Form.Label>
                        <Form.Group className="mb-3" controlId="lName">
                          <Form.Control
                            type="text"
                            placeholder="Last Name"
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
                          <Form.Label
                            className="mandatory-label"
                            style={{ fontSize: "14px" }}
                          >
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
                          <Form.Label
                            className="mandatory-label"
                            style={{ fontSize: "14px" }}
                          >
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
                          <Form.Label
                            className="mandatory-label"
                            style={{ fontSize: "14px" }}
                          >
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
                          <Form.Label
                            className="mandatory-label"
                            style={{ fontSize: "14px" }}
                          >
                            District
                          </Form.Label>
                          <Form.Select
                            name="district"
                            value={formik.values.district}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="" label="Select a District" />
                            {districts.map((district) => (
                              <option key={district._id} value={district.name}>
                                {district.name}
                              </option>
                            ))}
                          </Form.Select>
                          {formik.touched.district && formik.errors.district ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.district}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="location">
                          <Form.Label
                            className="mandatory-label"
                            style={{ fontSize: "14px" }}
                          >
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
                          Land Mark
                        </Form.Label>
                        <Form.Group className="mb-3" controlId="landMark">
                          <Form.Control
                            type="text"
                            placeholder="Land Mark"
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
                          Pincode
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
                          <Form.Label
                            className="mandatory-label"
                            style={{ fontSize: "14px", marginTop: "2px" }}
                          >
                            Gender
                          </Form.Label>
                          <div className="radio-group">
                            <Form.Check
                              type="radio"
                              label="Male"
                              name="gender"
                              id="male"
                              value="Male"
                              checked={formik.values.gender === "Male"}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />

                            <Form.Check
                              type="radio"
                              label="Female"
                              name="gender"
                              id="female"
                              value="Female"
                              checked={formik.values.gender === "Female"}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <Form.Check
                              type="radio"
                              label="Others"
                              name="gender"
                              id="other"
                              value="other"
                              checked={formik.values.gender === "other"}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </div>

                          {formik.touched.gender && formik.errors.gender && (
                            <div
                              className="error mt-3"
                              style={{ color: "red" }}
                            >
                              {formik.errors.gender}
                            </div>
                          )}
                        </Form.Group>
                      </Col>

                      {/* <Col md={6}>
                        <Form.Group className="mb-3" controlId="leadQuality">
                          <Form.Label
                            className="mandatory-label"
                            style={{ fontSize: "14px" }}
                          >
                            Lead Quality
                          </Form.Label>
                          <Form.Control
                            as="select"
                            name="leadQuality"
                            value={formik.values.leadQuality}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-select ${
                              formik.touched.leadQuality &&
                              formik.errors.leadQuality ? (
                                <div className="error" style={{ color: "red" }}>
                                  {formik.errors.referenceId}
                                </div>
                              ) : null
                            }`}
                          >
                            <option value="" disabled>
                              Lead Quality
                            </option>
                            {leadQuality.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Control>
                          {formik.touched.leadQuality &&
                          formik.errors.leadQuality ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.leadQuality}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col> */}

                      <Col md={12}>
                        <Form.Label
                          className="mandatory-label"
                          style={{ fontSize: "14px" }}
                        >
                          Address
                        </Form.Label>
                        <Form.Group className="mb-3" controlId="address">
                          <Form.Control
                            as="textarea"
                            placeholder="Address"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ height: "46px", paddingTop: "0" }}
                          />
                          {formik.touched.address && formik.errors.address ? (
                            <div className="error" style={{ color: "red" }}>
                              {formik.errors.address}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row></Row>
                    <Row></Row>
                  </div>

                  <div
                    className={`${
                      toggle === 3 ? "content active-content" : "content"
                    }`}
                  >
                    <Row>
                      <Col md={6}>
                        <Form.Label style={{ fontSize: "14px" }}>
                          Reference Id
                        </Form.Label>
                        <Form.Group className="mb-3" controlId="referenceId">
                          <Form.Control
                            type="text"
                            placeholder="Reference Id"
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
                        {/* Enquiry Source Dropdown */}
                        <Form.Group className="mb-3" controlId="enqSource">
                          <Form.Label
                            className="mandatory-label"
                            style={{ fontSize: "14px" }}
                          >
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
                              formik.errors.enqSource ? (
                                <div className="error" style={{ color: "red" }}>
                                  {formik.errors.referenceId}
                                </div>
                              ) : null
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
                    </Row>
                    <Row>
                      <Col md={6}>
                        {/* Enquiry Mode Dropdown */}
                        <Form.Group className="mb-3" controlId="enqMode">
                          <Form.Label
                            className="mandatory-label"
                            style={{ fontSize: "14px" }}
                          >
                            Enquiry Mode
                          </Form.Label>
                          <Form.Control
                            as="select"
                            name="enqMode"
                            value={formik.values.enqMode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-select ${
                              formik.touched.enqMode &&
                              formik.errors.enqMode ? (
                                <div className="error" style={{ color: "red" }}>
                                  {formik.errors.referenceId}
                                </div>
                              ) : null
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
                    <Row></Row>
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
            disabled={currentTab !== 3}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddModal;
