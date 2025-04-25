
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { JournalEntry } from "@/components/JournalEntry";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { collection, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface JournalEntryType {
  id: string;
  date: Timestamp;
  content: string;
  mood: string;
  musicLink?: {
    title: string;
    artist: string;
  };
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  
  // Fetch journal entries when component mounts or user changes
  useEffect(() => {
    const fetchEntries = async () => {
      if (!currentUser) {
        setEntries([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const q = query(
          collection(db, "journal_entries"),
          where("userId", "==", currentUser.uid),
          orderBy("date", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const entriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as JournalEntryType[];
        
        setEntries(entriesData);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEntries();
  }, [currentUser]);
  
  const formatDate = (timestamp: Timestamp): string => {
    const date = timestamp.toDate();
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
                {loading ? (
                  // Show skeletons while loading
                  Array(3).fill(0).map((_, i) => (
                    <Card key={i} className="still-card">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-5 w-48" />
                          <Skeleton className="h-5 w-24 rounded-full" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                      </CardContent>
                    </Card>
                  ))
                ) : entries.length > 0 ? (
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
                    {currentUser ? "Your journal is empty. Start by creating a new entry." : "Please sign in to view your journal entries."}
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
