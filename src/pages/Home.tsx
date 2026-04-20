import React from 'react';
import NavbarNew from '../components/NavbarNew';
import HeroNew from '../components/HeroNew';
import VerticalsNew from '../components/VerticalsNew';
import ServicesNew from '../components/ServicesNew';
import ProcessNew from '../components/ProcessNew';
import ResultsNew from '../components/ResultsNew';
import AboutNew from '../components/AboutNew';
import CTANew from '../components/CTANew';
import FooterNew from '../components/FooterNew';

const Home = () => {
  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />
      <main>
        <HeroNew />
        <VerticalsNew />
        <ServicesNew />
        <ProcessNew />
        <ResultsNew />
        <AboutNew />
        <CTANew />
      </main>
      <FooterNew />
    </div>
  );
};

export default Home;
