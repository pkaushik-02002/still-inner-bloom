
export interface Track {
  id: string;
  title: string;
  artist: string;
  mood: string;
  coverImage: string;
  duration: string;
}

export const tracksByMood: Record<string, Track[]> = {
  calm: [
    {
      id: "calm-1",
      title: "Ocean Whispers",
      artist: "Nature Sounds",
      mood: "calm",
      coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      duration: "4:35"
    },
    {
      id: "calm-2",
      title: "Gentle Rain",
      artist: "Ambient Collective",
      mood: "calm",
      coverImage: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f",
      duration: "5:12"
    },
    {
      id: "calm-3",
      title: "Forest Morning",
      artist: "Earth Tones",
      mood: "calm",
      coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      duration: "6:08"
    }
  ],
  gratitude: [
    {
      id: "gratitude-1",
      title: "Thankful Heart",
      artist: "Mindful Melodies",
      mood: "gratitude",
      coverImage: "https://images.unsplash.com/photo-1475113548554-5a36f1f523d6",
      duration: "3:45"
    },
    {
      id: "gratitude-2",
      title: "Simple Gifts",
      artist: "Piano Dreams",
      mood: "gratitude",
      coverImage: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d",
      duration: "4:21"
    }
  ],
  healing: [
    {
      id: "healing-1",
      title: "Inner Light",
      artist: "Crystal Bowls",
      mood: "healing",
      coverImage: "https://images.unsplash.com/photo-1495312040802-a929cd14a6ab",
      duration: "7:19"
    },
    {
      id: "healing-2",
      title: "Soothing Waters",
      artist: "Sound Bath",
      mood: "healing",
      coverImage: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      duration: "8:04"
    }
  ],
  hope: [
    {
      id: "hope-1",
      title: "New Dawn",
      artist: "Sunrise Strings",
      mood: "hope",
      coverImage: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869",
      duration: "4:52"
    },
    {
      id: "hope-2",
      title: "Rising",
      artist: "Horizon",
      mood: "hope",
      coverImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071",
      duration: "5:37"
    }
  ],
  forgiveness: [
    {
      id: "forgiveness-1",
      title: "Let Go",
      artist: "Inner Peace",
      mood: "forgiveness",
      coverImage: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85",
      duration: "6:14"
    },
    {
      id: "forgiveness-2",
      title: "Gentle Release",
      artist: "Soul Journey",
      mood: "forgiveness",
      coverImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0",
      duration: "5:49"
    }
  ]
};
