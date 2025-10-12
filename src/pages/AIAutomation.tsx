import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroAI from "@/components/HeroAI";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import LiveDemo from "@/components/LiveDemo";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FooterAI from "@/components/FooterAI";

const AIAutomation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroAI />
      <Features />
      <HowItWorks />
      <div id="demo">
        <LiveDemo />
      </div>
      <Pricing />
      <Testimonials />
      <FooterAI />
    </div>
  );
};

export default AIAutomation;
