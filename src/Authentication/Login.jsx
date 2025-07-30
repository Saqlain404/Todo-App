import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
        width: "300px", // Reduced width for a smaller look
        padding: "0.75rem", // Minimal padding
        customClass: {
          popup: "minimal-swal-popup", // Custom class for further styling
        },
        backdrop: true, // No backdrop for a cleaner look
      });
      // Redirect to the Todo page or perform any other action
      navigate("/todo");
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
        confirmButtonColor: "#75da8b",
        background: "#2F363F",

        color: "#fff",

        backdrop: true, // No backdrop for a cleaner look
      });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#2c3335] bg-gradient-to-r from-[#2c3335] to-[#1e272e]">
      <div
        className="flex flex-col justify-center items-center gap-6 
                      bg-white/10 backdrop-blur-md border border-white/20 
                      p-10 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-white text-4xl font-semibold mb-6">Login</h1>

        <form
          className="flex flex-col justify-center items-center gap-4 w-full"
          autoComplete="off"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            placeholder="Enter Your Email"
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <div className="relative w-full">
            <input
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
            />{" "}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-white"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-green-400 text-white font-bold hover:bg-green-500 transition"
          >
            Login
          </button>
        </form>

        <a href="/" className="text-green-300 hover:underline text-sm">
          Forgot Password?
        </a>
        <p className="text-white text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-300 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
