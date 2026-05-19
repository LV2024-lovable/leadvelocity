import React from 'react';
import NavbarNew from '../components/NavbarNew';
import HeroNew from '../components/HeroNew';
import Probleem from '../components/Probleem';
import ServicesNew from '../components/ServicesNew';
import VerticalsNew from '../components/VerticalsNew';
import ProcessNew from '../components/ProcessNew';
import VoorWie from '../components/VoorWie';
import ResultsNew from '../components/ResultsNew';
import CTANew from '../components/CTANew';
import FooterNew from '../components/FooterNew';

const Home = () => {
  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />
      <main>
        <HeroNew />
        <Probleem />
        <ServicesNew />
        <VerticalsNew />
        <ProcessNew />
        <VoorWie />
        <ResultsNew />
        <CTANew />
      </main>
      <FooterNew />
    </div>
  );
};

export default Home;
