import React from 'react';
import HeroLogistics from '../components/logistics/HeroLogistics';
import WhyLogistics from '../components/logistics/WhyLogistics';
import Solution from '../components/logistics/Solution';
import Contact from '../components/contact/Contact'
import { Helmet } from 'react-helmet';

const Logistics = () => {
  return (
    <main className="max-w-screen scrollbar-hide">
       <Helmet>
        <title>KM - Home</title>
      </Helmet>
      <HeroLogistics />
      <WhyLogistics />
      <Solution/>
      <Contact />
    </main>
  );
};

export default Logistics;

