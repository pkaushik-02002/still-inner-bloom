
import { Track } from "@/data/tracks";

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

  const data: SpotifyTokenResponse = await response.json();
  return data.access_token;
}

export async function getTracksByMood(mood: string): Promise<Track[]> {
  const token = await getSpotifyToken();
  
  // Map moods to Spotify genres/seeds
  const moodToGenre: Record<string, string> = {
    calm: 'ambient,sleep',
    gratitude: 'classical,world-music',
    healing: 'meditation,nature',
    hope: 'inspirational,gospel',
    forgiveness: 'classical,ambient'
  };

  const genre = moodToGenre[mood] || 'ambient';
  
  const response = await fetch(
    `https://api.spotify.com/v1/recommendations?seed_genres=${genre}&limit=5`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  
  return data.tracks.map((track: any) => ({
    id: track.id,
    title: track.name,
    artist: track.artists[0].name,
    mood: mood,
    coverImage: track.album.images[0]?.url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    duration: formatDuration(track.duration_ms)
  }));
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

