
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Bot, Workflow, Clock, TrendingUp } from 'lucide-react';

const AIAutomation = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen flex items-center">
        <div className="container max-w-7xl mx-auto py-16">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              AI <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Automations</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Transform your business with intelligent automation that works 24/7, reduces manual tasks, and scales your operations efficiently.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                <Bot className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Smart Chatbots</h3>
                <p className="text-gray-600">24/7 customer support that learns and improves</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100">
                <Workflow className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Process Automation</h3>
                <p className="text-gray-600">Streamline repetitive tasks and workflows</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
                <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Time Savings</h3>
                <p className="text-gray-600">Reduce manual work by up to 80%</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                <TrendingUp className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-2 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Scale Operations</h3>
                <p className="text-gray-600">Handle more volume without more staff</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AIAutomation;
