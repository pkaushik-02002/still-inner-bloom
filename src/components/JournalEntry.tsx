
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Music } from "lucide-react";

export function JournalEntry() {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  
  const moods = [
    { id: "peaceful", label: "Peaceful", color: "bg-still-sky" },
    { id: "grateful", label: "Grateful", color: "bg-still-sage" },
    { id: "hopeful", label: "Hopeful", color: "bg-still-peach" },
    { id: "reflective", label: "Reflective", color: "bg-still-lavender" },
    { id: "challenged", label: "Challenged", color: "bg-still-clay" }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to Firebase
    alert("Journal entry saved!");
    setContent("");
    setMood(null);
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
          className="flex items-center gap-2"
        >
          <Music className="h-4 w-4" />
          Link music memory
        </Button>
        
        <Button 
          type="submit"
          disabled={!content || !mood}
          className="ml-auto"
        >
          Save Entry
        </Button>
      </div>
    </form>
  );
}
