import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/404";
import Home from "../pages/home";
import Navigator from "./navigator";
import Signin from "../pages/auth/signin";
import Signup from "../pages/auth/signup";

const Router = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/auth/signin" element={<Signin />} />
      <Route path="/auth/signup" element={<Signup />} />

      {/* Default routes */}
      <Route path="/" element={<Navigator />} />

      <Route path="/home" element={<Home />} />

      {/* Fallback routes */}
      <Route path="*" element={<NotFound />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
