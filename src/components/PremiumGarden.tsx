import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { GardenItem, addGardenItem } from "@/services/gardenService";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { TreePine, Flower2, TreePalm } from "lucide-react";
import { GardenTutorial } from "./GardenTutorial";

export function PremiumGarden() {
  const [selectedPlant, setSelectedPlant] = useState<"tree" | "flower" | "plant" | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("gardenTutorialSeen");
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("gardenTutorialSeen", "true");
  };

  const handlePlantSelect = (type: "tree" | "flower" | "plant") => {
    setSelectedPlant(type);
  };

  const handlePlantGrow = async () => {
    if (!currentUser || !selectedPlant) return;

    try {
      await addGardenItem(currentUser.uid, selectedPlant);
      toast({
        title: "Plant Added!",
        description: `Your ${selectedPlant} has been planted in your garden.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to plant. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="p-4 bg-background/60 backdrop-blur rounded-lg border border-border/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Premium Garden Tools</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTutorial(true)}
            className="text-muted-foreground"
          >
            How to Play
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <Button
            variant="outline"
            className={`flex flex-col items-center p-4 h-auto ${
              selectedPlant === "tree" ? "bg-still-sage/20" : ""
            }`}
            onClick={() => handlePlantSelect("tree")}
          >
            <TreePine className="w-8 h-8 mb-2" />
            <span>Tree</span>
          </Button>
          
          <Button
            variant="outline"
            className={`flex flex-col items-center p-4 h-auto ${
              selectedPlant === "flower" ? "bg-still-peach/20" : ""
            }`}
            onClick={() => handlePlantSelect("flower")}
          >
            <Flower2 className="w-8 h-8 mb-2" />
            <span>Flower</span>
          </Button>
          
          <Button
            variant="outline"
            className={`flex flex-col items-center p-4 h-auto ${
              selectedPlant === "plant" ? "bg-still-sky/20" : ""
            }`}
            onClick={() => handlePlantSelect("plant")}
          >
            <TreePalm className="w-8 h-8 mb-2" />
            <span>Plant</span>
          </Button>
        </div>

        <Button
          className="w-full"
          disabled={!selectedPlant}
          onClick={handlePlantGrow}
        >
          Plant in Garden
        </Button>
      </div>

      <GardenTutorial open={showTutorial} onClose={handleCloseTutorial} />
    </>
  );
}
