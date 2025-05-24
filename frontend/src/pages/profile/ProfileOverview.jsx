// Profile overview: view/edit profile, upload profile pic
import React from "react";
import { FaClock, FaFilm, FaRegCalendarAlt } from "react-icons/fa";

const ProfileOverview = ({ user, recentMovies }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaClock className="text-red-500 w-5 h-5 mr-2" />
          Recently Watched
        </h3>
        <div className="space-y-4">
          {recentMovies.map((movie, index) => (
            <div
              key={`overview-${movie.id}-${index}`}
              className="flex items-center gap-3"
            >
              <img
                src={
                  movie.poster ||
                  movie.Poster ||
                  "https://via.placeholder.com/60x90?text=Movie"
                }
                alt={movie.title || movie.Titre}
                width={60}
                height={90}
                className="rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium">{movie.title || movie.Titre}</h4>
                <p className="text-sm text-gray-400">
                  {movie.genre || movie.Genre}
                </p>
                {movie.progress && movie.progress < 100 && (
                  <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                    <div
                      className="bg-red-600 h-1 rounded-full"
                      style={{ width: `${movie.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <button className="bg-red-600 hover:bg-red-700 rounded-full p-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Viewing Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-800 rounded-lg">
            <FaFilm className="inline-block text-red-500 w-8 h-8 mb-2" />
            <div className="text-2xl font-bold">{user.moviesWatched}</div>
            <div className="text-sm text-gray-400">Total Movies</div>
          </div>
          <div className="text-center p-4 bg-gray-800 rounded-lg">
            <FaRegCalendarAlt className="inline-block text-red-500 w-8 h-8 mb-2" />
            <div className="text-2xl font-bold">{user.moviesThisMonth}</div>
            <div className="text-sm text-gray-400">This Month</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileOverview;
