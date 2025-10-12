import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Play } from "lucide-react";
import heroAi from "@/assets/hero-ai.jpg";
import ContactDialog from "./ContactDialog";
const Hero = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-screen flex flex-col overflow-hidden pt-24 md:pt-28">
      {/* Main hero content */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Clean gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-blue-50 to-background" />
        
        <div className="container mx-auto px-4 relative z-10 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 bg-background rounded-full text-sm shadow-sm border border-border">
              <span className="text-foreground">Beschikbaar via WhatsApp</span>
              <span className="text-muted-foreground">•</span>
              <a href="#demo" className="text-foreground font-medium hover:underline">
                Probeer de app →
              </a>
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-foreground">Milo helpt uitzendbureaus <span className="gradient-text">80% minder</span> HR-vragen te beantwoorden.</h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Beantwoord automatisch vragen over loon, ziekte, vakantiedagen en meer – en groei met slimme analyses en rapportages.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" onClick={scrollToDemo} className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full px-8 text-base shadow-lg glow-whatsapp">
                Start gratis
              </Button>
              
              <Button size="lg" onClick={() => setContactDialogOpen(true)} className="w-full sm:w-auto bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-full px-8 text-base">
                Boek een demo
              </Button>
            </div>
            
            {/* No credit card text */}
            <p className="text-sm text-muted-foreground">
              Geen creditcard vereist
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 md:gap-12 pt-8 md:pt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">Beschikbaar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground mt-1">Tevredenheid</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">800+</div>
                <div className="text-sm text-muted-foreground mt-1">Vragen/week</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </section>;
};
export default Hero;