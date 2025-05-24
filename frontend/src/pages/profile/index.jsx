// Main profile page: handles tab routing and layout
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProfileOverview from "./ProfileOverview";
import FavouritesList from "./FavouritesList";
import Notifications from "./Notifications";
import Settings from "./Settings";
import AccountSecurity from "./AccountSecurity";
import Subscription from "./Subscription";
import WatchHistory from "./WatchHistory";
import Navbar from "../navbar/Navbar";

const ProfileIndex = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  const renderTab = () => {
    switch (currentTab) {
      case "overview":
        return <ProfileOverview />;
      case "favourites":
        return <FavouritesList />;
      case "notifications":
        return <Notifications />;
      case "settings":
        return <Settings />;
      case "security":
        return <AccountSecurity />;
      case "subscription":
        return <Subscription />;
      case "history":
        return <WatchHistory />;
      default:
        return <ProfileOverview />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="fixed inset-0 bg-black min-h-screen min-w-full flex items-center justify-center pt-20">
        <div className="w-full h-full max-w-5xl mx-auto bg-gray-900 rounded-xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row gap-8 overflow-auto">
          <div className="md:w-1/4 w-full mb-4 md:mb-0">
            <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </div>
          <div className="flex-1">{renderTab()}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileIndex;
