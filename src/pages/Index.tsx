import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import LiveDemo from "@/components/LiveDemo";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import USPs from "@/components/USPs";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <LiveDemo />
      <Features />
      <HowItWorks />
      <USPs />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
