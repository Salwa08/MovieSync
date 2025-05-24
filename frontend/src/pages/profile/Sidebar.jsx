// Sidebar navigation for profile subpages
import React from "react";

const Sidebar = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { key: "overview", label: "Profile Overview" },
    { key: "favourites", label: "Favourites" },
    { key: "notifications", label: "Notifications" },
    { key: "settings", label: "Settings" },
    { key: "security", label: "Account Security" },
    { key: "subscription", label: "Subscription" },
    { key: "history", label: "Watch History" },
  ];
  return (
    <nav className="flex md:flex-col gap-2 md:gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`px-4 py-2 rounded-full text-left transition font-medium ${
            currentTab === tab.key
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-gray-200 hover:bg-gray-700"
          }`}
          onClick={() => setCurrentTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default Sidebar;
