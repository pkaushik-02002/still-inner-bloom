
import { Track, Platform } from "@/data/tracks";
import { getYouTubeTracksByMood } from "./youtubeService";
import { toast } from "@/components/ui/sonner";
import { User } from "firebase/auth";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function getSpotifyToken(): Promise<string> {
  const clientId = "3b7babf26bc44cee9c7261231489b206";
  const clientSecret = "0f116dcdcbe44e5c86701156241a8b83";
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to get Spotify token');
  }

  const data: SpotifyTokenResponse = await response.json();
  return data.access_token;
}

export async function getSpotifyTracksByMood(mood: string, language: string = 'en'): Promise<Track[]> {
  const token = await getSpotifyToken();
  
  const moodToGenre: Record<string, string[]> = {
    calm: ['ambient', 'sleep', 'meditation'],
    gratitude: ['classical', 'world-music'],
    healing: ['meditation', 'nature'],
    hope: ['inspirational', 'gospel'],
    forgiveness: ['classical', 'ambient'],
    energy: ['edm', 'dance', 'workout'],
    focus: ['instrumental', 'study', 'concentration'],
    joy: ['pop', 'happy', 'upbeat'],
    motivation: ['rock', 'power', 'motivation'],
    reflection: ['chillout', 'acoustic', 'piano']
  };

  const languageToMarket: Record<string, string> = {
    en: 'US',
    es: 'ES',
    fr: 'FR',
    de: 'DE',
    it: 'IT',
    pt: 'PT',
    hi: 'IN',
    ja: 'JP',
    ko: 'KR',
    zh: 'CN',
    ar: 'SA',
    ru: 'RU',
    nl: 'NL',
    tr: 'TR',
    sv: 'SE'
  };

  const genres = moodToGenre[mood] || ['ambient'];
  const market = languageToMarket[language] || 'US';
  
  const response = await fetch(
    `https://api.spotify.com/v1/recommendations?seed_genres=${genres.join(',')}&limit=10&market=${market}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch tracks from Spotify');
  }

  const data = await response.json();
  
  return data.tracks.map((track: any) => ({
    id: track.id,
    title: track.name,
    artist: track.artists[0].name,
    mood: mood,
    coverImage: track.album.images[0]?.url || '/placeholder.svg',
    duration: formatDuration(track.duration_ms),
    previewUrl: track.preview_url,
    platform: 'spotify' as const
  }));
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export async function getAllTracksByMood(
  mood: string, 
  language: string = 'en', 
  currentUser: User | null = null
): Promise<Track[]> {
  // Check if user is authenticated
  if (!currentUser) {
    toast.error("Please sign in to access music recommendations");
    return [];
  }
  
  try {
    // Deduct tokens when fetching music
    const userTokensUpdated = await updateUserTokens(currentUser.uid, -10);
    
    if (!userTokensUpdated) {
      toast.error("Insufficient tokens to play music");
      return [];
    }
    
    const [spotifyTracks, youtubeTracks] = await Promise.all([
      getSpotifyTracksByMood(mood, language).catch(() => []),
      getYouTubeTracksByMood(mood, language).catch(() => [])
    ]);

    return [...spotifyTracks, ...youtubeTracks];
  } catch (error) {
    console.error('Error fetching tracks:', error);
    toast.error("Error loading music tracks. Please try again later.");
    return [];
  }
}

// Function to update user tokens in Firestore
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getUserTokens(userId: string): Promise<number> {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data().tokens || 0;
    } else {
      // Initialize tokens for new users
      await setDoc(userRef, { tokens: 1000 }, { merge: true });
      return 1000;
    }
  } catch (error) {
    console.error("Error getting user tokens:", error);
    return 0;
  }
}

export async function updateUserTokens(userId: string, amount: number): Promise<boolean> {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    let currentTokens = 0;
    
    if (userDoc.exists()) {
      currentTokens = userDoc.data().tokens || 0;
    } else {
      // Initialize tokens for new users
      currentTokens = 1000;
      await setDoc(userRef, { tokens: currentTokens }, { merge: true });
    }
    
    // Check if user has enough tokens
    if (currentTokens + amount < 0) {
      toast.error("Not enough tokens remaining");
      return false;
    }
    
    // Update tokens
    await updateDoc(userRef, {
      tokens: currentTokens + amount
    });
    
    return true;
  } catch (error) {
    console.error("Error updating user tokens:", error);
    return false;
  }
}
