import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Datatable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faTrash,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import ViewModal from "./ViewModal";

import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

import "../style/table.css";

function Table() {
  const [datas, setDatas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const navRef = useRef();
  const [selectedId, setSelectedId] = useState(null);

//   const fetchPayments = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/collctions");
//       setDatas(response.data.Payments);
//     } catch (error) {
//       console.error(error);
//     }
//   };
const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/collctions');
      setDatas(response.data.Payments);
      setFilteredDatas(response.data.Payments);
    } catch (error) {
      console.error(error);
    }
  };

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleUpdate = async (Dataid, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/payments/${Dataid}`, updatedData);

      toast.success("Data successfully Updated", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        className: "toast-message",
      });

      getDatas();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleEdit = (row) => {
    setSelectedDatas(row);
    setShowEditModal(true);
  };

  // const handleEdit = (row) => {
  //   setSelectedDatas(row);
  //   setShowEditModal(true);
  // };

  const handleClose = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setSelectedDatas(null);
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

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    if (!Array.isArray(datas)) {
      console.error("Datas is not an array!");
      return;
    }

    const result = datas.filter((item) => {
      const paymentAmount = item.paymentAmount
        ? item.paymentAmount.toString()
        : "";
      const nameMatch =
        paymentAmount.toLowerCase().includes(search.toLowerCase()) ||
        (item.paymentMethod &&
          item.paymentMethod.toLowerCase().includes(search.toLowerCase())) ||
        (item.transactionId &&
          item.transactionId.toLowerCase().includes(search.toLowerCase()));
      const statusMatch =
        item.status &&
        item.status.toLowerCase().includes(filterValue.toLowerCase());
      return nameMatch && (filterValue === "" || statusMatch);
    });

    setFilteredDatas(result);
  }, [search, datas, filterValue]);

  const totalCount = filteredDatas.length;

  const handleViewDetails = (row) => {
    setSelectedDatas(row);
    setShowViewModal(true);
  };

  const columns = [
    // {
    //     name: "ORD ID",
    //     selector: (row) =><div>{row.followUpData.OrderId}</div>,
    //     sortable: true,
    //   },
    {
      name: "RECPT ID",
      selector: (row) => <div>{`${row.recieptId}`}</div>,
      sortable: true,
    },
    {
        name: "PYMT  METHOD",
        selector: (row) =><div>{row.paymentMethod}</div>,
        sortable: true,
      },
    {
        name: "TXN ID",
        selector: (row) =><div>{row.transactionId}</div>,
        sortable: true,
      },
    // {
    //   name: "ORD ID",
    //   selector: 'followUpData.OrderId',
    // },
    // {
    //   name: "PYMT  METHOD",
    //   selector: "paymentMethod",
    // },
    // {
    //   name: "TXN ID",
    //   selector: "transactionId",
    // },
    // {
    //   name: "PYMT AMOUNT",
    //   selector: "paymentAmount",
    // },
    {
        name: "PYMT AMOUNT",
        selector: (row) =><div>{row.paymentAmount}</div>,
        sortable: true,
      },
    {
      name: "ACTIONS",
      cell: (row) => (
        <>
          <Button
            className="btn btn-2 me-3 ps-0"
            onClick={() => handleViewDetails(row)}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <button className="btn btn-1 me-3 ps-0">
            <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(row)} />
          </button>
          <Button
            className="btn btn-3 me-3 ps-0"
            onClick={() => handleClickDelete(row)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="table-div">
        <Datatable
          title="Collections"
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
            <div className="table-top">
              <div className="left-div">
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
        />
      </div>
      <ViewModal
        showModal={showViewModal}
        handleClose={handleClose}
        selectedDatas={selectedDatas}
      />
      <DeleteModal
        deleteclose={deleteModalClose}
        dlt={deleteModal}
        id={selectedId}
        getDatas={fetchPayments}
      />
      <EditModal
        showModal={showEditModal}
        handleClose={handleClose}
        selectedDatas={selectedDatas}
        handleUpdate={handleUpdate}
      />
    </>
  );
}

export default Table;
