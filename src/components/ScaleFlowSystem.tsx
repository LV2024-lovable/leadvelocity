import React from 'react';
import { Search, Settings, ListChecks, Rocket } from 'lucide-react';
import { Card, CardContent } from './ui/card';
const ScaleFlowSystem = () => {
  const steps = [{
    id: 1,
    title: "Learn & Research Your Ideal Customer",
    description: "Understand who your perfect customers are, what they need, and how to reach them effectively.",
    icon: <Search className="h-8 w-8 text-velocity-blue" />
  }, {
    id: 2,
    title: "Set Up Your Automation & Email Infrastructure",
    description: "Build a reliable technical foundation that scales with your business growth.",
    icon: <Settings className="h-8 w-8 text-velocity-blue" />
  }, {
    id: 3,
    title: "Craft Sequences & Build Dynamic Lead Lists",
    description: "Create personalized content flows and organize your prospects for maximum engagement.",
    icon: <ListChecks className="h-8 w-8 text-velocity-blue" />
  }, {
    id: 4,
    title: "Launch Personalized Automation at Scale",
    description: "Deploy your campaigns and watch your business grow while maintaining a personal touch.",
    icon: <Rocket className="h-8 w-8 text-velocity-blue" />
  }];
  return <section id="scale-flow" className="py-20 bg-velocity-gray">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The ScaleFlow System</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our proven methodology to accelerate your business growth through strategic automation.
          </p>
        </div>

        <div className="relative">
          {/* Flow connector line (visible on larger screens) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-velocity-lightblue via-velocity-blue to-velocity-lightblue transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, index) => <div key={step.id} className={`flex flex-col ${index % 2 === 0 ? 'animate-fade-in' : 'animate-fade-in'}`} style={{
            animationDelay: `${index * 0.2}s`
          }}>
                <Card className="h-full border-2 border-velocity-lightblue hover:border-velocity-blue transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
                
                {/* Arrow connector (visible only on mobile and tablet) */}
                {index < steps.length - 1 && <div className="flex justify-center mt-4 mb-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-velocity-blue">
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                  </div>}
                
                {/* Circular connector dots on the line (visible on larger screens) */}
                {index < steps.length - 1}
              </div>)}
          </div>
          
          {/* Desktop arrows connecting the steps */}
          <div className="hidden lg:flex justify-between absolute top-1/2 left-[18%] right-[18%] transform -translate-y-1/2 z-0 px-6">
            {[...Array(steps.length - 1)].map((_, i) => <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-velocity-blue">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>)}
          </div>
        </div>
      </div>
    </section>;
};
export default ScaleFlowSystem;