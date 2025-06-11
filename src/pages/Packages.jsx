import React from 'react'
import Header from '../components/Header'
import TravelPackages from '../components/packages/TravelPackages'

const Packages = () => {
  return (
    <div>
        <Header title="Our Packages" link='packages'/>
        <TravelPackages/>
    </div>
  )
}

export default Packages
