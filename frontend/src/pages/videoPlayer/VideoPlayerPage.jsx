import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  ArrowLeft,
  ChevronDown
} from 'lucide-react';
import './VideoPlayer.css';

const VideoPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Player state
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('720p');
  const [showControls, setShowControls] = useState(true);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [bufferingState, setBufferingState] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimerRef = useRef(null);
  

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/videos/films/${id}/stream/`);
        console.log("Video data:", response.data);
        
      
        const movieData = response.data;
        
        if (!movieData.video_url && 
            (!movieData.qualities || movieData.qualities.length === 0)) {
          console.error("No video URLs available");
          setError("This movie doesn't have any video sources available.");
        } else {
          setMovie(movieData);
          
          
          if (movieData.qualities && movieData.qualities.length > 0) {
           
            const quality720 = movieData.qualities.find(q => q.quality === '720p');
            if (quality720) {
              setSelectedQuality('720p');
            } else {
             
              setSelectedQuality(movieData.qualities[0].quality);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Failed to load the video. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieData();
  }, [id]);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;
    
    const onTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };
    
    const onDurationChange = () => {
      setDuration(videoElement.duration);
    };
    
    const onPlay = () => {
      setPlaying(true);
    };
    
    const onPause = () => {
      setPlaying(false);
    };
    
    const onVolumeChange = () => {
      setVolume(videoElement.volume);
      setMuted(videoElement.muted);
    };
    
    const onWaiting = () => {
      setBufferingState(true);
    };
    
    const onCanPlay = () => {
      setBufferingState(false);
    };
    
    videoElement.addEventListener('timeupdate', onTimeUpdate);
    videoElement.addEventListener('durationchange', onDurationChange);
    videoElement.addEventListener('play', onPlay);
    videoElement.addEventListener('pause', onPause);
    videoElement.addEventListener('volumechange', onVolumeChange);
    videoElement.addEventListener('waiting', onWaiting);
    videoElement.addEventListener('canplay', onCanPlay);
    
    return () => {
      videoElement.removeEventListener('timeupdate', onTimeUpdate);
      videoElement.removeEventListener('durationchange', onDurationChange);
      videoElement.removeEventListener('play', onPlay);
      videoElement.removeEventListener('pause', onPause);
      videoElement.removeEventListener('volumechange', onVolumeChange);
      videoElement.removeEventListener('waiting', onWaiting);
      videoElement.removeEventListener('canplay', onCanPlay);
    };
  }, [movie]);
  
  
  useEffect(() => {
    if (playing) {
     
      controlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      
      clearTimeout(controlsTimerRef.current);
      setShowControls(true);
    }
    
    return () => {
      clearTimeout(controlsTimerRef.current);
    };
  }, [playing, showControls]);
  
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    return [
      h > 0 ? h : null,
      h > 0 ? m.toString().padStart(2, '0') : m,
      s.toString().padStart(2, '0')
    ].filter(Boolean).join(':');
  };
  
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
    }
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };
  
  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
    }
  };
  
  const changeQuality = (quality) => {
    
    const currentTimePosition = videoRef.current?.currentTime || 0;
    const wasPlaying = playing;
    
    setSelectedQuality(quality);
    setShowQualityMenu(false);
    
    
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.currentTime = currentTimePosition;
        if (wasPlaying) videoRef.current.play();
      }, { once: true });
    }
  };
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  
  
  const getCurrentVideoUrl = () => {
    if (!movie) return '';
    
  
    if (movie.qualities && movie.qualities.length > 0) {
      const qualityOption = movie.qualities.find(q => q.quality === selectedQuality);
      if (qualityOption && qualityOption.video_url) {
        return qualityOption.video_url;
      }
    }
    
   
    if (movie.video_url) {
      return movie.video_url;
    }
    
   
    console.log("No video URL found, using demo video");
    return "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4";
  };
  
  
  if (loading) {
    return (
      <div className="bg-black h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-red-600"></div>
      </div>
    );
  }
  
  
  if (error) {
    return (
      <div className="bg-black h-screen w-screen flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Video Unavailable</h2>
        <p className="mb-8 text-center">{error}</p>
        <button
          onClick={() => navigate(`/home/${id}`)}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full transition-colors"
        >
          Back to Movie
        </button>
      </div>
    );
  }
  
  
  return (
    <div 
      ref={playerRef}
      className={`relative bg-black h-screen w-screen ${fullscreen ? 'fullscreen' : ''}`}
      onMouseMove={() => {
        setShowControls(true);
        clearTimeout(controlsTimerRef.current);
        
        if (playing) {
          controlsTimerRef.current = setTimeout(() => {
            setShowControls(false);
          }, 3000);
        }
      }}
    >
     
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-contain"
        src={getCurrentVideoUrl()}
        poster={movie?.Poster}
        onClick={togglePlay}
        autoPlay
      />
      
      
      {bufferingState && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-red-600"></div>
        </div>
      )}
      
      
      {playing && showControls && (
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-red-600 bg-opacity-70 rounded-full p-5 transition-opacity duration-300"
          style={{ opacity: 0.7 }}
        >
          <Pause size={30} className="text-white" />
        </div>
      )}
      
      {!playing && (
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-red-600 bg-opacity-70 rounded-full p-5 cursor-pointer hover:bg-opacity-80"
          onClick={togglePlay}
        >
          <Play size={30} className="text-white" />
        </div>
      )}
      
  
      <div 
        className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent
                   transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex items-center">
          <button 
            onClick={() => navigate(`/home/${id}`)} 
            className="text-white hover:text-red-500 mr-4"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">{movie?.Titre}</h1>
        </div>
      </div>
      
      
      <div 
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent
                   transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        
        <div 
          className="w-full h-1 bg-gray-600 cursor-pointer mb-4"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-red-600"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        
        
        <div className="flex items-center justify-between">
          
          <div className="flex items-center">
            <button onClick={togglePlay} className="mr-4 text-white hover:text-red-500">
              {playing ? <Pause size={22} /> : <Play size={22} />}
            </button>
            
            
            <div className="flex items-center mr-4">
              <button onClick={toggleMute} className="text-white hover:text-red-500 mr-2">
                {muted || volume === 0 ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 md:w-24 slider"
              />
            </div>
            
            
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          
          <div className="flex items-center">
            
            <div className="relative mr-4">
              <button 
                className="text-white flex items-center hover:text-red-500"
                onClick={() => setShowQualityMenu(!showQualityMenu)}
              >
                <Settings size={20} className="mr-1" />
                <span className="hidden sm:inline mr-1">{selectedQuality}</span>
                <ChevronDown size={16} />
              </button>
              
              
              {showQualityMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-md shadow-lg overflow-hidden">
                  {movie?.qualities?.map((q) => (
                    <button
                      key={q.quality}
                      className={`block w-full text-left px-4 py-2 
                                ${q.quality === selectedQuality ? 'bg-red-600 text-white' : 'text-white hover:bg-gray-800'}`}
                      onClick={() => changeQuality(q.quality)}
                    >
                      {q.quality}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-red-500"
            >
              <Maximize size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;