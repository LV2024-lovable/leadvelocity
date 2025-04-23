
import React from 'react';
import { Phone, Mail } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Discuss Your Growth Strategy</h2>
      <p className="text-lg text-gray-700 mb-8">
        Ready to accelerate your business growth? Contact us today to schedule a free strategy call and discover how we can help you generate more leads and increase revenue.
      </p>
      
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-velocity-lightblue p-3 rounded-full">
            <Phone className="h-5 w-5 text-velocity-blue" />
          </div>
          <div>
            <p className="font-medium">Call Us</p>
            <p className="text-gray-700">+31 6 25 47 15 28</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-velocity-lightblue p-3 rounded-full">
            <Mail className="h-5 w-5 text-velocity-blue" />
          </div>
          <div>
            <p className="font-medium">Email Us</p>
            <p className="text-gray-700">info@leadvelocity.nl</p>
          </div>
        </div>
      </div>
    </div>
  );
};
