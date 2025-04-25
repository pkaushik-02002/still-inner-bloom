
import { useState, useEffect } from "react";

interface GardenItem {
  id: string;
  type: "flower" | "tree" | "plant";
  x: number;
  y: number;
  size: number;
  color: string;
  growth: number; // 0-100
}

export function MindfulGarden() {
  const [gardenItems, setGardenItems] = useState<GardenItem[]>([]);
  
  // Simulating garden items for demonstration
  useEffect(() => {
    // In a real app, these would come from user's completed missions
    const demoItems: GardenItem[] = [
      {
        id: "flower1",
        type: "flower",
        x: 20,
        y: 70,
        size: 40,
        color: "#D1DEBD", // sage
        growth: 100
      },
      {
        id: "tree1",
        type: "tree",
        x: 70,
        y: 30,
        size: 80,
        color: "#A6C36F", // moss
        growth: 90
      },
      {
        id: "plant1",
        type: "plant",
        x: 40,
        y: 50,
        size: 35,
        color: "#89CFF0", // water
        growth: 75
      },
      {
        id: "flower2",
        type: "flower",
        x: 80,
        y: 80,
        size: 30,
        color: "#E6CCBE", // clay
        growth: 80
      }
    ];
    
    setGardenItems(demoItems);
  }, []);
  
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
          <p className="text-muted-foreground">Your garden is waiting to bloom. Complete missions to grow your garden.</p>
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
