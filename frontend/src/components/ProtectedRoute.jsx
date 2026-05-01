import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  //  Not logged in → go to signup
  if (!token) {
    return <Navigate to="/login" state={{ from: location }}  replace />;
  }

  // Logged in → allow access
  return children;
};

export default ProtectedRoute;