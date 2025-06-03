import React from 'react'
import Header from '../components/Header'
import VisaCategoriesSection from '../components/visa/VisaCategorySection'
import VisaRequest from '../components/visa/VisaRequest'
import useTitle from '../components/useTitle'

const Visa = () => {
  useTitle('Visa')
  return (
    <div>
       
        <Header title="Visa" link="visa"/>
        <VisaCategoriesSection/>
        <VisaRequest/>
    </div>
  )
}

export default Visa