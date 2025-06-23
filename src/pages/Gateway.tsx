
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Gateway = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Logo at top */}
      <div className="flex justify-center py-8">
        <span className="text-3xl font-bold text-velocity-blue">
          Lead<span className="text-black">Velocity</span>
        </span>
      </div>

      {/* Split Screen */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Outbound Lead Generation */}
        <div 
          className="relative group cursor-pointer bg-gradient-to-br from-velocity-lightblue to-white hover:from-velocity-blue hover:to-velocity-lightblue transition-all duration-500 flex items-center justify-center p-8"
          onClick={() => navigate('/leadgen')}
        >
          <div className="text-center space-y-6 max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500">
              I'm looking for<br />
              <span className="text-velocity-blue group-hover:text-white">Outbound Lead Generation</span>
            </h1>
            <p className="text-lg text-gray-700 group-hover:text-white/90 transition-colors duration-500">
              I want to fill my pipeline with qualified leads
            </p>
            <Button 
              size="lg" 
              className="group-hover:bg-white group-hover:text-velocity-blue transition-all duration-500"
            >
              Take me there
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {/* Decorative wave */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Right Side - AI Automations */}
        <div 
          className="relative group cursor-pointer bg-gradient-to-bl from-gray-50 to-gray-100 hover:from-gray-800 hover:to-gray-900 transition-all duration-500 flex items-center justify-center p-8"
          onClick={() => navigate('/AI')}
        >
          <div className="text-center space-y-6 max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500">
              I'm looking for<br />
              <span className="text-gray-800 group-hover:text-gray-300">AI Automations</span>
            </h1>
            <p className="text-lg text-gray-700 group-hover:text-gray-300 transition-colors duration-500">
              I want to automate repetitive workflows
            </p>
            <Button 
              size="lg" 
              variant="outline"
              className="group-hover:bg-white group-hover:text-gray-900 group-hover:border-white transition-all duration-500"
            >
              Show me how
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {/* Decorative wave */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* Mobile responsive improvements */}
      <style jsx>{`
        @media (max-width: 768px) {
          .grid-cols-1 > div {
            min-height: 50vh;
          }
        }
      `}</style>
    </div>
  );
};

export default Gateway;
