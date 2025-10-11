import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PricingAI = () => {
  const pricingPlans = [
    {
      name: 'Basic',
      price: '€250',
      period: 'per maand',
      description: 'Automatiseer je veelgestelde vragen met een GPT-5 aangedreven AI Agent',
      features: [
        'Tot 250-500 chats/maand',
        '1 AI Agent',
        '3 teamleden',
        'Website chat widget',
        'WhatsApp, Facebook, Instagram',
        'Prompting module',
        'Statistieken',
        '5 Sterren support'
      ],
      popular: false
    },
    {
      name: 'Premium',
      price: '€417',
      period: 'per maand',
      description: 'Scrape je website en documenten om je AI Agent razendsnel te bouwen',
      features: [
        'Tot 500-1.000 chats/maand',
        '1 AI Agent',
        '10 teamleden',
        'Crawl tot 10.000 URL\'s',
        'Website crawler',
        'Document scraper',
        'Inbox & Menselijke handoff',
        'API-toegang',
        'Alles uit Basic'
      ],
      popular: true
    },
    {
      name: 'Business',
      price: '€750',
      period: 'per maand',
      description: 'Integreer je systemen in je AI Agent om klantenservice volledig te automatiseren',
      features: [
        'Tot 1.000-25.000 chats/maand',
        '3 AI Agents',
        'Onbeperkt teamleden',
        'Crawl tot 25.000 URL\'s',
        'Javascript rendering',
        'AI Acties & AI integraties',
        'Verwijder \'Powered by\' branding',
        'Customer Success Manager',
        'Alles uit Premium'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Transparante prijzen</h2>
          <p className="text-xl text-muted-foreground mb-6">
            Kies het pakket dat bij jouw organisatie past. Opschalen kan altijd.
          </p>
          
          <Tabs defaultValue="yearly" className="inline-block">
            <TabsList>
              <TabsTrigger value="monthly">Maandelijks</TabsTrigger>
              <TabsTrigger value="yearly">
                Jaarlijks <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Bespaar 17%</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Populair
                  </span>
                </div>
              )}
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                  <p className="text-xs text-muted-foreground mt-1">bij jaarlijkse betaling</p>
                </div>
                <Button className="w-full mb-6" variant={plan.popular ? "default" : "outline"}>
                  Start nu
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingAI;
