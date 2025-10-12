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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-50 to-blue-50" />
      
      {/* Floating orbs - reduced on mobile */}
      <div className="absolute top-20 left-5 md:left-10 w-40 h-40 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-5 md:right-10 w-64 h-64 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text content */}
          <div className="space-y-4 md:space-y-8 animate-fade-in text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-primary/10 border border-primary/20 rounded-full text-xs md:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-foreground/80">AI-powered HR assistant</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight">
              Automatiseer je{" "}
              <span className="gradient-text">HR-communicatie</span> met AI
            </h1>
            
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
              Een slimme HR-agent beantwoordt direct vragen over loon, ziekte, vakantiedagen, CAO, en meer – 
              zodat jij tijd overhoudt voor de mensen zelf.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 pt-2 md:pt-4">
              <Button 
                size="lg" 
                onClick={scrollToDemo}
                className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground glow-whatsapp group"
              >
                <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm md:text-base">Bekijk Live Demo</span>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setContactDialogOpen(true)}
                className="w-full sm:w-auto border-primary/30 hover:border-primary hover:bg-primary/10"
              >
                <Play className="mr-2 h-5 w-5" />
                <span className="text-sm md:text-base">Vraag offerte aan</span>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 pt-4 md:pt-8 border-t border-border/50">
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
                <div className="text-xs md:text-sm text-muted-foreground">Beschikbaar</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">95%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Tevredenheid</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">800+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Vragen/week</div>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative animate-scale-in mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl md:rounded-3xl blur-3xl opacity-10 animate-pulse-glow" />
            <img 
              src={heroAi} 
              alt="AI HR Assistant Visualization" 
              className="relative rounded-2xl md:rounded-3xl shadow-2xl w-full border border-border/50"
            />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
      
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </section>
  );
};

export default Hero;