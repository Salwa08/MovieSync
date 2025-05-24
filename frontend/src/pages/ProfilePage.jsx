import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { updateProfile } from '../api/auth';
import Navbar from './navbar/Navbar';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, loading, updateUser, logoutUser } = useUser();
  
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>;
  }
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updatedData = await updateProfile(formData);
      updateUser(updatedData);
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Failed to update profile');
    }
  };
  
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };
  
  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl p-6 md:p-8 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
              >
                Edit Profile
              </button>
            ) : null}
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-red-600">
                <img 
                  src={currentUser?.avatar || "https://via.placeholder.com/200?text=User"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {!isEditing && (
                <button
                  onClick={handleLogout}
                  className="mt-6 px-8 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
                >
                  Logout
                </button>
              )}
            </div>
            
            <div className="w-full md:w-2/3">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-1">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="4"
                      className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6 text-white">
                  <div>
                    <h2 className="text-lg font-medium text-gray-400">Username</h2>
                    <p className="text-xl">{currentUser?.username}</p>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium text-gray-400">Email</h2>
                    <p className="text-xl">{currentUser?.email}</p>
                  </div>
                  
                  {currentUser?.bio && (
                    <div>
                      <h2 className="text-lg font-medium text-gray-400">Bio</h2>
                      <p className="text-xl">{currentUser?.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;