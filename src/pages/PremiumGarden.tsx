
import { Layout } from "@/components/Layout";
import { MindfulGarden } from "@/components/MindfulGarden";
import { PremiumGarden } from "@/components/PremiumGarden";
import { useIsMobile } from "@/hooks/use-mobile";

const PremiumGardenPage = () => {
  const isMobile = useIsMobile();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-medium mb-2">Premium Garden</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Design and grow your garden with premium tools and plants.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className={`${isMobile ? 'h-[300px]' : 'h-[400px]'}`}>
                <MindfulGarden />
              </div>
            </div>
            
            <div>
              <PremiumGarden />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PremiumGardenPage;
