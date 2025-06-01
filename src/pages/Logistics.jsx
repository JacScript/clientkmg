import React from 'react';
import HeroLogistics from '../components/logistics/HeroLogistics';
import WhyLogistics from '../components/logistics/WhyLogistics';
import Solution from '../components/logistics/Solution';
import Contact from '../components/contact/Contact'

const Logistics = () => {
  return (
    <main className="max-w-screen scrollbar-hide">
      <HeroLogistics />
      <WhyLogistics />
      <Solution/>
      <Contact />
    </main>
  );
};

export default Logistics;

