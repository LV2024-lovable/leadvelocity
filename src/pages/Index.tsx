
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import ScaleFlowSystem from '../components/ScaleFlowSystem';
import Results from '../components/Results';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <ScaleFlowSystem />
      <About />
      <Results />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
