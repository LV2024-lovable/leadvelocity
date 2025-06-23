
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import ScaleFlowSystem from '../components/ScaleFlowSystem';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const LeadGen = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <ScaleFlowSystem />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default LeadGen;
