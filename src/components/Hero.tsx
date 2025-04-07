
import React from 'react';
import { ArrowRight, BarChart2, Zap, Users } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-white to-velocity-lightblue pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Accelerate Your <span className="text-velocity-blue">Business Growth</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              We help B2B companies generate more leads, close more deals, and increase revenue through strategic digital marketing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                    <h3 className="font-bold text-xl">Increase Leads</h3>
                    <p className="text-gray-600">By up to 300%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-velocity-lightblue p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-velocity-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Boost Conversions</h3>
                    <p className="text-gray-600">Optimize your sales funnel</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-velocity-lightblue p-3 rounded-lg">
                    <Users className="h-6 w-6 text-velocity-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Grow Customer Base</h3>
                    <p className="text-gray-600">Target ideal prospects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
