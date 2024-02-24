

import React, { useState, useEffect } from "react";
import Datatable from "react-data-table-component";
import axios from "axios";
import EditModal from "./EditModal";
import ViewModal from "./ViewModal";
import Button from "react-bootstrap/Button";
import "../style/table.css";
import Filter from "./Filter";
import Dropdown from "react-bootstrap/Dropdown";
import AllocationModal from "./allocation/AllocationAdd";
import PaymentExpandibleView from "./PaymentAddmodel";
import PaymentDetailsModal from "./PaymentAddmodel"; 

// Import necessary FontAwesome components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import {
  faEllipsisV,
  faEdit,
  faEye,
  faTrash,
  faFilter,
  faSearch,
  faAlignJustify,
  faMoneyCheckDollar,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import DeleteModal from "./DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";

function Table() {
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [query, setQuery] = useState("");
  const [navRef, setNavRef] = useState(useRef()); // Store navRef in state
  const [showNavbar, setShowNavbar] = useState(false); // Add state for showing/hiding navbar
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);

  const handleClickAllocate = (row) => {
    setShowAllocationModal(true);
  };

    // Add a function to handle the Order button click
    const handleOrderClick = (enqId) => {
      setSelectedEnquiryId(enqId);
      setShowOrderModal(true);
    };

  const handleClickPayment = () => {
    setSelectedDatas();
    paymentModalShow();
  };

  const paymentModalShow = () => {
    setShowPaymentModal(true);
  };

  const handleClose = () => {
    setShowEditModal(false);
    setShowViewModal(false);
    setShowPaymentModal(false);
    setSelectedDatas(null);
  };

  const getDatas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders");
      setDatas(response.data.orders);
 
      setFilteredDatas(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (orgId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/orders/${orgId}`,
        updatedData
      );
      console.log("Update response:", response.data);
      getDatas(); // Refresh the data after update
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
    setSelectedDatas(row);
    setShowViewModal(true);
  };

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

  const totalCount = filteredDatas.length;

  const columns = [
    {
      name: "ORD ID",
      selector: (row) => <div>{`${row.OrderId}`}</div>,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => (
        <div style={{ textTransform: "capitalize" }}>
          {row.enqId ? `${row.enqId.fName} ${row.enqId.lName}` : ""}
        </div>
      ),
      sortable: true,
    },
    {
      name: "CONTACT DATE",
      selector: (row) => {
        const formattedDate = new Date(row.nextContactDate).toLocaleDateString(
          "en-US",
          {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }
        );
        return (
          <div style={{ textTransform: "capitalize" }}>{formattedDate}</div>
        );
      },
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <>
          <div style={{ display: "flex" }}>
            <Button
              className="btn btn-4 me-3 ps-0"
              onClick={() => handleClickAllocate(row)}
            >
              <FontAwesomeIcon icon={faAlignJustify} />
            </Button>

            <Button
              className="btn btn-1 me-3 ps-0"
              onClick={() => handleClickPayment(row)}
            >
              <FontAwesomeIcon icon={faMoneyCheckDollar} />
            </Button>
            <Dropdown style={{ padding: "0px 20px 0px 0px" }}>
              <Dropdown.Toggle
                m-5
                style={{
                  background: "none",
                  border: "none",
                  paddingLeft: "0",
                }}
              >
                <FontAwesomeIcon icon={faEllipsisV} className="btn-2" />
                {/* Plus Icon */}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ zIndex: "1000" }}>
                <Dropdown.Item onClick={() => handleViewDetails(row)}>
                  <FontAwesomeIcon icon={faEye} className="btn-2" /> View
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleEdit(row)}>
                  <FontAwesomeIcon icon={faEdit} className="btn-1" /> Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleClickDelete(row)}>
                  <FontAwesomeIcon icon={faTrash} className="btn-3" /> Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    getDatas();
  }, []);

  useEffect(() => {
    if (!Array.isArray(datas)) {
      console.error("Datas is not an array!");
      return;
    }

    const result = datas.filter((item) => {
      const nameMatch =
        item.enqId.fName.toLowerCase().includes(search.toLowerCase()) ||
        item.enqId.lName.toLowerCase().includes(search.toLowerCase()) ||
        (item.nextContactDate &&
          item.nextContactDate.toString().includes(search));

      const statusMatch = item.status
        .toLowerCase()
        .includes(filterValue.toLowerCase());
      // Apply both name and status filters
      return nameMatch && (filterValue === "" || statusMatch);
    });
    setFilteredDatas(result);
  }, [search, datas, filterValue]);

  const rowPreDisabled = (row) => row.disabled;


  const ExpandedComponent = ({ data }) => {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/collections/orders/${data._id}`
          );
          setOrderData(response.data.payment);
          console.log("2st", response.data);
        } catch (error) {
          console.error("Error fetching order data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [data._id]);
  
    if (loading) {
      return <div>Loading order data...</div>;
    }
    // Check if orderData is an array
    if ( !Array.isArray(orderData) || orderData.length === 0) {
      return <div  style={{ textAlign: 'center', padding: "10px" }}> No collection orders available for this item.</div>;
    }

    function capitalizeFirstLetter(str) {
      if (!str) return ""; // Handle null, undefined, and empty string cases
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
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
              RCPT ID
              </CTableHeaderCell>
              <CTableHeaderCell className="text-start ">
                ORDER ID
              </CTableHeaderCell>

              {/* <CTableHeaderCell className="text-start ">
                ENQUIRT TO
              </CTableHeaderCell> */}
              {/* <CTableHeaderCell className='text-start '>ORDER DETAILS</CTableHeaderCell> */}
              <CTableHeaderCell className="text-start ">
             PMT AMOUNT 
              </CTableHeaderCell>
              <CTableHeaderCell className="text-start ">
              PMT METHOD
              </CTableHeaderCell>
              <CTableHeaderCell className="text-start ">
              TXID
              </CTableHeaderCell>
              <CTableHeaderCell className="text-start ">
                ACTION
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
              {orderData.map((order, index) => (
                <CTableRow key={index} className="follow-up-table-row">
                  <CTableDataCell className="text-start">
                    {order.recieptId ? capitalizeFirstLetter(order.recieptId) : ""}
                  </CTableDataCell>
                  {/* Check if enqTo exists before accessing its properties */}
                  <CTableDataCell className="text-start">
                    {order.orders.OrderId ? capitalizeFirstLetter(order.orders.OrderId) : ""}
                  </CTableDataCell>
                  <CTableDataCell className="text-start">
                    {order.paymentAmount}
                  </CTableDataCell>
                  <CTableDataCell className="text-start">
                    {/* Check if remarks exists before accessing its properties */}
                    {order.paymentMethod
                      ? capitalizeFirstLetter(order.paymentMethod.substring(0, 13))
                      : ""}
                  </CTableDataCell>
                  <CTableDataCell className="text-start">
                    {/* Check if status exists before accessing its properties */}
                    {order.transactionId
                      ? capitalizeFirstLetter(order.transactionId.substring(0, 13))
                      : ""}
                  </CTableDataCell>
                  <CTableDataCell className="text-start">
                    <div>
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ color: "#6c6c6c", cursor: "pointer" }}
                        onClick={() => handleClickView()}
                      />
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
        </CTable>

        {/* <ViewExpModal
          showModal={showViewModal}
          handleClose={handleClose}
          selectedDatas={selectedDatas}
        /> */}
       </div>
    </>
    
    );
  };
  

  return (
    <>
      <ToastContainer />
      <div className="table-div" style={{ border: "none" }}>
        <Datatable
          className="table-data-div"
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
          subHeaderAlign="right"
          subHeaderComponent={
            <div className="table-top">
              <div className="left-div">
                <div className="search-input-container">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="search-icon mt-1"
                  />
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
                </div>
                <button
                  className="nav-btn nav-close-btn"
                  onClick={() => setShowNavbar(false)} // Close navbar on button click
                >
                  <FaTimes />
                </button>
              </div>
              <button
                className="nav-btn"
                onClick={() => setShowNavbar(!showNavbar)} // Toggle navbar on button click
              >
                <FaBars />
              </button>
            </div>
          }
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
      <PaymentExpandibleView
        showModal={showPaymentModal}
        handleClose={handleClose}
        selectedData={selectedDatas}
      />
      <AllocationModal
        show={showAllocationModal}
        handleClose={() => setShowAllocationModal(false)}
      />
      {/* Payment Details Modal */}
      <PaymentDetailsModal
        showModal={showPaymentModal}
        handleClose={handleClose}
        selectedData={selectedDatas}
  
      />
 
    </>
  );
}

export default Table;


