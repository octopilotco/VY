import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TestimonialsCarousel from "@/components/landing/TestimonialsCarousel";
import ChromeExtensionSection from "@/components/landing/ChromeExtensionSection";
import CreatorsSection from "@/components/landing/CreatorsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import WallOfLove from "@/components/landing/WallOfLove";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TestimonialsCarousel />
      <ChromeExtensionSection />
      <CreatorsSection />
      <FeaturesSection />
      <PricingSection />
      <WallOfLove />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
