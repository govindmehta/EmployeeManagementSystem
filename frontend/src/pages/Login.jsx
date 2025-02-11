import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login successful:", response.data);
      console.log(response.data.user);
      login(response.data.user);
      localStorage.setItem("authToken", response.data.token);
      if (response.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white">
          Employee Management System
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 text-gray-300">
              Remember me
            </label>
          </div>
          <div>
            <a href="#" className="text-blue-500 hover:underline text-sm">
              Forgot Password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
