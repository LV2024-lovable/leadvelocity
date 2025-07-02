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
  return <section id="scale-flow" className="bg-gradient-to-br from-velocity-gray to-white text-gray-800 py-20">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-velocity-blue to-velocity-darkblue bg-clip-text text-transparent">
            Scale Flow Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our proven methodology to accelerate your business growth through strategic automation.
          </p>
        </div>

        <div className="relative md:hidden">
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-velocity-blue via-velocity-blue to-velocity-lightblue rounded-full shadow-lg" />
          
          {steps.map((step, index) => <div key={step.id} className="flex items-start mb-16 relative animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="absolute left-0 transform z-10">
                <div className="bg-gradient-to-r from-velocity-blue to-velocity-darkblue text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg border-4 border-white">
                  {step.id}
                </div>
              </div>

              <div className="w-full pl-20">
                <div className="mb-6 flex justify-start">
                  <div className="inline-flex bg-gradient-to-br from-velocity-blue to-velocity-darkblue p-4 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                    {React.cloneElement(step.icon, {
                  className: "h-8 w-8 text-white"
                })}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 leading-tight">{step.title}</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">{step.description}</p>
                  <div className="bg-gradient-to-r from-velocity-lightblue to-blue-50 p-6 rounded-xl border-l-4 border-velocity-blue shadow-inner">
                    <span className="text-velocity-blue font-bold text-lg">🎯 The goal: </span>
                    <span className="text-gray-800 text-lg font-medium">{step.goal}</span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>

        <div className="hidden md:block relative max-w-7xl mx-auto">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-velocity-blue via-velocity-blue to-velocity-lightblue -translate-y-1/2 rounded-full shadow-lg" />
          
          <div className="grid grid-cols-4 gap-8 pt-16 pb-8">
            {steps.map((step, index) => <div key={step.id} className="relative animate-fade-in" style={{animationDelay: `${index * 0.15}s`}}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-velocity-blue to-velocity-darkblue text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg border-4 border-white">
                    {step.id}
                  </div>
                </div>

                <div className="mb-8 flex justify-center pt-8">
                  <div className="inline-flex bg-gradient-to-br from-velocity-blue to-velocity-darkblue p-4 rounded-2xl shadow-xl transform hover:scale-110 transition-all duration-300 hover:rotate-3">
                    {React.cloneElement(step.icon, {
                  className: "h-8 w-8 text-white"
                })}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 leading-tight group-hover:text-velocity-blue transition-colors duration-300">{step.title}</h3>
                  <p className="text-gray-700 mb-6 text-base leading-relaxed">{step.description}</p>
                  <div className="bg-gradient-to-r from-velocity-lightblue to-blue-50 p-5 rounded-xl border-l-4 border-velocity-blue shadow-inner">
                    <span className="text-velocity-blue font-bold text-lg">🎯 The goal: </span>
                    <span className="text-gray-800 text-base font-medium">{step.goal}</span>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default ScaleFlowSystem;