
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

export function BreathingCircle() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale");
  const [timer, setTimer] = useState(0);
  
  const breathingCycle = {
    inhale: 4,
    hold: 4,
    exhale: 6,
    rest: 2
  };
  
  const totalCycleTime = breathingCycle.inhale + breathingCycle.hold + breathingCycle.exhale + breathingCycle.rest;
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isBreathing) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1;
          
          if (newTimer > totalCycleTime) {
            return 1; // Reset to 1 for next cycle
          }
          
          return newTimer;
        });
        
        // Update breathing phase
        if (timer <= breathingCycle.inhale) {
          setBreathingPhase("inhale");
        } else if (timer <= breathingCycle.inhale + breathingCycle.hold) {
          setBreathingPhase("hold");
        } else if (timer <= breathingCycle.inhale + breathingCycle.hold + breathingCycle.exhale) {
          setBreathingPhase("exhale");
        } else {
          setBreathingPhase("rest");
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreathing, timer]);
  
  const toggleBreathing = () => {
    if (!isBreathing) {
      setTimer(1); // Start at 1 to immediately begin the inhale phase
      setBreathingPhase("inhale");
    }
    setIsBreathing(!isBreathing);
  };
  
  const getCircleStyles = () => {
    const baseClasses = "rounded-full bg-still-moss/20 transition-all duration-1000 flex items-center justify-center text-center";
    
    switch (breathingPhase) {
      case "inhale":
        return `${baseClasses} scale-125`;
      case "hold":
        return `${baseClasses} scale-125 bg-still-moss/30`;
      case "exhale":
        return `${baseClasses} scale-100 bg-still-moss/10`;
      case "rest":
        return `${baseClasses} scale-100`;
      default:
        return baseClasses;
    }
  };
  
  const getPhaseText = () => {
    if (!isBreathing) return "Press play to begin";
    
    switch (breathingPhase) {
      case "inhale":
        return "Breathe In";
      case "hold":
        return "Hold";
      case "exhale":
        return "Breathe Out";
      case "rest":
        return "Rest";
      default:
        return "";
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative">
        {/* Ripple animation - multiple circles */}
        {isBreathing && (
          <>
            <div className="absolute inset-0 rounded-full bg-still-moss/5 animate-ripple"></div>
            <div className="absolute inset-0 rounded-full bg-still-moss/5 animate-ripple" style={{ animationDelay: "1s" }}></div>
            <div className="absolute inset-0 rounded-full bg-still-moss/5 animate-ripple" style={{ animationDelay: "2s" }}></div>
          </>
        )}
        
        {/* Main breathing circle */}
        <div 
          className={getCircleStyles()} 
          style={{ 
            height: "240px", 
            width: "240px"
          }}
        >
          <div className="text-center">
            <p className="text-xl font-medium">{getPhaseText()}</p>
            {isBreathing && (
              <p className="text-sm text-muted-foreground mt-2">
                {breathingPhase === "inhale" ? breathingCycle.inhale - (timer - 1) : 
                 breathingPhase === "hold" ? breathingCycle.hold - (timer - breathingCycle.inhale - 1) :
                 breathingPhase === "exhale" ? breathingCycle.exhale - (timer - breathingCycle.inhale - breathingCycle.hold - 1) :
                 breathingCycle.rest - (timer - breathingCycle.inhale - breathingCycle.hold - breathingCycle.exhale - 1)}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <Button 
        onClick={toggleBreathing}
        className="rounded-full px-6"
        variant={isBreathing ? "outline" : "default"}
      >
        {isBreathing ? (
          <><Pause className="mr-2 h-4 w-4" /> Pause</>
        ) : (
          <><Play className="mr-2 h-4 w-4" /> Begin Breathing</>
        )}
      </Button>
    </div>
  );
}
