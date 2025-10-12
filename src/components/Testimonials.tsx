import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Sinds de AI HR Agent live is, krijgen we 75% minder interne HR-vragen. Ons team heeft eindelijk tijd voor strategisch werk.",
    author: "Sarah van den Berg",
    role: "HR Manager",
    company: "TechCorp Nederland"
  },
  {
    quote: "Medewerkers krijgen direct antwoord op hun vragen, ook midden in de nacht. De tevredenheid is enorm gestegen.",
    author: "Mark Janssen",
    role: "Operations Director",
    company: "RetailGroup"
  },
  {
    quote: "De integratie met ons HR-systeem verliep vlekkeloos. De ROI was binnen 3 maanden al positief.",
    author: "Lisa Vermeulen",
    role: "CFO",
    company: "FinanceFirst"
  }
];

const stats = [
  { value: "800+", label: "Vragen per week" },
  { value: "95%", label: "Tevredenheid" },
  { value: "<1%", label: "Handmatige opvolging" },
  { value: "24/7", label: "Beschikbaarheid" }
];

const Testimonials = () => {
  return (
    <section className="py-3 md:py-4 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-md border border-border p-8 md:p-12">
          {/* Testimonials */}
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Wat onze <span className="gradient-text">klanten</span> zeggen
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card
                key={idx}
                className="relative p-6 bg-white shadow-md border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                <p className="text-foreground/90 mb-6 italic">"{testimonial.quote}"</p>
                
                <div className="border-t border-border/50 pt-4">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-sm text-primary">{testimonial.company}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;