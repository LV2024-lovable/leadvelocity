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
    <div className="min-h-screen relative">
      {/* Global gradient background that runs through entire page */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-50 via-blue-50 to-background -z-10" />
      
      {/* Announcement Banner - Top of page */}
      <div className="w-full bg-foreground text-background py-3 text-center text-sm sticky top-0 z-[60]">
        Nieuw: WhatsApp integratie, AI-gedreven antwoorden • <a href="#demo" className="underline hover:text-secondary transition-colors">Leer meer →</a>
      </div>
      
      <Navigation />
      <HeroAI />
      <div id="features">
        <Features />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="demo">
        <LiveDemo />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div id="meet-milo">
        <Testimonials />
      </div>
      <FooterAI />
    </div>
  );
};

export default AIAutomation;
