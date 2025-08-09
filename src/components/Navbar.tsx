import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <nav className={cn("fixed w-full z-50 transition-all duration-300", isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4")}>
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-velocity-blue">
              Lead<span className="text-black">Velocity</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-gray-700 hover:text-velocity-blue transition-colors">
            Hoe het werkt
          </a>
          <a href="#features" className="text-gray-700 hover:text-velocity-blue transition-colors">
            Functies
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-velocity-blue transition-colors">
            Resultaten
          </a>
          <Button asChild>
            <a href="#contact">Plan demo</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md animate-fade-in">
          <div className="container py-4 flex flex-col space-y-4">
            <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-velocity-blue transition-colors py-2">
              Hoe het werkt
            </a>
            <a href="#features" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-velocity-blue transition-colors py-2">
              Functies
            </a>
            <a href="#testimonials" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-velocity-blue transition-colors py-2">
              Resultaten
            </a>
            
            <Button asChild className="w-full">
              <a href="#contact" onClick={() => setIsOpen(false)}>
                Plan demo
              </a>
            </Button>
          </div>
        </div>}
    </nav>;
};
export default Navbar;