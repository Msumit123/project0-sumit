import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  // Static Data for "Edit" Mode Simulation
  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState(user.travelPreferences || "None set");
  const [locations, setLocations] = useState(user.savedLocations || "Home, Work");

  const toggleEdit = () => {
    if (isEditing) {
      // Save logic (mock)
      console.log("Saving...", { preferences, locations });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 font-sans">
      <div
        className="w-full max-w-lg bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.005] duration-500 border border-gray-700"
      >
        {/* Header / Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center relative">
          <div className="absolute top-4 left-4 text-white/80 text-xs font-semibold tracking-widest uppercase">
            NeuroFleetX
          </div>

          <div className="mt-8 relative inline-block group">
            {/* Avatar Circle */}
            <div className="w-24 h-24 rounded-full border-4 border-gray-800 bg-gray-700 flex items-center justify-center text-4xl font-bold text-white shadow-lg mx-auto transition-transform group-hover:rotate-6">
              {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
            </div>
            <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-gray-800" title="Online"></div>
          </div>

          <h1 className="mt-4 text-2xl font-bold text-white tracking-wide">
            {user.name || "User"}
          </h1>
          <p className="text-gray-300 text-sm font-light">
            {user.role || "Commuter"}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-6">

          {/* Main Info */}
          <div className="space-y-4">
            <div className="group">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-purple-400 transition-colors">
                Name
              </label>
              <div className="text-gray-200 border-b border-gray-600 pb-1 text-lg">
                {user.name || "N/A"}
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-purple-400 transition-colors">
                Email
              </label>
              <div className="text-gray-200 border-b border-gray-600 pb-1 text-lg">
                {user.email}
              </div>
            </div>
          </div>

          {/* Travel Preferences */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Travel Preferences
            </label>
            {isEditing ? (
              <textarea
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="w-full bg-gray-700 text-white rounded p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                rows="2"
              />
            ) : (
              <div className="p-3 bg-gray-700/50 rounded-lg text-gray-300 text-sm border-l-4 border-purple-500">
                {preferences}
              </div>
            )}
          </div>

          {/* Saved Locations */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                Saved Locations
              </label>
              {!isEditing && <span className="text-xs text-purple-400 cursor-pointer hover:underline">View All</span>}
            </div>

            {isEditing ? (
              <input
                type="text"
                value={locations}
                onChange={(e) => setLocations(e.target.value)}
                className="w-full bg-gray-700 text-white rounded p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
            ) : (
              <div className="space-y-2">
                {locations.split(",").map((loc, idx) => (
                  <div key={idx} className="flex items-center text-gray-300 text-sm">
                    <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {loc.trim()}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 flex gap-4">
            <button
              onClick={toggleEdit}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${isEditing
                  ? "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/30"
                  : "border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white"
                }`}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="flex-1 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-all"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
