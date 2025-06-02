import React from 'react'
import Header from '../components/Header'
import VisaCategoriesSection from '../components/visa/VisaCategorySection'
import VisaRequest from '../components/visa/VisaRequest'

const Visa = () => {
  return (
    <div>
        <Header title="Visa" link="visa"/>
        <VisaCategoriesSection/>
        <VisaRequest/>
    </div>
  )
}

export default Visa