// // Inside PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const PrivateRoute = ({ element, requiredRole, ...rest }) => {
//   const { isAuthenticated, userRole } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (requiredRole && userRole !== requiredRole) {
//     return <Navigate to="/dashboard" />; // Or any other appropriate redirect
//   }

//   return <Route {...rest} element={element} />;
// };

// export default PrivateRoute;

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated, userRole } = useAuth();

  // Check if the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check if the user is authenticated but does not have the admin role, redirect to the home page
  if (userRole !== 'admin') {
    return <Navigate to="/" />; // Redirect unauthorized users to the home page
  }

  // If the user is authenticated and has the admin role, render the protected route
  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
