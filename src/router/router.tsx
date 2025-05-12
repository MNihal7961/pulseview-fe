import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/404";
import Home from "../pages/home";
import Navigator from "./navigator";
import Signin from "../pages/auth/signin";
import Signup from "../pages/auth/signup";
import DashBoard from "../components/DashBoard";
import ProtectedRoute from "./protectedRoute";
import WeightProgress from "../pages/weight-progress";
import Medication from "../pages/medication";
import Shipment from "../pages/shipment";
import Settings from "../pages/settings";
import Goal from "../pages/goal";

const Router = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/auth/signin" element={<Signin />} />
      <Route path="/auth/signup" element={<Signup />} />

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
        <Route path="medication" element={<Medication />} />
        <Route path="shipment" element={<Shipment />} />
        <Route path="goal" element={<Goal />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback routes */}
      <Route path="*" element={<NotFound />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
