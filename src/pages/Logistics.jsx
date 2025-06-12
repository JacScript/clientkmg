import React from 'react';
import HeroLogistics from '../components/logistics/HeroLogistics';
import WhyLogistics from '../components/logistics/WhyLogistics';
import Solution from '../components/logistics/Solution';
import Contact from '../components/contact/Contact'
import useTitle from '../components/useTitle';

const Logistics = () => {
  useTitle('Logistics')
  return (
    <main className="max-w-screen scrollbar-hide">
     
      <HeroLogistics />
      <WhyLogistics />
      <Solution/>
      <Contact id='logisticsContact' />
    </main>
  );
};

export default Logistics;

