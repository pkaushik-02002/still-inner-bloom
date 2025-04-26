
export type Platform = 'spotify' | 'youtube';

export interface Track {
  id: string;
  title: string;
  artist: string;
  mood: string;
  coverImage: string;
  duration: string;
  previewUrl?: string;
  platform: Platform;
  videoId?: string; // For YouTube videos
}

