// import React, { useState, useEffect, useRef } from 'react';
// import Datatable from 'react-data-table-component';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEdit, faTrash, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import Filter from './Filter';

// function AllocationTable( ) {
//   const [datas, setDatas] = useState([]);
//   const [filteredDatas, setFilteredDatas] = useState([]);
//   const [search, setSearch] = useState('');
//   const [filterValue, setFilterValue] = useState('');
//   const navRef = useRef();
 
//   const showNavbar = () => {
//     navRef.current.classList.toggle('responsive_nav');
//   };

//   const getDatas = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/allocation');
//       setDatas(response.data.Allocations);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getDatasorder = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/orders");
//       setDatas(response.data.orders);
//       setFilteredDatas(response.data.orders);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getDatas();
//     // getDatasorder();
//   }, []);

//   useEffect(() => {
//     if (!Array.isArray(datas)) {
//       console.error('Datas is not an array!');
//       return;
//     }

//     const result = datas.filter((item) => {
//       const nameMatch = item.remarks.toLowerCase().includes(search.toLowerCase());
//       return nameMatch && (filterValue === '' || item.isDeleted === (filterValue === 'deleted'));
//     });
//     setFilteredDatas(result);
//   }, [search, datas, filterValue]);

//   const handleViewDetails = (row) => {
//     console.log('View details:', row);
//     // Implement your logic for viewing details here
//   };

//   const handleEdit = (row) => {
//     console.log('Edit:', row);
//     // Implement your logic for editing here
//   };

//   const handleClickDelete = (row) => {
//     console.log('Delete:', row);
//     // Implement your logic for deleting here
//   };

//   const totalCount = filteredDatas.length;

//   const columns = [
//     {
//       name: "ORD ID",
//       selector: (row1) => <div>{`${row1.OrderId}`}</div>,
//       sortable: true,
//     },
//     {
//       name: 'STAFF',
//       selector: (row) => row.user.fname,
//       sortable: true,
//     },
//     {
//       name: 'ENQUIRY TO',
//       selector: (row) => row.user.fname,
//       sortable: true,
//     },
//     {
//       name: 'REMARKS',
//       selector: (row) => row.remarks,
//     },
    

//     {
//       name: 'ACTIONS',
//       cell: (row) => (
//         <div>
//           <button className="btn btn-2 me-3 ps-0" onClick={() => handleViewDetails(row)}>
//             <FontAwesomeIcon icon={faEye} />
//           </button>
//           <button className="btn btn-1 me-3 ps-0" onClick={() => handleEdit(row)}>
//             <FontAwesomeIcon icon={faEdit} />
//           </button>
//           <button className="btn btn-3 me-3 ps-0" onClick={() => handleClickDelete(row)}>
//             <FontAwesomeIcon icon={faTrash} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div className="table-div" style={{border: "none"}}>
//         <Datatable
//           className="table-data-div"
//           columns={columns}
//           data={filteredDatas}
//           pagination
//           paginationPerPage={5}
//           rowsPerPageOptions={[]}
//           fixedHeader
//           fixedHeaderScrollHeight="320px"
//           selectableRows
//           selectableRowsHighlight
//           highlightOnHover
//           subHeader
//           subHeaderComponent={
//             <div className="table-top">
//               <div className="left-div">
//               <div>
         
//          </div>
//                 <div className="search-input-container">
//                   <FontAwesomeIcon icon={faSearch} className="search-icon mt-1" />
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className="w-35 search-control"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div ref={navRef} className="right-div">
//                 <div className="inner-div">
//                   <div className="count-div me-2">
//                     <FontAwesomeIcon icon={faFilter} style={{ marginRight: '5px' }} />
//                     <span> Results: {totalCount}</span>
//                   </div>
//                   <div>
//                     <Filter
//                       onFilter={(newQuery, newFilterValue) => {
//                         setSearch(newQuery);
//                         setFilterValue(newFilterValue);
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <button className="nav-btn nav-close-btn" onClick={showNavbar}>
//                   <FaTimes />
//                 </button>
//               </div>
//               <button className="nav-btn" onClick={showNavbar}>
//                 <FaBars />
//               </button>
//             </div>
//           }
//           subHeaderAlign="right"
//         />
//       </div>
//     </>
//   );
// }

// export default AllocationTable;



import React, { useState, useEffect, useRef } from 'react';
import Datatable from 'react-data-table-component';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FaBars, FaTimes } from 'react-icons/fa';
import Filter from '../Filter';

function AllocationTable() {
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [search, setSearch] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  const getDatas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/orders');
      setDatas(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  useEffect(() => {
    if (!Array.isArray(datas)) {
      console.error('Datas is not an array!');
      return;
    }

    const result = datas.filter((item) => {
      const nameMatch = item.remarks.toLowerCase().includes(search.toLowerCase());
      return nameMatch && (filterValue === '' || item.isDeleted === (filterValue === 'deleted'));
    });
    setFilteredDatas(result);
  }, [search, datas, filterValue]);

  const handleViewDetails = (row) => {
    console.log('View details:', row);
    // Implement your logic for viewing details here
  };

  const handleEdit = (row) => {
    console.log('Edit:', row);
    // Implement your logic for editing here
  };

  const handleClickDelete = (row) => {
    console.log('Delete:', row);
    // Implement your logic for deleting here
  };

  const totalCount = filteredDatas.length;

  const columns = [
    {
      name: "ORD ID",
      selector: (row) => <div>{`${row.OrderId}`}</div>,
      sortable: true,
    },
    {
      name: 'STAFF',
      selector: (row) => row.enqId.fName,
      sortable: true,
    },
    {
      name: 'ENQUIRY TO',
      selector: (row) => row.enqTo.name,
      sortable: true,
    },
    {
      name: 'REMARKS',
      selector: (row) => row.remarks,
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
        <div>
          <button className="btn btn-2 me-3 ps-0" onClick={() => handleViewDetails(row)}>
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button className="btn btn-1 me-3 ps-0" onClick={() => handleEdit(row)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-3 me-3 ps-0" onClick={() => handleClickDelete(row)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
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
          subHeaderComponent={
            <div className="table-top">
              <div className="left-div">
                <div className="search-input-container">
                  <FontAwesomeIcon icon={faSearch} className="search-icon mt-1" />
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
                    <FontAwesomeIcon icon={faFilter} style={{ marginRight: '5px' }} />
                    <span> Results: {totalCount}</span>
                  </div>
                  <div>
                    <Filter
                      onFilter={(newQuery, newFilterValue) => {
                        setSearch(newQuery);
                        setFilterValue(newFilterValue);
                      }}
                    />
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
    </>
  );
}

export default AllocationTable;
