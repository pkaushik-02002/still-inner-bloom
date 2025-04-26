
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { MindfulGarden } from "@/components/MindfulGarden";
import { useAuth } from "@/context/AuthContext";
import { getGardenStats, GardenStats } from "@/services/gardenService";
import { Skeleton } from "@/components/ui/skeleton";

const Garden = () => {
  const [stats, setStats] = useState<GardenStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadStats = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      
      try {
        const gardenStats = await getGardenStats(currentUser.uid);
        setStats(gardenStats);
      } catch (error) {
        console.error('Error loading garden stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadStats();
  }, [currentUser]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-medium mb-2">Your Mindful Garden</h1>
            <p className="text-muted-foreground">
              Watch your garden grow as you complete mindfulness practices and missions.
              This is your private space — no followers, no likes, just your personal growth.
            </p>
          </div>
          
          <div className="mb-8">
            <MindfulGarden />
          </div>
          
          {!currentUser ? (
            <div className="still-card p-6 text-center">
              <p className="text-muted-foreground">Please sign in to view your garden statistics</p>
            </div>
          ) : loading ? (
            <div className="still-card p-6">
              <Skeleton className="h-32" />
            </div>
          ) : stats && (
            <div className="still-card p-6">
              <h2 className="text-xl font-medium mb-4">Garden Insights</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-still-sage/20 rounded-lg">
                  <div className="text-2xl font-medium mb-1">{stats.plantsGrowing}</div>
                  <div className="text-sm text-muted-foreground">Plants Growing</div>
                </div>
                
                <div className="p-4 bg-still-sky/20 rounded-lg">
                  <div className="text-2xl font-medium mb-1">{stats.daysActive}</div>
                  <div className="text-sm text-muted-foreground">Days Active</div>
                </div>
                
                <div className="p-4 bg-still-peach/20 rounded-lg">
                  <div className="text-2xl font-medium mb-1">{stats.missionsCompleted}</div>
                  <div className="text-sm text-muted-foreground">Missions Completed</div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Growth Reflections</h3>
                <p className="text-sm text-muted-foreground">
                  Your garden reflects your mindfulness journey. Each plant represents completed missions
                  and time spent in stillness. As you continue to practice, your garden will flourish and
                  evolve, just as you do.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Garden;
