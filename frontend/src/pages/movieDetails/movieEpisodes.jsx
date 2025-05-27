import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";

const MovieEpisodes = ({ movie }) => {
  const [seasons, setSeasons] = useState([]);
  const [activeSeason, setActiveSeason] = useState(1);
  const [loading, setLoading] = useState(true);


  
  const extractSeasonNumber = (seasonString) => {
    if (!seasonString) return null;
    const match = seasonString.match(/_S(\d+)/);
    return match ? parseInt(match[1]) : 1;
  };

  useEffect(() => {
    if (movie?.id) {
      setLoading(true);
      const serieTitle = movie.Titre;
     
      const dummyEpisodes = [
        {
          Season: `${serieTitle}_S1`,
          Nb_episode: 1,
          Video: "https://www.youtube.com/watch?v=510325",
        },
        {
          Season: `${serieTitle}_S1`,
          Nb_episode: 2,
          Video: "https://www.youtube.com/watch?v=510326",
        },
        {
          Season: `${serieTitle}_S1`,
          Nb_episode: 3,
          Video: "https://www.youtube.com/watch?v=510327",
        },
        {
          Season: `${serieTitle}_S2`,
          Nb_episode: 1,
          Video: "https://www.youtube.com/watch?v=1906861",
        },
        {
          Season: `${serieTitle}_S2`,
          Nb_episode: 2,
          Video: "https://www.youtube.com/watch?v=1906862",
        },
        {
          Season: `${serieTitle}_S2`,
          Nb_episode: 3,
          Video: "https://www.youtube.com/watch?v=1906863",
        },
      ];
    
      const episodesBySeason = {};
      dummyEpisodes.forEach((episode) => {
        const seasonNum = extractSeasonNumber(episode.Season);
        if (!seasonNum) return;
        if (!episodesBySeason[seasonNum]) {
          episodesBySeason[seasonNum] = [];
        }
        episodesBySeason[seasonNum].push({
          id: `${episode.Season}-${episode.Nb_episode}`,
          Title: `Episode ${episode.Nb_episode}`,
          EpisodeNumber: episode.Nb_episode,
          Video: episode.Video,
          Duration: 45, // Placeholder duration
          Thumbnail: movie.Poster,
          Description: `Episode ${episode.Nb_episode} of ${movie.Titre} Season ${seasonNum}`,
        });
      });
      
      const seasonArray = Object.keys(episodesBySeason)
        .map((seasonNum) => ({
          seasonNumber: parseInt(seasonNum),
          episodes: episodesBySeason[seasonNum].sort(
            (a, b) => a.EpisodeNumber - b.EpisodeNumber
          ),
        }))
        .sort((a, b) => a.seasonNumber - b.seasonNumber);
      if (seasonArray.length > 0) {
        setSeasons(seasonArray);
        setActiveSeason(seasonArray[0].seasonNumber);
      } else {
        setSeasons([]);
      }
      setLoading(false);
    }
  }, [movie]);

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!seasons.length) {
    return (
      <div className="p-8 text-white">No episodes found for this series.</div>
    );
  }

  const currentSeason = seasons.find((s) => s.seasonNumber === activeSeason);

  return (
    <div className="p-8 text-white">
      <div className="flex gap-4 mb-6">
        {seasons.map((season) => (
          <button
            key={season.seasonNumber}
            onClick={() => setActiveSeason(season.seasonNumber)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              activeSeason === season.seasonNumber
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-red-700 hover:text-white"
            }`}
          >
            Season {season.seasonNumber}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentSeason.episodes.map((episode) => (
          <div
            key={episode.id}
            className="bg-gray-900 rounded-lg shadow-lg flex overflow-hidden"
          >
            <div className="w-1/3 min-w-[120px] max-w-[160px]">
              <img
                src={episode.Thumbnail}
                alt={episode.Title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold">{episode.Title}</span>
                  <a
                    href={episode.Video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold transition-colors"
                  >
                    <FaPlay /> Watch
                  </a>
                </div>
                <span className="text-sm text-gray-400">
                  {episode.Duration} min
                </span>
              </div>
              <p className="text-gray-400 mt-2">
                {episode.Description || "No description available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieEpisodes;
