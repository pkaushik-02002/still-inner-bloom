
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 py-4 px-4 md:px-8 backdrop-blur-md bg-background/75 border-b border-border/20">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-still-moss animate-breathe-in"></div>
          <h1 className="text-xl font-semibold tracking-tight">Still</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/missions" className="text-foreground/80 hover:text-foreground transition-colors">Missions</Link>
          <Link to="/player" className="text-foreground/80 hover:text-foreground transition-colors">Music</Link>
          <Link to="/garden" className="text-foreground/80 hover:text-foreground transition-colors">Garden</Link>
          <Link to="/journal" className="text-foreground/80 hover:text-foreground transition-colors">Journal</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline" asChild className="hidden md:flex">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild className="hidden md:flex">
            <Link to="/register">Join Still</Link>
          </Button>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-b border-border/20 animate-fade-in">
          <nav className="flex flex-col space-y-4 py-4">
            <Link 
              to="/missions" 
              className="px-4 py-2 rounded-md hover:bg-secondary/50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Missions
            </Link>
            <Link 
              to="/player" 
              className="px-4 py-2 rounded-md hover:bg-secondary/50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Music
            </Link>
            <Link 
              to="/garden" 
              className="px-4 py-2 rounded-md hover:bg-secondary/50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Garden
            </Link>
            <Link 
              to="/journal" 
              className="px-4 py-2 rounded-md hover:bg-secondary/50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Journal
            </Link>
            <div className="pt-2 border-t border-border/20 flex flex-col space-y-3 mt-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>Join Still</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
