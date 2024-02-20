import React, { useState, useEffect } from "react";
import Datatable, { ExpanderComponentProps } from "react-data-table-component";
import axios from "axios";
import EditModal from "./EditModal";
import ViewModal from "./ViewModal";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
// import Tooltip from '@mui/material/Tooltip';
import "../style/table.css";
import AddModal from "./AddModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewExpModal from "../EnquiryMangement/ExpandibleView";
import PaymentExpandibleView from "./PaymentAddmodel";

import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faBox,
  faTrash,
  faFilter,
  faSearch,
  faUserClock,
  faMoneyCheckDollar,
  faCalendar,
  faReply,
  faBell,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "./DeleteModal";
import FollowUpModal from "./FollowUpAdd";
import Filter from "./Filter";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";

function Table() {
  const [datas, setDatas] = useState([]);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(null); 
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [leadQuality, setLeadQuality] = useState(["High", "Medium", "Low"]);
  const [orderData, setOrderData] = useState([]); //flwup
  const [filterValue, setFilterValue] = useState("");
  const [query, setQuery] = useState("");
  const navRef = useRef();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const [showPaymentModal, setShowPaymentModal] = useState(false);
  // const [expandedRow, setExpandedRow] = useState(null);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleClose = () => {
    setShowEditModal(false);
    setShowViewModal(false);
    setSelectedDatas(null);
  };

  // useEffect(()=>{

  //   OverlayTrigger, Tooltip
  // },[])

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;

  const getDatas = async () => {
    try {
      const { customer } = (await axios.get("http://localhost:3000/customers"))
        .data;
      const filteredData = customer
        .map(
          ({
            fName,
            lName,
            gender,
            district,
            location,
            state,
            leadQuality,
            remarks,
            custDescp,
            ...rest
          }) => ({
            ...rest,
            fName: capitalize(fName),
            lName: capitalize(lName),
            gender: capitalize(gender),
            district: capitalize(district),
            location: capitalize(location),
            state: capitalize(state),
            leadQuality: capitalize(leadQuality),
            remarks: capitalize(remarks),
            custDescp: capitalize(custDescp),
          })
        )
        .filter(
          ({ isDeleted }) => isDeleted === false || isDeleted === undefined
        );

      setDatas(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  const handleUpdate = async (orgId, updatedData) => {
    try {
      console.log("Updating data:", orgId, updatedData);
      const response = await axios.put(
        `http://localhost:3000/customers/${orgId}`,
        updatedData
      );

      getDatas();
      toast.success("Data updated successfully!", { autoClose: 1000 });
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data. Please try again.", {
        autoClose: 1000,
      });
    }
  };

  const handleEdit = (row) => {
    setSelectedDatas(row);
    setShowEditModal(true);
  };

  const handleViewDetails = (row) => {
    console.log("Selected Row:", row);
    setSelectedDatas(row);
    setShowViewModal(true);
  };

  //DELETE MODAL

  const deleteModalClose = () => {
    setDeleteModal(false);
  };

  const deleteModalShow = () => {
    setDeleteModal(true);
  };

  const handleClickDelete = (row) => {
    setSelectedId(row._id);
    deleteModalShow();
  };

  // Add a function to handle the Order button click
  const handleOrderClick = (enqId) => {
    setSelectedEnquiryId(enqId);
    setShowOrderModal(true);
  };

  const isExpandableRow = (row) => {
    return Array.isArray(row.orderData) && row.orderData.length > 0;
  };

  const totalCount = filteredDatas ? filteredDatas.length : 0;

  const columns = [
    {
      name: "CUST NO",
      selector: (row) => row.enqNo,
      sortable: true,
    },

    {
      name: "NAME",
      selector: (row) => `${row.fName} ${row.lName}`,
    },

    {
      name: "MOBILE",
      selector: (row) => row.mobile,
    },

    {
      name: "ACTIONS",
      cell: (row) => (
        <>
          <div>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-view">View Details</Tooltip>}
            >
              <Button
                className="btn btn-2 me-3 ps-0"
                onClick={() => handleViewDetails(row)}
              >
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-edit">Edit</Tooltip>}
            >
              <Button
                className="btn btn-1 me-3 ps-0"
                onClick={() => handleEdit(row)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-delete">Delete</Tooltip>}
            >
              <Button
                className="btn btn-3 me-3 ps-0"
                onClick={() => handleClickDelete(row)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-order">Order</Tooltip>}
            >
              <Button
                className="btn btn-2 me-3 ps-0"
                onClick={() => handleOrderClick(row._id)}
              >
                <FontAwesomeIcon icon={faBox} />
              </Button>
            </OverlayTrigger>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (!Array.isArray(datas)) {
      console.error("Datas is not an array!", datas);
      return;
    }

    const result = datas.filter((item) => {
      const nameMatch =
        (item.fName &&
          item.fName.toLowerCase().includes(search.toLowerCase())) ||
        (item.lName &&
          item.lName.toLowerCase().includes(search.toLowerCase())) ||
        (item.email &&
          item.email.toLowerCase().includes(search.toLowerCase())) ||
        (item.enqNo &&
          item.email.toLowerCase().includes(search.toLowerCase())) ||
        (item.mobile && item.mobile.toString().includes(search));

      const statusMatch =
        item.status &&
        item.status.toLowerCase().includes(filterValue.toLowerCase());
      const enqNoMatch = item.enqNo && item.enqNo.toString().includes(search);
      const dateMatch =
        startDate &&
        item.created_at >= startDate &&
        endDate &&
        item.created_at <= endDate;

      return (
        (nameMatch || enqNoMatch) &&
        (filterValue === "" || statusMatch) &&
        (!startDate || !endDate || dateMatch)
      );
    });
    setFilteredDatas(result);
  }, [search, datas, filterValue, startDate, endDate]);

  const handleDateFilter = () => {
    // Implement date filter logic here
    // Update the filteredDatas state based on the date range
    // You may use the startDate and endDate values to filter the data accordingly
    // Example: Fetch data from API with date range parameters or filter existing data in-memory
  };

  const rowPreDisabled = (row) => row.disabled;

  const ExpandedComponent = ({ data }) => {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    //  const [selectedId, setSelectedId] = useState(null);
    const [orderDataPresent, setOrderDataPresent] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/orders/enqId/${data._id}`
          );
          setOrderData(response.data.orders);
        } catch (error) {
          console.error("Error fetching order data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [data._id]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/orders/enqTo/${data._id}`
          );
          setOrderData(response.data.orders);
          console.log("sarga", response.data.orders);
        } catch (error) {
          console.error("Error fetching order data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [data._id]);

    useEffect(() => {
      setOrderDataPresent(orderData.length > 0);
  }, [orderData]);

    if (orderData.length === 0) {
      return null;
    }

    // const handleClickPayment = () => {
    //   setSelectedDatas();
    //   paymentModalShow();
    // };

    const handleClose = () => {
      setShowViewModal(false);
      setShowPaymentModal(false);
      setSelectedDatas(null);
    };

    const viewModalShow = () => {
      setShowViewModal(true);
    };

    const handleClickView = () => {
      setSelectedDatas();
      viewModalShow();
    };

    return (
      <>
        <div
          className="view-exp-modal"
          style={{ margin: "20px", padding: "20px" }}
        >
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-start ">
                  ORDER ID
                </CTableHeaderCell>
                {/* <CTableHeaderCell className="text-start ">
                  ENQUIRT TO
                </CTableHeaderCell> */}
                {/* <CTableHeaderCell className='text-start '>ORDER DETAILS</CTableHeaderCell> */}
                <CTableHeaderCell className="text-start ">
                  DELIVERABLE DATE
                </CTableHeaderCell>
                <CTableHeaderCell className="text-start ">
                  REMARKS
                </CTableHeaderCell>
                <CTableHeaderCell className="text-start ">
                  STATUS
                </CTableHeaderCell>
                <CTableHeaderCell className="text-start ">
                  ACTION
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {orderData.map((orders, index) => (
                <CTableRow key={index} className="follow-up-table-row">
                  <CTableDataCell className="text-start">
                    {capitalizeFirstLetter(orders.OrderId)}
                  </CTableDataCell>
                
                  <CTableDataCell className="text-start">
                    {orders.nextContactDate}
                  </CTableDataCell>
                  <CTableDataCell className="text-start">
                    {capitalizeFirstLetter(orders.remarks.substring(0, 13))}
                  </CTableDataCell>
                  <CTableDataCell className="text-start">
                    {capitalizeFirstLetter(orders.status.substring(0, 13))}
                  </CTableDataCell>
                  <CTableDataCell className="text-start">
                    <div>
                      {/* <Tooltip title="Add" placement="top-start"> */}
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ color: "#6c6c6c", cursor: "pointer" }}
                        onClick={() => handleClickView()}
                      />
                      {/* </Tooltip> */}
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          <ViewExpModal
            showModal={showViewModal}
            handleClose={handleClose}
            selectedDatas={selectedDatas}
          />
          {/* <PaymentExpandibleView showModal={showPaymentModal} handleClose={handleClose} selectedData={selectedData}  /> */}
        </div>
      </>
    );
  };
  function capitalizeFirstLetter(str) {
    if (!str) return ""; // Handle null, undefined, and empty string cases
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <ToastContainer />
      <div className="table-div">
        <Datatable
          className="table-data-div"
          title="Customers"
          columns={columns}
          data={filteredDatas}
          pagination
          paginationPerPage={5}
          rowsPerPageOptions={[]}
          fixedHeader
          fixedHeaderScrollHeight="320px"
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          subHeader
          subHeaderComponent={
            // <button>hello</button>

            <div className="table-top">
              <div className="left-div">
                <div>
                  <AddModal getDatas={getDatas} />
                </div>
                <div className="search-input-container">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-35 search-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div ref={navRef} className="right-div">
                <div className="inner-div">
                  <div className="count-div me-2">
                    <FontAwesomeIcon
                      icon={faFilter}
                      style={{ marginRight: "5px" }}
                    />
                    <span> Results: {totalCount}</span>
                  </div>
                  <div>
                    <Filter
                      onFilter={(newQuery, newFilterValue) => {
                        setQuery(newQuery);
                        setFilterValue(newFilterValue);
                      }}
                    />
                  </div>
                  {/* <div className="date-range-container">
                <label htmlFor="startDate">From:</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate || ''}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor="endDate">To:</label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate || ''}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={
                  handleDateFilter}>Apply</button>
              </div> */}
                </div>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                  <FaTimes />
                </button>
              </div>
              <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
              </button>
            </div>
          }
          subHeaderAlign="right"
          expandableRows={(row) =>
            row._id === selectedDatas?._id && row.orderData?.length > 0
          }
          expandableRowsComponent={(props) => (
            <ExpandedComponent {...props} data={props.data} />
          )}
          expandableRowDisabled={rowPreDisabled}
        />
      </div>
      <EditModal
        showModal={showEditModal}
        handleClose={handleClose}
        selectedDatas={selectedDatas}
        handleUpdate={handleUpdate}
        leadQuality={leadQuality}
      />
      <ViewModal
        showModal={showViewModal}
        handleClose={handleClose}
        selectedDatas={selectedDatas}
      />
      <DeleteModal
        deleteclose={deleteModalClose}
        dlt={deleteModal}
        id={selectedId}
        getDatas={getDatas}
      />
      {showOrderModal && (
        <FollowUpModal
          selectedEnquiryId={selectedEnquiryId}
          showOrderModal={showOrderModal}
          setShowOrderModal={setShowOrderModal}
          getDatas={getDatas}
          enqId={selectedEnquiryId}

       
        />
      )}{" "}
    </>
  );
}

export default Table;
