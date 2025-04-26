
import { Track } from "@/data/tracks";

const YOUTUBE_API_KEY = "AIzaSyC_wVZwmD9FXB_bESl2xLDKO5if8Ev6VpU";

// Map moods to YouTube search queries
const moodToQuery: Record<string, string> = {
  calm: "calming meditation music",
  gratitude: "gratitude meditation music",
  healing: "healing meditation music",
  hope: "hopeful meditation music",
  forgiveness: "peaceful forgiveness meditation"
};

export async function getYouTubeTracksByMood(mood: string, language: string = 'en'): Promise<Track[]> {
  const query = moodToQuery[mood] || "meditation music";
  const relevantLanguage = language === 'en' ? '' : ` ${language} music`;
  
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + relevantLanguage)}&type=video&videoCategoryId=10&maxResults=10&key=${YOUTUBE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch videos from YouTube');
  }

  const data = await response.json();
  
  return data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    mood: mood,
    coverImage: item.snippet.thumbnails.high.url,
    duration: "00:00", // YouTube API requires additional call to get duration
    platform: 'youtube' as const,
    videoId: item.id.videoId
  }));
}

