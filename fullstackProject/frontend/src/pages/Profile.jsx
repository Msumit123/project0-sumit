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

  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState(user.travelPreferences || "None set");
  const [locations, setLocations] = useState(user.savedLocations || "Home, Work");

  const toggleEdit = () => {
    if (isEditing) {
      console.log("Saving...", { preferences, locations });
    }
    setIsEditing(!isEditing);
  };

  // ✅ SAFE AVATAR LETTER
  const avatarLetter =
    (user.name && user.name.length > 0 && user.name[0]) ||
    (user.email && user.email.length > 0 && user.email[0]) ||
    "?";

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center relative">
          <div className="absolute top-4 left-4 text-white/80 text-xs font-semibold tracking-widest uppercase">
            NeuroFleetX
          </div>

          <div className="mt-8 relative inline-block">
            <div className="w-24 h-24 rounded-full border-4 border-gray-800 bg-gray-700 flex items-center justify-center text-4xl font-bold text-white shadow-lg mx-auto">
              {avatarLetter.toUpperCase()}
            </div>
            <div
              className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-gray-800"
              title="Online"
            />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-white tracking-wide">
            {user.name || "User"}
          </h1>
          <p className="text-gray-300 text-sm font-light">
            {user.role || "Commuter"}
          </p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                Name
              </label>
              <div className="text-gray-200 border-b border-gray-600 pb-1 text-lg">
                {user.name || "N/A"}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                Email
              </label>
              <div className="text-gray-200 border-b border-gray-600 pb-1 text-lg">
                {user.email || "N/A"}
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
              Travel Preferences
            </label>
            {isEditing ? (
              <textarea
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="w-full bg-gray-700 text-white rounded p-3 text-sm"
                rows="2"
              />
            ) : (
              <div className="p-3 bg-gray-700/50 rounded text-gray-300 text-sm">
                {preferences}
              </div>
            )}
          </div>

          {/* Locations */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
              Saved Locations
            </label>

            {isEditing ? (
              <input
                type="text"
                value={locations}
                onChange={(e) => setLocations(e.target.value)}
                className="w-full bg-gray-700 text-white rounded p-3 text-sm"
              />
            ) : (
              <div className="space-y-2">
                {locations.split(",").map((loc, idx) => (
                  <div key={idx} className="text-gray-300 text-sm">
                    📍 {loc.trim()}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 flex gap-4">
            <button
              onClick={toggleEdit}
              className="flex-1 py-2 rounded-lg border border-gray-600 text-gray-300 hover:text-white"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white"
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
