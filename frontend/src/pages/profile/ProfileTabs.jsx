import React from "react";
import ProfileOverview from "./ProfileOverview";
import ContinueWatching from "./ContinueWatching";
import FavouritesList from "./FavouritesList";
import ProfileSettings from "./ProfileSettings";

const ProfileTabs = ({
  activeTab,
  user,
  recentMovies,
  favourites,
  handleUnfavourite,
  onUpdate,
}) => {
  return (
    <div>
      {activeTab === "overview" && (
        <ProfileOverview user={user} recentMovies={recentMovies} />
      )}
      {activeTab === "watching" && (
        <ContinueWatching recentMovies={recentMovies} />
      )}
      {activeTab === "favorites" && (
        <FavouritesList
          favourites={favourites}
          handleUnfavourite={handleUnfavourite}
        />
      )}
      {activeTab === "settings" && (
        <ProfileSettings user={user} onUpdate={onUpdate} />
      )}
    </div>
  );
};

export default ProfileTabs;
