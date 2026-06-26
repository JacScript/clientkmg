import React from 'react'
import Header from '../../components/Header'
import RentalListingsGrid from '../../components/airbnb/RentalListingsGrid'
import useTitle from '../../components/useTitle'
import VillaHero from '../../components/airbnb/VillaHero'
import ApartmentsSection from '../../components/airbnb/ApartmentsSection'

const AirBnB = () => {
  useTitle('AirBnB')
  return (
    <>
     
      {/* <Header title="Holiday Home" link="holiday home" /> */}
      <div className="mt-40 bg-amber-500">
        <VillaHero/>
      </div>
      <ApartmentsSection/>
        <div className="min-h-screen bg-gray-100">
      <RentalListingsGrid />
    </div>
    </>
  )
}

export default AirBnB