import React from 'react'
import Header from '../components/Header'
import VisaCategoriesSection from '../components/visa/VisaCategorySection'
import VisaRequest from '../components/visa/VisaRequest'
import { Helmet } from 'react-helmet'

const Visa = () => {
  return (
    <div>
       <Helmet>
        <title>KM - Home</title>
      </Helmet>
        <Header title="Visa" link="visa"/>
        <VisaCategoriesSection/>
        <VisaRequest/>
    </div>
  )
}

export default Visa