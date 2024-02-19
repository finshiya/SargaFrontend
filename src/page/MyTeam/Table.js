import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import axios from 'axios';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import DeleteModal from './DeleteModal';
import Button from 'react-bootstrap/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import AddModal from './AddModal';
import '../style/table.css';
import Filter from './Filter';
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from 'react';



function Table() {

  const [filterValue, setFilterValue] = useState('');
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [roleOptions, setRoleOptions] = useState([]);
  const [query, setQuery] = useState(''); 
  const navRef = useRef();  
    const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
}
  // useEffect(() => {
  //   const fetchUserRoles = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/userroles');
  //       const roles = response.data.userRole.map(role => role.name);
  //       setRoleOptions(['all', ...roles]);
  //     } catch (error) {
  //       console.error('Error fetching user roles:', error);
  //     }
  //   };

  //   fetchUserRoles();
  // }, []);

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
    setSelectedName( `${row.fname} ${row.lname}`);
  };


const getDatas = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users');
    console.log('API Response:', response.data);


    const filteredData = response.data.users.filter(user => user.userRoles.name !== "licensee");

    console.log('Filtered Data:', filteredData);
    setDatas(filteredData);
  } catch (error) {
    console.error(error);
  }
};



  const handleUpdate = async (countryId, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/users/${countryId}`, updatedData);

      toast.success('Data successfully Updated', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        className: 'toast-message',
      });

      getDatas();
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

  const columns = [
    {
      name: "NAME",
      selector: (row) => `${row.fname} ${row.lname}`,
      sortable: true,
   
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
    },
    {
      name: "MOBILE",
      selector: (row) => row.mobile,
    },
    {
      name: "USER ROLE",
      selector: (row) => row.userRoles,

      // selector: (row) => {
      //   if (Array.isArray(row.userRoles)) {
      //     return row.userRoles.map(userRole => userRole.name).join(', ');
      //   } else if (row.userRoles && typeof row.userRoles === 'object') {
      //     return row.userRoles.name;
      //   } else {
      //     return 'Unknown Role';
      //   }
      // },
     
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <>
          <div>
          <Button className='btn btn-2 me-3 ps-0' onClick={() => handleViewDetails(row)}>
              <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button className='btn btn-1 me-3 ps-0' onClick={() => handleEdit(row)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
        
            <Button className='btn btn-3  me-3 ps-0' onClick={() => handleClickDelete(row)}>
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
      (item.fname.toLowerCase().includes(search.toLowerCase())) || 
      (item.lname.toLowerCase().includes(search.toLowerCase()));
    
   //   const nextContactDateMatch = item.nextContactDate.toLowerCase().includes(search.toLowerCase());

      const statusMatch = item.status.toLowerCase().includes(filterValue.toLowerCase());
     // Apply both name and status filters
       return nameMatch && (filterValue === '' || statusMatch);
    });
    setFilteredDatas(result);
  }, [search, datas,filterValue]);



  

  const totalCount = filteredDatas.length;

  return (
    <>
      <ToastContainer autoClose={50000}/>
      <div className='table-div'>
        <Datatable
          title='My Team'
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
      <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} handleUpdate={handleUpdate} />
      <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />
      <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} selectedName={selectedName} getDatas={getDatas} />
    </>
  );
}

export default Table;



