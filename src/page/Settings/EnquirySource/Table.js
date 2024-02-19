
import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import axios from 'axios';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import Button from 'react-bootstrap/Button';
import '../../style/table.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddModal from './AddModal'
import Filter from './Filter';
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
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [filterValue, setFilterValue] = useState(''); 
  const [selectedName, setSelectedName] = useState("");
  const navRef = useRef();  
  const [query, setQuery] = useState('');  
  const showNavbar = () => {
  navRef.current.classList.toggle("responsive_nav");
}

  const handleClose = () => {
    setShowEditModal(false);
    setShowViewModal(false);
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
    setSelectedName(row.name);
  };



const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;

const getDatas = async () => {
  try {
    const { enquiriesSource } = (await axios.get('http://localhost:3000/enquirySource')).data;
    const filteredData = enquiriesSource.map(({ name, desc, ...rest }) => ({
      ...rest,
      name: capitalize(name),
      desc: capitalize(desc),
    })).filter(({ isDeleted }) => isDeleted === false || isDeleted === undefined);

    setDatas(filteredData);
  } catch (error) {
    console.error(error);
  }
};
 

  const handleUpdate = async (orgId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/enquirySource/${orgId}`, updatedData);
      console.log('Update response:', response.data);
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



  const totalCount = filteredDatas.length;

  const columns = [
   
    {
      name: "NAME",
      selector: (row) => row.name,
      sortable: true,
    
    },
    {
      name: "DESCRIPTION",
      selector: (row) => row.desc,
     
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
              <FontAwesomeIcon icon={faTrash} />
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
        (item.name.toLowerCase().includes(search.toLowerCase())) ||
        (item.desc.toLowerCase().includes(search.toLowerCase()));
  

          // Apply both name and status filters
        const statusMatch = item.status.toLowerCase().includes(filterValue.toLowerCase());
          return nameMatch && (filterValue === '' || statusMatch);
       });
       setFilteredDatas(result);

  }, [search, datas, filterValue]);

  return (
    <>
     <ToastContainer autoClose={50000}/>
    <div className='table-div'>
      <Datatable className='table-data-div'
        title='Enquiry Source'
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

       <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} handleUpdate={handleUpdate} />
       <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />
       <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} selectedName={selectedName} getDatas={getDatas} />
    </>
  );
}

export default Table;
