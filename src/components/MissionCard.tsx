
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface MissionProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed?: boolean;
  onClick: (id: string) => void;
}

export function MissionCard({ id, title, description, duration, completed, onClick }: MissionProps) {
  return (
    <div className={`still-card p-6 ${completed ? 'bg-primary/10' : ''}`}>
      {completed && (
        <div className="flex justify-end mb-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/20 text-xs font-medium">
            Completed
          </span>
        </div>
      )}
      
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          {duration}
        </div>
        
        <Button
          onClick={() => onClick(id)}
          variant={completed ? "outline" : "default"}
        >
          {completed ? "Review" : "Begin"}
        </Button>
      </div>
    </div>
  );
}
