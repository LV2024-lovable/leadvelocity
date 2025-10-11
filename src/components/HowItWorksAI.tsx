const HowItWorksAI = () => {
  const steps = [
    {
      number: 1,
      title: 'Jij levert je HR-documenten',
      description: 'PDF, Word, Intranet, FAQ - wij verwerken het allemaal'
    },
    {
      number: 2,
      title: 'Wij trainen jouw AI-agent',
      description: 'Binnen 48 uur is je slimme assistent operationeel'
    },
    {
      number: 3,
      title: 'Medewerkers stellen vragen',
      description: 'Via WhatsApp - direct antwoord, 24/7 beschikbaar'
    },
    {
      number: 4,
      title: 'Complexe vragen naar HR',
      description: 'Automatische doorverwijzing als menselijke expertise nodig is'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Hoe het werkt</h2>
          <p className="text-xl text-muted-foreground">
            Van documentatie tot live AI-agent in vier simpele stappen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksAI;
