import { Card, CardContent } from "@/components/ui/card";

const TestimonialsAI = () => {
  const testimonials = [
    {
      quote: 'Sinds de AI HR Agent live is, krijgen we 75% minder interne HR-vragen. Ons team heeft eindelijk tijd voor strategisch werk.',
      name: 'Sarah van den Berg',
      role: 'HR Manager',
      company: 'TechCorp Nederland'
    },
    {
      quote: 'Medewerkers krijgen direct antwoord op hun vragen, ook midden in de nacht. De tevredenheid is enorm gestegen.',
      name: 'Mark Janssen',
      role: 'Operations Director',
      company: 'RetailGroup'
    },
    {
      quote: 'De integratie met ons HR-systeem verliep vlekkeloos. De ROI was binnen 3 maanden al positief.',
      name: 'Lisa Vermeulen',
      role: 'CFO',
      company: 'FinanceFirst'
    }
  ];

  const stats = [
    { value: '800+', label: 'Vragen per week' },
    { value: '95%', label: 'Tevredenheid' },
    { value: '<1%', label: 'Handmatige opvolging' },
    { value: '24/7', label: 'Beschikbaarheid' }
  ];

  return (
    <>
      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Wat onze klanten zeggen</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsAI;
