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
  const [role, setRole] = useState("Commuter");
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
      const user = await register(name, email, password, role);
      login(user);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-4 animate-fade-in">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-[1.01]">

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-white mb-2 tracking-wide">
          REGISTER
        </h2>
        <p className="text-center text-gray-300 mb-6 text-sm">
          Join NeuroFleetX today
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="py-2">
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              Register As
            </label>
            <div className="flex gap-4">
              {["Commuter", "Operator", "Admin"].map((r) => (
                <label key={r} className="flex items-center cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 mr-2 border-2 border-gray-400 rounded-full transition-colors group-hover:border-purple-400">
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={(e) => setRole(e.target.value)}
                      className="absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    {role === r && (
                      <div className="w-2.5 h-2.5 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    )}
                  </div>
                  <span className={`text-sm ${role === r ? "text-white font-semibold" : "text-gray-400 group-hover:text-gray-200"}`}>
                    {r}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold tracking-wide uppercase shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 font-semibold hover:text-purple-300 hover:underline transition-colors"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
