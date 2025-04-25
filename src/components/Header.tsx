
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, userData } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully signed out");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (userData?.name) {
      const names = userData.name.split(' ');
      if (names.length > 1) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return userData.name[0].toUpperCase();
    }
    return currentUser?.email?.charAt(0).toUpperCase() || 'U';
  };

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
          
          {currentUser ? (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={currentUser.photoURL || ''} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userData?.name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/journal">My Journal</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/garden">My Garden</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button variant="outline" asChild className="hidden md:flex">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild className="hidden md:flex">
                <Link to="/register">Join Still</Link>
              </Button>
            </>
          )}
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            {currentUser && (
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.photoURL || ''} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            )}
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
              {currentUser ? (
                <Button 
                  variant="destructive" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>Join Still</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
