import React from 'react'
// import AboutUsHeader from '../components/about/Header'
// import About from '../../components/About'
import Header from '../../components/Header'
import SafariExpert from '../../components/about/SafariExpert.jsx'
import UnchartedBoundlessSection from '../../components/about/Uncharted.jsx'
import FeatureTour from '../../components/home/featureTour/FeatureTour'
import useTitle from '../../components/useTitle'
import Testimonial from '../../components/home/testimonial/Testimonial'
import ContactUs from '../../components/contact/Contact'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAboutData, getHomePageData } from '../../http'

const AboutUs = () => {





  const { data: responseData } = useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      return await getAboutData();
    },
    placeholderData: keepPreviousData,
  });

  const responseAboutData = responseData?.data.data;

  console.log(responseAboutData)


  useTitle('About Us')
  return (

     <div>
    {(() => {
      try {
        return <Header title="About Us" link="about"/>
      } catch (e) {
        console.error("Header crashed:", e)
        return null
      }
    })()}

    {(() => {
      try {
        return <UnchartedBoundlessSection data={responseAboutData.mainContent} />
      } catch (e) {
        console.error("Uncharted crashed:", e)
        return null
      }
    })()}

    {(() => {
      try {
        return <SafariExpert/>
      } catch (e) {
        console.error("SafariExperts crashed:", e)
        return null
      }
    })()}

    {(() => {
      try {
        return <ContactUs/>
      } catch (e) {
        console.error("ContactUs crashed:", e)
        return null
      }
    })()}
  </div>
    // <div>
     
      //  {/* <Header title="About Us" link="about"/> */}
    //     {/* <UnchartedBoundlessSection/> */}
    //     {/* <SafariExperts/> */}
       
    //     {/* <FeatureTour data={responseHomepageData}  /> */}
    //     {/* <ContactUs/> */}
    // </div>
  )
}

export default AboutUs;