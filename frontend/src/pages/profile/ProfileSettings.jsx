import React, { useState } from "react";
import {
  FaUserCircle,
  FaRegEnvelope,
  FaRegCreditCard,
  FaEdit,
} from "react-icons/fa";

const ProfileSettings = ({ user, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setForm({ name: user.name, email: user.email });
    setEditMode(false);
    setError(null);
  };
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      // PATCH to backend
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        "http://localhost:8000/users/api/profile-update/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Failed to update profile");
      const data = await res.json();
      if (onUpdate) await onUpdate(data);
      setEditMode(false);
    } catch (e) {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaUserCircle className="w-5 h-5 text-red-500 mr-2" />
          Profile Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium flex items-center gap-1">
              <FaUserCircle className="inline w-4 h-4 text-gray-400" /> Full
              Name
            </label>
            <div className="flex items-center gap-2 mt-1">
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white"
                  disabled={saving}
                />
              ) : (
                <span className="flex-1">{user.name}</span>
              )}
              {!editMode && (
                <button
                  className="border border-gray-600 rounded p-1 hover:bg-gray-800"
                  onClick={handleEdit}
                  aria-label="Edit name"
                >
                  <FaEdit className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium flex items-center gap-1">
              <FaRegEnvelope className="inline w-4 h-4 text-gray-400" /> Email
            </label>
            <div className="flex items-center gap-2 mt-1">
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white"
                  disabled={saving}
                />
              ) : (
                <span className="flex-1">{user.email}</span>
              )}
            </div>
          </div>
          {editMode && (
            <div className="flex gap-2 mt-2">
              <button
                className="bg-red-600 hover:bg-red-700 rounded px-4 py-1 text-white font-medium"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                className="bg-gray-700 hover:bg-gray-800 rounded px-4 py-1 text-white font-medium"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>
              {error && <span className="text-red-500 ml-2">{error}</span>}
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaRegCreditCard className="w-5 h-5 text-red-500 mr-2" />
          Subscription
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">
                {user.subscription?.name || "Free"} Plan
              </div>
              <div className="text-sm text-gray-400">
                {user.subscription?.price
                  ? `$${user.subscription.price}/month`
                  : "Free"}
              </div>
            </div>
            <span
              className={`px-2 py-1 rounded text-sm ${
                user.subscription?.active
                  ? "bg-red-600 text-white"
                  : "bg-gray-600 text-gray-200"
              }`}
            >
              {user.subscription?.active ? "Active" : "Inactive"}
            </span>
          </div>
          <button className="w-full bg-red-600 hover:bg-red-700 rounded py-2 font-medium">
            Manage Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
