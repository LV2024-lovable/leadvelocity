import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, FileText, Users } from "lucide-react";

const FeaturesAI = () => {
  const capabilities = [
    { question: 'Hoeveel vakantiedagen heb ik nog?', icon: <Calendar className="h-6 w-6" /> },
    { question: 'Wanneer krijg ik mijn loon?', icon: <Clock className="h-6 w-6" /> },
    { question: 'Waar vind ik mijn loonstrook?', icon: <FileText className="h-6 w-6" /> },
    { question: 'Hoe meld ik me ziek?', icon: <Users className="h-6 w-6" /> },
    { question: 'Wat zijn de interne vacatures?', icon: <Users className="h-6 w-6" /> },
    { question: 'Hoe werkt mijn pensioenregeling?', icon: <FileText className="h-6 w-6" /> },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Wat je AI HR Agent kan beantwoorden
          </h2>
          <p className="text-xl text-muted-foreground">
            Van eenvoudige vragen tot complexe HR-zaken. De AI leert van je eigen documenten en processen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.question}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted rounded-xl">
          <p className="text-center text-lg">
            <span className="font-semibold">Jij bepaalt de kennisbasis.</span> Wij trainen de AI op jouw documenten, portalen en taal.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAI;
