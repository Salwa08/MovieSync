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
  ChevronDown,
  AlertCircle
} from 'lucide-react';
import './VideoPlayer.css';

const VideoPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
 
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
  
  
  const isYouTubeUrl = (url) => {
    return url && (
      url.includes('youtube.com') || 
      url.includes('youtu.be')
    );
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    
    
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0];
    }
    
    
    if (url.includes('v=')) {
      return url.split('v=')[1].split('&')[0];
    }
    
    
    if (url.includes('/embed/')) {
      return url.split('/embed/')[1].split('?')[0];
    }
    
    return null;
  };

  
  const getYouTubeEmbedUrl = (url) => {
    const videoId = getYouTubeId(url);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1`;
    }
    return null;
  };
  

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        console.log(`Fetching movie data for ID: ${id}`);
        
        
        const response = await axios.get(`http://localhost:8000/videos/films/${id}/`);
        console.log('Movie data:', response.data);
        setMovie(response.data);
        
        
        if (!response.data.Video && (!response.data.qualities || response.data.qualities.length === 0)) {
          console.warn('No video sources found in the movie data');
          
          
          setError('This movie does not have a video source. Using a sample video instead.');
          
          
          setMovie({
            ...response.data,
            Video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          });
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
  
  
  const getCurrentVideoUrl = () => {
    if (!movie) return '';
    
  
    if (movie.qualities && movie.qualities.length > 0) {
      const qualityOption = movie.qualities.find(q => q.quality === selectedQuality);
      if (qualityOption && qualityOption.video_url) {
        console.log(`Using quality option: ${selectedQuality}`, qualityOption.video_url);
        return qualityOption.video_url;
      }
    }
    
    
    if (movie.Video) {
      console.log('Using movie.Video:', movie.Video);
      return movie.Video;
    }
    
    
    console.log('No valid video URL found, using fallback');
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  };
  
 
  useEffect(() => {
    if (!videoRef.current) return;
    
    const videoElement = videoRef.current;
    
    const onTimeUpdate = () => setCurrentTime(videoElement.currentTime);
    const onDurationChange = () => setDuration(videoElement.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onVolumeChange = () => {
      setVolume(videoElement.volume);
      setMuted(videoElement.muted);
    };
    const onWaiting = () => setBufferingState(true);
    const onCanPlay = () => setBufferingState(false);
    const onError = (e) => {
      console.error('Video element error:', e);
      setError('The video could not be loaded. Trying fallback...');
      
      // Try a fallback video
      if (videoRef.current) {
        videoRef.current.src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
        videoRef.current.load();
      }
    };
    
    videoElement.addEventListener('timeupdate', onTimeUpdate);
    videoElement.addEventListener('durationchange', onDurationChange);
    videoElement.addEventListener('play', onPlay);
    videoElement.addEventListener('pause', onPause);
    videoElement.addEventListener('volumechange', onVolumeChange);
    videoElement.addEventListener('waiting', onWaiting);
    videoElement.addEventListener('canplay', onCanPlay);
    videoElement.addEventListener('error', onError);
    
    return () => {
      videoElement.removeEventListener('timeupdate', onTimeUpdate);
      videoElement.removeEventListener('durationchange', onDurationChange);
      videoElement.removeEventListener('play', onPlay);
      videoElement.removeEventListener('pause', onPause);
      videoElement.removeEventListener('volumechange', onVolumeChange);
      videoElement.removeEventListener('waiting', onWaiting);
      videoElement.removeEventListener('canplay', onCanPlay);
      videoElement.removeEventListener('error', onError);
    };
  }, [videoRef]);
  
  
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
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
        });
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
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  

  if (loading) {
    return (
      <div className="bg-black h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-red-600"></div>
      </div>
    );
  }

  
  const currentVideoUrl = getCurrentVideoUrl();
  const isYouTubeVideo = isYouTubeUrl(currentVideoUrl);
  const youtubeEmbedUrl = isYouTubeVideo ? getYouTubeEmbedUrl(currentVideoUrl) : null;
  
 
  return (
    <div 
      ref={playerRef}
      className={`relative bg-black h-screen w-screen ${fullscreen ? 'fullscreen' : ''}`}
      onMouseMove={() => {
        setShowControls(true);
        clearTimeout(controlsTimerRef.current);
        
        if (playing && !isYouTubeVideo) {
          controlsTimerRef.current = setTimeout(() => {
            setShowControls(false);
          }, 3000);
        }
      }}
    >
      
      <div className="absolute top-4 left-4 z-50">
        <button 
          onClick={() => navigate(`/home/${id}`)}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
        >
          <ArrowLeft size={24} />
        </button>
      </div>
      
     
      {isYouTubeVideo && youtubeEmbedUrl ? (
        <div className="w-full h-full">
          <iframe 
            className="w-full h-full"
            src={youtubeEmbedUrl}
            title={movie?.Titre || "Movie"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        
        <>
          
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-contain"
            poster={movie?.Poster}
            onClick={togglePlay}
            autoPlay
          >
            
            <source src={currentVideoUrl} type="video/mp4" />
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          
          
          {error && (
            <div className="absolute top-4 right-4 bg-red-600 text-white p-4 rounded-lg max-w-sm">
              <div className="flex items-start">
                <AlertCircle className="mr-2 flex-shrink-0 mt-0.5" size={20} />
                <p>{error}</p>
              </div>
            </div>
          )}
          
          
          {bufferingState && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-red-600"></div>
            </div>
          )}
          
          
          {!playing && (
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       bg-red-600 bg-opacity-70 rounded-full p-6 cursor-pointer hover:bg-opacity-80"
              onClick={togglePlay}
            >
              <Play size={32} className="text-white" />
            </div>
          )}
          
          
          <div 
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent
                      transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
          >
            
            <div 
              className="w-full h-1.5 bg-gray-600 cursor-pointer mb-4 rounded"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-red-600 rounded"
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
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
                </div>
              </div>
              
              
              <div className="flex items-center">
                
                <button 
                  onClick={toggleFullscreen}
                  className="text-white hover:text-red-500"
                >
                  <Maximize size={22} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayerPage;