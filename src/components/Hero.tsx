import React from 'react';
import { ArrowRight, BarChart2, Zap, Users } from 'lucide-react';
import { Button } from './ui/button';
const Hero = () => {
  return <section className="relative bg-gradient-to-br from-white to-velocity-lightblue min-h-screen flex items-center">
      <div className="container max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
          <div className="flex flex-col justify-between space-y-10 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Accelerate Your <span className="text-velocity-blue">Business Growth</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-lg">At Lead Velocity, we don't just generate leads — we help you build a predictable, scalable growth engine. As your dedicated partner, we align with your goals to drive consistent revenue and long-term business success.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 py-6">
              <Button size="lg" className="group">
                Book a Strategy Call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#services">Discover Our Services</a>
              </Button>
            </div>
          </div>
          <div className="relative flex justify-center animate-fade-in-right">
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 w-full max-w-md">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-velocity-lightblue p-3 rounded-lg">
                    <BarChart2 className="h-6 w-6 text-velocity-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Increase Lead Volume</h3>
                    <p className="text-gray-600">Attract high-intent prospects through smarter outreach.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-velocity-lightblue p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-velocity-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Accelerate Conversions</h3>
                    <p className="text-gray-600">Refine your buyer journey and close faster.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-velocity-lightblue p-3 rounded-lg">
                    <Users className="h-6 w-6 text-velocity-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Build a Stronger Pipeline</h3>
                    <p className="text-gray-600">Fuel your sales team with qualified opportunities, month after month.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;