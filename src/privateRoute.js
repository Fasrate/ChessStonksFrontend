import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    // Display a pop-up or any message here
    alert('Please log in first.');
    return <Navigate to="/login" />; // Redirect to login page
  }

  return children; // Render the component if logged in
}

export default PrivateRoute;
