
import { Clock, Music, Heart, MessageSquare, BookOpen } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="still-card p-6 hover:shadow-md animate-fade-in">
      <div className="h-12 w-12 rounded-full bg-primary/20 dark:bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function Features() {
  return (
    <section className="py-24 px-4" id="features">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-medium mb-4">Cultivate Real Happiness</h2>
          <p className="text-muted-foreground">
            Still offers a unique approach to mindfulness and emotional well-being,
            focusing on genuine connection rather than digital stimulation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Feature 
            icon={<Clock className="h-6 w-6 text-primary" />}
            title="Daily Stillness Missions"
            description="Small, calming tasks like mindful breathing, gratitude writing, and silent walks to center your mind."
          />
          
          <Feature 
            icon={<Music className="h-6 w-6 text-primary" />}
            title="Mood-Based Music Player"
            description="Music recommendations based on emotions like Calm, Gratitude, Healing, Hope, and Forgiveness."
          />
          
          <Feature 
            icon={<Heart className="h-6 w-6 text-primary" />}
            title="Personal Mindful Garden"
            description="Grow a visual garden based on completed missions, a private space without followers or likes."
          />
          
          <Feature 
            icon={<MessageSquare className="h-6 w-6 text-primary" />}
            title="Slow Connection Rooms"
            description="Emotional discussion spaces with intentional, slow conversation pacing for meaningful exchanges."
          />
          
          <Feature 
            icon={<BookOpen className="h-6 w-6 text-primary" />}
            title="Mood Journaling"
            description="Private emotional reflection, optionally linked to music memories to enhance your mindfulness practice."
          />
          
          <Feature 
            icon={<Music className="h-6 w-6 text-primary" />}
            title="Breathe with the Beat"
            description="Animated breathing exercises synchronized with music tempo to help you find your center."
          />
        </div>
      </div>
    </section>
  );
}
