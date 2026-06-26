import React from 'react'
import Header from '../../components/Header'
import RentalListingsGrid from '../../components/airbnb/RentalListingsGrid'
import useTitle from '../../components/useTitle'
import VillaHero from '../../components/airbnb/VillaHero'

const AirBnB = () => {
  useTitle('AirBnB')
  return (
    <div>
     
      {/* <Header title="Holiday Home" link="holiday home" /> */}
      <VillaHero/>
        <div className="min-h-screen bg-gray-100">
      <RentalListingsGrid />
    </div>
    </div>
  )
}

export default AirBnB