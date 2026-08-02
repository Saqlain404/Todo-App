import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getUsers, saveUsers } from "../utils/storage";
import { EyeIcon, EyeOffIcon, LogoIcon } from "../Components/Icons";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/10 placeholder-white/50 text-white " +
  "border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#75da8b] " +
  "transition";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const showError = (title, text) => {
    Swal.fire({
      icon: "error",
      title,
      text,
      confirmButtonColor: "#75da8b",
      background: "#2F363F",
      color: "#fff",
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showError("Passwords do not match", "Please re-enter your password.");
      return;
    }
    if (password.length < 6) {
      showError("Weak password", "Password must be at least 6 characters long.");
      return;
    }
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      showError("Email already registered", "Please log in or use another email.");
      return;
    }
    users.push({
      name: name.trim() || email.split("@")[0],
      email,
      password,
      createdAt: new Date().toISOString(),
    });
    saveUsers(users);
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Account created! Please login.",
      showConfirmButton: false,
      timer: 1500,
      width: "320px",
      padding: "0.75rem",
      customClass: { popup: "minimal-swal-popup" },
    });
    navigate("/login");
  };

  const PasswordToggle = ({ show, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-1/2 right-3 -translate-y-1/2 text-white/60 hover:text-white cursor-pointer"
    >
      {show ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
    </button>
  );

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
              <p className="text-xs text-white/50">Create your account</p>
            </div>
          </div>

          <form
            onSubmit={handleSignup}
            className="flex flex-col gap-4 w-full"
            autoComplete="off"
          >
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
              className={inputClass}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                className={inputClass}
              />
              <PasswordToggle
                show={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
                className={inputClass}
              />
              <PasswordToggle
                show={showConfirmPassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#75da8b] text-[#06252e] font-bold hover:bg-[#8be4a0] transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-white/70 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-[#75da8b] hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
