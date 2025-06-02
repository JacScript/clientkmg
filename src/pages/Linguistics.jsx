import React from 'react'
import HeroKiswahili from '../components/linguistics/HeroKiswahili'
import FeaturesSection from '../components/linguistics/FeatureSection'
import LanguageHeroSection from '../components/linguistics/LanguageSection'
import Learning from '../components/linguistics/Learning'
import Contact from '../components/contact/Contact'


const Linguistics = () => {
  return (
    <div>
        <HeroKiswahili/>
        <FeaturesSection/>
        <LanguageHeroSection/>
        <Learning/>
        <Contact/>
    </div>
  )
}

export default Linguistics