import { Card, CardContent } from "@/components/ui/card";
import { Zap, ShieldCheck, Smartphone, Clock } from "lucide-react";

const USPsAI = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Zelflerende AI',
      description: 'Leert van vragen en past zich aan jouw organisatie aan'
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: 'Koppelt met HR-tools',
      description: 'Nmbrs, Loket.nl, AFAS, Visma en meer'
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: 'AVG-compliant',
      description: 'Privacyproof en veilig volgens Europese wetgeving'
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'WhatsApp = geen apps',
      description: 'Medewerkers gebruiken hun vertrouwde berichtendienst'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: '24/7 beschikbaarheid',
      description: 'Ook \'s nachts en in het weekend direct antwoord'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Directe antwoorden',
      description: 'Gemiddelde reactietijd < 3 seconden'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Waarom kiezen voor AI HR Agent
          </h2>
          <p className="text-xl text-muted-foreground">
            Slimme technologie die écht werkt voor jouw organisatie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPsAI;
