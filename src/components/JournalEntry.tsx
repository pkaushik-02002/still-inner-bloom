
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Music } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

export function JournalEntry() {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  const [musicLink, setMusicLink] = useState<{ title: string; artist: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();
  
  const moods = [
    { id: "peaceful", label: "Peaceful", color: "bg-still-sky" },
    { id: "grateful", label: "Grateful", color: "bg-still-sage" },
    { id: "hopeful", label: "Hopeful", color: "bg-still-peach" },
    { id: "reflective", label: "Reflective", color: "bg-still-lavender" },
    { id: "challenged", label: "Challenged", color: "bg-still-clay" }
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("Please sign in to save journal entries");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const journalData = {
        content,
        mood,
        date: serverTimestamp(),
        userId: currentUser.uid,
        ...(musicLink ? { musicLink } : {})
      };
      
      await addDoc(collection(db, "journal_entries"), journalData);
      toast.success("Journal entry saved successfully!");
      
      // Clear the form
      setContent("");
      setMood(null);
      setMusicLink(null);
    } catch (error) {
      console.error("Error saving journal entry:", error);
      toast.error("Failed to save journal entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Music link functionality (simplified for now)
  const addMusicLink = () => {
    setMusicLink({
      title: "Meditation Track",
      artist: "Still Music"
    });
    toast.info("Music memory linked!");
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="mood" className="block text-sm font-medium mb-2">
          How are you feeling today?
        </label>
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                mood === m.id 
                  ? `${m.color} text-white`
                  : `${m.color}/20 hover:${m.color}/40`
              }`}
              onClick={() => setMood(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Write your thoughts...
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          placeholder="Today I felt..."
          className="journal-input"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className={`flex items-center gap-2 ${musicLink ? 'bg-still-lavender/20' : ''}`}
          onClick={addMusicLink}
        >
          <Music className="h-4 w-4" />
          {musicLink ? "Music memory linked" : "Link music memory"}
        </Button>
        
        <Button 
          type="submit"
          disabled={!content || !mood || isSubmitting}
          className="ml-auto"
        >
          {isSubmitting ? "Saving..." : "Save Entry"}
        </Button>
      </div>
    </form>
  );
}
