
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { MissionCard } from "@/components/MissionCard";
import { dailyMissions } from "@/data/missions";
import { Button } from "@/components/ui/button";
import { BreathingCircle } from "@/components/BreathingCircle";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { X } from "lucide-react";

const Missions = () => {
  const [missions, setMissions] = useState(dailyMissions);
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [reflection, setReflection] = useState("");
  
  const mission = missions.find(m => m.id === selectedMission);
  
  const handleMissionClick = (id: string) => {
    setSelectedMission(id);
    setReflection("");
  };
  
  const handleCompleteMission = () => {
    setMissions(prev => 
      prev.map(m => 
        m.id === selectedMission 
          ? { ...m, completed: true } 
          : m
      )
    );
    setSelectedMission(null);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-medium mb-2">Daily Stillness Missions</h1>
            <p className="text-muted-foreground">
              Complete these mindful activities to grow your inner peace and nurture your garden.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missions.map((mission) => (
              <MissionCard 
                key={mission.id}
                id={mission.id}
                title={mission.title}
                description={mission.description}
                duration={mission.duration}
                completed={mission.completed}
                onClick={handleMissionClick}
              />
            ))}
          </div>
        </div>
      </div>
      
      <Dialog 
        open={!!selectedMission} 
        onOpenChange={(open) => !open && setSelectedMission(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{mission?.title}</DialogTitle>
            <DialogDescription>
              {mission?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {mission?.type === "breathing" ? (
              <div className="flex justify-center py-6">
                <BreathingCircle />
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-foreground">{mission?.content || "Take a moment to engage in this practice."}</p>
                <Textarea 
                  placeholder="Reflect on your experience..." 
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="journal-input"
                  rows={5}
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="ghost" 
              onClick={() => setSelectedMission(null)}
            >
              <X className="mr-2 h-4 w-4" /> Close
            </Button>
            <Button onClick={handleCompleteMission}>
              Complete Mission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Missions;
