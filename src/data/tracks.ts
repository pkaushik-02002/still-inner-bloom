export interface Track {
  id: string;
  title: string;
  artist: string;
  mood: string;
  coverImage: string;
  duration: string;
  previewUrl?: string;
}

// Remove the tracksByMood object since we're now using dynamic data
