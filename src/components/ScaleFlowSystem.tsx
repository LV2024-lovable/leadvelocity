
import React from 'react';
import { Search, Settings, ListChecks, Rocket } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const ScaleFlowSystem = () => {
  const steps = [
    {
      id: 1,
      title: "Learn & Research Your Ideal Customer",
      description: "Understand who your perfect customers are, what they need, and how to reach them effectively.",
      icon: <Search className="h-8 w-8 text-velocity-blue" />
    },
    {
      id: 2,
      title: "Set Up Your Automation & Email Infrastructure",
      description: "Build a reliable technical foundation that scales with your business growth.",
      icon: <Settings className="h-8 w-8 text-velocity-blue" />
    },
    {
      id: 3,
      title: "Craft Sequences & Build Dynamic Lead Lists",
      description: "Create personalized content flows and organize your prospects for maximum engagement.",
      icon: <ListChecks className="h-8 w-8 text-velocity-blue" />
    },
    {
      id: 4,
      title: "Launch Personalized Automation at Scale",
      description: "Deploy your campaigns and watch your business grow while maintaining a personal touch.",
      icon: <Rocket className="h-8 w-8 text-velocity-blue" />
    }
  ];

  return (
    <section id="scale-flow" className="py-20 bg-velocity-gray">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The ScaleFlow System</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our proven methodology to accelerate your business growth through strategic automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <Card key={step.id} className="border-2 border-velocity-lightblue hover:border-velocity-blue transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-velocity-lightblue rounded-full p-4 mb-2">
                    {step.icon}
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-velocity-blue text-white font-bold">
                    {step.id}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScaleFlowSystem;
