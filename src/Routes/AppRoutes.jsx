import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Authentication/Login";
import App from "../App";
import Signup from "../Authentication/SignUp";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          {/* <Route path="/" element={<App/>}/> */}
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/todo" element={<App/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
