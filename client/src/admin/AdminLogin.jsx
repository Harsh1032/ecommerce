import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const baseUrl = process.env.REACT_APP_BASE_URL;
  console.log(baseUrl);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, {
        username,
        password,
      });
      console.log("Login successful:", response.data);
      // Store the JWT token in localStorage or a state management solution
      localStorage.setItem("token", response.data.token);
      setError("");
      login();
      // Redirect or show a success message
      navigate("/adminHome");
    } catch (err) {
      console.error("Login failed:", err.response.data);
      setError("Invalid username or password");
    }
  };
  return (
    <div className=" w-full py-8 flex items-center justify-center min-h-screen overflow-y-scroll no-scrollbar">
      <div className="md:w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg xs:w-[90%]">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border outline-none rounded-md shadow-lg sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border outline-none rounded-md shadow-lg sm:text-sm"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;
