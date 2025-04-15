
import React from 'react';
import { Search, Handshake, ListChecks, SendHorizontal } from 'lucide-react';

const ScaleFlowSystem = () => {
  const steps = [
    {
      id: 1,
      title: "Learn & Research Your Ideal Customer",
      description: "You fill out our onboarding questionnaire to help us learn about your ICP. We conduct additional research to gain insights into your targets' motivations and pain points.",
      icon: <Search className="h-8 w-8 text-white" />,
      goal: "Putting the right message in front of the right person."
    }, 
    {
      id: 2,
      title: "Set up your email-sending infrastructure and research your target audience",
      description: "We set up multiple domains & mailboxes, configure technical records and start warming them up.",
      icon: <Handshake className="h-8 w-8 text-white" />,
      goal: "Ensuring your emails land outside of SPAM."
    }, 
    {
      id: 3,
      title: "Craft your email sequences and build your lead lists",
      description: "We write messaging angles for your different customer profiles. We build contextual lead lists by looking at buying signals (e.g. surge in hiring, ad spend, opening of new offices, acquisition) and industry trends.",
      icon: <ListChecks className="h-8 w-8 text-white" />,
      goal: "Reaching the right company at the right time."
    }, 
    {
      id: 4,
      title: "Send personalized messages at scale",
      description: "We leverage AI to tailor our messaging to each prospect. This lets us automate our outreach to potential clients —without compromising message quality.",
      icon: <SendHorizontal className="h-8 w-8 text-white" />,
      goal: "Flooding your calendar with opportunities."
    }
  ];

  return (
    <section id="scale-flow" className="py-20 bg-[#0A1724] text-white">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Timeline</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our proven methodology to accelerate your business growth through strategic automation.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-velocity-blue via-velocity-blue to-velocity-lightblue transform -translate-x-1/2 z-0" />
          
          {steps.map((step, index) => (
            <div key={step.id} className={`flex items-start mb-10 relative ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Timeline step marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-velocity-darkblue border border-velocity-blue rounded-md px-4 py-2 text-velocity-lightblue font-medium">
                  Step {step.id}
                </div>
              </div>

              {/* Content container - alternating sides */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                {/* Icon */}
                <div className="mb-3">
                  <div className="inline-flex bg-velocity-darkblue border border-velocity-blue p-3 rounded-lg shadow-lg">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="bg-[#121D2A] p-5 rounded-lg border border-velocity-blue/20 shadow-md">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-300 mb-3">{step.description}</p>
                  <div className="bg-[#152234] p-2 rounded border-l-4 border-velocity-blue">
                    <span className="text-velocity-blue font-medium">The goal? </span>
                    <span className="text-white">{step.goal}</span>
                  </div>
                </div>
              </div>

              {/* Empty space for the other side */}
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScaleFlowSystem;
