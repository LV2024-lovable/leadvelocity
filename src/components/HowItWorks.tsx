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
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-md border border-border p-8 md:p-12">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Hoe het <span className="gradient-text">werkt</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Van documentatie tot live AI-agent in vier simpele stappen
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary -translate-y-1/2" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <Card className="group p-6 bg-white shadow-md border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 h-full">
                    {/* Step number */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold shadow-lg glow-primary text-white">
                      {idx + 1}
                    </div>
                    
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-4 rounded-2xl bg-gray-50 group-hover:scale-110 transition-transform`}>
                        <step.icon className={`h-8 w-8 ${step.color}`} />
                      </div>
                      
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
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