
export interface Mission {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: "breathing" | "gratitude" | "meditation" | "nature" | "reflection";
  completed?: boolean;
  content?: string;
}

export const dailyMissions: Mission[] = [
  {
    id: "morning-breathe",
    title: "Morning Breathing",
    description: "Start your day with intentional breathing to center your mind and prepare for what's ahead.",
    duration: "5 minutes",
    type: "breathing",
    content: "Take 5 minutes to focus on your breath. Inhale for 4 seconds, hold for 4 seconds, exhale for 6 seconds."
  },
  {
    id: "gratitude-list",
    title: "Gratitude Journal",
    description: "Write down three things you're grateful for today, focusing on the small joys.",
    duration: "3 minutes",
    type: "gratitude"
  },
  {
    id: "mindful-walk",
    title: "Mindful Walking",
    description: "Take a short walk outdoors, paying attention to each step and the sensations around you.",
    duration: "10 minutes",
    type: "nature"
  },
  {
    id: "evening-reflection",
    title: "Evening Reflection",
    description: "Reflect on moments of peace you experienced today and how they made you feel.",
    duration: "5 minutes",
    type: "reflection"
  },
  {
    id: "body-scan",
    title: "Body Scan Meditation",
    description: "A guided meditation focusing on each part of your body, releasing tension and creating awareness.",
    duration: "8 minutes",
    type: "meditation"
  }
];
