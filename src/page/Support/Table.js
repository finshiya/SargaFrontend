

// Table.js
import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import axios from 'axios';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import Button from 'react-bootstrap/Button';
import '../style/table.css'
import { ModalHeader } from 'react-bootstrap';
import AddModal from './AddModal'
// Import necessary FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from './DeleteModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Filter from './Filter';
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from 'react';


function Table() {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [query, setQuery] = useState(''); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [deleteModal,setDeleteModal] =useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [filterValue, setFilterValue] = useState(''); 
  const navRef = useRef();  
  const showNavbar = () => {
  navRef.current.classList.toggle("responsive_nav");
}


  const handleClose = () => {
    setShowEditModal(false);
    setShowViewModal(false);
    setSelectedDatas(null);
  };

  
  const getDatas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/support');
     // const filteredData = response.data.enquirySupport.filter((item) => !item.isDeleted);
      setDatas(response.data.enquirySupport);
      setFilteredDatas(response.data.enquirySupport);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (orgId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/support/${orgId}`, updatedData);
      console.log('Update response:', response.data);
      getDatas(); 
      toast.success('Data updated successfully!',{ autoClose: 1500 });
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Error updating data. Please try again.',{ autoClose: 1500 });
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

//SEARCH
const handleSearch = async (query) => {
  const searchResult = datas.filter((item) =>
    item.status.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredDatas(searchResult);
};

  //Filter
  useEffect(() => {
    handleFilter();
  }, [filterValue, datas]);

  const handleFilter = async () => {

    const filtered = datas.filter((item) => {
      const statusMatch = filterValue === '' || item.status.includes(filterValue);
      return statusMatch;
    });

    setFilteredDatas(filtered);
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
  setSelectedName(row.supportType.name);
};
  const totalCount = filteredDatas.length;

  const columns = [
   
    {
      name: "SUPPORT TYPE",
      selector: (row) => <div style={{ textTransform: 'capitalize' }}>{row.supportType.name}</div>,
      sortable: true,
    },
    // {
    //   name: "SUPPORT TO",
    //   selector: (row) => <div style={{ textTransform: 'capitalize' }}>{` ${row.supportTo.name}`}</div> ,
    // },
    {
      name: "REMARKS",
      selector: (row) => <div style={{ textTransform: 'capitalize' }}>{row.remarks}</div> ,
    },
    {
      name: "STATUS",
      selector: (row) => <div style={{ textTransform: 'capitalize' }}>{row.status}</div>,
    },
    {                 
      name: "ACTIVE",
      cell: (row) => (
        <>
        <div>
        <Button className='btn btn-2  me-3 ps-0' onClick={() => handleViewDetails(row)}>
          <FontAwesomeIcon icon={faEye} /> {/* View Details Icon */}
        </Button>
         <Button  className='btn  btn-1  me-3 ps-0' onClick={() => handleEdit(row)}>
          <FontAwesomeIcon icon={faEdit} /> {/* Edit Icon */}
        </Button>
       
        <Button className='btn btn-3 me-3 ps-0' onClick={() => handleClickDelete(row)}>
          <FontAwesomeIcon icon={faTrash} /> {/* Delete Icon */}
        </Button>
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
      return item.remarks.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredDatas(result);
  }, [search, datas]);

  return (
    <>
    <ToastContainer/>
    <div className='table-div'>
      <Datatable className='table-data-div'
        title='Support'
        columns={columns}
        data={filteredDatas}
        pagination 
        paginationPerPage={5}
        rowsPerPageOptions={[ ]} 
        fixedHeader
        fixedHeaderScrollHeight='320px'
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent={
          <div className='table-top'>
         
          <div  className='left-div'>
               <div> <AddModal getDatas={getDatas} /></div>
               <div className="search-input-container">
                 <FontAwesomeIcon icon={faSearch} className="search-icon" />
                 <input
                   type='text'
                   placeholder='Search'
                   className='w-35 search-control'
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                 />
               </div>
               </div>
               
               <div  ref={navRef} className='right-div' >
                 <div className='inner-div'>
                 <div className='count-div me-2'>
                   <FontAwesomeIcon icon={faFilter} style={{ marginRight: '5px' }} />
                   <span>{' '}Results: {totalCount}</span>
                 </div>
                 <div>
                   <Filter onFilter={(newQuery, newFilterValue) => { setQuery(newQuery); setFilterValue(newFilterValue); }} />
                 </div>
                 </div>
                 <button className='nav-btn nav-close-btn' onClick={showNavbar}>
              <FaTimes/>
         </button>
               </div>
               <button className='nav-btn' onClick={showNavbar}>
         <FaBars/>
     </button>
             </div>
       
     
    }
      
      subHeaderAlign='right'
    />
  </div>

      {/* Modal for Editing */}
      <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} handleUpdate={handleUpdate} />
      {/* Modal for Viewing Details */}
      <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />
      <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} selectedName={selectedName} getDatas={getDatas} />
    </>
  );
}

export default Table;

