import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Download } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const handleLogoDownload = () => {
    const link = document.createElement('a');
    link.href = '/polygon-bimi-tiny12.svg';
    link.download = 'lead-velocity-logo.svg';
    link.click();
  };
  return <footer className="bg-gray-900 text-gray-100">
      <div className="container max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold mb-4">Lead<span className="text-velocity-blue">Velocity</span></h3>
              <button onClick={handleLogoDownload} className="text-gray-400 hover:text-velocity-blue transition-colors" aria-label="Download Logo">
                
              </button>
            </div>
            <p className="text-gray-400 mb-6">
              Accelerating business growth through strategic marketing and lead generation solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-velocity-blue transition-colors" aria-label="Facebook">
                
              </a>
              <a href="#" className="text-gray-400 hover:text-velocity-blue transition-colors" aria-label="Twitter">
                
              </a>
              <a href="https://www.linkedin.com/company/leadvelocity-2/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-velocity-blue transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-velocity-blue transition-colors" aria-label="Instagram">
                
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Lead Generation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Marketing Strategy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Performance Marketing</a></li>
              <li><a href="/AI" className="text-gray-400 hover:text-white transition-colors">AI Automation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              
              
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Amsterdam, Netherlands</li>
              <li>info@leadvelocity.nl</li>
              <li>+31 6 25 47 15 28 </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {currentYear} Lead Velocity. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
