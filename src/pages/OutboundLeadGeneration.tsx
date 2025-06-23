
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Target, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

const OutboundLeadGeneration = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-velocity-lightblue to-white py-20">
        <div className="container max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-8"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Outbound Lead Generation
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Fill your pipeline with qualified leads through strategic outbound campaigns that convert prospects into customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-velocity-blue hover:bg-velocity-darkblue">
                  Get Started Today
                </Button>
                <Button variant="outline" size="lg">
                  View Case Studies
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Target className="h-8 w-8 text-velocity-blue" />
                  <div>
                    <h3 className="font-bold text-lg">Targeted Prospecting</h3>
                    <p className="text-gray-600">Identify and reach your ideal customers</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-velocity-blue" />
                  <div>
                    <h3 className="font-bold text-lg">Multi-Channel Outreach</h3>
                    <p className="text-gray-600">Email, LinkedIn, and phone campaigns</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <TrendingUp className="h-8 w-8 text-velocity-blue" />
                  <div>
                    <h3 className="font-bold text-lg">Performance Optimization</h3>
                    <p className="text-gray-600">Continuous improvement and scaling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What's Included</h2>
            <p className="text-xl text-gray-600">Everything you need for successful outbound campaigns</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Lead Research & Qualification",
              "Email Campaign Setup",
              "LinkedIn Outreach",
              "CRM Integration",
              "Performance Analytics",
              "A/B Testing",
              "Response Management",
              "Monthly Strategy Calls",
              "Campaign Optimization"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OutboundLeadGeneration;
