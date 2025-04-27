
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TreePine, Flower2, TreePalm, Diamond } from "lucide-react";

interface GardenTutorialProps {
  open: boolean;
  onClose: () => void;
}

export function GardenTutorial({ open, onClose }: GardenTutorialProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Diamond className="w-5 h-5 text-still-sage" />
            Welcome to Your Premium Garden
          </DialogTitle>
          <DialogDescription className="text-base">
            Learn how to grow your endless mindful garden
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-medium">How to Play:</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Choose a plant type from the available options</li>
              <li>Each plant type has unique growth patterns and rewards</li>
              <li>Plants grow in real-time - check back to see their progress</li>
              <li>Complete missions to unlock special plants and rewards</li>
              <li>Your garden keeps growing endlessly - there's no limit!</li>
            </ol>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/20 rounded-lg">
            <div className="flex flex-col items-center gap-2 p-3">
              <TreePine className="w-8 h-8 text-still-sage" />
              <span className="text-sm font-medium">Trees</span>
              <span className="text-xs text-center text-muted-foreground">Grow tall and majestic</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3">
              <Flower2 className="w-8 h-8 text-still-peach" />
              <span className="text-sm font-medium">Flowers</span>
              <span className="text-xs text-center text-muted-foreground">Bloom beautifully</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3">
              <TreePalm className="w-8 h-8 text-still-sky" />
              <span className="text-sm font-medium">Plants</span>
              <span className="text-xs text-center text-muted-foreground">Thrive gracefully</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Premium Benefits:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Unlimited plant growing</li>
              <li>• Special rare plants unlock as you progress</li>
              <li>• Real-time growth animations</li>
              <li>• Exclusive garden layouts</li>
            </ul>
          </div>
        </div>

        <Button onClick={onClose} className="w-full mt-4">
          Start Growing
        </Button>
      </DialogContent>
    </Dialog>
  );
}
