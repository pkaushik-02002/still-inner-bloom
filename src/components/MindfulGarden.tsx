import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { GardenItem, getGardenItems } from "@/services/gardenService";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function MindfulGarden() {
  const [gardenItems, setGardenItems] = useState<GardenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    
    const unsubscribe = getGardenItems(currentUser.uid, (items) => {
      setGardenItems(items);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [currentUser]);
  
  if (loading) {
    return (
      <div className="relative w-full h-96 still-card overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }
  
  if (!currentUser) {
    return (
      <div className="relative w-full h-96 still-card overflow-hidden flex items-center justify-center">
        <p className="text-muted-foreground">Please sign in to view your garden</p>
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-96 still-card overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 bg-still-sky/30 dark:bg-still-sky/10"></div>
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-still-sage/30 dark:bg-still-sage/20 rounded-t-full"></div>
      
      {/* Garden items */}
      {gardenItems.map((item) => (
        <div 
          key={item.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
          style={{ 
            left: `${item.x}%`, 
            bottom: `${item.y}%`,
          }}
        >
          {renderGardenItem(item)}
        </div>
      ))}
      
      {/* Water pond */}
      <div 
        className="absolute rounded-full bg-still-water/50 dark:bg-still-water/30" 
        style={{ 
          width: "80px", 
          height: "40px", 
          bottom: "20%", 
          left: "65%",
          transform: "translateX(-50%)"
        }}
      ></div>
      
      {gardenItems.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">Complete missions to grow your garden. Each mission adds a new plant!</p>
        </div>
      )}
    </div>
  );
}

function renderGardenItem(item: GardenItem) {
  const scale = item.growth / 100;
  
  switch (item.type) {
    case "flower":
      return (
        <div className="relative" style={{ transform: `scale(${scale})` }}>
          <div 
            className="w-6 h-16 bg-still-moss" 
            style={{ margin: "0 auto" }}
          ></div>
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: item.color }}
          >
            <div className="w-6 h-6 rounded-full bg-still-moss/40"></div>
          </div>
        </div>
      );
    case "tree":
      return (
        <div className="relative" style={{ transform: `scale(${scale})` }}>
          <div 
            className="w-8 h-24 rounded-b-lg bg-still-clay" 
            style={{ margin: "0 auto" }}
          ></div>
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-32 h-32 rounded-full"
            style={{ backgroundColor: item.color }}
          ></div>
        </div>
      );
    case "plant":
      return (
        <div style={{ transform: `scale(${scale})` }}>
          <div className="relative">
            <div className="w-4 h-20 bg-still-moss" style={{ margin: "0 auto" }}></div>
            <div className="absolute top-4 left-0 w-8 h-3 rounded-full transform -rotate-45" style={{ backgroundColor: item.color }}></div>
            <div className="absolute top-8 right-0 w-8 h-3 rounded-full transform rotate-45" style={{ backgroundColor: item.color }}></div>
            <div className="absolute top-12 left-0 w-8 h-3 rounded-full transform -rotate-45" style={{ backgroundColor: item.color }}></div>
            <div className="absolute top-16 right-0 w-8 h-3 rounded-full transform rotate-45" style={{ backgroundColor: item.color }}></div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
