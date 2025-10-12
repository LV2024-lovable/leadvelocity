import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Play } from "lucide-react";
import heroAi from "@/assets/hero-ai.jpg";
import ContactDialog from "./ContactDialog";

const Hero = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden pt-16 md:pt-20">
      {/* Top announcement banner */}
      <div className="w-full bg-black text-white py-3 text-center text-sm z-20 relative">
        Nieuw: WhatsApp integratie, AI-gedreven antwoorden • <a href="#demo" className="underline hover:text-[#00D9FF] transition-colors">Leer meer →</a>
      </div>
      
      {/* Main hero content */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Clean gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8E4F3] via-[#F0EDF7] to-[#F5F3FA]" />
        
        <div className="container mx-auto px-4 relative z-10 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 bg-white rounded-full text-sm shadow-sm border border-gray-200">
              <span className="text-gray-700">Beschikbaar via WhatsApp</span>
              <span className="text-gray-400">•</span>
              <a href="#demo" className="text-black font-medium hover:underline">
                Probeer de app →
              </a>
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-black">
              De alles-in-één HR-assistent voor uitzendbureaus
            </h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Beantwoord automatisch vragen over loon, ziekte, vakantiedagen en meer – en groei met slimme analyses en rapportages.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                onClick={scrollToDemo}
                className="w-full sm:w-auto bg-[#00D9FF] hover:bg-[#00C4E6] text-black font-semibold rounded-full px-8 text-base shadow-lg"
              >
                Start gratis
              </Button>
              
              <Button 
                size="lg" 
                onClick={() => setContactDialogOpen(true)}
                className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white font-semibold rounded-full px-8 text-base"
              >
                Boek een demo
              </Button>
            </div>
            
            {/* No credit card text */}
            <p className="text-sm text-gray-600">
              Geen creditcard vereist
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 md:gap-12 pt-8 md:pt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-black">24/7</div>
                <div className="text-sm text-gray-600 mt-1">Beschikbaar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-black">95%</div>
                <div className="text-sm text-gray-600 mt-1">Tevredenheid</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-black">800+</div>
                <div className="text-sm text-gray-600 mt-1">Vragen/week</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </section>
  );
};

export default Hero;