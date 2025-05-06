import React from "react";
import { Navigate } from "react-router-dom";

const Navigator: React.FC = () => {
  const path = "/signin";
  return <Navigate to={path} replace />;
};

export default Navigator;
