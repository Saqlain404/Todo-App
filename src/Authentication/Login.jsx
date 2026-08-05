import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EyeIcon, EyeOffIcon, LogoIcon } from "../Components/Icons";
import { useAuth } from "../context/AuthContext";



const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/10 placeholder-white/50 text-white " +
  "border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#75da8b] " +
  "transition";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth();

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await login(email, password);
    Swal.fire({
      position: "top", icon: "success", title: "Login successful",
      showConfirmButton: false, timer: 1500, width: "300px",
      padding: "0.75rem", customClass: { popup: "minimal-swal-popup" },
    });
    navigate("/todo");
  } catch (error) {
    Swal.fire({
      icon: "error", title: "Login Failed", text: error.message,
      confirmButtonColor: "#75da8b", background: "#2F363F", color: "#fff",
    });
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#2c3335] via-[#232b2d] to-[#1e272e]">
      <div className="w-full max-w-md">
        <div className="flex flex-col justify-center items-center gap-6 bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-xl bg-[#75da8b] text-[#06252e] flex items-center justify-center">
              <LogoIcon className="w-6 h-6" />
            </span>
            <div className="text-left">
              <h1 className="text-2xl font-bold leading-none">Taskly</h1>
              <p className="text-xs text-white/50">Welcome back!</p>
            </div>
          </div>

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 w-full"
            autoComplete="off"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
              className={inputClass}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white/60 hover:text-white cursor-pointer"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#75da8b] text-[#06252e] font-bold hover:bg-[#8be4a0] transition"
            >
              Login
            </button>
          </form>

          <Link to="/login" className="text-white/50 hover:text-white text-sm transition">
            Forgot password?
          </Link>
          <p className="text-white/70 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#75da8b] hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
