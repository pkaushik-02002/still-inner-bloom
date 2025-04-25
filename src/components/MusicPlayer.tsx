
import { useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface Track {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  duration: string;
}

interface MusicPlayerProps {
  tracks: Track[];
  mood?: string;
}

export function MusicPlayer({ tracks, mood = "calm" }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  
  const currentTrack = tracks[currentTrackIndex];
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => 
      prev === tracks.length - 1 ? 0 : prev + 1
    );
    setProgress(0);
  };
  
  const previousTrack = () => {
    setCurrentTrackIndex((prev) => 
      prev === 0 ? tracks.length - 1 : prev - 1
    );
    setProgress(0);
  };
  
  const updateProgress = (value: number[]) => {
    setProgress(value[0]);
  };
  
  const updateVolume = (value: number[]) => {
    setVolume(value[0]);
  };
  
  return (
    <div className="still-card w-full max-w-md p-6">
      <div className="flex flex-col items-center">
        <div 
          className="h-48 w-48 rounded-lg bg-cover bg-center mb-6 shadow-md"
          style={{ backgroundImage: `url(${currentTrack.coverImage || "/placeholder.svg"})` }}
        />
        
        <h3 className="text-xl font-medium">{currentTrack.title}</h3>
        <p className="text-muted-foreground">{currentTrack.artist}</p>
        
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
            <span>{currentTrack.duration}</span>
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

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
