import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute(Component) {
  const id = !!localStorage.getItem("user_id");

  return id ? <Component /> : <Navigate to="/login" />;
}

export default PrivateRoute;
