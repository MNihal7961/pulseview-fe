import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/404";
import Home from "../pages/home";
import Navigator from "./navigator";
import Signin from "../pages/auth/signin";
import Signup from "../pages/auth/signup";
import DashBoard from "../components/DashBoard";
import ProtectedRoute from "./protectedRoute";
import WeightProgress from "../pages/weight-progress";
import MedicationPage from "../pages/medication";
import Shipment from "../pages/shipment";
import GoalPage from "../pages/goal";
import UnauthorizedRoute from "./UnAuthorizedRoute";

const Router = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route
        path="/auth/signin"
        element={
          <UnauthorizedRoute>
            <Signin />
          </UnauthorizedRoute>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <UnauthorizedRoute>
            <Signup />
          </UnauthorizedRoute>
        }
      />

      {/* Default routes */}
      <Route path="/" element={<Navigator />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="weight-progress" element={<WeightProgress />} />
        <Route path="medication" element={<MedicationPage />} />
        <Route path="shipment" element={<Shipment />} />
        <Route path="goal" element={<GoalPage />} />
      </Route>

      {/* Fallback routes */}
      <Route path="*" element={<NotFound />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
