
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Zap, Bot, Workflow, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

const AIAutomation = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 to-white py-20">
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
                AI Automations
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Automate repetitive workflows and scale your business operations with intelligent AI-powered solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Start Automating
                </Button>
                <Button variant="outline" size="lg">
                  See Examples
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Bot className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-bold text-lg">AI-Powered Workflows</h3>
                    <p className="text-gray-600">Intelligent automation that learns and adapts</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Workflow className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-bold text-lg">Process Optimization</h3>
                    <p className="text-gray-600">Streamline operations and reduce manual work</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-bold text-lg">Instant Implementation</h3>
                    <p className="text-gray-600">Quick setup and immediate results</p>
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
            <h2 className="text-3xl font-bold mb-4">Automation Solutions</h2>
            <p className="text-xl text-gray-600">Comprehensive AI automation services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Data Entry Automation",
              "Customer Support Chatbots",
              "Email Response Systems",
              "Lead Scoring & Routing",
              "Document Processing",
              "Social Media Management",
              "Appointment Scheduling",
              "Invoice & Billing Automation",
              "Custom AI Solutions"
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

export default AIAutomation;
