import React from "react";
import { Navigate } from "react-router-dom";

const Navigator: React.FC = () => {
  const path = "/auth/signin";
  return <Navigate to={path} replace />;
};

export default Navigator;
