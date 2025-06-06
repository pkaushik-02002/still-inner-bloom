
import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Track } from "@/data/tracks";
import { toast } from "@/components/ui/sonner";
import YouTube from "react-youtube";

interface MusicPlayerProps {
  tracks: Track[];
  mood?: string;
}

export function MusicPlayer({ tracks, mood = "calm" }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const youtubePlayerRef = useRef<any>(null);
  
  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    // Reset player state when tracks change
    setCurrentTrackIndex(0);
    setProgress(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.stopVideo();
    }
  }, [tracks]);

  useEffect(() => {
    if (currentTrack?.platform === 'spotify') {
      if (!currentTrack?.previewUrl) {
        toast.error("No preview available for this track");
        return;
      }

      audioRef.current = new Audio(currentTrack.previewUrl);
      audioRef.current.volume = volume / 100;

      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(percent);
        }
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        nextTrack();
      });

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
        }
      };
    }
  }, [currentTrackIndex, tracks]);

  const togglePlay = () => {
    if (currentTrack?.platform === 'spotify') {
      if (!currentTrack?.previewUrl) {
        toast.error("No preview available for this track");
        return;
      }

      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch(error => {
            console.error('Playback failed:', error);
            toast.error("Playback failed. Please try again.");
          });
        }
      }
    } else if (currentTrack?.platform === 'youtube' && youtubePlayerRef.current) {
      if (isPlaying) {
        youtubePlayerRef.current.pauseVideo();
      } else {
        youtubePlayerRef.current.playVideo();
      }
    }

    setIsPlaying(!isPlaying);
  };
  
  const nextTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.stopVideo();
    }
    setCurrentTrackIndex((prev) => 
      prev === tracks.length - 1 ? 0 : prev + 1
    );
    setProgress(0);
    setIsPlaying(false);
  };
  
  const previousTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.stopVideo();
    }
    setCurrentTrackIndex((prev) => 
      prev === 0 ? tracks.length - 1 : prev - 1
    );
    setProgress(0);
    setIsPlaying(false);
  };
  
  const updateProgress = (value: number[]) => {
    if (currentTrack?.platform === 'spotify' && audioRef.current) {
      const time = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value[0]);
    } else if (currentTrack?.platform === 'youtube' && youtubePlayerRef.current) {
      const duration = youtubePlayerRef.current.getDuration();
      const time = (value[0] / 100) * duration;
      youtubePlayerRef.current.seekTo(time);
      setProgress(value[0]);
    }
  };
  
  const updateVolume = (value: number[]) => {
    if (currentTrack?.platform === 'spotify' && audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    } else if (currentTrack?.platform === 'youtube' && youtubePlayerRef.current) {
      youtubePlayerRef.current.setVolume(value[0]);
    }
    setVolume(value[0]);
  };

  const onYouTubeReady = (event: any) => {
    youtubePlayerRef.current = event.target;
    youtubePlayerRef.current.setVolume(volume);
  };

  const onYouTubeStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.ENDED) {
      setIsPlaying(false);
      nextTrack();
    }
  };

  return (
    <div className="still-card w-full max-w-md p-6">
      <div className="flex flex-col items-center">
        {currentTrack?.platform === 'youtube' ? (
          <div className="h-48 w-48 rounded-lg overflow-hidden shadow-md">
            <YouTube
              videoId={currentTrack.videoId}
              opts={{
                height: '192',
                width: '192',
                playerVars: {
                  autoplay: isPlaying ? 1 : 0,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                },
              }}
              onReady={onYouTubeReady}
              onStateChange={onYouTubeStateChange}
            />
          </div>
        ) : (
          <div 
            className="h-48 w-48 rounded-lg bg-cover bg-center mb-6 shadow-md"
            style={{ backgroundImage: `url(${currentTrack?.coverImage || "/placeholder.svg"})` }}
          />
        )}
        
        <h3 className="text-xl font-medium mt-4">{currentTrack?.title}</h3>
        <p className="text-muted-foreground">{currentTrack?.artist}</p>
        <span className="text-xs text-muted-foreground mt-1">
          {currentTrack?.platform === 'spotify' ? '🎵 Spotify' : '▶️ YouTube'}
        </span>
        
        <div className="w-full mt-6 mb-4">
          <Slider 
            value={[progress]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={updateProgress}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(progress)}</span>
            <span>{currentTrack?.duration}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-4 my-4">
          <Button size="icon" variant="ghost" onClick={previousTrack}>
            <SkipBack className="h-5 w-5" />
          </Button>
          
          <Button 
            size="icon" 
            onClick={togglePlay}
            className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-1" />
            )}
          </Button>
          
          <Button size="icon" variant="ghost" onClick={nextTrack}>
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center w-full mt-2 space-x-4">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider 
            value={[volume]} 
            min={0} 
            max={100} 
            step={1}
            className="w-full"
            onValueChange={updateVolume}
          />
        </div>
      </div>
    </div>
  );
}

function formatTime(percent: number): string {
  // Format time for progress display
  const minutes = Math.floor((percent / 100) * 30 / 60);
  const seconds = Math.floor((percent / 100) * 30 % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

