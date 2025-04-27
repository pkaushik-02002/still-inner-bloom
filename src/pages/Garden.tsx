
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { MindfulGarden } from "@/components/MindfulGarden";
import { useAuth } from "@/context/AuthContext";
import { getGardenStats, GardenStats } from "@/services/gardenService";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Diamond, GiftIcon } from "lucide-react";

const Garden = () => {
  const [stats, setStats] = useState<GardenStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();

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
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-medium mb-2">Your Mindful Garden</h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  Watch your garden grow as you complete mindfulness practices and missions.
                </p>
              </div>
              
              {currentUser && (
                <Button 
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-still-sage/20"
                  onClick={() => window.location.href = '/premium-garden'}
                >
                  <Diamond className="w-4 h-4" />
                  <span>Upgrade to Premium</span>
                </Button>
              )}
            </div>
          </div>
          
          <div className={`mb-6 md:mb-8 ${isMobile ? 'h-[300px]' : 'h-[400px]'}`}>
            <MindfulGarden />
          </div>
          
          {!currentUser ? (
            <Card className="p-6 text-center bg-background/60 backdrop-blur">
              <p className="text-muted-foreground">Please sign in to view your garden statistics</p>
            </Card>
          ) : loading ? (
            <Card className="p-6 bg-background/60 backdrop-blur">
              <Skeleton className="h-32" />
            </Card>
          ) : stats && (
            <Card className="p-6 bg-background/60 backdrop-blur">
              <h2 className="text-xl font-medium mb-4">Garden Insights</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-still-sage/20 rounded-lg">
                  <div className="text-xl md:text-2xl font-medium mb-1">{stats.plantsGrowing}</div>
                  <div className="text-sm text-muted-foreground">Plants Growing</div>
                </div>
                
                <div className="p-4 bg-still-sky/20 rounded-lg">
                  <div className="text-xl md:text-2xl font-medium mb-1">{stats.daysActive}</div>
                  <div className="text-sm text-muted-foreground">Days Active</div>
                </div>
                
                <div className="p-4 bg-still-peach/20 rounded-lg">
                  <div className="text-xl md:text-2xl font-medium mb-1">{stats.missionsCompleted}</div>
                  <div className="text-sm text-muted-foreground">Missions Completed</div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Growth Reflections</h3>
                <p className="text-sm text-muted-foreground">
                  Your garden reflects your mindfulness journey. Each plant represents completed missions
                  and time spent in stillness.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Garden;
