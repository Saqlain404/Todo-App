import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
}else if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
}else{
    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Signup successful! Please login.");
    navigate("/login");
}
    
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#2c3335] bg-gradient-to-r from-[#2c3335] to-[#1e272e]">
      <div className='flex flex-col justify-center items-center gap-6 
                      bg-white/10 backdrop-blur-md border border-white/20 
                      p-10 rounded-2xl shadow-2xl w-full max-w-md'>
        <h1 className="text-white text-4xl font-semibold mb-6">Sign Up</h1>
      <form
        onSubmit={handleSignup}
        className="flex flex-col justify-center items-center gap-4 w-full"
        autoComplete="off"
      >
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
          className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <div className="relative w-full">
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
          type={showPassword ? "text" : "password"}
          className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
            <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-white"
      >
        {showPassword ? "🙈" : "👁️"}
      </span></div>
      <div className="relative w-full">
        <input
          placeholder="Confirm Password"
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            type="password"
           
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
               <span
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-white"
      >
        {showConfirmPassword ? "🙈" : "👁️"}
      </span></div>
        <button type="submit"
           className='w-full py-2 rounded-md bg-green-400 text-white font-bold hover:bg-green-500 transition'
          >Sign Up</button>
        <p className="text-white text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-green-300 hover:underline">
            Login
          </a>
        </p>
      </form>
      </div>
    </div>
  );
};

export default Signup;
