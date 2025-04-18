import React from 'react';
import { Search, Handshake, ListChecks, SendHorizontal } from 'lucide-react';
const ScaleFlowSystem = () => {
  const steps = [{
    id: 1,
    title: "Learn & Research Your Ideal Customer",
    description: "You fill out our onboarding questionnaire to help us learn about your ICP. We conduct additional research to gain insights into your targets' motivations and pain points.",
    icon: <Search className="h-8 w-8 text-white" />,
    goal: "Putting the right message in front of the right person."
  }, {
    id: 2,
    title: "Set up your email-sending infrastructure and research your target audience",
    description: "We set up multiple domains & mailboxes, configure technical records and start warming them up.",
    icon: <Handshake className="h-8 w-8 text-white" />,
    goal: "Ensuring your emails land outside of SPAM."
  }, {
    id: 3,
    title: "Craft your email sequences and build your lead lists",
    description: "We write messaging angles for your different customer profiles. We build contextual lead lists by looking at buying signals (e.g. surge in hiring, ad spend, opening of new offices, acquisition) and industry trends.",
    icon: <ListChecks className="h-8 w-8 text-white" />,
    goal: "Reaching the right company at the right time."
  }, {
    id: 4,
    title: "Send personalized messages at scale",
    description: "We leverage AI to tailor our messaging to each prospect. This lets us automate our outreach to potential clients —without compromising message quality.",
    icon: <SendHorizontal className="h-8 w-8 text-white" />,
    goal: "Flooding your calendar with opportunities."
  }];
  return <section id="scale-flow" className="py-24 bg-[#0A1724] text-white">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Scale Flow Process</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our proven methodology to accelerate your business growth through strategic automation.
          </p>
        </div>

        <div className="relative md:hidden">
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-velocity-blue via-velocity-blue to-velocity-lightblue" />
          
          {steps.map(step => <div key={step.id} className="flex items-start mb-12 relative">
              <div className="absolute left-0 transform">
                <div className="bg-velocity-darkblue border border-velocity-blue rounded-md px-3 py-1.5 text-velocity-lightblue font-medium text-sm">
                  Step {step.id}
                </div>
              </div>

              <div className="w-full pl-16">
                <div className="mb-4 flex justify-start">
                  <div className="inline-flex bg-velocity-darkblue border border-velocity-blue p-3 rounded-lg shadow-lg px-[13px] mx-[92px]">
                    {React.cloneElement(step.icon, {
                  className: "h-6 w-6 text-white"
                })}
                  </div>
                </div>

                <div className="bg-[#121D2A] p-6 rounded-lg border border-velocity-blue/20 shadow-md">
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-300 text-lg mb-4">{step.description}</p>
                  <div className="bg-[#152234] p-4 rounded border-l-4 border-velocity-blue">
                    <span className="text-velocity-blue font-medium text-lg">The goal? </span>
                    <span className="text-white text-lg">{step.goal}</span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>

        <div className="hidden md:block relative max-w-6xl mx-auto">
          <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-velocity-blue via-velocity-blue to-velocity-lightblue -translate-y-1/2" />
          
          <div className="grid grid-cols-4 gap-8">
            {steps.map(step => <div key={step.id} className="relative pt-12">
                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                  <div className="bg-velocity-darkblue border border-velocity-blue rounded-md px-3 py-1.5 text-velocity-lightblue font-medium text-sm">
                    Step {step.id}
                  </div>
                </div>

                <div className="mb-4 flex justify-center">
                  <div className="inline-flex bg-velocity-darkblue border border-velocity-blue p-3 rounded-lg shadow-lg">
                    {React.cloneElement(step.icon, {
                  className: "h-6 w-6 text-white"
                })}
                  </div>
                </div>

                <div className="bg-[#121D2A] p-6 rounded-lg border border-velocity-blue/20 shadow-md h-full">
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-300 text-lg mb-4">{step.description}</p>
                  <div className="bg-[#152234] p-4 rounded border-l-4 border-velocity-blue">
                    <span className="text-velocity-blue font-medium text-lg">The goal? </span>
                    <span className="text-white text-lg">{step.goal}</span>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default ScaleFlowSystem;