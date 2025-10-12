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
  return <section className="relative min-h-screen flex flex-col overflow-hidden pt-[52px]">
      {/* Main hero content */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Light blue blur behind text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-gradient-to-br from-blue-400/8 via-blue-300/5 to-blue-400/8 blur-3xl rounded-full" />
        </div>
        
        <div className="container mx-auto px-3 sm:px-4 relative z-10 py-3 md:py-4">
          <div className="bg-background/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-sm border border-border p-4 sm:p-6 md:p-12 relative overflow-hidden">
            {/* Blue blur throughout the block */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/8 via-blue-300/5 to-blue-400/8 blur-2xl pointer-events-none" />
            
            <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-background rounded-full text-xs sm:text-sm shadow-sm border border-border">
                <span className="text-foreground">Beschikbaar via WhatsApp</span>
                <span className="text-muted-foreground hidden sm:inline">•</span>
                <a href="#demo" className="text-foreground font-medium hover:underline hidden sm:inline">
                  Probeer de app →
                </a>
              </div>
              
              {/* Main heading */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-foreground px-2">Milo helpt uitzendbureaus <span className="gradient-text">80% minder</span> HR-vragen te beantwoorden.</h1>
              
              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-2">
                Een slimme HR-agent beantwoordt direct vragen over loon, ziekte, vakantiedagen, CAO, en meer – zodat jij tijd overhoudt voor de mensen zelf.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 px-2">
                <Button size="lg" onClick={scrollToDemo} className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full px-6 sm:px-8 text-sm sm:text-base shadow-lg glow-whatsapp">
                  Start gratis
                </Button>
                
                <Button size="lg" onClick={() => setContactDialogOpen(true)} className="w-full sm:w-auto bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-full px-6 sm:px-8 text-sm sm:text-base">
                  Boek een demo
                </Button>
              </div>
              
              {/* No credit card text */}
              <p className="text-xs sm:text-sm text-muted-foreground">
                Geen creditcard vereist
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-12 pt-6 sm:pt-8 md:pt-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">24/7</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Beschikbaar</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">95%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Tevredenheid</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">800+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Vragen/week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </section>;
};
export default Hero;