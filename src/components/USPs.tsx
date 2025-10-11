import { Brain, Plug, Shield, MessageSquare, Clock, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const usps = [
  {
    icon: Brain,
    title: "Zelflerende AI",
    description: "Leert van vragen en past zich aan jouw organisatie aan",
    gradient: "from-primary to-accent"
  },
  {
    icon: Plug,
    title: "Koppelt met HR-tools",
    description: "Nmbrs, Loket.nl, AFAS, Visma en meer",
    gradient: "from-accent to-primary"
  },
  {
    icon: Shield,
    title: "AVG-compliant",
    description: "Privacyproof en veilig volgens Europese wetgeving",
    gradient: "from-primary to-secondary"
  },
  {
    icon: MessageSquare,
    title: "WhatsApp = geen apps",
    description: "Medewerkers gebruiken hun vertrouwde berichtendienst",
    gradient: "from-secondary to-accent"
  },
  {
    icon: Clock,
    title: "24/7 beschikbaarheid",
    description: "Ook 's nachts en in het weekend direct antwoord",
    gradient: "from-accent to-primary"
  },
  {
    icon: Zap,
    title: "Directe antwoorden",
    description: "Gemiddelde reactietijd < 3 seconden",
    gradient: "from-primary to-accent"
  }
];

const USPs = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-purple-50/50 to-blue-50/50">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Waarom kiezen voor <span className="gradient-text">AI HR Agent</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Slimme technologie die écht werkt voor jouw organisatie
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, idx) => (
            <Card
              key={idx}
              className="group relative p-6 bg-white shadow-md border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 overflow-hidden animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${usp.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative space-y-4">
                <div className="inline-flex p-3 rounded-xl bg-gray-50">
                  <usp.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                
                <h3 className="text-xl font-semibold">{usp.title}</h3>
                <p className="text-muted-foreground">{usp.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPs;
