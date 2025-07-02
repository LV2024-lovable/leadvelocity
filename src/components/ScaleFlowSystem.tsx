import React from 'react';
import { Search, Handshake, ListChecks, SendHorizontal, ArrowRight, CheckCircle2 } from 'lucide-react';

const ScaleFlowSystem = () => {
  const steps = [{
    id: 1,
    title: "Learn & Research Your Ideal Customer",
    description: "You fill out our onboarding questionnaire to help us learn about your ICP. We conduct additional research to gain insights into your targets' motivations and pain points.",
    icon: Search,
    goal: "Putting the right message in front of the right person.",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700"
  }, {
    id: 2,
    title: "Set up your email-sending infrastructure and research your target audience",
    description: "We set up multiple domains & mailboxes, configure technical records and start warming them up.",
    icon: Handshake,
    goal: "Ensuring your emails land outside of SPAM.",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700"
  }, {
    id: 3,
    title: "Craft your email sequences and build your lead lists",
    description: "We write messaging angles for your different customer profiles. We build contextual lead lists by looking at buying signals (e.g. surge in hiring, ad spend, opening of new offices, acquisition) and industry trends.",
    icon: ListChecks,
    goal: "Reaching the right company at the right time.",
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700"
  }, {
    id: 4,
    title: "Send personalized messages at scale",
    description: "We leverage AI to tailor our messaging to each prospect. This lets us automate our outreach to potential clients —without compromising message quality.",
    icon: SendHorizontal,
    goal: "Flooding your calendar with opportunities.",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700"
  }];

  return (
    <section id="scale-flow" className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-velocity-blue/10 text-velocity-blue px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <CheckCircle2 className="h-4 w-4" />
            Proven Process
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-velocity-blue via-purple-600 to-velocity-darkblue bg-clip-text text-transparent">
            Scale Flow Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our proven methodology to accelerate your business growth through strategic automation.
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative">
                {/* Flow Arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-velocity-blue rotate-90" />
                  </div>
                )}
                
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${step.color} p-1 animate-fade-in`} style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="bg-white rounded-3xl p-8">
                    {/* Icon and Number */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`relative w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                          <span className="text-sm font-bold text-gray-800">{step.id}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <p className="text-gray-700 mb-6 leading-relaxed">{step.description}</p>
                    
                    {/* Goal */}
                    <div className={`${step.bgColor} ${step.textColor} p-4 rounded-xl border-2 border-current/20`}>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-bold">Goal: </span>
                          <span className="font-medium">{step.goal}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="relative group">
                  {/* Flow Arrow */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-32 -right-4 z-10 hidden lg:block">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-velocity-blue/20">
                        <ArrowRight className="h-4 w-4 text-velocity-blue" />
                      </div>
                    </div>
                  )}
                  
                  <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${step.color} p-1 animate-fade-in group-hover:scale-105 transition-all duration-500 h-full`} style={{animationDelay: `${index * 0.15}s`}}>
                    <div className="bg-white rounded-3xl p-8 h-full flex flex-col">
                      {/* Icon and Number */}
                      <div className="flex flex-col items-center mb-6">
                        <div className={`relative w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-300`}>
                          <Icon className="h-10 w-10 text-white" />
                          <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-lg font-bold text-gray-800">{step.id}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-velocity-blue transition-colors duration-300">{step.title}</h3>
                      <p className="text-gray-700 mb-6 text-sm leading-relaxed flex-grow">{step.description}</p>
                      
                      {/* Goal */}
                      <div className={`${step.bgColor} ${step.textColor} p-4 rounded-xl border-2 border-current/20`}>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold text-xs">Goal: </span>
                            <span className="font-medium text-xs">{step.goal}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-velocity-blue to-velocity-darkblue text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Start Your Scale Flow Journey
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ScaleFlowSystem;