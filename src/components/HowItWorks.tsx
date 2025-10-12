import { Upload, Brain, MessageCircle, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: Upload,
    title: "Jij levert je HR-documenten",
    description: "PDF, Word, Intranet, FAQ - wij verwerken het allemaal",
    color: "text-primary"
  },
  {
    icon: Brain,
    title: "Wij trainen jouw AI-agent",
    description: "Binnen 48 uur is je slimme assistent operationeel",
    color: "text-accent"
  },
  {
    icon: MessageCircle,
    title: "Medewerkers stellen vragen",
    description: "Via WhatsApp - direct antwoord, 24/7 beschikbaar",
    color: "text-secondary"
  },
  {
    icon: Users,
    title: "Complexe vragen naar HR",
    description: "Automatische doorverwijzing als menselijke expertise nodig is",
    color: "text-primary"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-3 md:py-4 relative">
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="bg-background/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-md border border-border p-4 sm:p-6 md:p-12">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
              Hoe het <span className="gradient-text">werkt</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-2">
              Van documentatie tot live AI-agent in vier simpele stappen
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary -translate-y-1/2" />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <Card className="group p-4 sm:p-6 bg-white shadow-md border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 h-full">
                    {/* Step number */}
                    <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg glow-primary text-white">
                      {idx + 1}
                    </div>
                    
                    <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                      <div className={`p-3 sm:p-4 rounded-2xl bg-gray-50 group-hover:scale-110 transition-transform`}>
                        <step.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${step.color}`} />
                      </div>
                      
                      <h3 className="text-base sm:text-lg font-semibold">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;