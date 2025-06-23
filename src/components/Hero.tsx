
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Logo at the top */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-3xl font-bold text-gray-800">Lead Velocity</h1>
      </div>

      {/* Split Screen Container */}
      <div className="w-full h-screen flex flex-col md:flex-row">
        {/* Left Side - Outbound Lead Generation */}
        <div 
          className="flex-1 relative bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8 cursor-pointer group transition-all duration-500 hover:flex-[1.1]"
          onClick={() => handleNavigation('/outbound-lead-generation')}
        >
          {/* Background Wave */}
          <div className="absolute inset-0 opacity-20">
            <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
              <path d="M0,400 C150,300 250,200 400,100 L400,400 Z" fill="url(#blueGradient)" />
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1E40AF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 text-center max-w-md transform transition-transform duration-300 group-hover:scale-105">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              I'm looking for<br />
              <span className="text-velocity-blue">Outbound<br />Lead Generation</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              I want to fill my pipeline with qualified leads.
            </p>
            <Button 
              size="lg" 
              className="group/btn bg-white text-velocity-blue border-2 border-velocity-blue hover:bg-velocity-blue hover:text-white transition-all duration-300"
            >
              Take me there
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Right Side - AI Automations */}
        <div 
          className="flex-1 relative bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-8 cursor-pointer group transition-all duration-500 hover:flex-[1.1]"
          onClick={() => handleNavigation('/ai-automation')}
        >
          {/* Background Wave */}
          <div className="absolute inset-0 opacity-20">
            <svg className="absolute bottom-0 right-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
              <path d="M400,400 C250,300 150,200 0,100 L0,400 Z" fill="url(#purpleGradient)" />
              <defs>
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#5B21B6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 text-center max-w-md transform transition-transform duration-300 group-hover:scale-105">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              I'm looking for<br />
              <span className="text-purple-600">AI Automations</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              I want to automate repetitive workflows.
            </p>
            <Button 
              size="lg" 
              className="group/btn bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              Show me how
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Divider */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:hidden w-full h-px bg-gray-300"></div>
      
      {/* Desktop Divider */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block w-px h-full bg-gray-300"></div>
    </section>
  );
};

export default Hero;
