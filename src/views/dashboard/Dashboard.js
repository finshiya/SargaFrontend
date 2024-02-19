import React from 'react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {

  return (
    <>
      <WidgetsDropdown />
    
    </>
  )
}

export default Dashboard
// import React from 'react';
// import { useAuth } from '../pages/AuthContext';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   const { userRole } = useAuth();

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>Welcome to the Dashboard!</p>
//       <p>Your role is: {userRole}</p>
//       <Link to="/">Go to Home</Link>
//     </div>
//   );
// };

// export default Dashboard;
