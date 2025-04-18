import React from 'react';
import { Check } from 'lucide-react';
import LogoCarousel from './LogoCarousel';
const About = () => {
  const benefits = ['Data-driven approach to marketing', 'Experienced team of specialists', 'Transparent process and reporting', 'Focus on measurable business results', 'Customized strategies for your business', 'Ongoing optimization and improvements'];
  return <section id="about" className="bg-velocity-gray py-0">
      <LogoCarousel />
      <div className="container max-w-7xl mx-auto mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 z-10 relative">
                <h3 className="text-2xl font-bold mb-6">Why Choose Lead Velocity?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 bg-velocity-lightblue rounded-full p-1">
                        <Check className="h-4 w-4 text-velocity-blue" />
                      </div>
                      <p className="text-gray-700">{benefit}</p>
                    </div>)}
                </div>
              </div>
              <div className="absolute top-6 left-6 w-full h-full bg-velocity-blue opacity-10 rounded-lg z-0"></div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Growth Partner for <span className="text-velocity-blue">Predictable Results</span>
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              At Lead Velocity, we understand that sustainable business growth requires more than just random marketing activities. It demands a strategic approach focused on generating high-quality leads and converting them into loyal customers.
            </p>
            <p className="text-lg text-gray-700 mb-6">We combine data-driven insights with creative strategies to create marketing campaigns that deliver measurable results. We work closely with you to understand your unique challenges and goals, developing customized solutions that align with your business objectives.</p>
            <p className="text-lg text-gray-700">
              Whether you're looking to expand your customer base, enter new markets, or maximize your marketing ROI, we have the expertise and tools to help you succeed.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default About;