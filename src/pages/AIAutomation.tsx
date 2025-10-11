import Navigation from "@/components/Navigation";
import HeroAI from "@/components/HeroAI";
import LiveDemo from "@/components/LiveDemo";
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
      <HeroAI />
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
