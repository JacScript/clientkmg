import React from 'react'
// import AboutUsHeader from '../components/about/Header'
import About from '../components/About'
import Header from '../components/Header'
import SafariExperts from '../components/about/SafariExpert'
import UnchartedBoundlessSection from '../components/about/Uncharted'
import FeatureTour from '../components/home/featureTour/FeatureTour'
import useTitle from '../components/useTitle'
import Testimonial from '../components/home/testimonial/Testimonial'
import ContactUs from '../components/contact/Contact'

const AboutUs = () => {
  useTitle('About Us')
  return (
    <div>
     
        <Header title="About Us" link="about"/>
        <UnchartedBoundlessSection/>
        <SafariExperts/>
        {/* <About/> */}
        <Testimonial/>
        <FeatureTour/>
        <ContactUs/>
    </div>
  )
}

export default AboutUs