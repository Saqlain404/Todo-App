import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../Authentication/Login";
import Signup from "../Authentication/SignUp";
import App from "../App";
import LandingPage from "../Components/LandingPage";
import { AuthProvider, useAuth } from "../context/AuthContext";

const Loader = () => (
  <div className="min-h-screen bg-[#2c3335] flex items-center justify-center text-white">
    <p className="text-[#75da8b] font-semibold">Loading…</p>
  </div>
);

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AlreadyAuth = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/todo" replace />;
  return children;
};

const RoutesWithAuth = () => {
  const { loading } = useAuth();
  if (loading) return <Loader />;
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <AlreadyAuth>
            <Login />
          </AlreadyAuth>
        }
      />
      <Route
        path="/signup"
        element={
          <AlreadyAuth>
            <Signup />
          </AlreadyAuth>
        }
      />
      <Route
        path="/todo"
        element={
          <RequireAuth>
            <App />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesWithAuth />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
