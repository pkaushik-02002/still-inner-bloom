
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { BreathingCircle } from "@/components/BreathingCircle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      
      {/* Sample breathing section */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-medium mb-4">Experience Mindful Breathing</h2>
            <p className="text-muted-foreground">
              Try our guided breathing exercise to center yourself and find a moment of calm.
            </p>
          </div>
          
          <div className="flex justify-center">
            <BreathingCircle />
          </div>
        </div>
      </section>
      
      {/* Garden preview section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-still-sage/20 text-still-sage dark:text-still-sage/80 text-sm font-medium mb-4">
                Your personal sanctuary
              </div>
              
              <h2 className="text-3xl font-medium mb-4">Grow Your Mindful Garden</h2>
              <p className="text-lg text-muted-foreground mb-6">
                As you complete daily mindfulness missions, your personal garden will flourish.
                Each flower, tree, and plant represents your journey toward inner peace.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                  <span>No likes, comments, or public pressure</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                  <span>A private space for your growth only</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                  <span>Visual representation of your mindfulness journey</span>
                </li>
              </ul>
              
              <Button asChild className="rounded-full px-8">
                <Link to="/register">Start Growing</Link>
              </Button>
            </div>
            
            <div className="relative h-80 rounded-2xl bg-still-sage/20 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 h-16 w-16">
                <div className="w-4 h-24 bg-still-moss" style={{ margin: "0 auto" }}></div>
                <div className="absolute top-0 w-12 h-12 rounded-full bg-still-peach -translate-x-1/2 -translate-y-1/2 left-1/2"></div>
              </div>
              
              <div className="absolute top-1/3 right-1/4 h-12 w-12">
                <div className="w-3 h-16 bg-still-moss" style={{ margin: "0 auto" }}></div>
                <div className="absolute top-0 w-10 h-10 rounded-full bg-still-lavender -translate-x-1/2 -translate-y-1/2 left-1/2"></div>
              </div>
              
              <div className="absolute bottom-1/4 left-1/3 h-20 w-20">
                <div className="w-4 h-20 bg-still-clay" style={{ margin: "0 auto" }}></div>
                <div className="absolute top-0 w-16 h-16 rounded-full bg-still-sky -translate-x-1/2 -translate-y-1/2 left-1/2"></div>
              </div>
              
              <div 
                className="absolute rounded-full bg-still-water/40" 
                style={{ width: "60px", height: "30px", bottom: "20%", left: "55%" }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-still-sage/30 to-still-sky/30 dark:from-still-sage/10 dark:to-still-sky/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-medium mb-4">Begin Your Mindfulness Journey Today</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Still and discover how mindfulness and music can help you cultivate
            genuine inner happiness, one peaceful moment at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" asChild className="rounded-full px-8 py-6">
              <Link to="/register">Join Still</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8 py-6">
              <Link to="/missions">Explore Missions</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
