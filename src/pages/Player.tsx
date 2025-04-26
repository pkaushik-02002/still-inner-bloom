
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { MoodSelector } from "@/components/MoodSelector";
import { MusicPlayer } from "@/components/MusicPlayer";
import { getAllTracksByMood, getUserTokens } from "@/services/musicService";
import { Track } from "@/data/tracks";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Volume2, Headphones } from "lucide-react";

const Player = () => {
  const [currentMood, setCurrentMood] = useState("calm");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userTokens, setUserTokens] = useState<number | null>(null);
  const { currentUser } = useAuth();
  
  // Fetch user tokens on component mount and when user changes
  useEffect(() => {
    const fetchTokens = async () => {
      if (currentUser) {
        try {
          const tokens = await getUserTokens(currentUser.uid);
          setUserTokens(tokens);
        } catch (error) {
          console.error("Error fetching user tokens:", error);
        }
      } else {
        setUserTokens(null);
      }
    };
    
    fetchTokens();
  }, [currentUser]);
  
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setIsLoading(true);
        if (!currentUser) {
          setTracks([]);
          return;
        }
        
        const fetchedTracks = await getAllTracksByMood(currentMood, currentLanguage, currentUser);
        setTracks(fetchedTracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        toast.error("Could not load music tracks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTracks();
  }, [currentMood, currentLanguage, currentUser]);
  
  const handleMoodSelect = (mood: string) => {
    setCurrentMood(mood);
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <MoodSelector onSelect={handleMoodSelect} />
              
              <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="ko">Korean</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                  <SelectItem value="nl">Dutch</SelectItem>
                  <SelectItem value="tr">Turkish</SelectItem>
                  <SelectItem value="sv">Swedish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {currentUser ? (
            <div className="mb-6 p-4 rounded-md bg-secondary/30 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-primary" />
                <span>Music Token Balance: <strong>{userTokens}</strong></span>
              </div>
              <span className="text-sm text-muted-foreground">-10 tokens per search</span>
            </div>
          ) : null}

          <div className="flex justify-center">
            {!currentUser ? (
              <div className="still-card p-8 flex flex-col items-center gap-4">
                <Shield className="h-12 w-12 text-muted-foreground opacity-60" />
                <h3 className="text-xl font-medium">Authentication Required</h3>
                <p className="text-center text-muted-foreground">
                  Please sign in to access mood-based music recommendations.
                </p>
                <div className="flex gap-3 mt-2">
                  <Button variant="outline" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Join Still</Link>
                  </Button>
                </div>
              </div>
            ) : isLoading ? (
              <div className="animate-pulse flex flex-col items-center">
                <Volume2 className="h-12 w-12 animate-pulse text-muted-foreground" />
                <div className="mt-4">Loading tracks...</div>
              </div>
            ) : tracks.length > 0 ? (
              <MusicPlayer tracks={tracks} mood={currentMood} />
            ) : (
              <div className="text-center p-6">
                <p>No tracks found for this mood and language. Try a different combination.</p>
              </div>
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
            
            {currentMood === "energy" && (
              <p className="text-muted-foreground">
                Energy music revitalizes your body and mind with dynamic rhythms and upbeat tempos.
                These tracks are designed to invigorate, motivate, and boost your physical and mental energy.
              </p>
            )}
            
            {currentMood === "focus" && (
              <p className="text-muted-foreground">
                Focus music enhances concentration and productivity. With consistent rhythms and minimal
                distractions, these tracks help maintain attention and create an optimal environment for work or study.
              </p>
            )}
            
            {currentMood === "joy" && (
              <p className="text-muted-foreground">
                Joy music celebrates happiness and elevates your mood. These uplifting and playful
                compositions encourage feelings of delight, pleasure, and pure enjoyment of the moment.
              </p>
            )}
            
            {currentMood === "motivation" && (
              <p className="text-muted-foreground">
                Motivation music inspires action and determination. With powerful progressions and
                encouraging themes, these tracks help overcome inertia and fuel your drive toward goals.
              </p>
            )}
            
            {currentMood === "reflection" && (
              <p className="text-muted-foreground">
                Reflection music creates space for introspection and contemplation. These thoughtful
                compositions support inner exploration and mindful awareness of your thoughts and feelings.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Player;
