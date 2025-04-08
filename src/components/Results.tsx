
import React from 'react';
import { Star } from 'lucide-react';

// Define customer logos array
const customers = [
  { name: 'Microsoft', logo: '/placeholder.svg' },
  { name: 'Google', logo: '/placeholder.svg' },
  { name: 'Amazon', logo: '/placeholder.svg' },
  { name: 'Apple', logo: '/placeholder.svg' },
  { name: 'Uber', logo: '/placeholder.svg' },
  { name: 'Airbnb', logo: '/placeholder.svg' },
];

const stats = [
  { value: "200+", label: "Satisfied Clients" },
  { value: "300%", label: "Average Lead Increase" },
  { value: "85%", label: "Client Retention Rate" },
  { value: "€1.2M", label: "Generated in Revenue" },
];

const Results = () => {
  return (
    <section id="results" className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We help you build a predictable, scalable growth engine. As your dedicated partner, we align with your goals to drive consistent revenue and long-term business success.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {customers.map((customer, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <img 
                src={customer.logo} 
                alt={`${customer.name} logo`} 
                className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="bg-velocity-blue rounded-xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{stat.value}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
