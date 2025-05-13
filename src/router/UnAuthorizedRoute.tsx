import React, { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const UnauthorizedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { accessToken } = useContext(authContext);

  if (accessToken) {
    return <Navigate to={"/dashboard/home"} replace={true} />;
  }

  return <>{children}</>;
};

export default UnauthorizedRoute;
