
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { JournalEntry } from "@/components/JournalEntry";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JournalEntryType {
  id: string;
  date: Date;
  content: string;
  mood: string;
  musicLink?: {
    title: string;
    artist: string;
  };
}

// Sample journal entries
const sampleEntries: JournalEntryType[] = [
  {
    id: "entry1",
    date: new Date(2025, 3, 24), // April 24, 2025
    content: "Today I took a moment to really listen to the birds outside my window. It's amazing how much we miss when we're caught up in our thoughts.",
    mood: "peaceful",
    musicLink: {
      title: "Forest Morning",
      artist: "Earth Tones"
    }
  },
  {
    id: "entry2",
    date: new Date(2025, 3, 22), // April 22, 2025
    content: "I'm feeling grateful for the small moments of connection today. A smile from a stranger, a text from an old friend - these little things matter.",
    mood: "grateful"
  },
  {
    id: "entry3",
    date: new Date(2025, 3, 20), // April 20, 2025
    content: "Challenging day at work, but I managed to take a few deep breaths before responding to a difficult situation. Small progress.",
    mood: "reflective",
    musicLink: {
      title: "Inner Light",
      artist: "Crystal Bowls"
    }
  }
];

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntryType[]>(sampleEntries);
  
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getMoodClass = (mood: string): string => {
    switch (mood) {
      case "peaceful": return "bg-still-sky/20 text-still-sky";
      case "grateful": return "bg-still-sage/20 text-still-sage";
      case "hopeful": return "bg-still-peach/20 text-still-peach";
      case "reflective": return "bg-still-lavender/20 text-still-lavender";
      case "challenged": return "bg-still-clay/20 text-still-clay";
      default: return "bg-still-stone/20 text-still-charcoal";
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-medium mb-2">Mood Journal</h1>
            <p className="text-muted-foreground">
              A private space to reflect on your feelings and track your emotional journey.
            </p>
          </div>
          
          <Tabs defaultValue="new">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="new">New Entry</TabsTrigger>
              <TabsTrigger value="history">Past Entries</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new" className="still-card p-6">
              <JournalEntry />
            </TabsContent>
            
            <TabsContent value="history">
              <div className="space-y-6">
                {entries.length > 0 ? (
                  entries.map((entry) => (
                    <Card key={entry.id} className="still-card">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{formatDate(entry.date)}</CardTitle>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMoodClass(entry.mood)}`}>
                            {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                          </span>
                        </div>
                        {entry.musicLink && (
                          <CardDescription>
                            Listening to: {entry.musicLink.title} by {entry.musicLink.artist}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p>{entry.content}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    Your journal is empty. Start by creating a new entry.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Journal;
