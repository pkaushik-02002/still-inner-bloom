
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-still-sage/30 to-still-sky/30 dark:from-still-sage/10 dark:to-still-sky/10 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-still-moss/10 blur-3xl -z-10 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-still-sky/10 blur-3xl -z-10 animate-float" style={{ animationDelay: "2s" }}></div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-still-moss/20 text-still-moss dark:text-still-moss/80 text-sm font-medium mb-6 animate-fade-in">
            <div className="h-2 w-2 rounded-full bg-still-moss mr-2"></div>
            Nurturing inner peace
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Where happiness <br /> breathes slowly
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Still is a digital sanctuary where mindfulness meets music, 
            helping you cultivate real inner happiness through daily practices,
            mood-based music, and a personal mindful garden.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button size="lg" asChild className="rounded-full px-8 py-6">
              <Link to="/register">Begin Your Journey</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8 py-6">
              <Link to="/about" className="flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background">
        <svg className="absolute -top-16 left-0 right-0 w-full" viewBox="0 0 1440 116" fill="none" preserveAspectRatio="none">
          <path
            fill="currentColor"
            d="M0 58L48 58C96 58 192 58 288 53.2C384 48.3 480 38.7 576 43.5C672 48.3 768 67.7 864 77.3C960 87 1056 87 1152 77.3C1248 67.7 1344 48.3 1392 38.7L1440 29V116H1392C1344 116 1248 116 1152 116C1056 116 960 116 864 116C768 116 672 116 576 116C480 116 384 116 288 116C192 116 96 116 48 116H0V58Z"
          />
        </svg>
      </div>
    </section>
  );
}
