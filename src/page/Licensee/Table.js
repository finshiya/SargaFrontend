// Table.js
import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import axios from 'axios';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import AddModal from './AddModal';
import '../style/table.css';
import { Container } from 'react-bootstrap';
import DeleteModal from './DeleteModal';
import Filter from './Filter';
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from 'react';


function Table() {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [deleteModal,setDeleteModal] =useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');   
  const [filterValue, setFilterValue] = useState('');
  const handleClose = () => {
    setShowEditModal(false);
    setShowViewModal(false);
    setShowDeleteModal(false);
    setSelectedDatas(null);
  };
  const navRef = useRef();  
  const showNavbar = () => {
  navRef.current.classList.toggle("responsive_nav");
}



useEffect(() => {
  const fetchUserRoles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/userroles');
      const roles = response.data.userRole.map(role => role.name);
      setRoleOptions(['all', ...roles]);
    } catch (error) {
      console.error('Error fetching user roles:', error);
    }
  };

  fetchUserRoles();
}, []);


// const getDatas = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/users');
//     const filteredData = response.data.users.filter(user => user.isDeleted === false || user.isDeleted === undefined);
//     setDatas(filteredData);
//   } catch (error) {
//     console.error(error);
//   }
// };
const getDatas = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users');
    console.log('API Response:', response.data);

    // Filter the data based on the user type "licensee"
    const licenseeData = response.data.users.filter(user => 
      (user.isDeleted === false || user.isDeleted === undefined) &&
      user.userRoles.name === 'licensee'
    );

    setDatas(licenseeData);
  } catch (error) {
    console.error(error);
  }
};


  const handleUpdate = async (Dataid, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/users/${Dataid}`, updatedData);

      
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
  setSelectedName(`${row.fname} ${row.lname}`);
};
  const columns = [
    {
      name: "NAME",
      selector: (row) => `${row.fname} ${row.lname}`,
      sortable: true,
      cell: (row) => (
        <div className="capitalize-text">
          {`${row.fname} ${row.lname}`}
        </div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "USER ROLE",
      selector: (row) => {
        if (Array.isArray(row.userRoles)) {
          return row.userRoles.map((userRole) => userRole.name).join(', ');
        } else if (row.userRoles && typeof row.userRoles === 'object') {
          return row.userRoles.name;
        } else {
          return 'Unknown Role';
        }
      },
      cell: (row) => (
        <div className="capitalize">
          {/* {${row.userRoles.name}} */}
          {`${row.userRoles && row.userRoles.name ? row.userRoles.name : 'Unknown Role'}`}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <div>
          <Button className='btn btn-2 me-3 ps-0' onClick={() => handleViewDetails(row)}>
              <FontAwesomeIcon icon={faEye} /> {/* View Details Icon */}
            </Button>
            <Button  className='btn btn-1 me-3 ps-0' onClick={() => handleEdit(row)}>
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
    // fetchUserRoles();
  }, []);

  
  useEffect(() => {
    if (!Array.isArray(datas)) {
      console.error("Datas is not an array!" ,datas);
      return;
    }

    const result = datas.filter((item) => {
    
      const nameMatch =
      (item.fName && item.fName.toLowerCase().includes(search.toLowerCase())) ||
      (item.lName && item.lName.toLowerCase().includes(search.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
      (item.mobile && item.mobile.toString().includes(search));


      const statusMatch = item.status && item.status.toLowerCase().includes(filterValue.toLowerCase());
      const enqNoMatch = item.enqNo && item.enqNo.toString().includes(search);


     return (nameMatch  || enqNoMatch ) && (filterValue === '' || statusMatch);

    });
    setFilteredDatas(result);
  }, [search, datas,filterValue]);

  const totalCount = filteredDatas.length;

  return (
    <>
      <div className='table-div'>
        <Datatable className='table-data-div'
          title='  Licensee'
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


      <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} handleUpdate={handleUpdate} data={datas} />
      <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />
      <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} selectedName={selectedName} getDatas={getDatas} />
    </>
  );
}

export default Table;
