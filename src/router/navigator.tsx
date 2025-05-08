import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const Navigator: React.FC = () => {
  const {accessToken} = useContext(authContext);
  const path = accessToken ? "/dashboard/home" : "/auth/signin";
  return <Navigate to={path} replace />;
};

export default Navigator;
