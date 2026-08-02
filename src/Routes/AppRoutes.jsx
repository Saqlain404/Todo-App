import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../Authentication/Login";
import Signup from "../Authentication/SignUp";
import App from "../App";
import LandingPage from "../Components/LandingPage";
import { getCurrentUser } from "../utils/storage";

const RequireAuth = ({ children }) => {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AlreadyAuth = ({ children }) => {
  const user = getCurrentUser();
  if (user) return <Navigate to="/todo" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default AppRoutes;
