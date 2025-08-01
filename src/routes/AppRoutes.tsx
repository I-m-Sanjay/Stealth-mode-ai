import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgetPassword from '../pages/ForgetPassword';
import SignUp from '../pages/SignUp';
import Source from '../pages/Source';
import Project from '../pages/Project';
import ResetPassword from '../pages/ResetPassword';
import WorkSpace from '../pages/WorkSpace';

const AppRoutes = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/source" replace /> : <Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/source" element={<Source />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      {/* Protected Routes */}
      <Route path="/project/:projectId" element={isAuthenticated ? <Project /> : <Navigate to="/login" replace />} />
      <Route path="/workspace" element={isAuthenticated ? <WorkSpace /> : <Navigate to="/login" replace />} />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;