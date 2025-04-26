
import { Track, Platform } from "@/data/tracks";
import { getYouTubeTracksByMood } from "./youtubeService";

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
    forgiveness: ['classical', 'ambient']
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
    zh: 'CN'
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

export async function getAllTracksByMood(mood: string, language: string = 'en'): Promise<Track[]> {
  try {
    const [spotifyTracks, youtubeTracks] = await Promise.all([
      getSpotifyTracksByMood(mood, language).catch(() => []),
      getYouTubeTracksByMood(mood, language).catch(() => [])
    ]);

    return [...spotifyTracks, ...youtubeTracks];
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
}

