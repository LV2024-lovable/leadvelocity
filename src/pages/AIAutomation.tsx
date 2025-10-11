import Navigation from "@/components/Navigation";
import LiveDemo from "@/components/LiveDemo";
import HeroAI from "@/components/HeroAI";
import FeaturesAI from "@/components/FeaturesAI";
import HowItWorksAI from "@/components/HowItWorksAI";
import USPsAI from "@/components/USPsAI";
import PricingAI from "@/components/PricingAI";
import TestimonialsAI from "@/components/TestimonialsAI";
import Footer from "@/components/Footer";

const AIAutomation = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroAI key="hero-ai-section" />
      <LiveDemo />
      <FeaturesAI />
      <HowItWorksAI />
      <USPsAI />
      <PricingAI />
      <TestimonialsAI />
      <Footer />
    </div>
  );
};

export default AIAutomation;
