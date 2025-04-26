
import { useState } from "react";

interface MoodOption {
  id: string;
  label: string;
  color: string;
  description: string;
}

export function MoodSelector({ onSelect }: { onSelect: (mood: string) => void }) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  const moods: MoodOption[] = [
    { 
      id: "calm", 
      label: "Calm", 
      color: "bg-still-sky",
      description: "Peaceful melodies to center your mind and body."
    },
    { 
      id: "gratitude", 
      label: "Gratitude", 
      color: "bg-still-sage",
      description: "Music that inspires thankfulness and appreciation."
    },
    { 
      id: "healing", 
      label: "Healing", 
      color: "bg-still-lavender",
      description: "Therapeutic sounds for emotional recovery."
    },
    { 
      id: "hope", 
      label: "Hope", 
      color: "bg-still-peach",
      description: "Uplifting tunes to nurture optimism and possibility."
    },
    { 
      id: "forgiveness", 
      label: "Forgiveness", 
      color: "bg-still-clay",
      description: "Reflective melodies to release and let go."
    },
    { 
      id: "energy", 
      label: "Energy", 
      color: "bg-still-sky",
      description: "Dynamic rhythms to boost vitality and motivation."
    },
    { 
      id: "focus", 
      label: "Focus", 
      color: "bg-still-sage",
      description: "Consistent sounds for concentration and productivity."
    },
    { 
      id: "joy", 
      label: "Joy", 
      color: "bg-still-lavender",
      description: "Uplifting melodies to celebrate happiness."
    },
    { 
      id: "motivation", 
      label: "Motivation", 
      color: "bg-still-peach",
      description: "Powerful progressions to inspire action."
    },
    { 
      id: "reflection", 
      label: "Reflection", 
      color: "bg-still-clay",
      description: "Thoughtful compositions for introspection."
    }
  ];
  
  const selectMood = (moodId: string) => {
    setSelectedMood(moodId);
    onSelect(moodId);
  };
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-4">How are you feeling today?</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => selectMood(mood.id)}
            className={`mood-button flex flex-col items-center justify-center h-24 ${
              selectedMood === mood.id 
                ? `${mood.color} text-white ring-2 ring-offset-2 ring-offset-background` 
                : `${mood.color}/20 hover:${mood.color}/40`
            }`}
          >
            <span className="font-medium">{mood.label}</span>
            {selectedMood === mood.id && (
              <span className="text-xs mt-1 max-w-[90%] overflow-hidden text-ellipsis">
                {mood.description}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
