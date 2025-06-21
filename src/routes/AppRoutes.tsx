import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Source from "../pages/Source";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/source" element={<Source />} />
            <Route path="/forgot-password" element={<ForgetPassword/>}/>
            <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;