import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import ProfileTabs from "./profile/ProfileTabs";
import Navbar from "./navbar/Navbar";
import { FaEdit } from "react-icons/fa";

const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    loading,
    currentUser,
    token,
    logoutUser,
    updateUser,
  } = useUser();
  const [activeTab, setActiveTab] = useState("overview");
  const [profileStats, setProfileStats] = useState(null);
  const [recentMovies, setRecentMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  // Wrap fetchProfileData in useCallback for stable reference
  const fetchProfileData = useCallback(async () => {
    setStatsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(
        "http://localhost:8000/users/api/profile-stats/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Failed to fetch profile stats: ${res.status} ${errorText}`
        );
      }
      const data = await res.json();
      setProfileStats(data.stats);
      setRecentMovies(data.recent_movies || []);
      setFavourites(data.favourites || []);
    } catch (err) {
      setProfileStats(null);
      setRecentMovies([]);
      setFavourites([]);
      setFetchError(
        "Unable to load your profile data. Please try again later."
      );
    } finally {
      setStatsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchProfileData();
  }, [token, fetchProfileData]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const res = await fetch(
        "http://localhost:8000/users/api/upload-avatar/",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      if (res.ok) {
        const resData = await res.json();
        // Always use the full URL for the avatar
        const avatarUrl = resData.avatar.startsWith("http")
          ? resData.avatar
          : `http://localhost:8000${resData.avatar}`;
        setAvatarPreview(avatarUrl);
        // Refetch profile data to persist avatar change
        await fetchProfileData();
      } else {
        alert("Failed to upload avatar");
      }
    } catch (err) {
      alert("Error uploading avatar");
    }
  };

  // Unfavourite handler
  const handleUnfavourite = async (movie) => {
    if (!token) return;
    try {
      const res = await fetch(
        `http://localhost:8000/videos/favourites/remove/${movie.id}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        setFavourites((prev) => prev.filter((m) => m.id !== movie.id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to remove favourite");
      }
    } catch (err) {
      alert("Error removing favourite");
    }
  };

  // Handler to update both stats and currentUser after profile update
  const handleProfileUpdate = async () => {
    await fetchProfileData();
    // No need to update currentUser here; useEffect below will handle it
  };

  // Sync currentUser with profileStats after profile update
  useEffect(() => {
    if (
      profileStats &&
      (profileStats.name !== currentUser?.username ||
        profileStats.email !== currentUser?.email)
    ) {
      updateUser({
        username: profileStats.name,
        email: profileStats.email,
      });
    }
  }, [profileStats, currentUser, updateUser]);

  if (loading || statsLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  if (fetchError) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <div className="bg-red-900 text-red-300 px-6 py-4 rounded shadow mb-4">
          {fetchError}
        </div>
        <div className="flex gap-4">
          <button
            className="mt-2 px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
          <button
            className="mt-2 px-4 py-2 bg-gray-700 rounded text-white hover:bg-gray-800"
            onClick={() => (window.location.href = "/")}
          >
            Go to Home/Login
          </button>
        </div>
      </div>
    );
  }

  const user = {
    name: profileStats?.name || currentUser?.username || "User",
    email: profileStats?.email || currentUser?.email || "",
    avatar:
      profileStats?.avatar ||
      currentUser?.avatar ||
      "../../assets/default_avatar.png", // Use backend avatar if available
    subscription: profileStats?.subscription || "Free",
    moviesWatched: profileStats?.movies_watched || 0,
    moviesThisMonth: profileStats?.movies_this_month || 0,
    watchTime: profileStats?.watch_time || "0h 0m",
    favorites: profileStats?.favorites || 0,
  };

  return (
    <div className="text-white bg-black min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center w-full mt-24">
        {" "}
        {/* Add margin-top to push content below navbar */}
        <div className="w-full max-w-5xl px-4 py-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-800">
                <img
                  src={avatarPreview || user.avatar}
                  alt={user.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
                {/* Edit avatar icon */}
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-2 right-2 bg-white text-red-600 rounded-full p-2 shadow hover:bg-red-100 transition cursor-pointer"
                >
                  <FaEdit size={20} />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setAvatarPreview(URL.createObjectURL(file));
                        handleAvatarChange(e);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                  {user.subscription}
                </span>
                <button
                  className="ml-4 px-3 py-1 bg-gray-700 text-white rounded hover:bg-red-600 transition"
                  onClick={() => {
                    logoutUser();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </div>
              <p className="text-gray-400 mb-6">{user.email}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">
                    {user.moviesWatched}
                  </div>
                  <div className="text-sm text-gray-400">Movies Watched</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">
                    {user.watchTime}
                  </div>
                  <div className="text-sm text-gray-400">Watch Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">
                    {user.favorites}
                  </div>
                  <div className="text-sm text-gray-400">Favorites</div>
                </div>
              </div>
            </div>
          </div>
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-gray-800">
            {["overview", "watching", "favorites", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 capitalize transition-colors ${
                  activeTab === tab
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab === "watching" ? "Continue Watching" : tab}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          <ProfileTabs
            activeTab={activeTab}
            user={user}
            recentMovies={recentMovies}
            favourites={favourites}
            handleUnfavourite={handleUnfavourite}
            onUpdate={handleProfileUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
