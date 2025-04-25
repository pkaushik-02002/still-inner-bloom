
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-background border-t border-border/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-still-moss animate-breathe-in"></div>
              <h2 className="text-lg font-semibold">Still</h2>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Where happiness breathes slowly. A mindfulness and music-based platform for inner peace.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="space-y-4">
              <h3 className="font-medium">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/missions" className="text-muted-foreground hover:text-foreground transition-colors">Daily Missions</Link></li>
                <li><Link to="/player" className="text-muted-foreground hover:text-foreground transition-colors">Music Player</Link></li>
                <li><Link to="/garden" className="text-muted-foreground hover:text-foreground transition-colors">Mindful Garden</Link></li>
                <li><Link to="/journal" className="text-muted-foreground hover:text-foreground transition-colors">Mood Journal</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Still. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-still-peach" /> for inner peace
          </p>
        </div>
      </div>
    </footer>
  );
}
