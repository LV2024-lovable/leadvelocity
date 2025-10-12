import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ContactDialog from "./ContactDialog";

const plans = [
  {
    name: "Basic",
    monthlyPrice: 299,
    yearlyPrice: 2999,
    description: "Automatiseer je veelgestelde vragen met een GPT-5 aangedreven AI Agent",
    features: [
      "Tot 250-500 chats/maand",
      "1 AI Agent",
      "3 teamleden",
      "Website chat widget",
      "WhatsApp, Facebook, Instagram",
      "Prompting module",
      "Statistieken",
      "5 Sterren support"
    ],
    highlight: false
  },
  {
    name: "Premium",
    monthlyPrice: 499,
    yearlyPrice: 4999,
    description: "Scrape je website en documenten om je AI Agent razendsnel te bouwen",
    features: [
      "Tot 500-1.000 chats/maand",
      "1 AI Agent",
      "10 teamleden",
      "Crawl tot 10.000 URL's",
      "Website crawler",
      "Document scraper",
      "Inbox & Menselijke handoff",
      "API-toegang",
      "Alles uit Basic"
    ],
    highlight: true
  },
  {
    name: "Business",
    monthlyPrice: 899,
    yearlyPrice: 8999,
    description: "Integreer je systemen in je AI Agent om klantenservice volledig te automatiseren",
    features: [
      "Tot 1.000-25.000 chats/maand",
      "3 AI Agents",
      "Onbeperkt teamleden",
      "Crawl tot 25.000 URL's",
      "Javascript rendering",
      "AI Acties & AI integraties",
      "Verwijder 'Powered by' branding",
      "Customer Success Manager",
      "Alles uit Premium"
    ],
    highlight: false
  }
];

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Transparante <span className="gradient-text">prijzen</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Kies het pakket dat bij jouw organisatie past. Opschalen kan altijd.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <ToggleGroup 
              type="single" 
              value={billingPeriod} 
              onValueChange={(value) => value && setBillingPeriod(value as "monthly" | "yearly")}
              className="bg-muted p-1 rounded-lg"
            >
              <ToggleGroupItem value="monthly" className="px-6 py-2 data-[state=on]:bg-background data-[state=on]:shadow-sm">
                Maandelijks
              </ToggleGroupItem>
              <ToggleGroupItem value="yearly" className="px-6 py-2 data-[state=on]:bg-background data-[state=on]:shadow-sm relative">
                Jaarlijks
                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full font-semibold">
                  Bespaar 17%
                </span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative p-8 bg-card shadow-lg transition-all duration-300 hover:scale-105 animate-scale-in ${
                plan.highlight 
                  ? 'gradient-border shadow-lg shadow-primary/20' 
                  : 'border-border/50'
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Populair
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="mb-2 transition-all duration-300">
                  {billingPeriod === "monthly" ? (
                    <>
                      <span className="text-4xl font-bold">€{plan.monthlyPrice}</span>
                      <span className="text-muted-foreground ml-2">per maand</span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">€{Math.round(plan.yearlyPrice / 12)}</span>
                      <span className="text-muted-foreground ml-2">per maand</span>
                      <div className="text-sm text-muted-foreground mt-1">
                        bij jaarlijkse betaling
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => {
                  setSelectedPlan(plan.name);
                  setContactDialogOpen(true);
                }}
                className={`w-full ${
                  plan.highlight 
                    ? 'bg-primary hover:bg-primary/90 glow-primary' 
                    : 'bg-secondary hover:bg-secondary/90'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact opnemen' : 'Start nu'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
      
      <ContactDialog 
        open={contactDialogOpen} 
        onOpenChange={setContactDialogOpen}
        selectedPlan={selectedPlan}
      />
    </section>
  );
};

export default Pricing;