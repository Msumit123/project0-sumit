import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
  const { user, login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const user = await register(name, email, password);
      // login(user); // Auto login or redirect to login. Let's auto login if response is user.
      // Usually register returns user.
      login(user);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join us in just one step
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-emerald-600 text-white font-semibold
                       hover:bg-emerald-700 transition duration-300 shadow-md"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
