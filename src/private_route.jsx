import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    // user is not logged in, redirect to login
    return <Navigate to="/" replace />;
  }

  // user is logged in, allow access
  return children;
};

export default PrivateRoute;
