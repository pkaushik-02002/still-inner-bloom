
import { Track } from "@/data/tracks";

const YOUTUBE_API_KEY = "AIzaSyC_wVZwmD9FXB_bESl2xLDKO5if8Ev6VpU";

// Map moods to YouTube search queries
const moodToQuery: Record<string, string> = {
  calm: "calming meditation music",
  gratitude: "gratitude meditation music",
  healing: "healing meditation music",
  hope: "hopeful meditation music",
  forgiveness: "peaceful forgiveness meditation",
  energy: "energetic uplifting music",
  focus: "concentration focus music",
  joy: "joyful happy music",
  motivation: "motivational inspiring music",
  reflection: "reflective mindful music"
};

// Language mapping for more specific search results
const languageToKeyword: Record<string, string> = {
  en: "english",
  es: "spanish",
  fr: "french",
  de: "german",
  it: "italian",
  pt: "portuguese",
  hi: "hindi",
  ja: "japanese",
  ko: "korean",
  zh: "chinese",
  ar: "arabic",
  ru: "russian",
  nl: "dutch",
  tr: "turkish",
  sv: "swedish"
};

export async function getYouTubeTracksByMood(mood: string, language: string = 'en'): Promise<Track[]> {
  const query = moodToQuery[mood] || "meditation music";
  const languageKeyword = languageToKeyword[language] || "english";
  
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + " " + languageKeyword)}&type=video&videoCategoryId=10&maxResults=10&key=${YOUTUBE_API_KEY}`
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
