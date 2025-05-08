import React, { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { accessToken } = useContext(authContext);

  if (!accessToken) {
    console.log("No token found , redirecting to sign in page");
    return <Navigate to="/auth/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
