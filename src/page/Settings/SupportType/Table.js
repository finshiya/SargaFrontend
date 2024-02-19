

// Table.js
import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import axios from 'axios';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import Button from 'react-bootstrap/Button';
import '../../style/table.css'
import Filter from './Filter';
import { ModalHeader } from 'react-bootstrap';
import AddModal from './AddModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import necessary FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faEye, faTrash, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from './DeleteModal';
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from 'react';



function Table() {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [deleteModal,setDeleteModal] =useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [query, setQuery] = useState('');  
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
  const handleDeleteConfirmation = (row) => {
    setSelectedDatas(row);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/supportType/${selectedDatas._id}`);
      getDatas();
      handleClose();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };



  const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
  const getDatas = async () => {
    try {
      const { supportType } = (await axios.get('http://localhost:3000/supportType')).data;
      const filteredData = supportType.map(({ name, descp, ...rest }) => ({
        ...rest,
        name: capitalize(name),
        descp: capitalize(descp),
      })).filter(({ isDeleted }) => isDeleted === false || isDeleted === undefined);
  
      setDatas(filteredData);
    } catch (error) {
      console.error(error);
    }
  };



  const handleUpdate = async (orgId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/supportType/${orgId}`, updatedData);
      toast.success('Data successfully Updated', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        className: 'toast-message',
      });     
       getDatas(); // Refresh the data after update
    } catch (error) {
      console.error('Error updating data:', error);
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
  const totalCount = filteredDatas.length;

  const columns = [
   
    {
      name: "NAME",
      selector: (row) => row.name,
      sortable: true,
   
    },
    {
      name: "DESCRIPTION",
      selector: (row) => row.descp,
   
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <>
        <div>
        <Button className='btn btn-2 me-3 ps-0' onClick={() => handleViewDetails(row)}>
          <FontAwesomeIcon icon={faEye} /> {/* View Details Icon */}
        </Button>
         <Button className='btn btn-1 me-3 ps-0' onClick={() => handleEdit(row)}>
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
      const nameMatch =
        (item.name && item.name.toLowerCase().includes(search.toLowerCase())) ||
        (item.descp && item.descp.toLowerCase().includes(search.toLowerCase()));
  
      const statusMatch = item.status && item.status.toLowerCase().includes(filterValue.toLowerCase());
      // Apply both name and status filters
      return nameMatch && (filterValue === '' || statusMatch);
    });
  
    console.log('Filtered Data:', result); // Log the filtered data for debugging
    setFilteredDatas(result);
  }, [search, datas, filterValue]);
  
  

  return (
    <>
    <div className='table-div'>
      <Datatable className='table-data-div'
        title='Support Type '
        columns={columns}
        data={filteredDatas}
        pagination
        paginationPerPage={5}
        rowsPerPageOptions={[]} 
        fixedHeader
        fixedHeaderScrollHeight='320px'
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent={

        <div className='table-top'>
         
        <div  className='left-div'>
             <div>
               <AddModal getDatas={getDatas} />
             </div>
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
             
             <div  ref={navRef} className='right-div'>
               <div className='inner-div'>
               <div className='count-div me-2'>
                 <FontAwesomeIcon icon={faFilter} style={{ marginRight: '5px' }} />
                 <span>{' '}Results: {totalCount}</span>
               </div>
               <div>
                 {/* <FilterDropdown datas={datas} setFilteredDatas={setFilteredDatas} roleOptions={roleOptions} /> */}
                 <Filter  onFilter={(newQuery, newFilterValue) => { setQuery(newQuery); setFilterValue(newFilterValue); }} />
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


       {/* Modal for Delete Confirmation */}
       <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} selectedName={selectedName} getDatas={getDatas} />
       {/* <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} selectedName={selectedName} getDatas={getDatas} /> */}

    </>
  );
}

export default Table;
