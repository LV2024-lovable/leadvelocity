import { Calendar, DollarSign, FileText, Heart, Briefcase, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Calendar,
    title: "Hoeveel vakantiedagen heb ik nog?",
    color: "text-primary"
  },
  {
    icon: DollarSign,
    title: "Wanneer krijg ik mijn loon?",
    color: "text-accent"
  },
  {
    icon: FileText,
    title: "Waar vind ik mijn loonstrook?",
    color: "text-secondary"
  },
  {
    icon: Heart,
    title: "Hoe meld ik me ziek?",
    color: "text-destructive"
  },
  {
    icon: Briefcase,
    title: "Wat zijn de interne vacatures?",
    color: "text-primary"
  },
  {
    icon: PiggyBank,
    title: "Hoe werkt mijn pensioenregeling?",
    color: "text-accent"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-3 md:py-4 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-md border border-border p-8 md:p-12">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Wat je <span className="gradient-text">AI HR Agent</span> kan beantwoorden
            </h2>
            <p className="text-xl text-muted-foreground">
              Van eenvoudige vragen tot complexe HR-zaken. De AI leert van je eigen documenten en processen.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, idx) => (
              <Card 
                key={idx}
                className="group p-6 bg-white shadow-md border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 animate-scale-in cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <feature.icon className={`h-10 w-10 mb-4 ${feature.color} group-hover:scale-110 transition-transform`} />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Card className="inline-block gradient-border bg-white/80 shadow-lg px-8 py-6 animate-fade-in">
              <p className="text-lg">
                <span className="font-semibold text-primary">Jij bepaalt de kennisbasis.</span>{" "}
                <span className="text-muted-foreground">
                  Wij trainen de AI op jouw documenten, portalen en taal.
                </span>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;