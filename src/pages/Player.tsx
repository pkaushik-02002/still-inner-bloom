import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { MoodSelector } from "@/components/MoodSelector";
import { MusicPlayer } from "@/components/MusicPlayer";
import { getTracksByMood } from "@/services/musicService";
import { Track } from "@/data/tracks";
import { toast } from "@/components/ui/sonner";

const Player = () => {
  const [currentMood, setCurrentMood] = useState("calm");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setIsLoading(true);
        const fetchedTracks = await getTracksByMood(currentMood);
        setTracks(fetchedTracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        toast.error("Could not load music tracks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTracks();
  }, [currentMood]);
  
  const handleMoodSelect = (mood: string) => {
    setCurrentMood(mood);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-medium mb-2">Mood-Based Music</h1>
            <p className="text-muted-foreground">
              Listen to music curated for different emotional experiences, not just genres.
            </p>
          </div>
          
          <div className="still-card p-6 mb-8">
            <MoodSelector onSelect={handleMoodSelect} />
          </div>
          
          <div className="flex justify-center">
            {isLoading ? (
              <div className="animate-pulse">Loading tracks...</div>
            ) : (
              <MusicPlayer tracks={tracks} mood={currentMood} />
            )}
          </div>
          
          <div className="mt-16">
            <h2 className="text-xl font-medium mb-4">About {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Music</h2>
            
            {currentMood === "calm" && (
              <p className="text-muted-foreground">
                Calm music helps you center your mind and find peace in the present moment. 
                These tracks feature gentle melodies, slow tempos, and natural sounds to create 
                a serene atmosphere for relaxation or meditation.
              </p>
            )}
            
            {currentMood === "gratitude" && (
              <p className="text-muted-foreground">
                Gratitude music inspires appreciation and thankfulness. These uplifting 
                yet gentle compositions help you reflect on life's blessings, both big and small, 
                and cultivate a sense of contentment.
              </p>
            )}
            
            {currentMood === "healing" && (
              <p className="text-muted-foreground">
                Healing music supports emotional recovery and processing. These tracks often 
                incorporate therapeutic sound frequencies and soothing arrangements that help 
                release tension and nurture inner healing.
              </p>
            )}
            
            {currentMood === "hope" && (
              <p className="text-muted-foreground">
                Hope music lifts your spirits and inspires optimism. With gradually building melodies 
                and uplifting progressions, these tracks help you connect with possibilities and 
                envision positive change.
              </p>
            )}
            
            {currentMood === "forgiveness" && (
              <p className="text-muted-foreground">
                Forgiveness music creates space for letting go and making peace. These reflective 
                compositions support the process of release, helping you move forward with compassion 
                for yourself and others.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Player;
