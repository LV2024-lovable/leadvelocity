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
    <section id="pricing" className="py-3 md:py-4 relative">
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="bg-background/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-md border border-border p-4 sm:p-6 md:p-12">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
              Transparante <span className="gradient-text">prijzen</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 px-2">
              Kies het pakket dat bij jouw organisatie past. Opschalen kan altijd.
            </p>
            
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <ToggleGroup 
                type="single" 
                value={billingPeriod} 
                onValueChange={(value) => value && setBillingPeriod(value as "monthly" | "yearly")}
                className="bg-muted p-1 rounded-lg"
              >
                <ToggleGroupItem value="monthly" className="px-4 sm:px-6 py-2 text-xs sm:text-sm data-[state=on]:bg-background data-[state=on]:shadow-sm">
                  Maandelijks
                </ToggleGroupItem>
                <ToggleGroupItem value="yearly" className="px-4 sm:px-6 py-2 text-xs sm:text-sm data-[state=on]:bg-background data-[state=on]:shadow-sm relative">
                  Jaarlijks
                  <span className="absolute -top-2 -right-1 sm:-right-2 bg-secondary text-secondary-foreground text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-semibold">
                    Bespaar 17%
                  </span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative p-4 sm:p-6 md:p-8 bg-card shadow-lg transition-all duration-300 hover:scale-105 animate-scale-in flex flex-col ${
                  plan.highlight 
                    ? 'gradient-border shadow-lg shadow-primary/20' 
                    : 'border-border/50'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-0.5 sm:py-1 bg-primary text-primary-foreground text-xs sm:text-sm font-semibold rounded-full">
                    Populair
                  </div>
                )}
                
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">{plan.description}</p>
                  <div className="mb-1 sm:mb-2 transition-all duration-300">
                    {billingPeriod === "monthly" ? (
                      <>
                        <span className="text-2xl sm:text-3xl md:text-4xl font-bold">€{plan.monthlyPrice}</span>
                        <span className="text-muted-foreground ml-1 sm:ml-2 text-xs sm:text-sm">per maand</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl sm:text-3xl md:text-4xl font-bold">€{Math.round(plan.yearlyPrice / 12)}</span>
                        <span className="text-muted-foreground ml-1 sm:ml-2 text-xs sm:text-sm">per maand</span>
                        <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                          bij jaarlijkse betaling
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => {
                    setSelectedPlan(plan.name);
                    setContactDialogOpen(true);
                  }}
                  className={`w-full text-sm sm:text-base ${
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