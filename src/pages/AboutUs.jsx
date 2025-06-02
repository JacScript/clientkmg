import React from 'react'
// import AboutUsHeader from '../components/about/Header'
import About from '../components/About'
import Header from '../components/Header'
import SafariExperts from '../components/about/SafariExpert'
import UnchartedBoundlessSection from '../components/about/Uncharted'
import FeatureTour from '../components/home/featureTour/FeatureTour'
import { Helmet } from 'react-helmet'

const AboutUs = () => {
  return (
    <div>
      <Helmet>
        <title>KM - About Us</title>
      </Helmet>
        <Header title="About Us" link="about"/>
        <SafariExperts/>
        <UnchartedBoundlessSection/>
        <About/>
        <FeatureTour/>
    </div>
  )
}

export default AboutUs